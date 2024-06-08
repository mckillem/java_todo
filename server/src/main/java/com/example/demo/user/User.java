package com.example.demo.user;

import com.example.demo.todo.Todo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue
	private Long id;
	private String username;
	@ManyToMany(mappedBy = "users")
	private Set<Todo> todo = new HashSet<>();
}
