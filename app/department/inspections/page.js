'use client'

import { useEffect, useState } from 'react';

export default function InspectionsPage() {
    const [inspections, setInspections] = useState([])

    useEffect(() => {
        fetch('/api/local/inspection')
            .then(response => response.json())
            .then(setInspections);
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {inspections.map((inspection) => (
                    <tr key={inspection.id}>
                        <td>{inspection.id}</td>
                        <td>{inspection.description}</td>
                        <td>{inspection.startDate}</td>
                        <td>{inspection.endDate}</td>
                        <td>{inspection.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}