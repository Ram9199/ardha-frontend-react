import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormCard = styled.div`
  background: var(--card-bg);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  flex: 1;
  min-width: 120px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;

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

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: linear-gradient(to right, var(--secondary), #f1c40f);
  box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3);

  &:hover {
    box-shadow: 0 6px 15px rgba(243, 156, 18, 0.4);
  }
`;

// Add a new styled component for hidden info
const HiddenInfo = styled.div`
  margin-top: 5px;
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
`;

const BirthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    birthtime: '',
    timezone: '5.5', // Default to IST
    birthplace: '',
    latitude: '',
    longitude: '',
    astroStyle: 'vedic-north' // Default to Vedic North Indian style
  });
  
  const [locationInfo, setLocationInfo] = useState({
    status: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear location info when birthplace changes
    if (name === 'birthplace') {
      setLocationInfo({ status: '', message: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if we have location data
    if (!formData.latitude || !formData.longitude) {
      setLocationInfo({
        status: 'error',
        message: 'Please enter a valid birthplace so we can determine location coordinates'
      });
      return;
    }
    
    const [year, month, day] = formData.birthdate.split('-').map(Number);
    const [hour, minute] = formData.birthtime.split(':').map(Number);
    
    onSubmit({
      name: formData.name,
      year,
      month,
      day,
      hour,
      minute,
      timezone: parseFloat(formData.timezone),
      birthplace: formData.birthplace,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      astroStyle: formData.astroStyle // Include astroStyle in submission
    });
  };

  const fillSampleData = () => {
    setFormData({
      name: 'SRI RAM PRAKHYA',
      birthdate: '1999-01-01',
      birthtime: '09:15',  // This is 9:15 AM in 24-hour format
      timezone: '5.5',
      birthplace: 'Hyderabad, Telangana, India',
      latitude: '17.3606',
      longitude: '78.4741',
      astroStyle: 'vedic-north' // Default style for sample data
    });
    
    setLocationInfo({
      status: 'success',
      message: 'Location: Hyderabad, Telangana, India (17.36°N, 78.47°E, UTC+5:30)'
    });
  };

  const handleBirthplaceBlur = async () => {
    if (formData.birthplace.length < 3) {
      setLocationInfo({
        status: 'error',
        message: 'Please enter a valid location'
      });
      return;
    }
    
    setLocationInfo({
      status: 'loading',
      message: 'Determining location coordinates...'
    });
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.birthplace)}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Get coordinates
        const latitude = parseFloat(data[0].lat).toFixed(4);
        const longitude = parseFloat(data[0].lon).toFixed(4);
        
        // Get timezone from coordinates
        const tzResponse = await fetch(`https://secure.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=ardha_user`);
        const tzData = await tzResponse.json();
        
        // Default timezone offset if we can't get it
        let timezone = '5.5';
        let tzName = 'UTC+5:30';
        
        if (tzData && tzData.rawOffset) {
          timezone = tzData.rawOffset.toString();
          tzName = `UTC${tzData.rawOffset >= 0 ? '+' : ''}${tzData.rawOffset}:00`;
        }
        
        // Set the data in state
        setFormData({
          ...formData,
          latitude,
          longitude,
          timezone
        });
        
        // Set location message
        setLocationInfo({
          status: 'success',
          message: `Location: ${data[0].display_name} (${latitude}°${latitude >= 0 ? 'N' : 'S'}, ${longitude}°${longitude >= 0 ? 'E' : 'W'}, ${tzName})`
        });
      } else {
        setLocationInfo({
          status: 'error',
          message: 'Location not found. Please check the spelling or try another city.'
        });
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setLocationInfo({
        status: 'error',
        message: 'Error determining location. Please check your internet connection.'
      });
    }
  };

  return (
    <FormCard>
      <h2>Enter Birth Details</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </FormGroup>

        <FormRow>
          <FormColumn>
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </FormColumn>
          <FormColumn>
            <Label htmlFor="birthtime">Birth Time</Label>
            <Input
              type="time"
              id="birthtime"
              name="birthtime"
              value={formData.birthtime}
              onChange={handleChange}
              required
            />
          </FormColumn>
        </FormRow>

        <FormGroup>
          <Label htmlFor="birthplace">Birth Place</Label>
          <Input
            type="text"
            id="birthplace"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleChange}
            onBlur={handleBirthplaceBlur}
            placeholder="Enter city, state, country"
            required
          />
          {locationInfo.message && (
            <HiddenInfo style={{ color: locationInfo.status === 'error' ? '#e74c3c' : '#2ecc71' }}>
              {locationInfo.message}
            </HiddenInfo>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="astroStyle">Astrology Style</Label>
          <Select
            id="astroStyle"
            name="astroStyle"
            value={formData.astroStyle}
            onChange={handleChange}
            required
          >
            <option value="vedic-north">Vedic (North Indian)</option>
            <option value="vedic-south">Vedic (South Indian)</option>
            <option value="kp">KP System (Krishnamurti Paddhati)</option>
            <option value="western">Western</option>
          </Select>
          <HiddenInfo>
            Select the astrological system to use for calculations and chart display
          </HiddenInfo>
        </FormGroup>

        <ButtonGroup>
          <Button type="submit">
            Calculate Birth Chart <span>✨</span>
          </Button>
          <SecondaryButton type="button" onClick={fillSampleData}>
            Fill Sample Data <span>📝</span>
          </SecondaryButton>
        </ButtonGroup>
      </Form>
    </FormCard>
  );
};

export default BirthForm; 