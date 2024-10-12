// src/SectionComponent.js
import React from 'react';
import EditableTextBox from './EditableTextbox';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';

const Section = ({ chartType }) => {
    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return <LineGraph />;
            case 'bar':
                return <BarGraph />;
            case 'pie':
                return <PieGraph />;
            default:
                return <LineGraph />; // Default to line graph
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-around p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="md:w-1/2 w-full p-4">
                <h2 className="text-xl font-semibold mb-4">Editable Text</h2>
                <EditableTextBox />
            </div>
            <div className="md:w-1/2 w-full p-4 border-l border-gray-300">
                <h2 className="text-xl font-semibold mb-4">Chart</h2>
                {renderChart()}
            </div>
        </div>
    );
};

export default Section;
