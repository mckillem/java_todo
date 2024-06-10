package com.example.demo.project.users.model;

import com.example.demo.user.User;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.stream.Collectors;

@Entity
@Table(name = "projects_to_users")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ProjectUser {

    @EmbeddedId
    private ProjectUserPk id;

    public static Collection<ProjectUser> from(Collection<User> users, Long projectId) {
        return users.stream()
                .map(u -> ProjectUser.builder()
                        .id(ProjectUserPk.of(u.getId(), projectId))
                        .build())
                .collect(Collectors.toList());
    }
}
