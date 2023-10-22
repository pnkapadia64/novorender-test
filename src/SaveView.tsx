import React from "react";
import { RenderStateCamera } from "@novorender/api";
import novo from "./NovoInstance";

interface SavedView {
  [key: string]: {
    position: RenderStateCamera["position"];
    rotation: RenderStateCamera["rotation"];
  };
}

const SaveView = () => {
  const savedViews: SavedView = {};

  const onClick = (e: React.MouseEvent) => {
    const view = novo.getView();

    if (view) {
      const btnId = e.currentTarget.id;
      if (e.shiftKey) {
        const { camera } = view.renderState;
        const savedKey = btnId;
        savedViews[savedKey] = {
          position: camera.position,
          rotation: camera.rotation,
        };
      } else {
        const saved = savedViews[btnId];
        if (saved && saved.position) {
          view.activeController.moveTo(saved.position, 1000, saved.rotation);
        }
      }
    }
  };

  return (
    <div>
      <button
        id="btn1"
        onClick={onClick}
        style={{ width: 100, height: 40, margin: 10 }}
      >
        View 1
      </button>
      <button
        id="btn2"
        onClick={onClick}
        style={{ width: 100, height: 40, margin: 10 }}
      >
        View 2
      </button>
      <button
        id="btn3"
        onClick={onClick}
        style={{ width: 100, height: 40, margin: 10 }}
      >
        View 3
      </button>
    </div>
  );
};

export default SaveView;
