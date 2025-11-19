package com.assessment.to_do_webapp;

import com.assessment.to_do_webapp.dto.TaskResponseDTO;
import com.assessment.to_do_webapp.model.Task;
import com.assessment.to_do_webapp.repository.TaskRepository;
import com.assessment.to_do_webapp.service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
        import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldFindTaskById() {
        UUID id = UUID.randomUUID();
        Task task = new Task();
        task.setId(id);
        task.setTitle("Test Task");

        when(taskRepository.findById(id)).thenReturn(Optional.of(task));

        TaskResponseDTO result = taskService.findTask(id);

        assertNotNull(result);
        assertEquals("Test Task", result.title());
        verify(taskRepository).findById(id);
    }

    @Test
    void shouldThrowExceptionWhenTaskNotFound() {
        UUID id = UUID.randomUUID();
        when(taskRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> taskService.findTask(id));
    }
}