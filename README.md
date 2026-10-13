# 🏫 초등 6학년 필수 영단어 100 방탈출 어드벤처
> **Elementary School 6th Grade English Room Escape Web App**  
> *"방과 후 굳게 닫힌 학교! 낙서투성이 비밀 공책의 단서를 풀고 100개 영단어를 정복하여 탈출하라!"*

[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://wbmaker2.github.io/english-room-exit-game/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌐 배포 서비스 링크 (Live Demo)

👉 **서비스 바로가기**: **[https://wbmaker2.github.io/english-room-exit-game/](https://wbmaker2.github.io/english-room-exit-game/)**  
*(PC, 태블릿, 모바일 브라우저 어디서나 무설치로 즉시 실행 가능합니다.)*

---

## 📖 프로젝트 개요

초등학교 6학년 학생들을 대상으로, 지루하고 반복적인 암기 학습 대신 **'공책 낙서 속 미스터리를 풀어 학교를 탈출하는 방탈출 어드벤처'** 컨셉으로 개발된 반응형 웹앱입니다.  
교육부 권장 초등 6학년 필수 어휘 100개를 엄선하여 5개 테마 구역에 배치하였으며, 스피드 4지선다, 알파벳 스크램블, 짝 맞추기 메모리 게임, 최종 다이얼 암호 자물쇠를 통해 자연스럽고 신나게 단어를 습득할 수 있습니다.

---

## 🎨 비주얼 디자인 스타일: Doodle / Notebook / Blue Ink

실제 학창 시절 줄 노트에 파란 유성 볼펜과 빨간 플러스펜으로 낙서하며 친구와 암호를 주고받던 아날로그 감성을 재현했습니다.

* **배경 (Paper Surface)**: 
  * 미색 종이 질감(`#FDFBF7`) 위의 28px 간격 파란 가로 줄무늬(`repeating-linear-gradient` `#D0E1FD`)
  * 좌측 빨간색 세로 마진선(`border-left` `#FFAAA6`) & 상단 바인더 링 홀 표현
* **주요 텍스트 (Primary Ink)**:
  * **`#0000CD`** (모나미 파란 유성 볼펜 잉크) - 펜촉의 진하고 선명한 잉크색
* **강조 & 첨삭 (Correction Ink)**:
  * **`#FF0000`** (선생님 채점 빨간펜) - 정답 동그라미(`⭕`), 오답 취소선(`❌`), 합격 도장 스탬프
* **하이라이트/메모 (Paper & Tippex)**:
  * **`#FFFFFF`** (화이트 수정액 질감의 버튼 및 테이프 메모지)
* **손글씨 타이포그래피 (Handwriting Fonts)**:
  * 영문: `Caveat`, `Patrick Hand` (자연스러운 펜글씨 필기체)
  * 한글: `Gaegu` (친근한 초등 개구체)
* **마진리아 (Marginalia) 손그림 낙서**:
  * 만세 부르는 막대인간, 고민하는 탐정 막대인간, 달리는 탈출 막대인간
  * 머그잔 바닥의 커피 얼룩(Coffee ring stain SVG), 별표, 전구, 지그재그 화살표, 스카치테이프

---

## 🏫 5개 테마 구역 & 100개 필수 영단어 구성표

총 100개의 핵심 어휘를 5개 구역(각 20단어)으로 스토리라인에 맞추어 분배했습니다.

| 구역 | 테마 | 필수 단어 (20개) | 탈출 암호 |
| :--- | :--- | :--- | :---: |
| **제1구역: 잠긴 교실**<br>*(The Locked Classroom)* | 학교 & 교실 일상 | `pencil`, `ruler`, `eraser`, `teacher`, `student`, `lesson`, `question`, `answer`, `quiet`, `listen`, `speak`, `practice`, `homework`, `remember`, `choose`, `correct`, `mistake`, `clever`, `friendly`, `borrow` | **`CLEVER`** |
| **제2구역: 속삭이는 도서관**<br>*(The Whispering Library)* | 이야기 & 탐구 | `library`, `story`, `search`, `history`, `famous`, `exciting`, `mystery`, `adventure`, `chapter`, `dictionary`, `language`, `writer`, `read`, `write`, `learn`, `believe`, `secret`, `silent`, `hidden`, `discover` | **`SECRET`** |
| **제3구역: 엉뚱한 과학실**<br>*(The Crazy Science Lab)* | 과학, 자연 & 실험 | `science`, `experiment`, `invent`, `nature`, `planet`, `earth`, `energy`, `danger`, `future`, `machine`, `space`, `gravity`, `robot`, `temperature`, `water`, `light`, `heavy`, `strange`, `solve`, `wonder` | **`ENERGY`** |
| **제4구역: 환상의 미술실**<br>*(The Illusory Art Room)* | 색채, 감각 & 창의력 | `colorful`, `draw`, `paint`, `shadow`, `picture`, `design`, `beauty`, `creative`, `imagination`, `brush`, `shape`, `pattern`, `bright`, `dream`, `feeling`, `music`, `express`, `create`, `master`, `magic` | **`BRIGHT`** |
| **제5구역: 비밀 금고 & 최종 탈출구**<br>*(The Grand Exit)* | 모험, 성공 & 승리 | `escape`, `freedom`, `locked`, `key`, `treasure`, `password`, `clock`, `hurry`, `success`, `courage`, `victory`, `together`, `journey`, `open`, `final`, `brave`, `mission`, `challenge`, `celebrate`, `hero` | **`VICTORY`** |

---

## 🎮 게임 시스템 및 플레이 흐름

각 방(20단어)은 지루함을 방지하기 위해 **3단계 아케이드 스피드 미니게임**과 **최종 보스 암호 해독**으로 전개됩니다.

```
[Phase 1] 4지선다 스피드런 (8단어)
     ↓
[Phase 2] 알파벳 스크램블 (6단어)
     ↓
[Phase 3] 카드 매칭 메모리 게임 (6단어 / 12장)
     ↓
[Boss] 다이얼 자물쇠 암호 해제 (단서 글자 조합)
     ↓
[Clear] STAGE CLEAR 도장 쾅! ➔ 다음 구역 열쇠 획득
```

1. **Phase 1: Speed 4-Choice Blitz (4지선다 스피드런 - 8단어)**
   - 파란 잉크 문제 카드에 단어와 원어민 발음 제시
   - 손글씨 선지 4개 중 정답 탭 시 빨간펜 동그라미(`⭕`) 및 연속 콤보(`Combo x3!`) 획득
   - 오답 시 빨간펜 취소선(`❌`)과 함께 단어 해설 즉시 표시
2. **Phase 2: Alphabet Scramble (철자 재배열 스크램블 - 6단어)**
   - 모눈종이 위에 흩어진 파란 잉크 글자 블록들을 클릭하여 올바른 스펠링 완성
   - 지우개(Reset) 및 발음 힌트 기능 지원
3. **Phase 3: Card Match (짝 맞추기 메모리 게임 - 6단어/12장 카드)**
   - 뒤집힌 12장의 미니 쪽지 카드에서 영단어와 우리말 뜻 한 쌍을 찾아 매칭
4. **Boss Mission: Dial Cipher Lock (다이얼 자물쇠 암호 해독)**
   - 앞서 수집한 단서 조각을 바탕으로 회전 다이얼에 비밀 단어를 입력하여 방 문을 오픈
5. **Grand Escape Ceremony (명예의 전당 인증서)**
   - 100개 단어를 모두 정복하면 '초등 6학년 방탈출 마스터' 명예 인증서 수여

---

## 🔊 오디오 & 음성 학습 지원

* **Web Audio API (프로시저럴 아날로그 효과음 엔진)**:
  * 외부 무거운 사운드 파일 의존 없이 브라우저 내장 오디오 신디사이저로 가벼운 사운드 실시간 합성
  * ✏️ **Pencil Scratch**: 글자 클릭 및 타일 조작 시 사각사각 연필 소리
  * ⭕ **Stamp Ding**: 정답 및 도장 쾅 소리
  * ❌ **Scratch Out**: 오답 시 볼펜으로 지익 긋는 소리
  * 📄 **Page Flip**: 구역 이동 시 바스락 종이 넘김 소리
  * 🎺 **Fanfare**: 암호 해독 및 스테이지 클리어 팡파레
* **Web Speech API (영단어 원어민 발음)**:
  * 브라우저 내장 `speechSynthesis`를 통해 자연스러운 미국 영어(`en-US`) 발음 청취 지원
  * 초등학생 귀에 쏙쏙 들어오도록 0.88배속의 또렷한 템포 적용
* **사운드 온/오프 토글**:
  * 화면 상단 버튼으로 조용한 교실이나 도서관에서도 언제든 무음 플레이 가능

---

## 📓 부가 기능 및 학습 보조 도구

* **100단어 비밀 수첩 (Word Notebook Modal)**:
  * 상단 탭에서 언제든 열람 가능한 전체 100단어 영단어장
  * 구역별 필터링, 검색 기능, 원어민 발음 듣기, 마스터한 단어 표시(`MASTERED ⭕`)
* **학교 탐험 지도 (Room Map Modal)**:
  * 5개 구역의 위치와 열쇠 잠금 해제 상태를 확인하고 원하는 구역으로 자유롭게 이동
* **로컬 자동 저장 (Auto Save)**:
  * 브라우저를 새로고침하거나 나중에 다시 접속해도 풀었던 스테이지와 단어 진도가 그대로 유지

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS + Custom CSS (Notebook grid, Lined paper gradient, Doodle borders)
* **Fonts**: Google Fonts (`Gaegu`, `Caveat`, `Patrick Hand`)
* **Icons**: Lucide React + Inline Hand-drawn SVG Doodles
* **Audio**: Procedural Web Audio API + Web Speech API (TTS)
* **Testing**: Vitest (100개 단어 및 5개 스테이지 데이터 무결성 검증 100% 통과)
* **Deployment**: GitHub Pages (`gh-pages` branch)

---

## 💻 로컬 개발 및 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/WBmaker2/english-room-exit-game.git
cd english-room-exit-game

# 2. 의존성 설치
npm install

# 3. 로컬 개발 서버 실행 (http://localhost:3000)
npm run dev

# 4. 단위 테스트 실행 (Vitest)
npm run test

# 5. 프로덕션 빌드
npm run build

# 6. GitHub Pages 배포
npm run deploy
```

---

## 📜 라이선스 (License)

This project is licensed under the MIT License - feel free to use and learn!
