import unfetch from "unfetch";
import {getToken, getTokenType} from "./localStorage/LocalStorage";

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
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: "GET"
	}).then(checkStatus);

export const getAllTodos = () =>
	fetch(baseURL + "api/v1/todos", {
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: "GET"
	}).then(checkStatus);

export const getAllTodosByUser = (id) =>
	fetch(baseURL + "api/v1/todos/?id=" + id, {
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: "GET"
	}).then(checkStatus);

export const getAllTodosByProject = (id) =>
	fetch(baseURL + "api/v1/todos/project/?id=" + id, {
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: "GET"
	}).then(checkStatus);

export const addTodo = async todo =>
	await fetch(baseURL + "api/v1/todos", {
		headers: {
			"Content-type": "application/json",
			"Authorization": getTokenType() + " " + getToken()},
		method: "POST",
		body: JSON.stringify(todo)
	}).then(checkStatus);

export const updateTodo = async todo =>
	await fetch(baseURL + `api/v1/todos/${todo.id}`, {
		headers: {
			"Content-type": "application/json",
			"Authorization": getTokenType() + " " + getToken()},
		method: "PATCH",
		body: JSON.stringify(todo)
	}).then(checkStatus);

export const deleteTodo = (todoId) =>
	fetch(baseURL +`api/v1/todos/${todoId}`, {
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: 'DELETE'
	}).then(checkStatus);

export const getAllStates = () =>
	fetch(baseURL + "api/v1/todos/states", {
		headers: {"Authorization": getTokenType() + " " + getToken()},
		method: "GET"
	}).then(checkStatus);

export const loginUser = async user =>
	await fetch(baseURL + "api/v1/auth/signin", {
		headers: {"Content-type": "application/json"},
		method: "POST",
		body: JSON.stringify(user)
	}).then(checkStatus);

export const addProject = async project =>
	await fetch(baseURL + "api/v1/projects", {
		headers: {
			"Content-type": "application/json",
			"Authorization": getTokenType() + " " + getToken()},
		method: "POST",
		body: JSON.stringify(project)
	}).then(checkStatus);