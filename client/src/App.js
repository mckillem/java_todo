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
            <Route path={"/todos/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<TodoList/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
