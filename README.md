# Portfolio Website - GitHub Pages 배포

## 📁 폴더 구조
```
docs/
├── index.html          # 메인 페이지
├── styles.css          # 스타일시트
├── script.js           # 자바스크립트
├── test.html           # 테스트 페이지
└── assets/
    ├── images/         # 이미지 파일들
    │   ├── aboutme.jpg
    │   ├── main_resized.jpg
    │   ├── thumbnails/
    │   ├── SNS 운영계획서/
    │   ├── 해피팝광고영상기획서/
    │   ├── 해피팝상세페이지/
    │   └── 인스타 운영 및 성과 보고서/
    └── videos/         # 비디오 파일들
        ├── happy pop.mp4
        ├── Final output.mp4
        ├── wedding Final.mp4
        ├── final videos.mp4
        └── howl's.mp4
```

## 🚀 GitHub Pages 배포 방법

### 1. GitHub 저장소 설정
1. GitHub에서 새 저장소 생성
2. 저장소 설정 → Pages
3. Source를 "Deploy from a branch"로 설정
4. Branch를 "main" 또는 "master"로 설정
5. Folder를 "/docs"로 설정

### 2. 파일 업로드
- `docs` 폴더의 모든 내용을 GitHub 저장소에 업로드
- 또는 Git 명령어 사용:
```bash
git add .
git commit -m "Initial commit for GitHub Pages"
git push origin main
```

### 3. 배포 확인
- GitHub Actions에서 배포 진행 상황 확인
- 배포 완료 후 `https://[username].github.io/[repository-name]`에서 사이트 확인

## ✅ 확인 사항

- [x] 모든 이미지 경로가 `assets/images/...`로 설정됨
- [x] 모든 비디오 경로가 `assets/videos/...`로 설정됨
- [x] CSS와 JS 파일 경로가 상대경로로 설정됨
- [x] docs 폴더 내에서 모든 리소스가 정상 로드됨

## 🔧 문제 해결

### 이미지가 로드되지 않는 경우
- 파일 경로가 `assets/images/...`로 시작하는지 확인
- 파일명에 한글이 포함된 경우 URL 인코딩 확인

### 비디오가 재생되지 않는 경우
- 파일 경로가 `assets/videos/...`로 시작하는지 확인
- 파일 크기가 GitHub의 제한(100MB) 이하인지 확인

## 📱 테스트
- `test.html` 파일로 기본 구조 확인
- `index.html`로 전체 사이트 동작 확인
- 모바일과 데스크톱에서 반응형 동작 확인
