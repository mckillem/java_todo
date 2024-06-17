import { createContext, useState, useEffect } from 'react';
import {getAllUsers} from "../client";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);


	// const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

	 const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				setUsers(data.map(d => ({
					key: d.id,
					value: d.username,
					label: d.username
				})));
			}).catch(err => {
			console.log(err.response);
		}).finally(
		);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		setUser(
			// On autofill we get a stringified value.
			typeof value === 'number' ? value.split(',') : value,
		);
	};

	// function getStyles(name, user, theme, users) {
	// 	return {
	// 		fontWeight:
	// 			users.indexOf(name) === -1
	// 				? theme.typography.fontWeightRegular
	// 				: theme.typography.fontWeightMedium,
	// 	};
	// }

	useEffect(() => {
		fetchUsers();
	}, [])

	return (
		<DataContext.Provider value={{
			// searchResults, fetchError, isLoading,
			users, user, handleChange
		}}>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext;