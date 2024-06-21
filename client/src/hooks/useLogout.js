import {axiosPrivate} from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
	const { setAuth } = useAuth();

	return async () => {

		try {
			await axiosPrivate.post('/auth/signout');

			setAuth({});
		} catch (err) {
			console.error(err);
		}
	};
}

export default useLogout