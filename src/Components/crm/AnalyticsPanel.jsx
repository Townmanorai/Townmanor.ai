import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnalyticsPanel.css';

const AnalyticsPanel = () => {
  const [overview, setOverview] = useState(null);
  const [assigneeStats, setAssigneeStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewRes, statsRes] = await Promise.all([
          axios.get('https://www.townmanor.ai/api/crm/analytics/overview'),
          axios.get('https://www.townmanor.ai/api/crm/analytics/assignee-stats')
        ]);
        
        setOverview(overviewRes.data);
        setAssigneeStats(statsRes.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;
  if (error) return <div className="analytics-error">{error}</div>;
  if (!overview) return <div className="analytics-error">No data available</div>;

  return (
    <div className="analytics-panel">
      <h2>Task Analytics Overview</h2>
      
      <div className="overview-cards">
        <div className="overview-card">
          <h3>Total Tasks</h3>
          <p>{overview.total_tasks}</p>
        </div>
        <div className="overview-card">
          <h3>To Do</h3>
          <p>{overview.todo_count}</p>
        </div>
        <div className="overview-card">
          <h3>In Progress</h3>
          <p>{overview.doing_count}</p>
        </div>
        <div className="overview-card">
          <h3>Completed</h3>
          <p>{overview.completed_count}</p>
        </div>
      </div>

      <h3>Priority Distribution</h3>
      <div className="priority-cards">
        <div className="priority-card high">
          <span>High</span>
          <p>{overview.high_priority_count}</p>
        </div>
        <div className="priority-card medium">
          <span>Medium</span>
          <p>{overview.medium_priority_count}</p>
        </div>
        <div className="priority-card low">
          <span>Low</span>
          <p>{overview.low_priority_count}</p>
        </div>
      </div>

      <h3>Assignee Statistics</h3>
      <div className="assignee-stats">
        {assigneeStats.map(assignee => (
          <div key={assignee.assignee} className="assignee-card">
            <h4>{assignee.assignee}</h4>
            <div className="stats-row">
              <span>Total: {assignee.total_tasks}</span>
              <span>To Do: {assignee.todo_count}</span>
              <span>Doing: {assignee.doing_count}</span>
              <span>Done: {assignee.completed_count}</span>
            </div>
            <div className="priority-row">
              <span className="high">H: {assignee.high_priority_count}</span>
              <span className="medium">M: {assignee.medium_priority_count}</span>
              <span className="low">L: {assignee.low_priority_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPanel;