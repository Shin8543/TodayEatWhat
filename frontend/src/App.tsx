import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  min-width: 200px;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  transition: all 0.3s ease;
`;

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/options`);
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const startSpinning = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult('');

    // 模拟滚动效果
    let counter = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      counter++;

      if (counter >= maxIterations) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <Container>
      <Title>今天吃什么？</Title>
      <Button onClick={startSpinning} disabled={isSpinning}>
        {isSpinning ? '选择中...' : '开始选择'}
      </Button>
      {result && (
        <ResultBox>
          {result}
        </ResultBox>
      )}
    </Container>
  );
};

export default App; 