package com.example.demo.project.exchange;

import lombok.Getter;

import java.util.Collection;

@Getter
public class ProjectRequest {
	private String name;
	private String description;
	private Collection<Long> users;
}
