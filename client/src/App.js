import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ListOfProjects from "./ListOfProjects";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Login/>}></Route>
					<Route path={"/todos/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<TodoList/>}></Route>
					<Route path={"/dashboard/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<Dashboard/>}></Route>
					<Route path={"/list-of-projects"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<ListOfProjects/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
