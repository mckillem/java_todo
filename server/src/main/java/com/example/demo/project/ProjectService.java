package com.example.demo.project;

import com.example.demo.project.exchange.ProjectRequest;
import com.example.demo.project.model.Project;
import com.example.demo.project.users.ProjectUserService;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {
	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;
	private final ProjectUserService projectUserService;

	public List<Project> getAllProjects() {

		return projectRepository.findAll();
	}

	public void addProject(ProjectRequest projectRequest) {
		Collection<User> userByIds = userRepository.findAllById(projectRequest.getUsers());
		Project project = Project.builder()
				.name(projectRequest.getName())
				.description(projectRequest.getDescription())
				.build();

		//project.addUser(userByIds);
		Project newProject = projectRepository.saveAndFlush(project);

		projectUserService.create(userByIds, newProject.getId());
	}
}
