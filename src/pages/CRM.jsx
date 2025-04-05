import React from 'react';
import TaskForm from '../Components/crm/TaskForm';
import KanbanBoard from '../Components/crm/KanbanBoard';
import '../styles/CRM.css';

const CRM = () => {
    return (
        <div className="CRM_container">
            <h1 className="CRM_title">CRM Management</h1>
            <div className="CRM_content">
                <div className="CRM_formSection">
                    <h2 className="CRM_sectionTitle">Create New Task</h2>
                    <TaskForm />
                </div>
                <div className="CRM_boardSection">
                    <h2 className="CRM_sectionTitle">Task Board</h2>
                    <KanbanBoard />
                </div>
            </div>
        </div>
    );
};

export default CRM; 