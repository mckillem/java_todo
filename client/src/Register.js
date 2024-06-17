import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import './Register.css';
import Login from "./Login";
import {useNavigate} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/api/v1/auth/signup";

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [username, setUsername] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setValidName(USER_REGEX.test(username));
	}, [username])

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword])

	useEffect(() => {
		setErrMsg("");
	}, [username, password, matchPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if is button enabled with JS hack
		const v1 = USER_REGEX.test(username);
		const v2 = PASSWORD_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post(REGISTER_URL,
				JSON.stringify({ username, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);
			console.log(response?.data);
			console.log(response?.accessToken);
			console.log(JSON.stringify(response));
			setSuccess(true);

			setUsername("");
			setPassword("");
			setMatchPassword("");
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	}

	return (
		<>
			{success ? (
				<section>
					<Login/>
				</section>
			) : (
				<section>
					<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
					<h1>Registrace</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Username:
							<FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
						</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.<br />
							Must begin with a letter.<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>


						<label htmlFor="password">
							Password:
							<FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							aria-invalid={validPassword ? "false" : "true"}
							aria-describedby="passwordnote"
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
						/>
						<p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.<br />
							Must include uppercase and lowercase letters, a number and a special character.<br />
							Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
						</p>


						<label htmlFor="confirm_password">
							Confirm Password:
							<FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
							<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
						</label>
						<input
							type="password"
							id="confirm_password"
							onChange={(e) => setMatchPassword(e.target.value)}
							value={matchPassword}
							required
							aria-invalid={validMatch ? "false" : "true"}
							aria-describedby="confirmnote"
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button disabled={!validName || !validPassword || !validMatch}>Sign Up</button>
					</form>
					<p>
						Already registered?<br />
						<span className="line">
							{/*{navigate("/login")}*/}
                        </span>
					</p>
				</section>
			)}
		</>
	)
}

export default Register