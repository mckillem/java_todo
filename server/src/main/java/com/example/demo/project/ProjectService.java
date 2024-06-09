package com.example.demo.project;

import com.example.demo.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class ProjectService {
	private final ProjectRepository projectRepository;

	public List<Project> getAllProjects() {

		return projectRepository.findAll();
	}

	public void addProject(Project project) {
		Stream<User> users = project.getUsers().stream();

		User user = users.findFirst().get();

		project.addUser(user);
		projectRepository.saveAndFlush(project);
	}
}
