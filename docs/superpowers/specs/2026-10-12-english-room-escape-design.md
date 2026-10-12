# 초등학교 6학년 필수 영단어 100개 방탈출 웹앱 설계서 (Design Specification)

- **작성일**: 2026-10-12
- **대상**: 초등학교 6학년 학생 (만 11~12세)
- **주제**: 초등 필수 영단어 100개를 마스터하며 탈출하는 인터랙티브 방탈출 웹앱
- **비주얼 스타일**: Doodle / Notebook / Blue Ink (손글씨 공책 낙서 감성)

---

## 1. 개요 및 기획 의도
초등학교 6학년 학생들이 지루한 암기식 단어 학습에서 벗어나, 자신이 마치 방과 후 잠긴 학교에서 '낙서투성이 비밀 공책'을 발견해 단서를 풀고 탈출하는 탐정이 된 듯한 몰입감을 제공한다.
학습자가 직관적이고 경쾌한 스피드 퀴즈(4지선다, 철자 스크램블, 짝 맞추기)와 최종 방탈출 암호 해독을 통해 자연스럽게 100개의 핵심 어휘를 체득할 수 있도록 한다.

---

## 2. 비주얼 및 오디오 디자인 시스템

### 2.1 색상 팔레트
- **배경 (Paper Background)**: 미색 종이 질감 `#FDFBF7`
  - 줄 노트 무늬: 28px 간격의 은은한 가로선 `#D0E1FD`
  - 왼쪽 마진선: 빨간색 세로 구분선 `#FFAAA6`
- **주요 텍스트 (Primary Ink)**: `#0000CD` (모나미 볼펜 파란 잉크색)
- **강조 및 첨삭 (Correction Ink)**: `#FF0000` (선생님 채점 빨간 플러스펜)
- **하이라이트/보조 (Paper & Tippex)**: `#FFFFFF` (수정액 테이프, 접착 메모지)
- **낙서 연필선 (Pencil Graphite)**: `#374151` (연필 스케치 및 음영)
- **커피 얼룩 (Coffee Stain)**: `#D97706` 15~20% 투명도

### 2.2 타이포그래피
- **웹 폰트**:
  - 영문: `Caveat`, `Patrick Hand`
  - 한글: `Gaegu` (개구체)
- **스타일링**:
  - 약간의 회전 각도 (`-1.5deg ~ 1.5deg`)로 자연스러운 손글씨 느낌 부여
  - 정답 시 굵은 빨간펜 동그라미(`⭕`), 오답 시 빨간펜 사선(`❌`) 및 지익 긋는 취소선 효과
  - 메모지 테이핑 및 포스트잇 그림자 효과

### 2.3 일러스트레이션 & 마진리아 (Marginalia)
- 여백에 배치되는 인터랙티브 손그림 요소:
  - 막대인간(Stick figures)의 다양한 포즈 (응원, 고민, 탈출 만세)
  - 별표(Doodle stars), 느낌표, 전구(Hint), 지그재그 화살표
  - 커피 잔 바닥 자국(Coffee ring stain SVG), 핀/클립

### 2.4 오디오 시스템
- **Web Audio API**: 순수 브라우저 프로그래밍 방식(외부 mp3 불필요)
  - 연필 사각거리는 소리 (White noise filter)
  - 정답 빨간펜 동그라미 딩 소리 (Sine wave chime)
  - 오답 쓱싹 소리 (Low-pass noise burst)
  - 방 이동 종이 넘김 소리 (Page flip rustle)
- **Web Speech API**: 브라우저 내장 `speechSynthesis`로 영어 원어민 음성(`en-US`) 발음 지원
- **사운드 제어**: 우측 상단 마스킹 테이프 형태의 음소거 토글 버튼

---

## 3. 5개 스테이지 및 100개 단어 데이터셋

총 100개의 초등 6학년 필수 어휘를 5개 스테이지(각 20단어)로 구성한다.

### Stage 1: The Locked Classroom (잠긴 교실) - 20단어
- **단어 목록**:
  1. `pencil` (연필)
  2. `ruler` (자)
  3. `eraser` (지우개)
  4. `teacher` (선생님)
  5. `student` (학생)
  6. `lesson` (수업)
  7. `question` (질문)
  8. `answer` (대답)
  9. `quiet` (조용한)
  10. `listen` (듣다)
  11. `speak` (말하다)
  12. `practice` (연습하다)
  13. `homework` (숙제)
  14. `remember` (기억하다)
  15. `choose` (선택하다)
  16. `correct` (맞는, 정확한)
  17. `mistake` (실수)
  18. `clever` (영리한)
  19. `friendly` (친절한)
  20. `borrow` (빌리다)
- **최종 탈출 암호 키워드**: `CLEVER` (영리함의 열쇠)

### Stage 2: The Whispering Library (속삭이는 도서관) - 20단어
- **단어 목록**:
  21. `library` (도서관)
  22. `story` (이야기)
  23. `search` (찾다, 수색하다)
  24. `history` (역사)
  25. `famous` (유명한)
  26. `exciting` (흥미진진한)
  27. `mystery` (수수께끼)
  28. `adventure` (모험)
  29. `chapter` (장, 챕터)
  30. `dictionary` (사전)
  31. `language` (언어)
  32. `writer` (작가)
  33. `read` (읽다)
  34. `write` (쓰다)
  35. `learn` (배우다)
  36. `believe` (믿다)
  37. `secret` (비밀)
  38. `silent` (조용한, 침묵의)
  39. `hidden` (숨겨진)
  40. `discover` (발견하다)
