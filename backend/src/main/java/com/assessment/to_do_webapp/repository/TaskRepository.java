package com.assessment.to_do_webapp.repository;

import com.assessment.to_do_webapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findFirst5ByIsCompletedFalseOrderByCreatedAtDesc();
}
