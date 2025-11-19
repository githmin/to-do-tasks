import { createContext, useContext } from "react";

export interface DataContextType {
  refreshKey: number;
  triggerRefresh: () => void;
  taskId: string | null;
  setEditTaskId: (id: string | null) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
