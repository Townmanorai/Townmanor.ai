import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkLog.css';

const WorkLog = () => {
    // State for work logs, loading, error, date range, and new log values.
    const [workLogs, setWorkLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    // New state for the currently selected user filter
    const [selectedUser, setSelectedUser] = useState('sapna');
    
    const [newLog, setNewLog] = useState({
        work_date: new Date().toISOString().split('T')[0],
        task_description: '',
        user_id: 'sapna',
        custom_user: ''
    });

    // Fetch work logs filtered by date range and selected user
    const fetchWorkLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://www.townmanor.ai/api/crm/worklogs', {
                params: {
                    user_id: selectedUser,
                    start_date: dateRange.startDate,
                    end_date: dateRange.endDate
                }
            });
            setWorkLogs(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching work logs:', err);
            setError(err.response?.data?.error || 'Failed to fetch work logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkLogs();
    }, [dateRange, selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLog(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalUser = newLog.user_id === 'other' ? newLog.custom_user : newLog.user_id;

        try {
            await axios.post('https://www.townmanor.ai/api/crm/worklogs', {
                work_date: newLog.work_date,
                task_description: newLog.task_description,
                user_id: finalUser
            });

            setNewLog({
                work_date: new Date().toISOString().split('T')[0],
                task_description: '',
                user_id: finalUser,
                custom_user: ''
            });

            fetchWorkLogs();
        } catch (err) {
            console.error('Error creating work log:', err);
            setError(err.response?.data?.error || 'Failed to create work log');
        }
    };

    // Export work logs with the selected user's filter
    const handleExport = async () => {
        try {
            const response = await axios.get('https://www.townmanor.ai/api/crm/worklogs/export', {
                params: {
                    user_id: selectedUser,
                    start_date: dateRange.startDate,
                    end_date: dateRange.endDate
                },
                responseType: 'blob'
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `worklogs-${dateRange.startDate}-to-${dateRange.endDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error exporting work logs:', err);
            setError(err.response?.data?.error || 'Failed to export work logs');
        }
    };

    return (
        <div className="WorkLog_container">
            <h2 className="WorkLog_title">Work Log Management</h2>

            {error && <div className="WorkLog_error">{error}</div>}

            {/* Date Range and User Filter */}
            <div className="WorkLog_dateRange">
                <div className="WorkLog_dateInput">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                </div>
                <div className="WorkLog_dateInput">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                </div>
                {/* New dropdown for filtering by user */}
                <div className="WorkLog_dateInput">
                    <label htmlFor="userFilter">Filter by User:</label>
                    <select
                        id="userFilter"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="sapna">Sapna</option>
                        <option value="ravindra">Ravindra</option>
                        <option value="sunny">Sunny</option>
                        <option value="ayush">Ayush</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <button
                    className="WorkLog_exportButton"
                    onClick={handleExport}
                >
                    Export to Excel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="WorkLog_form">
                <h3>Add New Work Log</h3>
                <div className="WorkLog_formGroup">
                    <label htmlFor="logDate">Date:</label>
                    <input
                        type="date"
                        id="logDate"
                        name="work_date"
                        value={newLog.work_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="WorkLog_formGroup">
                    <label htmlFor="user">User:</label>
                    <select
                        value={newLog.user_id}
                        onChange={(e) => setNewLog(prev => ({ ...prev, user_id: e.target.value }))}
                    >
                        <option value="ravindra">Ravindra</option>
                        <option value="sunny">Sunny</option>
                        <option value="ayush">Ayush</option>
                        <option value="sapna">Sapna</option>
                        <option value="other">Other</option>
                    </select>
                    {newLog.user_id === 'other' && (
                        <input
                            value={newLog.custom_user}
                            onChange={(e) => setNewLog(prev => ({ ...prev, custom_user: e.target.value }))}
                            placeholder="Enter user ID"
                        />
                    )}
                </div>

                <div className="WorkLog_formGroup">
                    <label htmlFor="tasks">Tasks Completed:</label>
                    <textarea
                        id="tasks"
                        name="task_description"
                        value={newLog.task_description}
                        onChange={handleChange}
                        placeholder="Enter the tasks you completed today"
                        required
                        rows="4"
                    />
                </div>
                <button type="submit" className="WorkLog_submitButton">
                    Add Work Log
                </button>
            </form>

            <div className="WorkLog_list">
                <h3>Work Logs</h3>
                {loading ? (
                    <div className="WorkLog_loading">Loading...</div>
                ) : workLogs.length === 0 ? (
                    <div className="WorkLog_empty">No work logs found for the selected date range and user.</div>
                ) : (
                    <div className="WorkLog_items">
                        {workLogs.map((log) => (
                            <div key={log.id} className="WorkLog_item">
                                <div className="WorkLog_itemHeader">
                                    <span className="WorkLog_date">
                                        {new Date(log.work_date).toLocaleDateString()}
                                    </span>
                                    <span className="WorkLog_user">{log.user_id}</span>
                                </div>
                                <div className="WorkLog_tasks">
                                    {log.task_description.split('\n').map((task, index) => (
                                        <p key={index}>{task}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkLog;
