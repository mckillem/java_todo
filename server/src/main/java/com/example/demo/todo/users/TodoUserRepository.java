package com.example.demo.todo.users;

import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.todo.users.model.TodoUserPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface TodoUserRepository extends JpaRepository<TodoUser, TodoUserPk> {
//	Collection<TodoUser> findTodoUsersByTodoId(TodoUserPk id);

	Collection<TodoUser> findAllTodoUsersByPk(TodoUserPk id);
}
