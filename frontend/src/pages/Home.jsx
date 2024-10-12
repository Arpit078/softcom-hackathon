import React from 'react';
import Section from '../components/Section';


const Home = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');

  console.log("User Token from LocalStorage:", tokenFromLocalStorage);

  return (
    <div className='p-10'>
      <Section chartType={'line'}/>
    </div>
  );
};

export default Home;
