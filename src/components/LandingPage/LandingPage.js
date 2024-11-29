import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="welcome-message">
          <div className="welcome-header">
            <img 
              src={process.env.PUBLIC_URL + '/math-bot-image.png'} 
              alt="MyGuide 로고" 
              className="logo"
            />
            <h1 className="app-title">관광약자를 위한 맞춤형 플랫폼</h1>
          </div>

          <div className="app-features">
            <h2>MyGuide 주요 기능</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <h3>AI 맞춤형 추천</h3>
                <p>개인화된 관광지 추천과 맞춤형 경로 안내</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🗺️</div>
                <h3>6개 카테고리 정보</h3>
                <p>역사·고궁부터 휴양·캠핑까지 체계적인 분류</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚗</div>
                <h3>차량 예약</h3>
                <p>관광용 차량 예약 및 이동지원 서비스</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>커뮤니티</h3>
                <p>관광약자간 정보 공유 및 소통 공간</p>
              </div>
            </div>
          </div>

          <div className="target-users">
            <h2>서비스 대상</h2>
            <div className="user-types">
              <span className="user-type">휠체어 사용자</span>
              <span className="user-type">고령자</span>
              <span className="user-type">임산부</span>
              <span className="user-type">시각장애인</span>
              <span className="user-type">영유아 동반자</span>
            </div>
          </div>

          <div className="info-message">
            <p>
              MyGuide는 관광약자들이 더 쉽고 편리하게 여행을 즐길 수 있도록 돕는 맞춤형 서비스입니다. 
              AI 기반 개인화 추천, 실시간 시설 정보, 관광용 차량 예약 등 다양한 기능을 통해 
              누구나 차별없이 자유롭게 관광을 즐길 수 있도록 지원합니다.
            </p>
          </div>
        </div>

        <button 
          className="start-chat-btn"
          onClick={() => navigate('/chat')}
        >
          채팅 시작하기
        </button>
      </div>
    </div>
  );
}

export default LandingPage;