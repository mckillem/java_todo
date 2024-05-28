import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Login/>}></Route>
            <Route path={"/todos/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<TodoList/>}></Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
