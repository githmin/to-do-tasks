import { Box } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DateDisplay from "../components/DateDisplay";

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        p: 3,
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: "100%", md: "50%" },
        }}
      >
        <DateDisplay />
        <TaskForm />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <TaskList />
      </Box>
    </Box>
  );
};

export default MainLayout;
