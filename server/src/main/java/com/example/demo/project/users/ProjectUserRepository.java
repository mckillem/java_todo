package com.example.demo.project.users;

import com.example.demo.project.users.model.ProjectUser;
import com.example.demo.project.users.model.ProjectUserPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectUserRepository extends JpaRepository<ProjectUser, ProjectUserPk> {
}
