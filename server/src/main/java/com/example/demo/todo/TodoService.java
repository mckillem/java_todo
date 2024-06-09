package com.example.demo.todo;

import com.example.demo.project.ProjectRepository;
import com.example.demo.todo.exception.TodoNotFoundException;
import com.example.demo.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class TodoService {
	private final ProjectRepository projectRepository;
	private TodoRepository todoRepository;
	private StateRepository stateRepository;

	public List<Todo> getAllTodos() {

		return todoRepository.findAll();
	}

	public List<Todo> getAllTodosByUser(Long id) {

		return todoRepository.findAllByCreatedBy(id);
	}

	public void addTodo(Todo todo) {
//		todo.setCreatedAt(LocalDateTime.now());
		Stream<User> users = todo.getUsers().stream();

		User user = users.findFirst().get();

		todo.addUser(user);
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

	public void updateTodo(Long todoId, Todo todo) {
		if (!todoRepository.existsById(todoId)) {
			throw new TodoNotFoundException(
					"Todo with id " + todoId + " does not exists");
		}

		Optional<Todo> byId = todoRepository.findById(todoId);
		if (byId.isPresent()) {
			Todo todoById = byId.get();
			todoById.setContent(todo.getContent());
			todoRepository.saveAndFlush(todoById);
		}
	}

	public List<State> getAllStates() {

		return stateRepository.findAll();
	}

	public void addState(State state) {
		stateRepository.saveAndFlush(state);
	}

	public List<Todo> getAllTodosByProject(Long id) {
		Long projectId = projectRepository.findById(id).get().getId();

		return todoRepository.findAllByProjectId(projectId);
	}
}
