# 📅 미리내 (Mirinae) - 데스크톱 캘린더 위젯

데스크톱 캘린더 위젯, 미리내입니다.
![2025-07-15105544-ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/921c367a-1537-4040-a7b6-5a1ffd94a5b7)

# ✨ 소개 (Introduction)

미리내는 Electron, Vite, React를 사용하여 제작된 데스크톱 캘린더 위젯 애플리케이션입니다.

바탕화면에서 항상 현재 날짜를 확인하고 싶다는 생각에서 출발했으며,

불필요한 기능 없이 핵심적인 캘린더 기능에만 집중하여 가볍고 빠르게 동작합니다.

# 🚀 주요 기능 (Features)

구글 캘린더 연동 : 구글캘린더와 연동해서 일정을 관리합니다.

간편한 날짜 이동: 이전 달, 다음 달로 손쉽게 이동할 수 있습니다.

오늘 날짜 하이라이트: 오늘 날짜를 시각적으로 강조하여 쉽게 알아볼 수 있습니다.

드래그 앤 드롭 이동: 위젯을 원하는 위치로 자유롭게 이동시킬 수 있습니다.

투명도 설정: 바탕화면과 자연스럽게 어우러지는 투명도를 설정할 수 있습니다.

다크 모드 : 사용자의 환경에 맞춰 다크 모드를 설정할 수 있습니다.

# 🛠️ 기술 스택 (Tech Stack)

프레임워크: Electron + Vite + React

프론트엔드: TypeScript, TailwindCSS

# 📦 설치 및 실행 방법 (Getting Started)

사전 준비
Node.js

npm 또는 yarn

1. 프로젝트 복제 (Clone)

```
git clone https://github.com/your-username/mirinae.git
cd mirinae
```

2. 의존성 설치 (Install)

```
npm install
```

3. 애플리케이션 빌드 (Build)

```
npm run build:win
```

빌드가 완료되면 release 폴더에 실행 파일이 생성됩니다.

# 📂 프로젝트 구조

FSD로 폴더구조를 작성했습니다.

```
mirinae/
├── build/
├── resource/
├── src/
│   ├── main/index.ts     # Electron 설정파일
│   ├── preload/index.ts
│   └── renderer/
|       ├── index.html
│       └── src/          # FSD구조 프로젝트 폴더
│           ├── app/
│           ├── entities/
│           ├── pages/
│           ├── shared/
│           ├── widgets/
│           ├── env.d.ts
│           └── main.tsx    # 리액트 앱 진입점
├── prettierrc.yaml
├── electron-builder.yml
├── electron-vite-config.ts
├── eslint.config.mjs
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── tsconfig.web.json
```
