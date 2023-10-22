import React, { useEffect, useRef } from "react";
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
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <SaveView />
        <SearchView />
      </div>
      <canvas ref={ref} style={{ width: "80%", height: "100%" }}></canvas>
    </div>
  );
};

export default App;
