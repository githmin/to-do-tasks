package com.assessment.to_do_webapp.controllers;

import com.assessment.to_do_webapp.dto.CreateTaskRequestDTO;
import com.assessment.to_do_webapp.dto.TaskResponseDTO;
import com.assessment.to_do_webapp.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getRecentTasks(){
        List<TaskResponseDTO> t = taskService.getMostRecent5IncompletedTasks();
        return ResponseEntity.ok(t);
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody CreateTaskRequestDTO r){
        TaskResponseDTO task = taskService.createTask(r);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> complete(@PathVariable UUID id){
        TaskResponseDTO t = taskService.markAsComplete(id);
        return ResponseEntity.ok(t);
    }
}
