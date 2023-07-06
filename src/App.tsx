import { ComboBox } from "./ComboBox";
import "./App.css";
import { worker } from "../mock/browser";

worker.start();

function App() {
  return <ComboBox />;
}

export default App;
