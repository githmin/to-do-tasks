import { Card, CircularProgress } from "@mui/material";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import AxiosConfig from "../config/AxiosConfig";
import { useData } from "../contextProviders.tsx/DataContext";

const TaskList = () => {
  const { refreshKey } = useData();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      await AxiosConfig.get("/tasks")
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchTasks();
  }, [refreshKey]);

  return (
    <Card sx={cardStyleProps}>
      {loading ? (
        <Card sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Card>
      ) : tasks.length === 0 ? (
        <div>No tasks available.</div>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </Card>
  );
};

const cardStyleProps = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxHeight: "88vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    bgcolor: "background.default",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "text.secondary",
    borderRadius: "10px",
    border: "2px solid background.default",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    bgcolor: "text.primary",
  },
};

export default TaskList;
