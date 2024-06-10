package com.example.demo.project.users.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC, staticName = "of")
@Embeddable
public class ProjectUserPk implements Serializable {

    private Long userId;
    private Long projectId;

}
