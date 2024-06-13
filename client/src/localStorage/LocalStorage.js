export const getToken = () => {
	return localStorage.getItem("token");
}

export const setToken = (token) => {
	localStorage.setItem("token", token);
}

export const getEmail = () => {
	return localStorage.getItem("email");
}

export const setEmail = (email) => {
	localStorage.setItem("email", email);
}

// export const getName = () => {
// 	return localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
// }
//
// export const setFirstName = (firstName) => {
// 	localStorage.setItem("firstName", firstName);
// }
//
// export const setLastName = (lastName) => {
// 	localStorage.setItem("lastName",lastName);
// }

export const setUsernameLocal = (username) => {
	localStorage.setItem("username",username);
}

export const getUsernameLocal = () => {
	return localStorage.getItem("username");
}

export const setId = (id) => {
	localStorage.setItem("id",id);
}

export const getId = () => {
	return localStorage.getItem("id");
}

export const setRoles = (roles) => {
	localStorage.setItem("roles",roles);
}

export const getRoles = () => {
	return localStorage.getItem("roles");
}

export const setProjectName = (projectName) => {
	localStorage.setItem("projectName",projectName);
}

export const getProjectName = () => {
	return localStorage.getItem("projectName");
}

export const deleteLocaleStorage = () => {
	localStorage.clear();
}