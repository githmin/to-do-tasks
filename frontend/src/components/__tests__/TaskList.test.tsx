import { render, screen, waitFor } from "@testing-library/react";
import TaskList from "../TaskList";
import { vi } from "vitest";
import AxiosConfig from "../../config/AxiosConfig";
import * as DataContext from "../../contextProviders.tsx/DataContext";
import type { Task } from "../../interfaces/TaskType";

vi.mock("../../config/AxiosConfig");

vi.spyOn(DataContext, "useData").mockReturnValue({
  refreshKey: 0,
  triggerRefresh: vi.fn(),
  taskId: null,
  setEditTaskId: vi.fn(),
});

vi.mock("../TaskCard", () => ({
  default: ({ task }: { task: Task }) => (
    <div data-testid="mock-task-card">{task.title}</div>
  ),
}));

describe("TaskList", () => {
  test("renders loading state", () => {
    vi.mocked(AxiosConfig.get).mockReturnValue(new Promise(() => {}));

    render(<TaskList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders tasks list after fetch", async () => {
    const taskList = [
      { id: "1", title: "T A", description: "A" },
      { id: "2", title: "T B", description: "B" },
    ];

    vi.mocked(AxiosConfig.get).mockResolvedValue({ data: taskList });

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getAllByTestId("mock-task-card")).toHaveLength(2);
      expect(screen.getByText("T A")).toBeInTheDocument();
      expect(screen.getByText("T B")).toBeInTheDocument();
    });
  });

  test("renders empty message when no tasks found", async () => {
    vi.mocked(AxiosConfig.get).mockResolvedValue({ data: [] });

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("No tasks available.")).toBeInTheDocument();
    });
  });
});
