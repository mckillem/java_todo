import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

const LOGIN_URL = "/auth/signin";

const LoginDave = () => {
	const { setAuth } = useAuth();
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [username, resetUsername, usernameAttribs] = useInput('username', '');
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [check, toggleCheck] = useToggle('persist', false);

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setErrMsg("");
	}, [username, password])

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ username, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);
			console.log(JSON.stringify(response?.data));

			// todo: dočasné řešení
			// setEmail(response.data.email);
			// setUsernameLocal(response.data.username);
			// setId(response.data.id);
			// setRoles(response.data.roles);
			//

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			const id = response?.data?.id;
			setAuth({ id, username, password, roles, accessToken });
			resetUsername();
			setPassword("");
			navigate(from, { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	}

	return (
		<section>
			<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					{...usernameAttribs}
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
				<button>Sign In</button>
				<div className="persistCheck">
					<input
						type="checkbox"
						id="persist"
						onChange={toggleCheck}
						checked={check}
					/>
					<label htmlFor="persist">Trust This Device</label>
				</div>
			</form>
			<p>
				Need an Account?<br/>
				<span className="line">
					<Link to="/register">Sign Up</Link>
				</span>
			</p>
		</section>
	)
}

export default LoginDave;