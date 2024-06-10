package com.example.demo.project.users;

import com.example.demo.project.users.model.ProjectUser;
import com.example.demo.user.User;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class ProjectUserService {

    private final ProjectUserRepository projectUserRepository;


    public ProjectUserService(ProjectUserRepository projectUserRepository) {
        this.projectUserRepository = projectUserRepository;
    }

    public void create(Collection<User> users, long projectId) {

        Collection<ProjectUser> from = ProjectUser.from(users, projectId);
        projectUserRepository.saveAll(from);
        projectUserRepository.flush();
        //projectUserRepository.saveAllAndFlush(from);
    }
}
