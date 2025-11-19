import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { vi } from "vitest";
import AxiosConfig from "../../config/AxiosConfig";
import * as DataContext from "../../contextProviders.tsx/DataContext";
import * as SnackbarContext from "../../contextProviders.tsx/SnackbarContext";

vi.mock("../../config/AxiosConfig");

const mockTriggerRefresh = vi.fn();
const mockSetEditTaskId = vi.fn();
const mockShowMessage = vi.fn();

vi.spyOn(DataContext, "useData").mockReturnValue({
  refreshKey: 0,
  taskId: null,
  triggerRefresh: mockTriggerRefresh,
  setEditTaskId: mockSetEditTaskId,
});

vi.spyOn(SnackbarContext, "useSnackbar").mockReturnValue({
  showMessage: mockShowMessage,
});

const mockTask = {
  id: "8237b9a6-53e8-4551-9249-3211d579a02a",
  title: "Task 1",
  description: "Urgent Test",
  createdAt: new Date().toISOString(),
  isCompleted: false,
};

describe("TaskCard Component", () => {
  test("Renders task title and description", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Urgent Test")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("Handles Mark as Complete action", async () => {
    // (AxiosConfig.patch as any).mockResolvedValue({ data: {} });
    vi.mocked(AxiosConfig.patch).mockResolvedValue({ data: [] });

    render(<TaskCard task={mockTask} />);

    const completeBtn = screen.getByRole("button", {
      name: /mark as complete/i,
    });
    fireEvent.click(completeBtn);

    expect(AxiosConfig.patch).toHaveBeenCalledWith(
      "/tasks/8237b9a6-53e8-4551-9249-3211d579a02a/complete"
    );

    await waitFor(() => {
      expect(mockTriggerRefresh).toHaveBeenCalled();
      expect(mockShowMessage).toHaveBeenCalledWith("Task 1 marked as complete");
    });
  });

  test("Handles Edit action", () => {
    render(<TaskCard task={mockTask} />);

    const editBtn = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editBtn);

    expect(mockSetEditTaskId).toHaveBeenCalledWith(
      "8237b9a6-53e8-4551-9249-3211d579a02a"
    );
  });
});
