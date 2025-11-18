package com.assessment.to_do_webapp.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskResponseDTO(
        UUID id,
        String title,
        String description,
        boolean isCompleted,
        LocalDateTime createdAt)
{}

