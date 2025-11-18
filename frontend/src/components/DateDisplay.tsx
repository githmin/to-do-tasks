import { Typography, Box, Paper, Stack } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const DateDisplay = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: "#f1f5f9",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CalendarTodayIcon />
      </Box>

      <Stack>
        <Typography
          variant="h6"
          fontWeight={600}
          lineHeight={1.2}
          sx={{ letterSpacing: "-0.025em" }}
        >
          Today is{" "}
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's your task overview for today.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DateDisplay;
