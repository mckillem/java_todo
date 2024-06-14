package com.example.demo.todo;

import com.example.demo.project.ProjectRepository;
import com.example.demo.todo.exception.TodoNotFoundException;
import com.example.demo.todo.exchange.TodoRequest;
import com.example.demo.todo.model.Todo;
import com.example.demo.todo.users.TodoUserService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TodoService {
	private final ProjectRepository projectRepository;
	private TodoRepository todoRepository;
	private StateRepository stateRepository;
	private final UserRepository userRepository;
	private final TodoUserService todoUserService;

	public List<Todo> getAllTodos() {

		return todoRepository.findAll();
	}

	public List<Todo> getAllTodosByUser(Long id) {

		return todoRepository.findAllByCreatedBy(id);
	}

	public void addTodo(TodoRequest todoRequest) {
//		todo.setCreatedAt(LocalDateTime.now());
		Collection<User> userByIds = userRepository.findAllById(todoRequest.getUsers());
		Todo todo = Todo.builder()
				.content(todoRequest.getContent())
				.description(todoRequest.getDescription())
				.createdBy(todoRequest.getCreatedBy())
				.state(todoRequest.getState())
				.projectId(todoRequest.getProjectId())
				.build();

		Todo newTodo = todoRepository.saveAndFlush(todo);

		todoUserService.create(userByIds, newTodo.getId());
	}

	public void deleteTodo(Long todoId) {
		if(!todoRepository.existsById(todoId)) {
			throw new TodoNotFoundException(
					"Todo with id " + todoId + " does not exists");
		}
		todoRepository.deleteById(todoId);
		todoRepository.flush();
	}

	public void updateTodo(Long todoId, TodoRequest todoRequest) {
		if (!todoRepository.existsById(todoId)) {
			throw new TodoNotFoundException(
					"Todo with id " + todoId + " does not exists");
		}

		Optional<Todo> byId = todoRepository.findById(todoId);
		if (byId.isPresent()) {
			Todo todoById = byId.get();

			Collection<User> userByIds = userRepository.findAllById(todoRequest.getUsers());
			Todo todo = Todo.builder()
					.id(todoById.getId())
					.content(todoRequest.getContent())
					.description(todoRequest.getDescription())
					.createdBy(todoRequest.getCreatedBy())
					.state(todoRequest.getState())
					.projectId(todoRequest.getProjectId())
					.build();

			Todo newTodo = todoRepository.saveAndFlush(todo);

			todoUserService.create(userByIds, newTodo.getId());
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
