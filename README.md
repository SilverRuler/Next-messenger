# Next.js 13 Messenger - Vercel Deployment Version

이 버전은 Vercel(Serverless), MongoDB Atlas(Free Tier), Pusher(Sandbox)를 사용하여 배포할 수 있도록 최적화된 버전입니다.

## 🚀 주요 변경 사항

- **Real-time**: Soketi(Self-hosted) -> Pusher Channels (Sandbox Plan)
- **Database**: Local MongoDB Replica Set -> MongoDB Atlas (Free Tier)
- **Environment**: Vercel Serverless 최적화 (Prisma Singleton 패턴 적용)

## 🛠 환경 변수 설정 (.env)

Vercel 배포 시 또는 로컬 개발 시 아래 환경 변수들이 필요합니다.

```env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/messenger?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your_nextauth_secret"

# Pusher (Real-time)
NEXT_PUBLIC_PUSHER_APP_KEY="your_pusher_key"
NEXT_PUBLIC_PUSHER_CLUSTER="your_pusher_cluster"
PUSHER_APP_ID="your_pusher_id"
PUSHER_SECRET="your_pusher_secret"

# Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_name"

# Auth Providers
GITHUB_ID="your_github_id"
GITHUB_SECRET="your_github_secret"
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
```

## 📦 설치 및 로컬 실행

1. **의존성 설치**:
   ```bash
   npm install
   ```

2. **Prisma 클라이언트 생성**:
   ```bash
   npx prisma generate
   ```

3. **로컬 실행**:
   ```bash
   npm run dev
   ```

## 🌐 Vercel 배포 가이드

1. **MongoDB Atlas**:
   - Cluster 생성 후 `DATABASE_URL` 획득.
   - Network Access에서 `0.0.0.0/0` 허용 (Vercel IP 범위 대응).

2. **Pusher Channels**:
   - App 생성 후 `App Keys` 확인.
   - Sandbox Plan 사용 권장.

3. **Vercel Project 설정**:
   - Vercel에서 프로젝트 Import.
   - 위 `환경 변수 설정` 섹션의 모든 변수 등록.
   - `Build Command`: `next build`
   - `Install Command`: `npm install`

---
Developed by SilverRuler. Modified for Vercel Deployment.
