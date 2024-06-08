import unfetch from "unfetch";

const checkStatus = response => {
	if (response.ok) {
		return response;
	}
	// convert non-2xx HTTP responses into errors:
	const error = new Error(response.statusText);
	error.response = response;
	return Promise.reject(error);
}

const baseURL = "http://localhost:8080/";

export const getAllUsers = () =>
	unfetch(baseURL + "api/v1/users", {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);

export const getAllTodos = () =>
	fetch(baseURL + "api/v1/todos", {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);

export const getAllTodosByUser = (id) =>
	fetch(baseURL + "api/v1/todos/?id=" + id, {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);

export const addTodo = async todo =>
	await fetch(baseURL + "api/v1/todos", {
		headers: {"Content-type": "application/json"},
		method: "POST",
		body: JSON.stringify(todo)
	}).then(checkStatus);

export const deleteTodo = (todoId) =>
	fetch(baseURL +`api/v1/todos/${todoId}`, {
		method: 'DELETE'
	}).then(checkStatus);

export const getAllStates = () =>
	fetch(baseURL + "api/v1/todos/states", {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);

export const loginUser = async user =>
	await fetch(baseURL + "api/v1/auth/signin", {
		headers: {"Content-type": "application/json"},
		method: "POST",
		body: JSON.stringify(user)
	}).then(checkStatus);

export const getAllProjects = () =>
	fetch(baseURL + "api/v1/projects", {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);