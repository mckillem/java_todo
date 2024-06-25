package com.example.demo.todo;

import com.example.demo.project.ProjectRepository;
import com.example.demo.todo.dto.TodoDto;
import com.example.demo.todo.exception.TodoNotFoundException;
import com.example.demo.todo.exchange.TodoRequest;
import com.example.demo.todo.model.Todo;
import com.example.demo.todo.users.TodoUserRepository;
import com.example.demo.todo.users.TodoUserService;
import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoService {
	private final ProjectRepository projectRepository;
	private TodoRepository todoRepository;
	private StateRepository stateRepository;
	private final UserRepository userRepository;
	private final TodoUserService todoUserService;
	private final TodoUserRepository todoUserRepository;

	public Collection<TodoDto> getAllTodos() {

		Collection<Todo> allTodo = todoRepository.findAll();


		return getTodos(allTodo);
	}

	public Collection<TodoDto> getAllTodosByUser(Long id) {


		Collection<Todo> allByCreatedBy = todoRepository.findAllByCreatedBy(id);

		return getTodos(allByCreatedBy);
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

	public Collection<TodoDto> getAllTodosByProject(Long id) {
//		Long projectId = projectRepository.findById(id).get().getId();
//		Collection<Todo> todos = todoRepository.findAllByProjectId(projectId);
//		Collection<Long> todoIds = todos.stream().filter(todo -> todo.getId());
//		Collection<User> users = todoUserRepository.findTodoUsersByTodoId(todos);

		Collection<TodoDto> allTodos = getAllTodos();

		return allTodos.stream()
				.filter(a -> a.getProjectId().equals(id))
				.collect(Collectors.toList());
	}

	private Collection<TodoDto> getTodos(Collection<Todo> allTodo) {
		Collection<TodoUser> allTodoUser = todoUserRepository.findAll();


		Collection<TodoUser> collect = allTodoUser.stream()
				.filter(a -> isExist(a, allTodo))
				.collect(Collectors.toList());

		Collection<User> allUsers = userRepository.findAll();
        return TodoDto.fromEntity(allTodo, collect, allUsers);
	}

	private static boolean isExist(TodoUser a, Collection<Todo> allTodo) {

		Optional<Todo> todo =allTodo.stream()
				.filter(t -> t.getId().equals(a.getPk().getTodoId()))
				.findFirst();


		return todo.isPresent();
	}
}
