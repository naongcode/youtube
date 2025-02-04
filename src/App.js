import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Main from "./Page/Main.js";

function App() {
  return <div className="App">
    <Routes>
    <Route path="/*" element={<AppLayout/>}>
      <Route path='*' element={<Main/>}/>
    </Route>
    </Routes>
    </div>;
}
function AppLayout() {
  return <div>
    <Header/>
    <Outlet/>
  </div>;
}

export default App;
