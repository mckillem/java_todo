package com.example.demo.todo.model;

import com.example.demo.todo.State;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "todos")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE, staticName = "of")
@Builder
public class Todo {
	@Id
	@GeneratedValue
	private Long id;
	private String content;
	private String description;
	private Long createdBy;
	private boolean visibility = true;
	private Long projectId;
	@ManyToOne
	private State state;
}
