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
    location: null,
    preferences: [],
  });

  const location = useLocation();
  const { initialQuestion } = location.state || {};

  // 초기 메시지 설정
  useEffect(() => {
    if (!messages.length) {
      const welcomeMessage = {
        type: 'bot',
        content: {
          text: '안녕하세요! MyGuide AI 챗봇입니다. 어떤 도움이 필요하신가요?',
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
    }
  }, []);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const processUserType = (type) => {
    setUserContext(prev => ({ ...prev, touristType: type }));
    const categoryQuestion = {
      type: 'bot',
      content: {
        text: '어떤 종류의 관광지를 선호하시나요?',
        options: [
          '역사·고궁·문화재',
          '체험·공예',
          '전시·공연·관람',
          '자연·공원·전망대',
          '휴양·캠핑',
          '안내소'
        ]
      }
    };
    setMessages(prev => [...prev, { type: 'user', content: { text: type } }, categoryQuestion]);
  };

  const processCategory = (category) => {
    setUserContext(prev => ({
      ...prev,
      preferences: [...prev.preferences, category]
    }));
    const locationQuestion = {
      type: 'bot',
      content: {
        text: '어느 지역을 방문하실 예정인가요?',
        options: ['서울', '부산', '제주', '기타']
      }
    };
    setMessages(prev => [...prev, { type: 'user', content: { text: category } }, locationQuestion]);
  };

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
      const data = await sendQuestion(text, imageData, userContext);
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