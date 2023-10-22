import { View, getDeviceProfile, createSphereObject } from "@novorender/api";
import { SceneData, createAPI } from "@novorender/data-js-api";

class Novo {
  private view: View | undefined;
  private sceneData: SceneData | undefined;

  async initView(canvasEl: HTMLCanvasElement) {
    const gpuTier = 2;
    const deviceProfile = getDeviceProfile(gpuTier);
    const baseUrl = new URL("/novorender/api/", location.origin);
    const imports = await View.downloadImports({ baseUrl });
    const view = new View(canvasEl, deviceProfile, imports);
    view.modifyRenderState({ grid: { enabled: true } });

    const dataApi = createAPI({
      serviceUrl: "https://data.novorender.com/api",
    });

    const sceneData = await dataApi.loadScene(
      "95a89d20dd084d9486e383e131242c4c"
    );

    const { url } = sceneData as SceneData;
    const config = await view.loadSceneFromURL(new URL(url));
    const { center, radius } = config.boundingSphere;
    await view.switchCameraController("flight");
    view.activeController.autoFit(center, radius);

    this.view = view;
    this.sceneData = sceneData as SceneData;

    await view.run();
  }

  getView() {
    return this.view;
  }

  getSceneData() {
    return this.sceneData;
  }
}

const novo = new Novo();
export default novo;

// async function main(canvas: HTMLCanvasElement) {
//   fixPointer();
//   const gpuTier = 2;
//   const deviceProfile = getDeviceProfile(gpuTier);
//   const baseUrl = new URL("/novorender/api/", location.origin);
//   const imports = await View.downloadImports({ baseUrl });
//   const view = new View(canvas, deviceProfile, imports);
//   view.modifyRenderState({ grid: { enabled: true } });

//   const dataApi = createAPI({
//     serviceUrl: "https://data.novorender.com/api",
//   });

//   const sceneData = await dataApi.loadScene("95a89d20dd084d9486e383e131242c4c");
//   const { url } = sceneData as SceneData;
//   const config = await view.loadSceneFromURL(new URL(url));
//   const { center, radius } = config.boundingSphere;
//   await view.switchCameraController("flight");
//   view.activeController.autoFit(center, radius);
//   initUI(view, sceneData as SceneData);
//   await view.run();
//   // view.dispose();
// }

// main(canvas);
