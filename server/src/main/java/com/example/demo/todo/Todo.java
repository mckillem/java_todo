package com.example.demo.todo;

import com.example.demo.project.Project;
import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "todos")
@Getter
@Setter
public class Todo {
	@Id
	@GeneratedValue
	private Long id;
	private String content;
	private String description;
	private Long createdBy;
	private boolean visibility = true;
	@ManyToOne
	private Project project;
	@ManyToOne
	private State state;
	@ManyToMany
	@JoinTable(
			name = "todo_user",
			joinColumns = @JoinColumn(name = "todo_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> users = new HashSet<>();

	public void addUser(User user) {
		this.users.add(user);
		user.getTodo().add(this);
	}
}
