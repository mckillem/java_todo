package com.example.demo.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

	List<Todo> findAllByCreatedBy(Long id);

	List<Todo> findAllByProjectId(Long project_id);
}
