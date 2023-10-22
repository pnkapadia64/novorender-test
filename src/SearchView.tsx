import { useRef, useState } from "react";
import {
  RenderStateCamera,
  RenderStateHighlightGroups,
  View,
  createNeutralHighlight,
} from "@novorender/api";
import { type SceneData } from "@novorender/data-js-api";
import novo from "./NovoInstance";

const filterSearchInView = async (
  searchText: string,
  view: View,
  sceneData: SceneData,
  signal: AbortSignal
) => {
  const { db } = sceneData;
  if (db) {
    const iterator = db.search({ searchPattern: searchText }, signal);

    const result: number[] = [];
    for await (const object of iterator) {
      result.push(object.id);
    }
    if (result.length === 0) {
      // Show everything
      view.modifyRenderState({
        highlights: {
          defaultAction: undefined,
          groups: [],
        },
      });
      throw new Error("No results");
    }

    // Then we isolate the objects found
    const renderStateHighlightGroups: RenderStateHighlightGroups = {
      defaultAction: "hide",
      groups: [{ action: createNeutralHighlight(), objectIds: result }],
    };

    // Finally, modify the renderState
    view.modifyRenderState({ highlights: renderStateHighlightGroups });
  }
};

const SearchView = () => {
  const ref = useRef(null);
  const [noResult, showNoResult] = useState(false);
  const [abortCtrl, setAbortCtrl] = useState<AbortController>();

  const onSearch = async () => {
    if (ref.current && (ref.current as HTMLInputElement).value) {
      const searchText = (ref.current as HTMLInputElement).value;

      const view = novo.getView();
      const sceneData = novo.getSceneData();
      const controller = new AbortController();
      const signal = controller.signal;

      if (abortCtrl) {
        abortCtrl.abort();
      }
      if (view && sceneData) {
        setAbortCtrl(abortCtrl);
        try {
          showNoResult(false);
          await filterSearchInView(searchText, view, sceneData, signal);
        } catch (e) {
          showNoResult(true);
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
      <input
        ref={ref}
        placeholder="Search..."
        style={{ width: "80%", height: 40, marginBottom: 10 }}
      />
      <button
        onClick={onSearch}
        style={{ width: 100, height: 40, marginBottom: 10 }}
      >
        Search Scene
      </button>
      {noResult && <h5>No results</h5>}
    </div>
  );
};

export default SearchView;
