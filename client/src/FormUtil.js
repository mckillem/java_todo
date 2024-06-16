import {getAllUsers} from "./client";

export const fetchUsers = (setUsers) =>
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

export const handleChange = (event, setUser) => {
	const {
		target: { value },
	} = event;

	setUser(
		// On autofill we get a stringified value.
		typeof value === 'number' ? value.split(',') : value,
	);
};

export function getStyles(name, user, theme, users) {
	return {
		fontWeight:
			users.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}
