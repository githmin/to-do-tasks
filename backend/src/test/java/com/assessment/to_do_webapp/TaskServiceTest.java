package com.assessment.to_do_webapp;

import com.assessment.to_do_webapp.dto.CreateTaskRequestDTO;
import com.assessment.to_do_webapp.dto.TaskResponseDTO;
import com.assessment.to_do_webapp.dto.UpdateTaskDTO;
import com.assessment.to_do_webapp.model.Task;
import com.assessment.to_do_webapp.repository.TaskRepository;
import com.assessment.to_do_webapp.service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void createTaskShouldMapFieldsAndPersist() {
        CreateTaskRequestDTO request = new CreateTaskRequestDTO("Task 1", "Urgent");

        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task t = invocation.getArgument(0);
            t.setId(UUID.randomUUID());
            t.setCreatedAt(LocalDateTime.now());
            return t;
        });

        TaskResponseDTO response = taskService.createTask(request);

        assertThat(response.title()).isEqualTo("Task 1");

        ArgumentCaptor<Task> taskCaptor = ArgumentCaptor.forClass(Task.class);
        verify(taskRepository).save(taskCaptor.capture());
        Task capturedTask = taskCaptor.getValue();

        assertThat(capturedTask.getTitle()).isEqualTo("Task 1");
        assertThat(capturedTask.getDescription()).isEqualTo("Urgent");
        assertThat(capturedTask.getIsCompleted()).isFalse();
    }

    @Test
    void markAsCompleteShouldUpdateStatusWhenTaskExists() {
        UUID id = UUID.randomUUID();
        Task existingTask = new Task();
        existingTask.setId(id);
        existingTask.setIsCompleted(false);

        when(taskRepository.findById(id)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        TaskResponseDTO response = taskService.markAsComplete(id);

        assertThat(response.isCompleted()).isTrue();

        verify(taskRepository).save(existingTask);
        assertThat(existingTask.getIsCompleted()).isTrue();
    }

    @Test
    void markAsCompleteShouldThrowExceptionWhenTaskNotFound() {
        UUID id = UUID.randomUUID();
        when(taskRepository.findById(id)).thenReturn(Optional.empty());
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                taskService.markAsComplete(id)
        );
        assertThat(exception.getMessage()).isEqualTo("Task Not Found");
        verify(taskRepository, never()).save(any());
    }

    @Test
    void getMostRecent5IncompletedTasksShouldTransformEntitiesToDTOs() {
        Task t1 = new Task(); t1.setId(UUID.randomUUID()); t1.setTitle("A");
        Task t2 = new Task(); t2.setId(UUID.randomUUID()); t2.setTitle("B");

        when(taskRepository.findFirst5ByIsCompletedFalseOrderByCreatedAtDesc())
                .thenReturn(List.of(t1, t2));

        List<TaskResponseDTO> results = taskService.getMostRecent5IncompletedTasks();

        assertThat(results).hasSize(2);
        assertThat(results.get(0).title()).isEqualTo("A");
        assertThat(results.get(1).title()).isEqualTo("B");
    }

    @Test
    void updateTaskSuccessShouldReturnUpdatedDto() {
        UUID taskId = UUID.randomUUID();
        LocalDateTime createdDate = LocalDateTime.now();

        Task existingTask = new Task();
        existingTask.setId(taskId);
        existingTask.setTitle("Old Title");
        existingTask.setDescription("Old Description");
        existingTask.setIsCompleted(false);
        existingTask.setCreatedAt(createdDate);

        UpdateTaskDTO updateDto = new UpdateTaskDTO(taskId, "Updated", "Updated");

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));

        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskResponseDTO result = taskService.updateTask(updateDto);
        assertNotNull(result);
        assertEquals("Updated", result.title());
        assertEquals("Updated", result.description());
        assertEquals(taskId, result.id());
        assertEquals(createdDate, result.createdAt());

        verify(taskRepository).findById(taskId);
        verify(taskRepository).save(existingTask);
    }

    @Test
    void updateTaskNotFoundShouldThrowException() {
        UUID nonExistentId = UUID.randomUUID();
        UpdateTaskDTO updateDto = new UpdateTaskDTO(nonExistentId, "Title", "Desc");

        when(taskRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskService.updateTask(updateDto);
        });

        assertEquals("Task Not Found", exception.getMessage());

        verify(taskRepository).findById(nonExistentId);
        verify(taskRepository, never()).save(any());
    }
}