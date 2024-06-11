package com.example.demo.todo.users;

import com.example.demo.todo.users.model.TodoUser;
import com.example.demo.todo.users.model.TodoUserPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoUserRepository extends JpaRepository<TodoUser, TodoUserPk> {
}
