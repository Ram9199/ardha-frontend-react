import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import BirthForm from './components/BirthForm';
import ChartResults from './components/ChartResults';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [personData, setPersonData] = useState(null);

  const handleCalculateChart = async (formData) => {
    setLoading(true);
    try {
      // Log the location data to help with troubleshooting
      console.log(`Calculating chart for ${formData.birthplace} at coordinates: ${formData.latitude}, ${formData.longitude}, timezone: ${formData.timezone}`);
      console.log(`Using astrology style: ${formData.astroStyle}`);
      
      const response = await fetch('/api/birth-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          year: formData.year,
          month: formData.month,
          day: formData.day,
          hour: formData.hour,
          minute: formData.minute,
          tzOffset: formData.timezone,
          latitude: formData.latitude,
          longitude: formData.longitude,
          astroStyle: formData.astroStyle
        })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate chart');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      setChartData(data.chart);
      setPersonData({
        name: formData.name,
        birthDate: {
          year: formData.year,
          month: formData.month,
          day: formData.day,
          hour: formData.hour,
          minute: formData.minute,
          timezoneOffset: formData.timezone
        },
        birthplace: formData.birthplace,
        latitude: formData.latitude,
        longitude: formData.longitude,
        astroStyle: formData.astroStyle
      });
    } catch (error) {
      console.error('Error calculating chart:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChartData(null);
    setPersonData(null);
  };

  return (
    <AppContainer>
      <Header />
      <MainContent className="container">
        {loading ? (
          <LoadingSpinner message="Calculating planetary positions..." />
        ) : chartData ? (
          <ChartResults 
            chartData={chartData} 
            personData={personData} 
            onReset={handleReset} 
          />
        ) : (
          <BirthForm onSubmit={handleCalculateChart} />
        )}
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 