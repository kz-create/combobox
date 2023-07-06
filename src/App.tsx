import { ComboBox } from "./ComboBox";
import "./App.css";
import { RecoilRoot } from "recoil";
import { worker } from "../mock/browser";

worker.start();

function App() {
  return (
    <RecoilRoot>
      <ComboBox />
    </RecoilRoot>
  );
}

export default App;
