# Real-Time Messenger (Next.js 13)

이 프로젝트는 Next.js 13의 App Router를 기반으로 한 실시간 메신저 애플리케이션입니다. 외부 서비스 의존성을 최소화하고 로컬 환경(Docker)에서 모든 실시간 기능과 데이터베이스를 구동할 수 있도록 최적화되었습니다.

## 🚀 주요 특징
- **실시간 채팅**: Soketi(Pusher 호환)를 사용하여 로컬 웹소켓 서버로 실시간 메시지 송수신.
- **간편 로그인**: 이메일 주소 없이 **아이디, 이름, 비밀번호**만으로 회원가입 및 로그인 가능.
- **이미지 공유**: 별도의 호스팅 서비스 없이 로컬 MongoDB에 Base64 형태로 프로필 및 채팅 이미지 저장.
- **반응형 디자인**: Tailwind CSS를 사용한 모바일 및 데스크탑 최적화 UI.

## 🛠 기술 스택
- **Language**: TypeScript
- **Frontend**: Next.js 13 (App Router), React, Tailwind CSS, Headless UI
- **Backend**: Next.js API Routes (Route Handlers)
- **Database**: MongoDB (Replica Set 모드 필수)
- **ORM**: Prisma
- **Real-time**: Soketi (Pusher-compatible WebSocket server)
- **Authentication**: Next-Auth (Custom Credentials)
- **State Management**: Zustand

## 📋 사전 준비 사항
- **Node.js**: v18 이상 권장
- **Docker**: MongoDB 및 Soketi 실행용

## 🏃 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/SilverRuler/Next-messenger.git
cd Next-messenger
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env` 파일을 생성하고 아래 내용을 입력합니다.
```env
DATABASE_URL="mongodb://localhost:27017/messenger?replicaSet=rs0&authSource=admin"
NEXTAUTH_SECRET="your_secret_key_here"

NEXT_PUBLIC_PUSHER_APP_KEY="app-key"
PUSHER_APP_ID="app-id"
PUSHER_SECRET="app-secret"
```

### 4. 인프라 실행 (Docker)
실시간 통신과 트랜잭션 지원을 위해 아래 컨테이너들을 실행합니다.

**MongoDB (Replica Set 모드)**:
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest --replSet rs0
# 잠시 대기 후 Replica Set 초기화
docker exec mongodb mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"
```

**Soketi (실시간 서버)**:
```bash
docker run -d --name soketi -p 6001:6001 -p 9601:9601 quay.io/soketi/soketi:latest-16-alpine
```

### 5. 데이터베이스 스키마 적용
```bash
npx prisma db push
```

### 6. 빌드 및 시작
저사양 환경(2 Core, 4GB RAM 등)에서는 아래 명령어로 리소스를 제한하여 빌드하는 것을 권장합니다.
```bash
# 빌드
taskset -c 0 env NODE_OPTIONS="--max-old-space-size=2048" npm run build

# 서비스 시작 (외부 접속 허용)
npm start -- -H 0.0.0.0 -p 3000
```

## 🌐 포트 개방 안내 (Firewall)
외부에서 접속하기 위해 다음 포트들이 열려 있어야 합니다.
- **3000**: 웹 애플리케이션 접속용 (HTTP)
- **6001**: 실시간 웹소켓(WS) 통신용 (Soketi)

---
Developed by SilverRuler.
