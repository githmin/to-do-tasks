package com.assessment.to_do_webapp.dto;

import java.util.UUID;

public record UpdateTaskDTO(UUID id, String title, String description) {}

