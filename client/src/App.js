import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserList from "./UserList";
import TodoList from "./TodoList";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<UserList/>}></Route>
            <Route path={"/todo-list"} element={<TodoList/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
