import React from 'react';
import Section from '../components/Section';
import html2pdf from 'html2pdf.js';

const Home = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');

  // New structure of sectionsData as an object
  const sectionsData = {
    summary: "",
    competitor_and_market_force_analysis: "",
    industry_specific_and_geographical_insights: "",
    trends_prediction: "",
    SWOT: "",
    PESTLE: "",
  };

  const handleDownloadPDF = () => {
    const element = document.querySelector('.sectionParent');

    // Clone the element to avoid modifying the original DOM
    const clonedElement = element.cloneNode(true);

    // Remove buttons from the cloned element
    clonedElement.querySelector('.downloadPdfBtn')?.remove();
    clonedElement.querySelectorAll('.editbtn').forEach((btn) => btn.remove());

    // Generate PDF from the cloned element
    html2pdf().from(clonedElement).save('page-content.pdf');
  };

  

  console.log('User Token from LocalStorage:', tokenFromLocalStorage);

  return (
    <div className="sectionParent flex flex-col p-6">
      {/* Button to trigger PDF download */}
      <button
        onClick={handleDownloadPDF}
        className="downloadPdfBtn bg-blue-500 text-white rounded p-2 mb-4"
      >
        Download PDF
      </button>

      {/* Map over the keys and values of the sectionsData object */}
      {Object.entries(sectionsData).map(([key, value]) => (
        <div key={key} className="w-full p-4">
          <h2 className="text-xl font-bold mb-2">
            {key.replace(/_/g, ' ')} {/* Format the title */}
          </h2>
          <Section data={value} />
        </div>
      ))}
    </div>
  );
};

export default Home;
