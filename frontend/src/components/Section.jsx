// src/SectionComponent.js
import React from 'react';
import EditableTextBox from './EditableTextbox';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import PieGraph from './PieGraph';

const Section = ({ data }) => {
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
            <div className='w-full mx-4'>
                <EditableTextBox  data={data}/>
            </div>
        </div>
    );
};

export default Section;
