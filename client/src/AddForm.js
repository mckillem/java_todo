import {addTodo} from "./client";
import {useState} from "react";

export const AddForm = ({fetchTodos, userId}) => {
	const [createdBy, setCreatedBy] = useState(userId);
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");

	function add(event) {
		event.preventDefault();

		const todo = {
			"createdBy": createdBy,
			"content": content,
			"description": description,
		}

		addTodo(todo)
			.then(() => {
				console.log("todo added")
				// successNotification(
				//     "Todo successfully added",
				//     `${todo.name} was added to the system`
				// )
				fetchTodos();
			}).catch(err => {
			// console.log(err);
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
			setCreatedBy("");
			setContent("");
			setDescription("");
		})
	}

	return (
		<>
			<h1>Přidat</h1>
			<form onSubmit={add}>
				<input
					type="text"
					onChange={(e) => setContent(e.target.value)}
					value={content}
					name={"content"}
					required={true}
					placeholder={"obsah"}
				/>
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					name={"description"}
					placeholder={"popis"}
				/>
				<button type={"submit"}>Uložit</button>
			</form>
		</>
	)
}