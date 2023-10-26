import { useEffect, useRef } from "react";
import SaveView from "./SaveView";
import novo from "./NovoInstance";
import SearchView from "./SearchView";

const App = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      novo.initView(ref.current);
    }
  }, [ref.current]);

  return (
    <>
      <div style={{ position: "absolute", top: 0 }}>
        <SaveView />
        <SearchView />
      </div>
      <canvas ref={ref} style={{ width: "100vw", height: "100vh" }}></canvas>
    </>
  );
};

export default App;
