package com.example.demo.todo.exchange;

import com.example.demo.todo.State;
import lombok.Getter;

import java.util.Collection;

@Getter
public class TodoRequest {
	private String content;
	private String description;
	private Long createdBy;
	private Collection<Long> users;
	private Long projectId;
	private State state;
}
