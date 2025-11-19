import { useState, type ReactNode } from "react";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [taskId, setTaskId] = useState<string | null>(null);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const setEditTaskId = (id: string | null) => {
    setTaskId(id);
  };

  return (
    <DataContext.Provider
      value={{ refreshKey, triggerRefresh, taskId, setEditTaskId }}
    >
      {children}
    </DataContext.Provider>
  );
};
