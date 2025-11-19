package com.assessment.to_do_webapp;

import com.assessment.to_do_webapp.controllers.TaskController;
import com.assessment.to_do_webapp.dto.CreateTaskRequestDTO;
import com.assessment.to_do_webapp.dto.TaskResponseDTO;
import com.assessment.to_do_webapp.dto.UpdateTaskDTO;
import com.assessment.to_do_webapp.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    private TaskResponseDTO createMockResponse(UUID id, String title, boolean isCompleted) {
        return new TaskResponseDTO(id, title, "Description", isCompleted, LocalDateTime.now());
    }

    @Test
    void shouldGetTaskById() throws Exception {
        UUID id = UUID.randomUUID();
        TaskResponseDTO mockResponse = createMockResponse(id, "Test Task", false);

        given(taskService.findTask(id)).willReturn(mockResponse);

        mockMvc.perform(get("/api/tasks/{id}", id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void shouldGetRecentTasks() throws Exception {
        List<TaskResponseDTO> mockList = List.of(
                createMockResponse(UUID.randomUUID(), "Task 1", false),
                createMockResponse(UUID.randomUUID(), "Task 2", false)
        );

        given(taskService.getMostRecent5IncompletedTasks()).willReturn(mockList);

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Task 1"));    }

    @Test
    void shouldCreateTask() throws Exception {
        CreateTaskRequestDTO request = new CreateTaskRequestDTO("New Task", "Desc");
        TaskResponseDTO response = createMockResponse(UUID.randomUUID(), "New Task", false);

        given(taskService.createTask(any(CreateTaskRequestDTO.class))).willReturn(response);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Task"));
    }

    @Test
    void shouldUpdateTask() throws Exception {
        UUID id = UUID.randomUUID();
        UpdateTaskDTO updateRequest = new UpdateTaskDTO(id, "Updated Title", "Updated Desc");
        TaskResponseDTO response = createMockResponse(id, "Updated Title", true);

        given(taskService.updateTask(any(UpdateTaskDTO.class))).willReturn(response);

        mockMvc.perform(put("/api/tasks/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Title"))
                .andExpect(jsonPath("$.isCompleted").value(true));
    }

    @Test
    void shouldMarkTaskAsComplete() throws Exception {
        UUID id = UUID.randomUUID();
        TaskResponseDTO response = createMockResponse(id, "Completed Task", true);

        given(taskService.markAsComplete(id)).willReturn(response);

        mockMvc.perform(patch("/api/tasks/{id}/complete", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isCompleted").value(true));

        verify(taskService).markAsComplete(id);
    }
}