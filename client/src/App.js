import './App.css';
import {Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import {getToken} from "./localStorage/LocalStorage";
import Layout from "./Layout";

function isTokenExisting() {
	return getToken() !== null;
}

function App() {

	if (isTokenExisting()) {
		return (
			<Routes>
				<Route path={"/"} element={<Layout/>}>
					<Route index path={"list-of-projects/:id/:projectId"} loader={({ params }) => console.log(params.id)} action={({ params }) => {}} element={<TodoList/>}></Route>
					{/*<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>*/}
				</Route>
				{/*<Route path={"/dashboard/:id"} element={<Dashboard/>}></Route>*/}
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path={"login"} element={<Login/>}></Route>
				<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>
			</Routes>
		);
	}
}

export default App;
