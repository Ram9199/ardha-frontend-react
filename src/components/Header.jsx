import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 50px 0;
  background: var(--mystic-gradient);
  color: white;
  border-radius: 0 0 30px 30px;
  margin-bottom: 50px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 25%);
    opacity: 0.7;
    z-index: 0;
  }
  
  /* Add subtle animated star-like particles */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255,255,255,0.8) 0%, transparent 1%),
      radial-gradient(circle at 30% 40%, rgba(255,255,255,0.8) 0%, transparent 0.5%),
      radial-gradient(circle at 50% 25%, rgba(255,255,255,0.8) 0%, transparent 0.8%),
      radial-gradient(circle at 70% 60%, rgba(255,255,255,0.8) 0%, transparent 0.7%),
      radial-gradient(circle at 90% 30%, rgba(255,255,255,0.8) 0%, transparent 0.9%);
    opacity: 0.6;
    z-index: 0;
    animation: twinkle 5s infinite alternate;
  }
  
  @keyframes twinkle {
    0% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.8;
    }
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 3.5rem;
  margin-bottom: 5px;
  display: inline-block;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
  background: linear-gradient(to right, #ffffff, #e0d8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  letter-spacing: 3px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  font-weight: 300;
  letter-spacing: 0.5px;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>🔮</Logo>
        <Title>ARDHA</Title>
        <Subtitle>Explore your Vedic birth chart with precise planetary calculations</Subtitle>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header; 