package com.example.demo.todo;

import lombok.Getter;

@Getter
public enum State {
	NEW("nový"),
	ANALYZE("analýza"),
	TO_DEVELOP("k vývoji"),
	IN_DEVELOPMENT("ve vývoji"),
	TEST("test"),
	REVIEW("kontrola"),
	FAIL("fail"),
	COMPLETED("hotovo");

	private final String state;

	State(String state) {
		this.state = state;
	}
}
