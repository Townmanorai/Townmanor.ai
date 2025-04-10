import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://www.townmanor.ai'; // Update this to your backend URL

const TaskForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignee: 'ravindra', // Set default value
        status: 'todo',
        priority: 'medium'
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form data
        if (!formData.title.trim() || !formData.description.trim() || !formData.assignee) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/crm/tasks`, formData);
            console.log('Task created:', response.data);
            setFormData({ 
                title: '', 
                description: '', 
                assignee: 'ravindra',
                status: 'todo',
                priority: 'medium'
            });
            alert('Task created successfully!');
        } catch (error) {
            console.error('Error creating task:', error);
            setError(error.response?.data?.details || 'Failed to create task');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user makes changes
    };

    return (
        <form className="TaskForm_container" onSubmit={handleSubmit}>
            {error && <div className="TaskForm_error">{error}</div>}
            
            <div className="TaskForm_field">
                <label className="TaskForm_label">Title *</label>
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
                <label className="TaskForm_label">Description *</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="TaskForm_textarea"
                    required
                />
            </div>
            <div className="TaskForm_field">
                <label className="TaskForm_label">Assignee *</label>
                <select
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="TaskForm_select"
                    required
                >
                    <option value="ravindra">Ravindra</option>
                    <option value="sunny">Sunny</option>
                    <option value="ayush">Ayush</option>
                </select>
            </div>
            <div className="TaskForm_field">
                <label className="TaskForm_label">Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="TaskForm_select"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit" className="TaskForm_button">Submit Task</button>
        </form>
    );
};

export default TaskForm;
