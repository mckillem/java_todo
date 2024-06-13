import './App.css';
import {Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ListOfProjects from "./sidebar/ListOfProjects";
import {getToken} from "./localStorage/LocalStorage";

function isTokenExisting() {
	return getToken() !== null;
}

function App() {

	if (isTokenExisting()) {
		return (
			<>
				<Routes>
					<Route path={"/dashboard/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<Dashboard/>}></Route>
					<Route path={"/list-of-projects/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<ListOfProjects/>}></Route>
					<Route path={"/list-of-projects/:id/:projectId"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<TodoList/>}></Route>
					<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>
				</Routes>
			</>
		);
	} else {
		return (
			<>
				<Routes>
					<Route path={"/"} element={<Login/>}></Route>
					<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>
				</Routes>
			</>
		);
	}
}

export default App;
