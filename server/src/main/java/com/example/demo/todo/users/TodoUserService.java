package com.example.demo.todo.users;

import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.user.User;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class TodoUserService {
	private final TodoUserRepository todoUserRepository;

	public TodoUserService(TodoUserRepository todoUserRepository) {
		this.todoUserRepository = todoUserRepository;
	}

	public void create(Collection<User> users, long todoId) {

		Collection<TodoUser> from = TodoUser.from(users, todoId);
		todoUserRepository.saveAll(from);
		todoUserRepository.flush();
	}
}
