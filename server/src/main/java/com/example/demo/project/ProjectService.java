package com.example.demo.project;

import com.example.demo.project.exchange.ProjectRequest;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import com.example.demo.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class ProjectService {
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public List<Project> getAllProjects() {

		return projectRepository.findAll();
	}

	public void addProject(ProjectRequest projectRequest) {
		Project project = new Project();

		project.addUser(userRepository.findAllById(projectRequest.getUsers()));
		projectRepository.saveAndFlush(project);
	}
}
