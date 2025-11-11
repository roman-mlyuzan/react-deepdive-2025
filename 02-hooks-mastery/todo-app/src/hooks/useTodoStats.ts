import { useMemo } from "react";
import type { Todo } from "../types/todo";

export function useTodoStats(todos: Todo[]) {
  return useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const completedPercentage = total ? (completed / total) * 100 : 0;
    const avgTitleLength = total
      ? todos.reduce((sum, t) => sum + t.title.length, 0) / total
      : 0;

    return {
      total,
      completed,
      completedPercentage,
      avgTitleLength,
    };
  }, [todos]);
}
