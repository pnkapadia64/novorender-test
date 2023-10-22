import {
  RenderStateCamera,
  RenderStateHighlightGroups,
  View,
  createNeutralHighlight,
} from "@novorender/api";
import { type SceneData } from "@novorender/data-js-api";

interface SavedView {
  [key: string]: {
    position: RenderStateCamera["position"];
    rotation: RenderStateCamera["rotation"];
  };
}

const savedViews: SavedView = {};

const handleViews = (view: View) => {
  const buttons = document.getElementsByClassName("view-btn");

  for (let btn of buttons) {
    btn.addEventListener("click", (e: any) => {
      console.log("btn click", btn.id, view.activeController);
      if (e.shiftKey) {
        console.log("++shift");
        const { camera } = view.renderState;
        const savedKey = btn.id;
        savedViews[savedKey] = {
          position: camera.position,
          rotation: camera.rotation,
        };
      } else {
        const saved = savedViews[btn.id];
        console.log("==getting saved pos = ", saved);
        if (saved && saved.position) {
          view.activeController.moveTo(saved.position, 1000, saved.rotation);
        }
      }
    });
  }
};

const handleSearch = (view: View, sceneData: SceneData) => {
  console.log("=def highlight=", view.renderState.highlights);
  const searchBtn = document.getElementById("search-btn");
  const input = document.getElementById("search-input");

  searchBtn?.addEventListener("click", async () => {
    if (input) {
      const searchText = (input as HTMLInputElement).value;

      const { db } = sceneData;
      if (db) {
        const controller = new AbortController();
        const signal = controller.signal;

        const iterator = db.search({ searchPattern: searchText }, signal);

        const result: number[] = [];
        for await (const object of iterator) {
          result.push(object.id);
        }
        console.log("=== result ==", searchText, iterator, result);
        if (result.length === 0) {
          // Show everything
          view.modifyRenderState({
            highlights: {
              defaultAction: undefined,
              groups: [],
            },
          });
          return;
        }

        // Then we isolate the objects found
        const renderStateHighlightGroups: RenderStateHighlightGroups = {
          defaultAction: "hide",
          groups: [{ action: createNeutralHighlight(), objectIds: result }],
        };

        // Finally, modify the renderState
        view.modifyRenderState({ highlights: renderStateHighlightGroups });
      }
    }
  });
};

export const initUI = (view: View, sceneData: SceneData) => {
  handleViews(view);
  handleSearch(view, sceneData);
};
