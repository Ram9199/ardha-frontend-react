import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 30px 20px;
  margin-top: 60px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  position: relative;
  background: var(--mystic-gradient);
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 15% 85%, rgba(255,255,255,0.15) 0%, transparent 30%),
      radial-gradient(circle at 85% 30%, rgba(255,255,255,0.15) 0%, transparent 30%);
    z-index: 0;
  }
`;

const FooterContent = styled.div`
  position: relative;
  z-index: 1;
`;

const BrandName = styled.span`
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1.1rem;
  margin-left: 5px;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 8px;
  opacity: 0.7;
`;

const Tagline = styled.p`
  margin-top: 10px;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.3px;
  opacity: 0.9;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <p>
          <span>✨</span>
          <BrandName>ARDHA</BrandName>
          <Divider>•</Divider>
          <span>Illuminating Celestial Wisdom</span>
        </p>
        <Tagline>Created by the ARDHA team with cosmic insights and ancient Jyotish principles</Tagline>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 