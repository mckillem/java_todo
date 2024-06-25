package com.example.demo.todo.users.model;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC, staticName = "of")
@Embeddable
@Getter
public class TodoUserPk implements Serializable {
	private Long userId;
	private Long todoId;
}
