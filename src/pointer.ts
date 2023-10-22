const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const fixPointer = () => {
  canvas.requestPointerLock =
    // @ts-ignore
    canvas.requestPointerLock || canvas.mozRequestPointerLock;

  document.exitPointerLock =
    // @ts-ignore
    document.exitPointerLock || document.mozExitPointerLock;

  canvas.addEventListener("click", async () => {
    console.log("=canvas click");
    // @ts-ignore
    await canvas.requestPointerLock({
      unadjustedMovement: true,
    });
  });

  // pointer lock event listeners

  // Hook pointer lock state change events for different browsers
  document.addEventListener("pointerlockchange", lockChangeAlert, false);
  //   document.addEventListener("mozpointerlockchange", lockChangeAlert, false);
  document.addEventListener("pointerlockerror", lockError, false);

  function lockError(e: Event) {
    console.error("Pointer lock failed", e);
  }

  function lockChangeAlert() {
    if (
      document.pointerLockElement === canvas ||
      // @ts-ignore
      document.mozPointerLockElement === canvas
    ) {
      console.log("The pointer lock status is now locked");
      //   document.addEventListener("mousemove", updatePosition, false);
    } else {
      console.log("The pointer lock status is now unlocked");
      //   document.removeEventListener("mousemove", updatePosition, false);
    }
  }
};

export default fixPointer;
