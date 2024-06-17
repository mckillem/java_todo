import './App.css';
import {Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./Login";
import {getToken} from "./localStorage/LocalStorage";
import Layout from "./Layout";
import {DataProvider} from "./context/DataContext";
import Register from "./Register";
import LoginDave from "./LoginDave";

function isTokenExisting() {
	return getToken() !== null;
}

function App() {

	if (isTokenExisting()) {
		return (
			<DataProvider>
				<Routes>
					<Route path={"/"} element={<Layout/>}>
						<Route index path={":projectId"} element={<TodoList/>}></Route>
						{/*<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>*/}
					</Route>
				</Routes>
			</DataProvider>
		);
	} else {
		return (
			<Routes>
				<Route path={"login"} element={<LoginDave/>}></Route>
				<Route path={"register"} element={<Register/>}></Route>
				<Route path={"*"} element={<h1>This page does not exist here.</h1>}></Route>
			</Routes>
		);
	}
}

export default App;
