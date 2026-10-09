# CPL 2.0 Starter

모바일 우선 CPL 공개 사이트의 초기 시제품입니다.

## 포함 파일
- `index.html` — 홈, 경기, 순위, 선수, 포스트시즌, 관리자 데모
- `assets/style.css` — 반응형 스타일
- `assets/app.js` — 예시 데이터와 브라우저 로컬 데모 동작
- `docs/FIREBASE_SETUP.md` — Firebase 연결 전 체크리스트
- `docs/firestore.rules.example` — 인증 기반 읽기/쓰기 규칙의 시작 예시
- `docs/DATA_MODEL.md` — 데이터 모델 초안

## 매우 중요
현재 관리자 데모는 `localStorage`에만 저장합니다. 실제 인증이나 서버 저장은 없습니다. 실제 CPL 공식 결과를 입력하지 마세요. 실제 사용 전 Firebase Authentication, Firestore Security Rules, 관리자 역할 설정 및 테스트가 필요합니다.

## GitHub에 올리기
1. GitHub에서 새 저장소 `CPL`을 만듭니다.
2. Add README를 선택하거나 이 폴더의 파일을 업로드합니다.
3. `index.html`, `assets/`, `docs/`를 저장소 최상위에 둡니다.
4. Settings → Pages → Build and deployment에서 `Deploy from a branch`를 선택하고 `main` 및 `/(root)`를 지정합니다.
5. 공개 사이트가 열리는지 확인합니다. 프로젝트 사이트 주소는 보통 `https://<계정명>.github.io/CPL/` 형식입니다.

Firebase 연결 전에는 사이트가 데모 상태라는 안내를 유지하세요.
