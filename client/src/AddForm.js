import {addTodo} from "./client";
import {useState} from "react";

export const AddForm = (fetchTodos) => {
	const [createdBy, setCreatedBy] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");

	function add(event) {
		event.preventDefault();
		console.log(createdBy)
		const todo = {
			"createdBy": createdBy.target.value,
			"content": content.target.value,
			"description": description.target.value,
		}
		console.log(todo)
		addTodo(todo)
			.then(() => {
				console.log("todo added")
				// successNotification(
				//     "Todo successfully added",
				//     `${todo.name} was added to the system`
				// )
				fetchTodos();
			}).catch(err => {
			console.log(err);
			// err.response.json().then(res => {
			// 	console.log(res);
				// errorNotification(
				//     "There was an issue",
				//     `${res.message} [${res.status}] [${res.error}]`,
				//     "bottomLeft"
				// )
			// });
		}).finally(() => {
			// setSubmitting(false);
		})
	}

	return (
		<>
			<h1>Přidat</h1>
			<form onSubmit={add}>
				<input type="text" onChange={setCreatedBy} name={"createdBy"} hidden={false}/>
				<input type="text" onChange={setContent} name={"content"} placeholder={"obsah"}/>
				<input type="text" onChange={setDescription} name={"description"} placeholder={"popis"}/>
				<button type={"submit"}>Uložit</button>
			</form>
		</>
	)
}