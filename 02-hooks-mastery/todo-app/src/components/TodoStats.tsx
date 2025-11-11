import { memo, useState } from "react";
import { useTodoStats } from "../hooks/useTodoStats";
import type { Todo } from "../types/todo";

interface TodoStatsProps {
  todos: Todo[];
  onRefresh: () => void;
}

function TodoStats({ todos, onRefresh }: TodoStatsProps) {
  const stats = useTodoStats(todos);
  const [showStats, setShowStats] = useState<boolean>(false);

  console.log("TodoStats rendered");

  if (!showStats) {
    return (
      <div className="stats-panel">
        <button onClick={() => setShowStats(true)}>Show Stats</button>
      </div>
    );
  }

  return (
    <div className="stats-panel">
      <h3>Statistics</h3>
      <p>Total: {stats.total}</p>
      <p>
        Completed: {stats.completed} ({stats.completedPercentage.toFixed(1)}%)
      </p>
      <p>Avg Title Length: {stats.avgTitleLength.toFixed(1)} chars</p>
      <button onClick={onRefresh}>Refresh Stats</button>
      <button onClick={() => setShowStats(false)}>Hide stats</button>
    </div>
  );
}

export default memo(TodoStats);
