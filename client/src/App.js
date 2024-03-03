import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./UserList";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<UserList/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
