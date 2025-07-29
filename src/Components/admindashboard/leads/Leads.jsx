import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminAccesor from '../navbar/AdminAccesor';
import './Leads.css';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsPerPage] = useState(10);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('https://townmanor.ai/api/formlead/leads');
                setLeads(response.data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, []);

    // Get current leads
    const indexOfLastLead = currentPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <AdminAccesor />
            </div>
            <div className="leads-container">
                <h1 className="leads-title">All User Contact Detail</h1>
                <table className="leads-table">
                    <thead>
                        <tr className="leads-table-header">
                            <th className="leads-table-header-cell">ID</th>
                            <th className="leads-table-header-cell">Name</th>
                            <th className="leads-table-header-cell">Phone Number</th>
                            <th className="leads-table-header-cell">Purpose</th>
                            <th className="leads-table-header-cell">Source</th>
                            <th className="leads-table-header-cell">Created At</th>
                            <th className="leads-table-header-cell">Username</th>
                            <th className="leads-table-header-cell">Property Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeads.map((lead) => (
                            <tr key={lead.id} className="leads-table-row">
                                <td className="leads-table-cell">{lead.id}</td>
                                <td className="leads-table-cell">{lead.name}</td>
                                <td className="leads-table-cell">{lead.phone_number}</td>
                                <td className="leads-table-cell">{lead.purpose}</td>
                                <td className="leads-table-cell">{lead.source}</td>
                                <td className="leads-table-cell">{new Date(lead.created_at).toLocaleDateString()}</td>
                                <td className="leads-table-cell">{lead.username}</td>
                                <td className="leads-table-cell">{lead.property_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-container">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
                        Previous
                    </button>
                    <span className="pagination-info">Page {currentPage} of {Math.ceil(leads.length / leadsPerPage)}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(leads.length / leadsPerPage)} className="pagination-button">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Leads;