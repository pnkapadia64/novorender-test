import { FlightController, RenderStateCamera, View } from "@novorender/api";

interface SavedView {
  [key: string]: {
    position: RenderStateCamera["position"];
    rotation: RenderStateCamera["rotation"];
  };
}

const savedViews: SavedView = {};

export const initUI = (view: View) => {
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
