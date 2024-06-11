package com.example.demo.todo.users.model;

import com.example.demo.user.User;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Table(name = "todos_to_users")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TodoUser {
	@EmbeddedId
	private TodoUserPk id;

	public static Collection<TodoUser> from(Collection<User> users, Long todoId) {
		return users.stream()
				.map(u -> TodoUser.builder()
						.id(TodoUserPk.of(u.getId(), todoId))
						.build())
				.collect(Collectors.toList());
	}
}
