import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stack,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import { taskSchema, taskDefaultValues } from "../utils/TaskFormValidations";
import AxiosConfig from "../config/AxiosConfig";
import { useData } from "../contextProviders.tsx/DataContext";
import { useEffect, useState } from "react";
import { useSnackbar } from "../contextProviders.tsx/SnackbarContext";

const TaskForm = () => {
  const { triggerRefresh, taskId, setEditTaskId } = useData();
  const { showMessage } = useSnackbar();

  const [isLoadingData, setIsLoadingData] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: taskDefaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (taskId) {
      await AxiosConfig.put(`/tasks/update`, data)
        .then(() => {
          setEditTaskId(null);
          reset(taskDefaultValues);
          showMessage("Task updated successfully");
          triggerRefresh();
        })
        .catch(() => {
          showMessage("Failed to update task");
        });
    } else {
      await AxiosConfig.post("/tasks", data)
        .then(() => {
          reset();
          showMessage("New task added successfully");
          triggerRefresh();
        })
        .catch(() => {
          showMessage("Failed to add new task");
        });
    }
  };

  useEffect(() => {
    if (taskId) {
      // eslint-disable-next-line
      setIsLoadingData(true);

      AxiosConfig.get(`/tasks/${taskId}`)
        .then((response) => {
          const { id, title, description } = response.data;
          reset({ id, title, description });
        })
        .catch((error) => {
          console.error("Failed to fetch task", error);
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    } else {
      setIsLoadingData(false);
      reset(taskDefaultValues);
    }
  }, [taskId, reset]);

  const cancelEdit = () => {
    setEditTaskId(null);
    reset(taskDefaultValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ height: "100%" }}
      noValidate
    >
      <Stack spacing={2} sx={{ p: 3, height: "100%" }}>
        {isLoadingData ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              {taskId ? "Edit Task" : "Create New Task"}
            </Typography>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Title"
                  placeholder="e.g., 'Daily Standup Meeting'"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={5}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </>
        )}

        {taskId && !isLoadingData && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => cancelEdit()}
            disabled={isSubmitting}
            fullWidth
          >
            Cancel Edit
          </Button>
        )}

        {!isLoadingData && (
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? (
              <>
                <Typography sx={{ mr: 1 }}>
                  {taskId ? "Updating..." : "Adding new task..."}
                </Typography>
                <CircularProgress size={24} color="inherit" />
              </>
            ) : taskId ? (
              "Save Changes"
            ) : (
              "Create Task +"
            )}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default TaskForm;
