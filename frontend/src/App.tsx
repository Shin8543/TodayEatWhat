import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 获取API URL
const getApiUrl = () => {
  // 优先使用环境变量中的API URL
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // 默认使用当前域名和端口4000
  const currentHost = window.location.hostname;
  return `http://${currentHost}:4000`;
};

const API_BASE_URL = getApiUrl();

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: white;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const SidebarTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
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
  margin: 0.5rem;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SmallButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5rem;

  &:hover {
    background-color: #cc0000;
  }
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5rem;

  &:hover {
    background-color: #1976D2;
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

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background-color: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #4CAF50;
`;

const OptionText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
`;

const AddForm = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
`;

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/options`);
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const addOption = async () => {
    if (!newOption.trim()) return;
    
    try {
      await axios.post(`${API_BASE_URL}/api/options`, {
        name: newOption.trim()
      });
      setNewOption('');
      fetchOptions();
    } catch (error) {
      console.error('Error adding option:', error);
      alert('添加失败，请重试');
    }
  };

  const deleteOption = async (name: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/options/${encodeURIComponent(name)}`);
      fetchOptions();
    } catch (error) {
      console.error('Error deleting option:', error);
      alert('删除失败，请重试');
    }
  };

  const startSpinning = async () => {
    if (isSpinning || options.length === 0) return;
    
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addOption();
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>食物选项管理</SidebarTitle>
        
        <AddForm>
          <Input
            type="text"
            placeholder="输入新的食物选项..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <AddButton onClick={addOption}>添加</AddButton>
        </AddForm>

        <div>
          <h3>当前选项 ({options.length})</h3>
          {options.length === 0 ? (
            <EmptyMessage>暂无食物选项，请先添加一些选项</EmptyMessage>
          ) : (
            options.map((option, index) => (
              <OptionItem key={index}>
                <OptionText>{option}</OptionText>
                <SmallButton onClick={() => deleteOption(option)}>删除</SmallButton>
              </OptionItem>
            ))
          )}
        </div>
      </Sidebar>

      <MainContent>
        <Title>今天吃什么？</Title>
        <Button onClick={startSpinning} disabled={isSpinning || options.length === 0}>
          {isSpinning ? '选择中...' : options.length === 0 ? '请先添加食物选项' : '开始选择'}
        </Button>
        {result && (
          <ResultBox>
            {result}
          </ResultBox>
        )}
      </MainContent>
    </Container>
  );
};

export default App; 