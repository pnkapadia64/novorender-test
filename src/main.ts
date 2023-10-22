import { View, getDeviceProfile, createSphereObject } from "@novorender/api";
import { SceneData, createAPI } from "@novorender/data-js-api";
import { initUI } from "./ui";
import fixPointer from "./pointer";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

async function main(canvas: HTMLCanvasElement) {
  fixPointer();
  const gpuTier = 2;
  const deviceProfile = getDeviceProfile(gpuTier);
  const baseUrl = new URL("/novorender/api/", location.origin);
  const imports = await View.downloadImports({ baseUrl });
  const view = new View(canvas, deviceProfile, imports);
  view.modifyRenderState({ grid: { enabled: true } });

  const dataApi = createAPI({
    serviceUrl: "https://data.novorender.com/api",
  });

  // Load scene metadata
  // Condos scene ID, but can be changed to any public scene ID
  const sceneData = await dataApi.loadScene("95a89d20dd084d9486e383e131242c4c");
  // Destructure relevant properties into variables
  const { url } = sceneData as SceneData;
  // load the scene using URL gotten from `sceneData`
  const config = await view.loadSceneFromURL(new URL(url));
  const { center, radius } = config.boundingSphere;
  await view.switchCameraController("flight");
  view.activeController.autoFit(center, radius);
  initUI(view);
  await view.run();
  // view.dispose();
  console.log("== dispose done");
}

main(canvas);
