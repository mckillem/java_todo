package com.example.demo.project.dto;

import com.example.demo.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Collection;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE, staticName = "of")
@Builder(toBuilder = true)
public class ProjectDto {

    private Long id;
    private String name;
    private String description;
    private Collection<User> users;
}
