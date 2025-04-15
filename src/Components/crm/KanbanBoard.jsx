import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './KanbanBoard.css';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [draggedTask, setDraggedTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [currentUser] = useState('sapna');

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

    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = hash % 360;
        return `hsl(${hue}, 70%, 80%)`;
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

        const timestamp = new Date().toISOString();
        const historyEntry = {
            fromStatus: draggedTask.status,
            toStatus: newStatus,
            timestamp: timestamp
        };

        try {
            // Send only the status to avoid backend incompatibility
            await axios.put(`https://www.townmanor.ai/api/crm/tasks/${draggedTask.id}/status`, {
                status: newStatus,
                changed_by: currentUser
            });

            // Update local state with history for frontend display only
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === draggedTask.id
                        ? { 
                            ...task, 
                            status: newStatus,
                            history: [...(task.history || []), historyEntry]
                        }
                        : task
                )
            );
        } catch (err) {
            console.error('Error updating task status:', err);
            setError(err.response?.data?.error || 'Failed to update task status');
        }

        setDraggedTask(null);
    };

    const handlePriorityChange = async (taskId, newPriority) => {
        try {
            await axios.put(`https://www.townmanor.ai/api/crm/tasks/${taskId}/priority`, {
                priority: newPriority
            });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId
                        ? { ...task, priority: newPriority }
                        : task
                )
            );
        } catch (err) {
            console.error('Error updating task priority:', err);
            setError(err.response?.data?.error || 'Failed to update task priority');
        }
    };

    const handleProgressChange = async (taskId, newProgress) => {
        try {
            await axios.put(`https://www.townmanor.ai/api/crm/tasks/${taskId}/progress`, {
                progress: parseInt(newProgress)
            });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId
                        ? { ...task, progress: parseInt(newProgress) }
                        : task
                )
            );
        } catch (err) {
            console.error('Error updating task progress:', err);
            setError(err.response?.data?.error || 'Failed to update task progress');
        }
    };

    // Mapping status values to header colors
    const statusColumns = {
        todo: 'To Do',
        doing: 'In Progress',
        testing: 'Testing',
        completed: 'Completed'
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'todo':
                return 'KanbanBoard_statusTodo';
            case 'doing':
                return 'KanbanBoard_statusDoing';
            case 'testing':
                return 'KanbanBoard_statusTesting';
            case 'completed':
                return 'KanbanBoard_statusCompleted';
            default:
                return '';
        }
    };

    // Determines the class for priority badge
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return 'priority-medium';
        }
    };

    const TaskHistory = ({ task }) => {
        if (!task.history || task.history.length === 0) {
            return <div className="KanbanBoard_noHistory">No history available</div>;
        }

        return (
            <div className="KanbanBoard_history">
                <h4>Task History</h4>
                <ul>
                    {task.history.map((entry, index) => (
                        <li key={index}>
                            {new Date(entry.timestamp).toLocaleString()} - 
                            Moved from {entry.fromStatus} to {entry.toStatus}
                        </li>
                    ))}
                </ul>
            </div>
        );
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
                                    // Sort by priority first, then by creation date (latest first)
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
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setShowHistory(true);
                                            }}
                                        >
                                            <div className="KanbanBoard_taskHeaderRow">
                                                <p className="KanbanBoard_taskTitle">{task.title}</p>
                                                <div className="KanbanBoard_taskAssignees">
                                                    {Array.isArray(task.assignee)
                                                        ? task.assignee.map((person, index) => (
                                                            <span
                                                                key={index}
                                                                className="KanbanBoard_taskAssignee"
                                                                style={{ backgroundColor: stringToColor(person) }}
                                                            >
                                                                {person}
                                                            </span>
                                                        ))
                                                        : (
                                                            <span
                                                                className="KanbanBoard_taskAssignee"
                                                                style={{ backgroundColor: stringToColor(task.assignee) }}
                                                            >
                                                                {task.assignee}
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                            <p className="KanbanBoard_taskDescription">{task.description}</p>

                                            {/* Priority Selection Dropdown */}
                                            <div className="KanbanBoard_prioritySelector">
                                                <label>Priority:</label>
                                                <select
                                                    value={task.priority || 'medium'}
                                                    onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                                                    className="KanbanBoard_prioritySelect"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="KanbanBoard_progressContainer">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={task.progress || 0}
                                                    onChange={(e) => handleProgressChange(task.id, e.target.value)}
                                                    className="KanbanBoard_progressSlider"
                                                />
                                                <span className="KanbanBoard_progressText">{task.progress || 0}%</span>
                                            </div>

                                            {/* Tester Info */}
                                            {task.status === 'testing' && task.tester && (
                                                <div className="KanbanBoard_tester">
                                                    <span className="KanbanBoard_testerLabel">Tester:</span>
                                                    <span className="KanbanBoard_testerName">{task.tester}</span>
                                                </div>
                                            )}

                                            <div className="KanbanBoard_taskFooter">
                                                <div className="KanbanBoard_taskDetails">
                                                    <span className="KanbanBoard_taskDate">
                                                        {new Date(task.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <span className={`KanbanBoard_taskPriority ${getPriorityClass(task.priority)}`}>
                                                    {task.priority ? task.priority.toUpperCase() : 'MEDIUM'}
                                                </span>
                                            </div>
                                        </div>

                                    ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Task History Modal */}
            {showHistory && selectedTask && (
                <div className="KanbanBoard_modal">
                    <div className="KanbanBoard_modalContent">
                        <h3>{selectedTask.title}</h3>
                        <TaskHistory task={selectedTask} />
                        <button 
                            className="KanbanBoard_closeButton"
                            onClick={() => {
                                setShowHistory(false);
                                setSelectedTask(null);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KanbanBoard;
