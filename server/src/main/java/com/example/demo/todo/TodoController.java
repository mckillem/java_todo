package com.example.demo.todo;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
	private final TodoService todoService;

	@CrossOrigin("*")
	@GetMapping
	public List<Todo> getAllTodos() {
		return todoService.getAllTodos();
	}

	@CrossOrigin("*")
	@GetMapping("/")
	@ResponseBody
	public List<Todo> getAllTodosByUser(@RequestParam Long id) {
		return todoService.getAllTodosByUser(id);
	}

	@CrossOrigin("*")
	@PostMapping
	public void addTodo(@RequestBody Todo todo) {
		todoService.addTodo(todo);
	}

	@CrossOrigin("*")
	@DeleteMapping(path = "/{todoId}")
	public void deleteTodo(@PathVariable("todoId") Long todoId) {
		todoService.deleteTodo(todoId);
	}

	@CrossOrigin("*")
	@PatchMapping(path = "/{todoId}")
	public void updateTodo(@PathVariable("todoId") Long todoId,
						   @RequestBody Todo todo) {
		todoService.updateTodo(todoId, todo);
	}

	@CrossOrigin("*")
	@GetMapping("/states")
	public State[] getAllStates() {
		return todoService.getAllStates();
	}
}
