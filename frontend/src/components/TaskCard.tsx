import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import AxiosConfig from "../config/AxiosConfig";
import { useData } from "../contextProviders.tsx/DataContext";
import { useSnackbar } from "../contextProviders.tsx/SnackbarContext";
import type { Task } from "../interfaces/TaskType";

const TaskCard = ({ task }: { task: Task }) => {
  const { triggerRefresh, setEditTaskId } = useData();
  const { showMessage } = useSnackbar();

  const handleComplete = async () => {
    await AxiosConfig.patch(`/tasks/${task.id}/complete`)
      .then(() => {
        triggerRefresh();
        showMessage(task.title + " marked as complete");
      })
      .catch(() => {
        showMessage("Error marking task as complete");
      });
  };

  const handleEdit = () => {
    setEditTaskId(task.id);
  };

  return (
    <Card sx={taskCardStyles.card}>
      <CardContent sx={{ p: 2, pb: 1.5 }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={taskCardStyles.subtitleText}
              >
                {task.title} &nbsp;
                <Chip
                  label={"Pending"}
                  size="small"
                  variant="outlined"
                  sx={taskCardStyles.pendingChip}
                />
              </Typography>

              <Typography variant="caption" fontWeight={500} pr={1}>
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <CardContent sx={{ pt: 0, pb: 2, minHeight: 85 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={taskCardStyles.descriptionText}
        >
          {task.description}
        </Typography>
      </CardContent>

      <CardActions sx={taskCardStyles.cardActions}>
        <Button
          variant="contained"
          sx={taskCardStyles.button}
          onClick={() => handleEdit()}
        >
          <EditOutlinedIcon sx={taskCardStyles.Icon} />
          Edit
        </Button>
        <Button
          variant="contained"
          sx={taskCardStyles.button}
          onClick={() => handleComplete()}
        >
          <DoneOutlineOutlinedIcon sx={taskCardStyles.Icon} />
          Mark as Complete
        </Button>
      </CardActions>
    </Card>
  );
};

const taskCardStyles = {
  card: {
    width: "100%",
    // maxWidth: 500,
    minHeight: 190,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "text.secondary",
    },
  },
  pendingChip: {
    height: 22,
    fontSize: "0.7rem",
    fontWeight: 500,
    borderColor: "divider",
    color: "text.secondary",
  },
  descriptionText: {
    lineHeight: 1.6,
    // mb: 2,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardActions: {
    p: 3,
    pt: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    height: 35,
    fontSize: "0.875rem",
  },
  Icon: { mr: 0.5, fontSize: "1rem" },
  subtitleText: { lineHeight: 1.5, letterSpacing: "-0.025em" },
};

export default TaskCard;
