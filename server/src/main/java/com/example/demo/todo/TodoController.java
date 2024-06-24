package com.example.demo.todo;

import com.example.demo.todo.exchange.TodoRequest;
import com.example.demo.todo.model.Todo;
import com.example.demo.todo.users.TodoUserService;
import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.todo.users.model.TodoUserPk;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
	private final TodoService todoService;
	private final TodoUserService todoUserService;

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
	@GetMapping("/project/")
	@ResponseBody
	public List<Todo> getAllTodosByProject(@RequestParam Long id) {
		return todoService.getAllTodosByProject(id);
	}

	@CrossOrigin("*")
	@GetMapping("/users/")
	@ResponseBody
	public Collection<TodoUser> getAllUsersByTodo(@RequestParam TodoUserPk id) {
		return todoUserService.getAllUsersByTodo(id);
	}

	@CrossOrigin("*")
	@PostMapping
	public void addTodo(@RequestBody TodoRequest todo) {
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
						   @RequestBody TodoRequest todoRequest) {
		todoService.updateTodo(todoId, todoRequest);
	}

	@CrossOrigin("*")
	@GetMapping("/states")
	public List<State> getAllStates() {
		return todoService.getAllStates();
	}

	@CrossOrigin("*")
	@PostMapping("/states")
	public void addState(@RequestBody State state) {
		todoService.addState(state);
	}

}
