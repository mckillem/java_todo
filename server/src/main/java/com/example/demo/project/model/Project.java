package com.example.demo.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE, staticName = "of")
@Builder
public class Project {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

}
