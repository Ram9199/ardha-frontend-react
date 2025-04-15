import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  text-align: center;
  padding: 30px;
  margin: 50px auto;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(142, 68, 173, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: ${spin} 1s ease-in-out infinite;
  margin: 0 auto 15px;
`;

const Message = styled.p`
  color: var(--primary);
  font-weight: 500;
`;

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <LoaderContainer>
      <Spinner />
      <Message>{message}</Message>
    </LoaderContainer>
  );
}

export default LoadingSpinner; 