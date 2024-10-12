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
        <div>
            <div className='w-1/2'>
                <EditableTextBox />
            </div>
        </div>
    );
};

export default Section;
