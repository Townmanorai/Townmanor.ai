import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.townmanor.ai/api/crm/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Define a ranking: high > medium > low.
  const priorityRank = {
    high: 3,
    medium: 2,
    low: 1
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (!draggedTask) return;

    try {
      await axios.put(`https://www.townmanor.ai/api/crm/tasks/${draggedTask.id}/status`, {
        status: newStatus
      });
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggedTask.id 
            ? { ...task, status: newStatus }
            : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err);
      setError(err.response?.data?.error || 'Failed to update task status');
    }
    
    setDraggedTask(null);
  };

  const statusColumns = {
    todo: 'To Do',
    doing: 'In Progress',
    completed: 'Completed'
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'KanbanBoard_statusTodo';
      case 'doing':
        return 'KanbanBoard_statusDoing';
      case 'completed':
        return 'KanbanBoard_statusCompleted';
      default:
        return '';
    }
  };

  return (
    <div className="KanbanBoard_container">
      {error && <div className="KanbanBoard_error">{error}</div>}

      <div className="KanbanBoard_columns">
        {Object.entries(statusColumns).map(([status, title]) => (
          <div
            key={status}
            className="KanbanBoard_column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className={`KanbanBoard_columnHeader ${getStatusClass(status)}`}>
              <h3>{title}</h3>
              <span className="KanbanBoard_count">
                {tasks.filter(task => task.status === status).length}
              </span>
            </div>

            <div className="KanbanBoard_tasks">
              {loading ? (
                <div className="KanbanBoard_loading">Loading...</div>
              ) : (
                tasks
                  .filter(task => task.status === status)
                  // First sort by priority (high > medium > low), then by created_at (latest first)
                  .sort((a, b) => (
                    (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0) ||
                    new Date(b.created_at) - new Date(a.created_at)
                  ))
                  .map(task => (
                    <div
                      key={task.id}
                      className="KanbanBoard_task"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                    >
                      <h4 className="KanbanBoard_taskTitle">{task.title}</h4>
                      <p className="KanbanBoard_taskDescription">{task.description}</p>
                      <div className="KanbanBoard_taskFooter">
                        <span className="KanbanBoard_taskAssignee">{task.assignee}</span>
                        <span className="KanbanBoard_taskDate">
                          {new Date(task.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="KanbanBoard_taskPriority">
                        Priority: {task.priority || 'medium'}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
