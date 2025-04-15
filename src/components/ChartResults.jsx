import React, { useState } from 'react';
import styled from 'styled-components';
import ChartWheel from './ChartWheel';

const ResultsCard = styled.div`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
`;

const PersonDetails = styled.div`
  margin-bottom: 20px;
`;

const LocationDetails = styled.div`
  margin-bottom: 30px;
  color: #666;
`;

const TabContainer = styled.div`
  margin: 30px 0;
`;

const TabContent = styled.div`
  display: block;
`;

const PlanetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const PlanetCard = styled.div`
  background: var(--card-bg);
  border-radius: 10px;
  padding: 15px;
  border-left: 4px solid var(--primary);
  box-shadow: 0 3px 10px rgba(0,0,0,0.05);
`;

const PlanetName = styled.div`
  font-weight: 700;
  color: var(--primary);
  font-size: 1.2rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PlanetDetail = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: var(--text);
`;

const DetailValue = styled.span`
  color: var(--accent-1);
`;

const HousesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HousesRow = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HouseCard = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  color: white;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
    z-index: 0;
  }
`;

const HouseNumber = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
  z-index: 1;
`;

const HouseContent = styled.div`
  flex: 1;
  z-index: 1;
`;

const HouseName = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 5px;
`;

const HouseSign = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
`;

const HouseDegree = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(142, 68, 173, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(142, 68, 173, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  background: linear-gradient(to right, var(--secondary), #f1c40f);
  box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3);
  
  &:hover {
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.4);
  }
`;

const ChartContainer = styled.div`
  margin: 30px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

const HouseBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  width: 22px;
  height: 22px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 50%;
  margin-left: auto;
`;

const formatDate = (dateObj) => {
  // Format date in a standardized way using the date object values directly
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${monthNames[dateObj.month - 1]} ${dateObj.day}, ${dateObj.year}`;
};

const formatTime = (dateObj) => {
  // Format time in 12-hour format with AM/PM
  let hours = dateObj.hour;
  const minutes = dateObj.minute.toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${hours}:${minutes} ${ampm}`;
};

const planetEmojis = {
  'Sun': '☀️',
  'Moon': '🌙',
  'Mercury': '☿️',
  'Venus': '♀️',
  'Mars': '♂️',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Rahu': '☊',
  'Ketu': '☋'
};

const ChartResults = ({ chartData, personData, onReset }) => {
  const [activeTab, setActiveTab] = useState('planets');
  
  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
        body: JSON.stringify({
          chart: chartData
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'birth_chart.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  return (
    <ResultsCard>
      <h2>Your {getAstrologyStyleName(chartData.astro_style || personData.astroStyle)} Birth Chart</h2>
      
      <PersonDetails>
        Name: <strong>{personData.name}</strong> | Born: <strong>{formatDate(personData.birthDate)} at {formatTime(personData.birthDate)}</strong>
      </PersonDetails>
      
      <LocationDetails>
        Location: {personData.birthplace} ({personData.latitude}, {personData.longitude})
      </LocationDetails>
      
      <ChartContainer>
        <ChartWheel chartData={chartData} />
      </ChartContainer>
      
      <TabContainer>
        <h3>Planetary Positions</h3>
        
        <TabContent>
          <PlanetGrid>
            {Object.entries(chartData.planets).map(([planet, data]) => {
              const findHouse = () => {
                if (!chartData.lagna) return null;
                
                try {
                  const lagnaSign = chartData.lagna.rashi.name;
                  const planetSign = data.rashi.name;
                  
                  const lagnaIndex = rashis.indexOf(lagnaSign);
                  const planetIndex = rashis.indexOf(planetSign);
                  
                  if (lagnaIndex === -1 || planetIndex === -1) {
                    console.error(`Sign not found: Lagna=${lagnaSign}, Planet=${planetSign}`);
                    return null;
                  }
                  
                  let houseNum = ((planetIndex - lagnaIndex + 12) % 12) + 1;
                  
                  return houseNum.toString();
                } catch (error) {
                  console.error("Error determining house:", error);
                  return null;
                }
              };
              
              const houseNum = findHouse();
              
              return (
                <PlanetCard key={planet}>
                  <PlanetName>
                    <span>{planetEmojis[planet] || ''}</span>
                    {planet}
                    {houseNum && (
                      <HouseBadge title={`House ${houseNum}`}>
                        {houseNum}
                      </HouseBadge>
                    )}
                  </PlanetName>
                  <PlanetDetail>
                    <DetailLabel>Sign:</DetailLabel>
                    <DetailValue>{data.rashi.name}</DetailValue>
                  </PlanetDetail>
                  <PlanetDetail>
                    <DetailLabel>Degree:</DetailLabel>
                    <DetailValue>{data.longitude.toFixed(2)}° ({data.rashi.degree.toFixed(2)}°)</DetailValue>
                  </PlanetDetail>
                  <PlanetDetail>
                    <DetailLabel>Nakshatra:</DetailLabel>
                    <DetailValue>{data.nakshatra.name}</DetailValue>
                  </PlanetDetail>
                  <PlanetDetail>
                    <DetailLabel>Pada:</DetailLabel>
                    <DetailValue>{data.nakshatra.pada || '-'}</DetailValue>
                  </PlanetDetail>
                  <PlanetDetail>
                    <DetailLabel>Nakshatra Lord:</DetailLabel>
                    <DetailValue>{data.nakshatra.lord}</DetailValue>
                  </PlanetDetail>
                  {houseNum && (
                    <PlanetDetail>
                      <DetailLabel>House:</DetailLabel>
                      <DetailValue>
                        {houseNum} ({getHouseName(houseNum)})
                      </DetailValue>
                    </PlanetDetail>
                  )}
                </PlanetCard>
              );
            })}
          </PlanetGrid>
        </TabContent>
      </TabContainer>
      
      <ButtonGroup>
        <Button onClick={handleDownloadPDF}>
          Download PDF Report <span>📄</span>
        </Button>
        <SecondaryButton onClick={onReset}>
          Calculate New Chart <span>🔄</span>
        </SecondaryButton>
      </ButtonGroup>
    </ResultsCard>
  );
};

const getHouseName = (houseNum) => {
  const houseNames = {
    '1': 'Ascendant',
    '2': 'Wealth',
    '3': 'Siblings',
    '4': 'Home',
    '5': 'Children', 
    '6': 'Health',
    '7': 'Partnership',
    '8': 'Transformation',
    '9': 'Philosophy',
    '10': 'Career',
    '11': 'Friends',
    '12': 'Spirituality'
  };
  
  return houseNames[houseNum] || '';
};

// Planet zodiac signs in order
const rashis = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio", 
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Helper function to get user-friendly astrology style name
const getAstrologyStyleName = (style) => {
  const styleNames = {
    'vedic-north': 'Vedic (North Indian)',
    'vedic-south': 'Vedic (South Indian)',
    'kp': 'KP System',
    'western': 'Western'
  };
  return styleNames[style] || 'Vedic';
};

export default ChartResults; 