- **최종 탈출 암호 키워드**: `SECRET` (비밀의 열쇠)

### Stage 3: The Crazy Science Lab (엉뚱한 과학실) - 20단어
- **단어 목록**:
  41. `science` (과학)
  42. `experiment` (실험)
  43. `invent` (발명하다)
  44. `nature` (자연)
  45. `planet` (행성)
  46. `earth` (지구)
  47. `energy` (에너지)
  48. `danger` (위험)
  49. `future` (미래)
  50. `machine` (기계)
  51. `space` (우주, 공간)
  52. `gravity` (중력)
  53. `robot` (로봇)
  54. `temperature` (온도)
  55. `water` (물)
  56. `light` (빛, 가벼운)
  57. `heavy` (무거운)
  58. `strange` (이상한)
  59. `solve` (풀다, 해결하다)
  60. `wonder` (궁금해하다, 경이)
- **최종 탈출 암호 키워드**: `ENERGY` (동력 장치 가동 키)

### Stage 4: The Illusory Art Room (환상의 미술실) - 20단어
- **단어 목록**:
  61. `colorful` (다채로운)
  62. `draw` (그리다)
  63. `paint` (칠하다)
  64. `shadow` (그림자)
  65. `picture` (그림, 사진)
  66. `design` (디자인)
  67. `beauty` (아름다움)
  68. `creative` (창의적인)
  69. `imagination` (상상력)
  70. `brush` (붓)
  71. `shape` (모양)
  72. `pattern` (패턴, 무늬)
  73. `bright` (밝은)
  74. `dream` (꿈)
  75. `feeling` (느낌, 감정)
  76. `music` (음악)
  77. `express` (표현하다)
  78. `create` (창조하다)
  79. `master` (달인, 마스터)
  80. `magic` (마법)
- **최종 탈출 암호 키워드**: `BRIGHT` (빛의 액자 암호)

### Stage 5: The Secret Vault & Grand Exit (비밀창고 & 최종 탈출구) - 20단어
- **단어 목록**:
  81. `escape` (탈출하다)
  82. `freedom` (자유)
  83. `locked` (잠긴)
  84. `key` (열쇠)
  85. `treasure` (보물)
  86. `password` (비밀번호)
  87. `clock` (시계)
  88. `hurry` (서두르다)
  89. `success` (성공)
  90. `courage` (용기)
  91. `victory` (승리)
  92. `together` (함께)
  93. `journey` (여정)
  94. `open` (열다)
  95. `final` (마지막의)
  96. `brave` (용감한)
  97. `mission` (임무)
  98. `challenge` (도전)
  99. `celebrate` (축하하다)
  100. `hero` (영웅)
- **최종 탈출 암호 키워드**: `VICTORY` (최종 정문 해제 마스터 코드)

---

## 4. 게임 모드 & 퀴즈 엔진 구조

각 스테이지는 20개 단어를 3단계 미니게임과 최종 보스 다이얼로 나누어 소화한다:

1. **Phase 1: Speed 4-Choice (8단어)**
   - 문제 카드에 영단어 제시 + 원어민 발음 자동 재생
   - 4개 손글씨 선지 중 올바른 우리말 뜻 빠르게 선택
   - 즉각적인 동그라미/가위표 피드백 및 콤보 누적
2. **Phase 2: Alphabet Scramble (6단어)**
   - 섞인 파란 잉크 글자 블록들을 클릭하여 올바른 스펠링 조합
   - 발음 듣기 버튼 및 한글 힌트 제공
3. **Phase 3: Card Match Memory (6단어 / 12장)**
   - 영어 단어와 한국어 뜻 카드를 뒤집어 짝 맞추기
4. **Boss Cipher Dial**:
   - 3개 페이즈를 완료하면 해당 방의 최종 금고 다이얼 오픈
   - 단서 조각을 바탕으로 알파벳/숫자 조합 입력 후 `CLEAR` 스탬프 획득

---

## 5. 학습 지원 & 부가 기능
- **100단어 비밀 단어장 (Vocabulary Notebook)**:
  - 헤더의 공책 탭을 누르면 언제든 열람 가능한 전체 100단어 사전
  - 스테이지별 필터링, 검색, 원어민 발음 듣기, 뜻/예문 확인
- **진행도 저장 (LocalStorage)**:
  - 스테이지 클리어 상태, 해금된 단어 수, 획득한 암호 키를 브라우저에 보관
- **최종 탈출 명예의 전당**:
  - 100개 단어 완전 정복 시 '영어 방탈출 마스터' 인증서 도장 및 팡파레 연출

---

## 6. 기술 아키텍처 및 구현 스택
- **프레임워크**: React 18 / Vite / TypeScript
- **스타일링**: Tailwind CSS + Custom CSS (Notebook lined paper gradient, red margins, handwritten transform)
- **오디오**: Procedural Web Audio API sound generator + Web Speech API
- **디자인 컴포넌트**:
  - `NotebookPaper`: 줄 노트 및 마진 레이아웃
  - `DoodleDecorations`: 막대인간, 별, 화살표, 커피 자국 인라인 SVG
  - `SpeedQuiz4Choice`: 4지선다 스피드 퀴즈 컴포넌트
  - `AlphabetScramble`: 철자 조합 컴포넌트
  - `CardMatchMemory`: 카드 뒤집기 메모리 컴포넌트
  - `RoomCipherLock`: 방탈출 다이얼 자물쇠
  - `WordNotebookModal`: 100단어 학습 사전
  - `GrandEscapeModal`: 최종 탈출 엔딩
