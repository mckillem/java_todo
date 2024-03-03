package com.example.demo.todo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
	private int createdBy;
	private boolean visibility;

	public void setId(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}
}
