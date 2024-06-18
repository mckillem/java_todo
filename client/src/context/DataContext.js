import { createContext, useState, useEffect } from 'react';
import {getAllProjects, getAllUsers} from "../client";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [projects, setProjects] = useState([]);
	const [fetchError, setFetchError] = useState(null);

	 const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				setUsers(data.map(d => ({
					key: d.id,
					value: d.username,
					label: d.username
				})));
			}).catch(() => {
				setFetchError("Nepodařilo se načíst uživatelé.");
		});

	const fetchProjects = () => {
		getAllProjects()
			.then(res => res.json())
			.then(data => {
				console.log("projekty: " + data)
				setProjects(data);
			}).catch(() => {
				setFetchError("Nepodařilo se načíst projekty.");
		});
	}

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		setUser(
			// On autofill we get a stringified value.
			typeof value === 'number' ? value.split(',') : value,
		);
	};

	function getStyles(name, user, theme, users) {
		return {
			fontWeight:
				users.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<DataContext.Provider value={{
			fetchError, setFetchError,
			users, user, handleChange,
			projects, setProjects, fetchProjects, getStyles
		}}>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext;