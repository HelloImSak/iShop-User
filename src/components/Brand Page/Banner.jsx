import React from 'react';

const Banner = () => {
  return (
    <div style={{
      backgroundColor: '#1976d2', // Blue background
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Page Apple</h1>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>Get the 4th for you good over 100%</p>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Find Your Perfect Laptop</h2>
      <p style={{ fontSize: '20px', marginBottom: '30px' }}>Shop Now with Ease</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button style={{
          backgroundColor: '#ff4081',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '18px',
          cursor: 'pointer',
        }}>
          Laptop
        </button>
        <button style={{
          backgroundColor: '#ff4081',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '18px',
          cursor: 'pointer',
        }}>
          All Item
        </button>
      </div>
      <p style={{ fontSize: '18px', marginTop: '30px' }}>Go to Shop &gt;</p>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Product Categories &gt;</p>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>Product Brands</p>
    </div>
  );
};

export default Banner;