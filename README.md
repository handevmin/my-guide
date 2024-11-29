# MyGuide AI 챗봇

## 프로젝트 소개
MyGuide는 관광약자들이 더 쉽고 편리하게 여행을 즐길 수 있도록 지원하는 AI 기반 챗봇 서비스입니다. React를 기반으로 개발되었으며, 관광약자의 특성을 고려한 접근성 높은 인터페이스를 제공합니다.

## 주요 기능
- AI 기반 개인 맞춤형 관광지 추천
- 관광지별 무장애 시설 정보 제공
- 관광용 차량 예약 서비스
- 6개 카테고리별 체계적인 관광지 정보
  - 역사·고궁·문화재
  - 체험·공예
  - 전시·공연·관람
  - 자연·공원·전망대
  - 휴양·캠핑
  - 안내소
- 장애인, 고령자, 임산부를 위한 접근성 기능

## 시작하기

### 사전 요구사항
- Node.js (v14 이상)
- npm (v6 이상)

### 설치
1. 저장소를 클론합니다:
   ```
   git clone https://github.com/handevmin/my-guide.git
   ```
2. 프로젝트 디렉토리로 이동합니다:
   ```
   cd my-guide
   ```
3. 의존성을 설치합니다:
   ```
   npm install
   ```

### 실행
개발 서버를 실행합니다:
```
npm start
```
브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조
- `/public`: 정적 파일
- `/src`: 소스 코드
  - `/components`: React 컴포넌트
    - `/ChatInterface`: 챗봇 인터페이스 관련 컴포넌트
    - `/ImageUpload`: 이미지 업로드 관련 컴포넌트
    - `/Layout`: 레이아웃 컴포넌트
    - `/LandingPage`: 랜딩 페이지 컴포넌트
  - `/services`: API 통신 관련 서비스
  - `/hooks`: 커스텀 훅
  - `/styles`: CSS 스타일
  - `/utils`: 유틸리티 함수

## 대상 사용자
- 휠체어 사용자
- 고령자
- 임산부
- 시각장애인
- 영유아 동반자

## 기여하기
프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:
1. 프로젝트를 포크합니다.
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/NewFeature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add new feature for accessibility'`).
4. 브랜치에 푸시합니다 (`git push origin feature/NewFeature`).
5. Pull Request를 생성합니다.

## 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.