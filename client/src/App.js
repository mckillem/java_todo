import './App.css';
import {Routes, Route} from "react-router-dom";
import TodoList from "./TodoList";
import Login from "./components/Login";
import Layout from "./components/Layout";
import {DataProvider} from "./context/DataContext";
import Register from "./components/Register";
import LoginDave from "./components/LoginDave";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Users from "./components/Users";
import PersistLogin from "./components/PersistLogin";

// todo: zvážit ohledně bezpečnosti jestli použivat jen kódy
const ROLES = {
	'User': 2001,
	'Editor': 1984,
	// 'Admin': 5150
	'admin': "ROLE_ADMIN"
}

function App() {

	return (
		<DataProvider>
			<Routes>
				<Route path="login" element={<LoginDave/>}></Route>
				<Route path="register" element={<Register/>}></Route>
				<Route path="unauthorized" element={<Unauthorized />} />

				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={[ROLES.admin]}/>}>
						<Route path="/" element={<Layout/>}>
							<Route index path=":projectId" element={<TodoList/>}></Route>
							{/*todo: na ověření, že funguje refresh token*/}
							{/*<Route index path="/" element={<Users/>}></Route>*/}
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<h1>This page does not exist here.</h1>}></Route>
			</Routes>
		</DataProvider>
	);
}

export default App;
