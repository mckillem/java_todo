package com.example.demo.project;

import com.example.demo.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String description;
	@ManyToMany
	@JoinTable(
			name = "project_user",
			joinColumns = @JoinColumn(name = "project_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> users = new HashSet<>();

	public void addUser(User user) {
		this.users.add(user);
		user.getProject().add(this);
	}
}
