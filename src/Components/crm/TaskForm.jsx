import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: 'ravindra',
    customAssignee: '', // For when the user selects "Other"
    status: 'todo',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Use customAssignee if "other" is selected
    const finalAssignee = formData.assignee === 'other'
      ? formData.customAssignee
      : formData.assignee;

    const payload = {
      title: formData.title,
      description: formData.description,
      assignee: finalAssignee,
      status: formData.status,
      priority: formData.priority
    };

    try {
      const response = await axios.post('https://www.townmanor.ai/api/crm/tasks', payload);
      console.log('Task created:', response.data);
      
      // Reset form with default values
      setFormData({
        title: '',
        description: '',
        assignee: 'ravindra',
        customAssignee: '',
        status: 'todo',
        priority: 'medium'
      });
      
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TaskForm_container">
      <form onSubmit={handleSubmit} className="TaskForm_form">
        <h2 className="TaskForm_title">Create New Task</h2>
        
        {error && <div className="TaskForm_error">{error}</div>}

        {/* Title Field */}
        <div className="TaskForm_group horizontal">
          <label htmlFor="title" className="TaskForm_label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="TaskForm_input"
            required
            placeholder="Enter task title"
          />
        </div>

        {/* Description Field */}
        <div className="TaskForm_group horizontal">
          <label htmlFor="description" className="TaskForm_label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="TaskForm_textarea"
            required
            placeholder="Enter task description"
            rows="2"
          />
        </div>

        {/* Assignee Field */}
        <div className="TaskForm_group horizontal">
          <label htmlFor="assignee" className="TaskForm_label">Assignee</label>
          <select
            id="assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            className="TaskForm_select"
            required
          >
            <option value="ravindra">Ravindra</option>
            <option value="sunny">Sunny</option>
            <option value="ayush">Ayush</option>
            <option value="other">Other</option>
          </select>
          {formData.assignee === 'other' && (
            <input
              type="text"
              name="customAssignee"
              value={formData.customAssignee}
              onChange={handleChange}
              className="TaskForm_input other-input"
              placeholder="Enter assignee name"
              required
            />
          )}
        </div>

        {/* Status Field */}
        <div className="TaskForm_group horizontal">
          <label htmlFor="status" className="TaskForm_label">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="TaskForm_select"
          >
            <option value="todo">To Do</option>
            <option value="doing">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Field */}
        <div className="TaskForm_group horizontal">
          <label htmlFor="priority" className="TaskForm_label">Priority</label>
          <select
            id="priority"
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

        <button 
          type="submit" 
          className="TaskForm_submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
