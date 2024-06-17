import { useRef, useState, useEffect } from "react";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";

const LOGIN_URL = "/api/v1/auth/signin";

const LoginDave = () => {
	const { setAuth } = useAuth();
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");

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
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ username, password, roles, accessToken });
			setUsername("");
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
					onChange={(e) => setUsername(e.target.value)}
					value={username}
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
			</form>
			<p>
				Need an Account?<br />
				<span className="line">
					{/*put router link here*/}
					<a href="#">Sign Up</a>
				</span>
			</p>
		</section>
	)
}

export default LoginDave