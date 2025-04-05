import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: 'ravindra'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/crm/tasks', formData);
            setFormData({ title: '', description: '', assignee: 'ravindra' });
            alert('Task created successfully!');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className="TaskForm_container" onSubmit={handleSubmit}>
            <div className="TaskForm_field">
                <label className="TaskForm_label">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="TaskForm_input"
                    required
                />
            </div>
            <div className="TaskForm_field">
                <label className="TaskForm_label">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="TaskForm_textarea"
                    required
                />
            </div>
            <div className="TaskForm_field">
                <label className="TaskForm_label">Assignee</label>
                <select
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="TaskForm_select"
                >
                    <option value="ravindra">Ravindra</option>
                    <option value="sunny">Sunny</option>
                    <option value="ayush">Ayush</option>
                </select>
            </div>
            <button type="submit" className="TaskForm_button">Submit Task</button>
        </form>
    );
};

export default TaskForm; 