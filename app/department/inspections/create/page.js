'use client'

import React, { useState, useEffect } from 'react';
import getLegions from '@/utils/get-legions';

export default () => {
    const [inspectors, setInspectors] = useState([]);
    const [selectedInspector, setSelectedInspector] = useState('');
    const [description, setDescription] = useState('');
    const [legion, setLegion] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetch('/api/local/inspector')
            .then(response => response.json())
            .then(setInspectors);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('/api/local/inspection/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inspectorDiscordId: selectedInspector,
                description,
                legion,
                startDate,
                endDate,
            }),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Legion:
                <input
                    type="text"
                    value={legion}
                    onChange={(e) => setLegion(e.target.value)}
                />
            </label>
            <label>
                Start Date:
                <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </label>
            <label>
                Inspector:
                <select value={selectedInspector} onChange={e => setSelectedInspector(e.target.value)}>
                    <option key={""} value={"------------"}></option>
                    {inspectors.map(inspector => (
                        <option key={inspector.id} value={inspector.discordId}>
                            {inspector.callSign}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Create Inspection</button>
        </form>
    );
}