import React from 'react';

const Home = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');

  console.log("User Token from LocalStorage:", tokenFromLocalStorage);

  return (
    <div>Home Page</div>
  );
};

export default Home;
