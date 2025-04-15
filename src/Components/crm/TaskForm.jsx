import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: 'sapna',
    customAssignee: '',
    status: 'todo',
    priority: 'medium',
    progress: 0,
    tester: '',
    workLog: ''
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
      priority: formData.priority,
      progress: parseInt(formData.progress),
      tester: formData.tester,
      workLog: formData.workLog,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await axios.post('https://www.townmanor.ai/api/crm/tasks', payload);
      console.log('Task created:', response.data);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        assignee: 'sapna',
        customAssignee: '',
        status: 'todo',
        priority: 'medium',
        progress: 0,
        tester: '',
        workLog: ''
      });

      if (onTaskCreated) {
        onTaskCreated();
      }
      
      window.location.reload();
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

        <table className="TaskForm_table">
          <tbody>
            {/* Title Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="title" className="TaskForm_label">Title</label>
              </td>
              <td>
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
              </td>
            </tr>

            {/* Description Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="description" className="TaskForm_label">Description</label>
              </td>
              <td>
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
              </td>
            </tr>

            {/* Assignee Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="assignee" className="TaskForm_label">Assignee</label>
              </td>
              <td>
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
                  <option value="sapna">Sapna</option>
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
              </td>
            </tr>

            {/* Status Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="status" className="TaskForm_label">Status</label>
              </td>
              <td>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="TaskForm_select"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">In Progress</option>
                  <option value="testing">Testing</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>

            {/* Priority Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="priority" className="TaskForm_label">Priority</label>
              </td>
              <td>
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
              </td>
            </tr>

            {/* Progress Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="progress" className="TaskForm_label">Progress</label>
              </td>
              <td>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="TaskForm_progress"
                />
                <span className="TaskForm_progressValue">{formData.progress}%</span>
              </td>
            </tr>

            {/* Tester Row - Only show when status is testing */}
            {formData.status === 'testing' && (
              <tr>
                <td className="TaskForm_labelCell">
                  <label htmlFor="tester" className="TaskForm_label">Tester</label>
                </td>
                <td>
                  <select
                    id="tester"
                    name="tester"
                    value={formData.tester}
                    onChange={handleChange}
                    className="TaskForm_select"
                    required
                  >
                    <option value="">Select Tester</option>
                    <option value="ravindra">Ravindra</option>
                    <option value="sunny">Sunny</option>
                    <option value="ayush">Ayush</option>
                    <option value="sapna">Sapna</option>
                  </select>
                </td>
              </tr>
            )}

            {/* Work Log Row */}
            <tr>
              <td className="TaskForm_labelCell">
                <label htmlFor="workLog" className="TaskForm_label">Work Log</label>
              </td>
              <td>
                <textarea
                  id="workLog"
                  name="workLog"
                  value={formData.workLog}
                  onChange={handleChange}
                  className="TaskForm_textarea"
                  placeholder="Enter work log details"
                  rows="2"
                />
              </td>
            </tr>
          </tbody>
        </table>

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
