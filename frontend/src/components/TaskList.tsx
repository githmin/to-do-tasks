import { Card } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const tasks = [
    {
      id: "1a2b3c4d-1111-2222-3333-444455556666",
      title: "Buy groceries",
      description:
        "Milk, eggs, bread, butter, cheese, fruits, vegetables, pasta, rice, and any other essentials needed for the week. Check for discounts on dairy products.",
      isCompleted: false,
      createdAt: "2025-11-18T22:54:54.734788",
    },
    {
      id: "2b3c4d5e-aaaa-bbbb-cccc-ddddeeeeffff",
      title: "Finish project report",
      description:
        "Complete the project summary, attach all diagrams, charts, and appendices. Proofread the entire document, ensure formatting is consistent, and submit before the deadline.",
      isCompleted: false,
      createdAt: "2025-11-18T23:10:10.123456",
    },
    {
      id: "3c4d5e6f-1234-5678-9abc-def012345678",
      title: "Call the bank",
      description:
        "Contact the bank to inquire about credit card upgrade options, new offers, interest rates, and reward programs. Confirm any fees and eligibility requirements.",
      isCompleted: false,
      createdAt: "2025-11-18T23:11:22.987654",
    },
    {
      id: "4d5e6f70-9999-8888-7777-666655554444",
      title: "Clean workspace",
      description:
        "Organize the desk, tidy up cables, clean the keyboard and monitor, sort documents into folders, declutter drawers, and make sure the workspace is neat and inspiring for work.",
      isCompleted: false,
      createdAt: "2025-11-18T23:12:38.543210",
    },
    {
      id: "5e6f7081-ffee-ddcc-bbaa-001122334455",
      title: "Workout",
      description:
        "Do a 45-minute cardio session including warm-up and cool-down. Include jogging, jump rope, or cycling. Track heart rate and ensure hydration during and after exercise.",
      isCompleted: false,
      createdAt: "2025-11-18T23:13:59.111111",
    },
  ];

  return (
    <Card
      sx={{
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
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Card>
  );
};

export default TaskList;
