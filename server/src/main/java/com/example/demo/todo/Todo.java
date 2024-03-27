package com.example.demo.todo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
	@Enumerated(EnumType.STRING)
	private State state;
	private Long projectId = null;
}
