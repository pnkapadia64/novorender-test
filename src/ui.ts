import { FlightController, RenderStateCamera, View } from "@novorender/api";

let position: RenderStateCamera["position"];
let rotation: RenderStateCamera["rotation"];
let renderState: RenderStateCamera;

export const initUI = (view: View) => {
  const btn1 = document.getElementById("btn1") as HTMLButtonElement;
  const btn2 = document.getElementById("btn2") as HTMLButtonElement;

  btn1.addEventListener("click", () => {
    console.log("btn click", view.activeController);
    console.log("...", view.renderState.camera.position);
    const { camera } = view.renderState;
    position = camera.position;
    rotation = camera.rotation;
    renderState = camera;
  });

  btn2.addEventListener("click", () => {
    console.log("btn 222 click", view.activeController);
    // const flight = new FlightController(btn1);
    // if (position && rotation) {
    //   view.activeController.moveTo(position, 1000, rotation);
    //   //   view.modifyRenderState({
    //   //     camera: renderState,
    //   //   });
    // }
  });
};
