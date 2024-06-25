package com.example.demo.todo.dto;

import com.example.demo.todo.State;
import com.example.demo.todo.model.Todo;
import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE, staticName = "of")
@Builder(toBuilder = true)
public class TodoDto {
	private Long id;
	private String content;
	private String description;
	private Collection<User> users;
	private Long createdBy;
	private boolean visibility;
	private Long projectId;
	private State state;

	public static Collection<TodoDto> fromEntity(Collection<Todo> allTodo, Collection<TodoUser> allTodoUsersByIds, Collection<User> allUsers) {
		return allTodo.stream()
				.map(t -> fromEntity(t, allTodoUsersByIds, allUsers))
				.collect(Collectors.toList());
	}


	public static TodoDto fromEntity(Todo todo, Collection<TodoUser> allTodoUsersByIds, Collection<User> allUsers) {


		return TodoDto.builder()
				.id(todo.getId())
				.content(todo.getContent())
				.description(todo.getDescription())
				.users(allTodoUsersByIds.stream()
						.filter(u -> u.getPk().getTodoId().equals(todo.getId()))
						.map(u -> fromCollect(allUsers, u))
						.collect(Collectors.toList()))
				.createdBy(todo.getCreatedBy())
				.visibility(todo.isVisibility())
				.projectId(todo.getProjectId())
				.state(todo.getState())
				.build();
	}



	public static User fromCollect(Collection<User> allUsers, TodoUser todoUser) {
		return allUsers.stream()
				.filter(u -> u.getId().equals(todoUser.getPk().getUserId()))
				.findFirst()
				.orElseThrow();
	}
}
