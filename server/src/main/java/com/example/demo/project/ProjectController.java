package com.example.demo.project;

import com.example.demo.project.exchange.ProjectRequest;
import com.example.demo.project.model.Project;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/projects")
@AllArgsConstructor
public class ProjectController {
	private final ProjectService projectService;

	@CrossOrigin("*")
	@GetMapping
	public List<Project> getAllProjects() {
		return projectService.getAllProjects();
	}

	@CrossOrigin("*")
	@PostMapping
	public void addProject(@RequestBody ProjectRequest project) {
		projectService.addProject(project);
	}
}
