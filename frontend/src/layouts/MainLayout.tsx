import { Box } from "@mui/material";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DateDisplay from "../components/DateDisplay";

const MainLayout = () => {
  return (
    <Box sx={mainLayoutStyles.container}>
      <Box sx={mainLayoutStyles.leftPanel}>
        <DateDisplay />
        <TaskForm />
      </Box>

      <Box sx={mainLayoutStyles.rightPanel}>
        <TaskList />
      </Box>
    </Box>
  );
};

const mainLayoutStyles = {
  container: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 3,
    p: 3,
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
  },
  leftPanel: {
    flexShrink: 0,
    width: { xs: "100%", md: "50%" },
  },
  rightPanel: {
    flexGrow: 1,
  },
};

export default MainLayout;
