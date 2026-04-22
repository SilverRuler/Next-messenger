##
[aial.silverruler.xyz](https://aial.silverruler.xyz)  


# Next.js 13 Messenger (Vercel Deployment Guide)

이 프로젝트는 Next.js 13, MongoDB Atlas, Pusher, Cloudinary를 사용하여 Vercel 무료 티어 환경에서 동작하도록 최적화된 실시간 메신저 애플리케이션입니다.

---

## 🚀 배포 전 준비 사항 (필수 서비스 설정)

배포를 완료하기 위해 다음 세 가지 서비스에 가입하고 설정해야 합니다.

### 1. MongoDB Atlas (Database)
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) 가입 및 로그인.
2. **Shared Cluster (Free)** 생성.
3. **Database Access**: 사용자(ID/PW)를 생성합니다. (권한: `Read and write to any database`)
4. **Network Access**: `0.0.0.0/0` (Allow Access from Anywhere)를 추가합니다. **(Vercel 서버 접속을 위해 필수)**
5. **Connection String**: `Connect` 버튼 -> `Drivers` -> `Node.js` 선택 후 주소 복사.
   - **주의**: 주소 중간의 `.net/` 뒤에 데이터베이스 이름(예: `messenger`)을 반드시 직접 입력해야 합니다.
   - 예: `mongodb+srv://ID:PW@cluster.mongodb.net/messenger?retryWrites=true&w=majority`

### 2. Pusher Channels (Real-time)
1. [Pusher](https://pusher.com/) 가입 및 로그인.
2. **Channels App** 생성 (Plan: **Sandbox**).
3. **App Keys** 메뉴에서 `app_id`, `key`, `secret`, `cluster` 정보를 확인합니다.

### 3. Cloudinary (Image Storage)
1. [Cloudinary](https://cloudinary.com/) 가입 및 로그인.
2. **Dashboard** 메인 화면에서 `Cloud Name`을 확인합니다.

---

## 🛠 Vercel 환경 변수 설정 (Environment Variables)

Vercel 프로젝트의 **Settings > Environment Variables** 탭에서 다음 변수들을 추가하세요.

| 변수 이름 (Key) | 설명 |
| :--- | :--- |
| `DATABASE_URL` | MongoDB Atlas 연결 주소 (DB 이름 포함 필수) |
| `NEXTAUTH_SECRET` | 보안용 임의 문자열 (예: `any_long_random_string`) |
| `NEXT_PUBLIC_PUSHER_APP_KEY` | Pusher의 `key` |
| `PUSHER_APP_ID` | Pusher의 `app_id` |
| `PUSHER_SECRET` | Pusher의 `secret` |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | Pusher의 `cluster` (예: `ap3`, `mt1`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary의 `Cloud Name` |

---

## 📦 최종 배포 및 데이터베이스 적용

환경 변수 설정이 완료되었다면 다음 단계를 진행하세요.

1. **Prisma 스키마 적용 (중요)**:
   로컬 터미널에서 아래 명령어를 실행하여 MongoDB Atlas에 테이블 구조를 생성합니다.
   ```bash
   npx prisma db push
   ```

2. **Vercel 재배포 (Redeploy)**:
   환경 변수는 배포 시점에 주입되므로, 변수 수정 후에는 Vercel 대시보드에서 **Redeploy**를 실행해야 정상 작동합니다.

---

## 🛠 기술 스택
- **Framework**: Next.js 13 (App Router)
- **Database**: MongoDB Atlas (via Prisma)
- **Real-time**: Pusher Channels
- **Storage**: Cloudinary
- **Auth**: Next-Auth

---
Developed by SilverRuler. Optimized for Vercel Deployment.
