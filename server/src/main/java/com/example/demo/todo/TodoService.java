package com.example.demo.todo;

import com.example.demo.todo.exception.TodoNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
	private TodoRepository todoRepository;

	public List<Todo> getAllTodos() {
		List<Todo> all = todoRepository.findAll();

		return all;
	}

	public List<Todo> getAllTodosByUser() {
		List<Todo> all = todoRepository.findAllByUser();

		return all;
	}

	public void addTodo(Todo todo) {
//		todo.setCreatedAt(LocalDateTime.now());
//		todo.setCreatedBy();
		todoRepository.save(todo);
	}

	public void deleteTodo(Long todoId) {
		if(!todoRepository.existsById(todoId)) {
			throw new TodoNotFoundException(
					"Todo with id " + todoId + " does not exists");
		}
		todoRepository.deleteById(todoId);
	}
}
