import { useState } from "react";
import { Stack, TextField, Typography, Button, Box } from "@mui/material";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  return (
    <Box component="form" sx={{ height: "100%" }}>
      <Stack spacing={2} sx={{ p: 3, height: "100%" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ mb: 1, color: "text.primary" }}
        >
          Create New Task
        </Typography>

        <TextField
          name="title"
          placeholder="Task title (e.g., 'Daily Standup Meeting')"
          value={task.title}
          fullWidth
          required
        />

        <TextField
          name="description"
          placeholder="Add a detailed description or notes..."
          multiline
          rows={5}
          value={task.description}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!task.title}
          fullWidth
        >
          Create Task +
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
