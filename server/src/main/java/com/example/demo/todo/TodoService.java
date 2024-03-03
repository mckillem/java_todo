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

		return todoRepository.findAll();
	}

	public void addTodo(Todo todo) {
//		todo.setCreatedAt(LocalDateTime.now());
//		todo.setCreatedBy();
		todoRepository.saveAndFlush(todo);
	}

	public void deleteTodo(Long todoId) {
		if(!todoRepository.existsById(todoId)) {
			throw new TodoNotFoundException(
					"Todo with id " + todoId + " does not exists");
		}
		todoRepository.deleteById(todoId);
		todoRepository.flush();
	}
}
