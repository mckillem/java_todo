import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
	const { setAuth, auth } = useAuth();

	return async () => {

		try {
			await axios.post('/auth/signout', null, {
				headers: {'Authorization': 'Bearer ' + auth.accessToken}
			});

			setAuth({});
		} catch (err) {
			console.error(err);
		}
	};
}

export default useLogout