import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([]);
    const assignees = ['ravindra', 'sunny', 'ayush'];
    const statuses = ['todo', 'doing', 'completed'];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/crm/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(`/api/crm/tasks/${taskId}/status`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const renderTaskCard = (task) => (
        <div key={task.id} className="KanbanBoard_card">
            <h3 className="KanbanBoard_cardTitle">{task.title}</h3>
            <p className="KanbanBoard_cardDescription">{task.description}</p>
            <div className="KanbanBoard_cardStatus">
                {statuses.map((status) => (
                    <button
                        key={status}
                        className={`KanbanBoard_statusButton ${task.status === status ? 'active' : ''}`}
                        onClick={() => handleStatusChange(task.id, status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="KanbanBoard_container">
            {assignees.map((assignee) => (
                <div key={assignee} className="KanbanBoard_column">
                    <h2 className="KanbanBoard_columnTitle">
                        {assignee.charAt(0).toUpperCase() + assignee.slice(1)}
                    </h2>
                    <div className="KanbanBoard_tasks">
                        {tasks
                            .filter((task) => task.assignee === assignee)
                            .map(renderTaskCard)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard; 