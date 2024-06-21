import {axiosPrivate} from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	return async () => {
		const response = await axiosPrivate.post('/auth/refresh');

		setAuth(prev => {
			console.log("useRefreshToken prev: " + JSON.stringify(prev));
			console.log("useRefreshToken accessToken: " + response.data.token);
			return {
				...prev,
				// roles: response.data.roles,
				accessToken: response.data.token
			}
		});

		return response.data.token;
	};
};

export default useRefreshToken;