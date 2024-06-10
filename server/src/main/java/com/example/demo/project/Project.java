package com.example.demo.project;

import com.example.demo.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
	@JsonIgnore
	private Set<User> users = new HashSet<>();

	public void addUser(Collection<User> user) {
		this.users.add((User) user);
		((User) user).getProject().add(this);
	}
}
