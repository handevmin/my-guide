import React, { useState, useEffect, useCallback } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import ImageUpload from '../ImageUpload/ImageUpload';
import SelectedFile from './SelectedFile';
import { useLocation } from 'react-router-dom';
import { uploadImage, sendQuestion } from '../../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userContext, setUserContext] = useState({
    touristType: null,
    weather: null,
    transportation: null
  });

  const location = useLocation();
  const { initialQuestion } = location.state || {};

  // 초기 메시지 설정
  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      content: {
        text: '안녕하세요! 당당여행 AI 챗봇입니다. 편안한 여행을 위해 도움을 드리겠습니다.',
        options: [
          '휠체어 사용자',
          '고령자',
          '임산부',
          '시각장애인',
          '영유아 동반'
        ]
      }
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (text) => {
    if ((!text.trim() && !imageData) || isLoading) return;

    let newMessage = { 
      type: 'user', 
      content: { 
        text,
        image: selectedFile ? URL.createObjectURL(selectedFile) : null
      } 
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsLoading(true);
    
    setSelectedFile(null);
    setImageData(null);

    try {
      // context 정보 추가
      const context = {
        touristType: userContext.touristType,
        weather: userContext.weather,
        transportation: userContext.transportation
      };

      const data = await sendQuestion(text, imageData, context);
      
      // 사용자 타입이 메시지에 포함되어 있다면 컨텍스트 업데이트
      if (text.includes('사용자') || text.includes('고령자') || 
          text.includes('임산부') || text.includes('시각장애인') || 
          text.includes('영유아')) {
        setUserContext(prev => ({
          ...prev,
          touristType: text
        }));
      }

      const botResponse = {
        type: 'bot',
        content: { 
          text: data.response,
          options: data.suggested_actions 
        }
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = {
        type: 'bot',
        content: { 
          text: '죄송합니다. 메시지 처리 중 오류가 발생했습니다.' 
        }
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = useCallback(async (file) => {
    setSelectedFile(file);
    try {
      const data = await uploadImage(file);
      setImageData(data.image_data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessages(prevMessages => [...prevMessages, { 
        type: 'bot', 
        content: { text: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.' } 
      }]);
      setSelectedFile(null);
      setImageData(null);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setImageData(null);
  }, []);

  return (
    <div className="chat-page">
      <div className="chat-interface">
        <ChatHistory messages={messages} />
        <div className="input-area">
          {selectedFile && (
            <SelectedFile file={selectedFile} onRemove={handleRemoveFile} />
          )}
          <div className="input-container">
            <ImageUpload onFileSelect={handleFileSelect} />
            <ChatInput 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;