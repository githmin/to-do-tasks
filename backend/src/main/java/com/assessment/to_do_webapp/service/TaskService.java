package com.assessment.to_do_webapp.service;

import com.assessment.to_do_webapp.dto.CreateTaskRequestDTO;
import com.assessment.to_do_webapp.dto.TaskResponseDTO;
import com.assessment.to_do_webapp.dto.UpdateTaskDTO;
import com.assessment.to_do_webapp.model.Task;
import com.assessment.to_do_webapp.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskResponseDTO> getMostRecent5IncompletedTasks(){
        return taskRepository.findFirst5ByIsCompletedFalseOrderByCreatedAtDesc().stream().map(task -> convertToDto(task)).collect(Collectors.toList());
    }

    public TaskResponseDTO createTask(CreateTaskRequestDTO request){
        Task nt = new Task();
        nt.setTitle(request.title());
        nt.setDescription(request.description());
        Task saved = taskRepository.save(nt);
        return convertToDto(saved);
    }

    public TaskResponseDTO markAsComplete(UUID id) throws RuntimeException{
        Task t = taskRepository.findById(id).orElseThrow(()-> new RuntimeException("Task Not Found"));
        t.setIsCompleted(true);
        Task updateTask = taskRepository.save(t);
        return convertToDto(updateTask);
    }

    public TaskResponseDTO updateTask(UpdateTaskDTO task){
        Task t = taskRepository.findById(task.id()).orElseThrow(()->new RuntimeException("Task Not Found"));
        t.setTitle(task.title());
        t.setDescription(task.description());
        Task updatedTask = taskRepository.save(t);
        return convertToDto(updatedTask);
    }

    public TaskResponseDTO findTask(UUID id){
        Task t = taskRepository.findById(id).orElseThrow(()-> new RuntimeException("Task Not Found"));
        return convertToDto(t);
    }

    private TaskResponseDTO convertToDto(Task t){
        return  new TaskResponseDTO(
                t.getId(),
                t.getTitle(),
                t.getDescription(),
                t.getIsCompleted(),
                t.getCreatedAt());
    }
}
