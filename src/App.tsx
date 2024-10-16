import { Route, Routes } from "react-router-dom";
import Contador from "./pages/contador";

function App() {
  

  return (
    <Routes>
    <Route element={<Contador />} path="/" />
  </Routes>
  )
}

export default App
