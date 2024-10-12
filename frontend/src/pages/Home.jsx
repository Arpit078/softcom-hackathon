import React from 'react';
import Section from '../components/Section';


const Home = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const sectionsData = [
    { id: 1, title: 'Sales Data 2024', chartType: 'line' },
    { id: 2, title: 'Product Performance', chartType: 'bar' },
    { id: 3, title: 'Market Share', chartType: 'pie' },
    { id: 4, title: 'Customer Growth', chartType: 'line' },
    { id: 5, title: 'Revenue by Region', chartType: 'bar' },
    { id: 6, title: 'New Customers', chartType: 'pie' },
    { id: 7, title: 'Monthly Expenses', chartType: 'line' },
    { id: 8, title: 'Inventory Levels', chartType: 'bar' },
    { id: 9, title: 'Website Traffic', chartType: 'pie' },
    { id: 10, title: 'Feedback Ratings', chartType: 'line' },
];

  console.log("User Token from LocalStorage:", tokenFromLocalStorage);

  return (
    <div className="flex flex-col p-6">
            {sectionsData.map((section) => (
                <div key={section.id} className="w-full p-4">
                    <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                    <Section chartType={section.chartType} />
                </div>
            ))}
        </div>
  );
};

export default Home;
