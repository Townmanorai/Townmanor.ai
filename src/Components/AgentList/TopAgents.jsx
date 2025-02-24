import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopAgents.css';

const TopAgents = ({ agents }) => {
  const navigate = useNavigate();

  const handleClick = (agent) => {
    console.log(agent.id);
    console.log(agent.imageUrl);
    navigate(`/agent/${agent.id}`);
  };

  return (
    <div className="top-agents">
      <h3 className='mb-4 ms-5'>Top 10 Transacting Agents</h3>
      <ul>
        {agents.map((agent, index) => (
          <li onClick={() => handleClick(agent)} key={index} className={`rank-${index + 1}`}>
            <span><img src={`https://www.townmanor.ai/api/images/` + agent.imageUrl} alt={agent.name} className="top-agent-images" onClick={handleClick} /></span>
            <span className="name">{agent.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAgents;
