import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ListOfProjects from "./ListOfProjects";
import {getToken} from "./localStorage/LocalStorage";

function isTokenExisting() {
	return getToken() !== null;
}

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<Login/>}></Route>
					<Route path={"/dashboard/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={isTokenExisting() ? <Dashboard/> : <Navigate to={"/"}/>}></Route>
					<Route path={"/list-of-projects/:id"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={isTokenExisting() ? <ListOfProjects/> : <Navigate to={"/"}/>}></Route>
					<Route path={"/list-of-projects/:id/:projectId"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={isTokenExisting() ? <TodoList/> : <Navigate to={"/"}/>}></Route>
					<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
