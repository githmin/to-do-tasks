import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../TaskForm";
import { vi } from "vitest";
import AxiosConfig from "../../config/AxiosConfig";
import * as DataContext from "../../contextProviders.tsx/DataContext";
import * as SnackbarContext from "../../contextProviders.tsx/SnackbarContext";

vi.mock("../../config/AxiosConfig");

const mockTriggerRefresh = vi.fn();
const mockSetEditTaskId = vi.fn();
const mockShowMessage = vi.fn();

const mockUseData = vi.spyOn(DataContext, "useData");
vi.spyOn(SnackbarContext, "useSnackbar").mockReturnValue({
  showMessage: mockShowMessage,
});

describe("TaskForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseData.mockReturnValue({
      refreshKey: 0,
      triggerRefresh: mockTriggerRefresh,
      taskId: null,
      setEditTaskId: mockSetEditTaskId,
    });
  });

  test("Shows validation error if title is empty on submit", async () => {
    render(<TaskForm />);

    const submitBtn = screen.getByRole("button", { name: /create task/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
    expect(AxiosConfig.post).not.toHaveBeenCalled();
  });

  test("Submits new task successfully", async () => {
    vi.mocked(AxiosConfig.post).mockResolvedValue({ data: [] });

    const user = userEvent.setup();

    render(<TaskForm />);

    const titleInput = screen.getByLabelText(/task title/i);
    const descInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "New Task");
    await user.type(descInput, "Testing Description");

    const submitBtn = screen.getByRole("button", { name: /create task/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(AxiosConfig.post).toHaveBeenCalledWith("/tasks", {
        id: "",
        title: "New Task",
        description: "Testing Description",
      });
      expect(mockShowMessage).toHaveBeenCalledWith(
        "New task added successfully"
      );
      expect(mockTriggerRefresh).toHaveBeenCalled();
    });
  });

  test("Loads data n updates task in Edit Mode", async () => {
    mockUseData.mockReturnValue({
      refreshKey: 0,
      triggerRefresh: mockTriggerRefresh,
      taskId: "8237b9a6-53e8-4551-9249-3211d579a02a ",
      setEditTaskId: mockSetEditTaskId,
    });

    vi.mocked(AxiosConfig.get).mockResolvedValue({
      data: {
        id: "8237b9a6-53e8-4551-9249-3211d579a02a ",
        title: "Existing Task",
        description: "Desc",
      },
    });

    vi.mocked(AxiosConfig.put).mockResolvedValue({ data: [] });

    render(<TaskForm />);

    expect(
      await screen.findByDisplayValue("Existing Task")
    ).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/task title/i);
    fireEvent.change(titleInput, { target: { value: "Updated title" } });

    const saveBtn = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(AxiosConfig.put).toHaveBeenCalledWith("/tasks/update", {
        id: "8237b9a6-53e8-4551-9249-3211d579a02a ",
        title: "Updated title",
        description: "Desc",
      });
      expect(mockSetEditTaskId).toHaveBeenCalledWith(null);
    });
  });
});
