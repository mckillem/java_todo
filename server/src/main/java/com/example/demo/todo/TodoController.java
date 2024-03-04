package com.example.demo.todo;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
	private final TodoService todoService;

	@GetMapping
	public List<Todo> getAllTodos() {
		return todoService.getAllTodos();
	}

	@GetMapping("/")
	@ResponseBody
	public List<Todo> getAllTodosByUser(@RequestParam Long id) {
		return todoService.getAllTodosByUser(id);
	}

	@PostMapping
	public void addTodo(@RequestBody Todo todo) {
		todoService.addTodo(todo);
	}

	@DeleteMapping(path = "/{todoId}")
	public void deleteTodo(@PathVariable("todoId") Long todoId) {
		todoService.deleteTodo(todoId);
	}
}
