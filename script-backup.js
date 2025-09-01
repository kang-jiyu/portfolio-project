// =====================
// Mobile Navigation
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(n =>
    n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    })
  );
}

// =====================
// Social Media Posts - Read More Links & Image Click
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // "Read more" 버튼 → 새 탭 링크
  document.querySelectorAll('.post-card .read-more').forEach(button => {
    button.addEventListener('click', function() {
      const postCard = this.closest('.post-card');
      const link = postCard.getAttribute('data-link');
      if (link) window.open(link, '_blank', 'noopener,noreferrer');
    });
  });

  // 이미지 클릭 → 새 탭 링크
  document.querySelectorAll('.post-card img').forEach(img => {
    img.addEventListener('click', function() {
      const postCard = this.closest('.post-card');
      const link = postCard.getAttribute('data-link');
      if (link) window.open(link, '_blank', 'noopener,noreferrer');
    });
    img.style.cursor = 'pointer';
  });
});

// =====================
// Smooth Scroll
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// =====================
// Navbar on Scroll
// =====================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// =====================
// Section Reveal
// =====================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// =====================
// Button hover micro-anim
// =====================
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.2s ease';
  });
  
  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

// =====================
// Video Modal
// =====================
const videoModal = document.getElementById('videoModal');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalClose = document.querySelector('.video-modal-close');

if (videoModal && videoModalTitle && videoModalPlayer && videoModalClose) {
  // 비디오 링크 클릭 시 모달 열기
  document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 더 정확한 비디오 찾기 방법
      const video = link.querySelector('video source') || 
                   link.querySelector('.portfolio-thumbnail video source') ||
                   link.querySelector('.media-frame video source');
      
      const title = link.querySelector('h3')?.textContent || 'Video';
      
      console.log('Found video:', video); // 디버깅용
      console.log('Video src:', video?.src); // 디버깅용
      
      if (video && video.src) {
        videoModalPlayer.src = video.src;
        videoModalTitle.textContent = title;
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      } else {
        console.error('Video not found or no source:', link);
      }
    });
  });

  // 모달 닫기
  videoModalClose.addEventListener('click', () => {
    videoModal.classList.remove('show');
    document.body.style.overflow = '';
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;
  });

  // 모달 외부 클릭 시 닫기
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('show');
      document.body.style.overflow = '';
      videoModalPlayer.pause();
      videoModalPlayer.currentTime = 0;
    }
  });

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
      videoModal.classList.remove('show');
      document.body.style.overflow = '';
      videoModalPlayer.pause();
      videoModalPlayer.currentTime = 0;
    }
  });
}

// =====================
// Project Modal
// =====================
(() => {
  const projectModal = document.getElementById('projectModal');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalContent = document.querySelector('.project-modal-content');
  const projectModalBody = document.querySelector('.project-modal-body');
  const projectModalClose = document.querySelector('.project-modal-close');

  // 프로젝트 데이터
  window.projectData = {
    'happy-pop-detail': {
      title: '해피팝 상세페이지',
      slides: [
        { src: 'assets/images/해피팝상세페이지/Artboard 1.png', title: '1. 커버' },
        { src: 'assets/images/해피팝상세페이지/Artboard 2.png', title: '2. 브랜드 스토리' },
        { src: 'assets/images/해피팝상세페이지/Artboard 3.png', title: '3. 제품 소개' },
        { src: 'assets/images/해피팝상세페이지/Artboard 4.png', title: '4. 안전성 메시지' },
        { src: 'assets/images/해피팝상세페이지/GIF/4-1.gif', title: '4-1. 안전성 메시지 애니메이션' },
        { src: 'assets/images/해피팝상세페이지/Artboard 5.png', title: '5. 인증/스펙' },
        { src: 'assets/images/해피팝상세페이지/Artboard 6.png', title: '6. 구성품 상세' },
        { src: 'assets/images/해피팝상세페이지/GIF/6-1.gif', title: '6-1. 구성품 상세 애니메이션' },
        { src: 'assets/images/해피팝상세페이지/Artboard 7.png', title: '7. 체크포인트' },
        { src: 'assets/images/해피팝상세페이지/GIF/7-1.gif', title: '7-1. 체크포인트 애니메이션' },
        { src: 'assets/images/해피팝상세페이지/Artboard 8.png', title: '8. 사용 씬' },
        { src: 'assets/images/해피팝상세페이지/Artboard 9.png', title: '9. 리뷰/소셜 프루프' }
      ]
    },
    'sns-strategy': {
      title: 'SNS 운영계획서',
      slides: [
        { src: 'assets/images/SNS 운영계획서/Artboard 1.png', title: '1. SNS 운영계획서 1' },
        { src: 'assets/images/SNS 운영계획서/Artboard 2.png', title: '2. SNS 운영계획서 2' },
        { src: 'assets/images/SNS 운영계획서/Artboard 3.png', title: '3. SNS 운영계획서 3' },
        { src: 'assets/images/SNS 운영계획서/Artboard 4.png', title: '4. SNS 운영계획서 4' },
        { src: 'assets/images/SNS 운영계획서/Artboard 5.png', title: '5. SNS 운영계획서 5' },
        { src: 'assets/images/SNS 운영계획서/Artboard 6.png', title: '6. SNS 운영계획서 6' },
        { src: 'assets/images/SNS 운영계획서/Artboard 7.png', title: '7. SNS 운영계획서 7' },
        { src: 'assets/images/SNS 운영계획서/Artboard 8.png', title: '8. SNS 운영계획서 8' }
      ]
    },
    'happy-pop-video': {
      title: '해피팝 광고영상기획서',
      slides: [
        { src: 'assets/images/해피팝광고영상기획서/Artboard 1.png', title: '1. 커버' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 2.png', title: '2. 스토리보드 1' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 3.png', title: '3. 스토리보드 2' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 4.png', title: '4. 스토리보드 3' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 5.png', title: '5. 스토리보드 4' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 6.png', title: '6. 스토리보드 5' },
        { src: 'assets/images/해피팝광고영상기획서/Artboard 7.png', title: '7. 스토리보드 6' }
      ]
    },
    'instagram-report': {
      title: '인스타 운영 및 성과보고서',
      slides: [
        { src: 'assets/images/인스타 운영 및 성과 보고서/Instagram _1.jpg', title: '1. 인스타그램 운영 현황' },
        { src: 'assets/images/인스타 운영 및 성과 보고서/Instagram _2.jpg', title: '2. 콘텐츠 전략 및 기획' },
        { src: 'assets/images/인스타 운영 및 성과 보고서/Instagram _3.jpg', title: '3. 성과 분석 및 인사이트' },
        { src: 'assets/images/인스타 운영 및 성과 보고서/Instagram _4.jpg', title: '4. 운영 전략 및 개선안' },
        { src: 'assets/images/인스타 운영 및 성과 보고서/Instagram _5.jpg', title: '5. 향후 계획 및 목표' }
      ]
    }
  };

  let currentProject = null;
  let currentSlide = 0;

  function openProjectModal(projectId) {
    const project = window.projectData[projectId];
    if (!project) return;

    currentProject = project;
    currentSlide = 0;
    projectModalTitle.textContent = project.title;

    // 모달 본문 구성
    projectModalBody.innerHTML = `
      <div class="project-viewer">
        <div class="thumbnail-sidebar" id="thumbGrid"></div>
        <div class="main-content">
          <div class="main-image-container">
            <img id="mainImage" alt="slide" />
          </div>
          <div class="viewer-controls" id="viewerControls">
            <button class="nav-btn" id="prevBtn" aria-label="Previous">‹</button>
            <div class="page-info" id="pageInfo">1 / 1</div>
            <button class="nav-btn" id="nextBtn" aria-label="Next">›</button>
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    initSlideViewer();
  }

  function initSlideViewer() {
    const mainImage = document.getElementById('mainImage');
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbGrid = document.getElementById('thumbGrid');

    if (!mainImage || !pageInfo || !prevBtn || !nextBtn || !thumbGrid) return;

    const allSlides = currentProject.slides;

    function renderThumbnails() {
      thumbGrid.innerHTML = '';
      allSlides.forEach((slide, idx) => {
        const item = document.createElement('div');
        item.className = 'thumbnail-item' + (idx === currentSlide ? ' active' : '');
        item.innerHTML = `
          <img src="${slide.src}" alt="thumb ${idx + 1}">
          <div class="thumbnail-title">${slide.title || '페이지 ' + (idx + 1)}</div>
        `;
        item.addEventListener('click', () => goTo(idx));
        thumbGrid.appendChild(item);
      });
    }

    function updateViewer() {
      const slide = allSlides[currentSlide];
      mainImage.src = slide.src;
      pageInfo.textContent = `${currentSlide + 1} / ${allSlides.length}`;
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === allSlides.length - 1;
      renderThumbnails();
    }

    function goTo(idx) {
      currentSlide = idx;
      updateViewer();
    }

    function next() {
      if (currentSlide < allSlides.length - 1) {
        goTo(currentSlide + 1);
      }
    }

    function prev() {
      if (currentSlide > 0) {
        goTo(currentSlide - 1);
      }
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    updateViewer();
  }

  function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // 모달 닫기
  projectModalClose?.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', e => {
    if (e.target === projectModal) closeProjectModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) closeProjectModal();
  });

  // 프로젝트 버튼 이벤트 리스너
  document.addEventListener('DOMContentLoaded', () => {
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    viewProjectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectItem = btn.closest('.project-item');
        if (!projectItem) return;
        
        const projectId = projectItem.getAttribute('data-project');
        if (!projectId) return;
        
        console.log('Project button clicked:', projectId); // 디버깅용
        
        // 상세페이지는 새 창으로, 나머지는 모달로
        if (projectId === 'happy-pop-detail') {
          // 해피팝 상세페이지는 새 창에서 열기
          const project = window.projectData?.[projectId];
          if (project) {
            const newWindow = window.open('', '_blank', 'width=800,height=1200,scrollbars=yes,resizable=yes');
            newWindow.document.write(`
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${project.title}</title>
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { font-family: 'Inter', sans-serif; background: #f8f9fa; color: #2c2c2c; line-height: 1.6; padding: 20px; }
                  .header { text-align: center; margin-bottom: 30px; padding: 25px; background: #e8f4f8; border-radius: 15px; border: 2px solid #d1e7dd; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                  .header h1 { font-size: 2.2rem; margin-bottom: 12px; color: #2c2c2c; font-weight: 700; }
                  .header p { font-size: 1rem; color: #666; margin: 0; }
                  .content { max-width: 700px; margin: 0 auto; }
                  .section { margin-bottom: 30px; }
                  .section h2 { font-size: 1.8rem; margin-bottom: 25px; text-align: center; color: #2c2c2c; font-weight: 600; }
                  .all-content { display: flex; flex-direction: column; background: #ffffff; border: 2px solid #e0e0e0; border-radius: 15px; padding: 20px; max-width: 700px; margin: 0 auto; box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
                  .image-item { text-align: center; transition: all .3s; width: 100%; margin-bottom: 20px; padding: 0; background: #fafafa; border-radius: 12px; border: 1px solid #f0f0f0; overflow: hidden; }
                  .image-item:last-child { margin-bottom: 0; }
                  .image-item:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); background: #ffffff; }
                  .image-item img { width: 100%; max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e8e8e8; margin: 0; padding: 0; display: block; object-fit: contain; }
                  .close-btn { position: fixed; top: 25px; right: 25px; background: #282928; color: #ffffff; border: none; padding: 12px 25px; border-radius: 25px; font-size: 1rem; cursor: pointer; font-weight: 600; transition: all .3s; box-shadow: 0 4px 15px rgba(0,0,0,0.25); z-index: 1000; }
                  .close-btn:hover { background: #515150; transform: scale(1.05); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
                  @media (max-width: 768px) { body { padding: 15px; } .header h1 { font-size: 1.8rem; } .content { padding: 0; } .all-content { padding: 15px; } }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>${project.title}</h1>
                  <p>브랜드 스토리와 제품 정보를 담은 상세페이지 디자인</p>
                </div>
                <div class="content">
                  <div class="section">
                    <h2>프로젝트 개요</h2>
                    <div class="all-content">
                      ${project.slides.map(slide => `
                        <div class="image-item">
                          <img src="${slide.src}" alt="${slide.title}" />
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
                <button class="close-btn" onclick="window.close()">창 닫기</button>
              </body>
              </html>
            `);
            newWindow.document.close();
          }
        } else {
          // 나머지 프로젝트는 모달로 열기
          openProjectModal(projectId);
        }
      });
    });
  });
                      .image-item { margin-bottom: 15px; }
                    }
                  </style>
                </head>
                <body>
                  <button class="close-btn" onclick="window.close()">닫기</button>
                  <div class="header">
                    <h1>${project.title}</h1>
                    <p>브랜드 스토리와 제품 정보를 담은 상세페이지 디자인</p>
                  </div>
                  <div class="content">
                    <div id="slides" class="section">
                      <h2>상세페이지</h2>
                      <div class="all-content">
                        ${project.slides.map(slide => `
                          <div class="image-item">
                            <img src="${slide.src}" alt="${slide.title}" loading="lazy">
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  </div>
                </body>
                </html>
              `);
              newWindow.document.close();
            }
          } else {
            // 다른 프로젝트는 모달로 열기
            openProjectModal(projectId);
          }
      });
    });
  });
})();

// =====================
// Portfolio Video Title Box Styling
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // 영상 제목 박스 스타일 적용
  document.querySelectorAll('.video-title-box').forEach(el => {
    el.style.setProperty('background', 'rgba(255,255,255,0.85)', 'important');
    el.style.setProperty('color', '#111', 'important');
    el.style.setProperty('border', '1px solid rgba(0,0,0,0.08)', 'important');
    el.style.setProperty('box-shadow', '0 6px 16px rgba(0,0,0,0.1)', 'important');
    el.style.setProperty('border-radius', '8px', 'important');
    el.style.setProperty('padding', '6px 12px', 'important');
    el.style.setProperty('text-align', 'center', 'important');
    el.style.setProperty('z-index', '9999', 'important');
  });
// =====================
// Portfolio – 제목 1행, 썸네일 2행 + 모든 캡슐/오버레이/중복테두리 제거 (강제)
// =====================
(function () {
  // 0) 페이지 상단에 한 번만 주입: 모든 pseudo 요소(캡슐 끝단 등) 끄기
  function killAllPseudo() {
    const s = document.createElement('style');
    s.textContent = `
      /* 포트폴리오 카드 내부의 before/after 전부 제거 */
      #portfolio .portfolio-item *::before,
      #portfolio .portfolio-item *::after {
        content: none !important;
        display: none !important;
        background: transparent !important;
        box-shadow: none !important;
        border: 0 !important;
        filter: none !important;
      }
      /* 카드 hover 필터/오버레이 제거 */
      #portfolio .portfolio-item:hover .portfolio-thumbnail img,
      #portfolio .portfolio-thumbnail:hover img,
      #portfolio .portfolio-item:hover video {
        filter: none !important;
        opacity: 1 !important;
      }
      #portfolio .portfolio-thumbnail::after { display: none !important; }
    `;
    document.head.appendChild(s);
  }

  function fixPortfolio() {
    const root = document.querySelector('#portfolio') || document.querySelector('.portfolio');
    if (!root) return;

    root.querySelectorAll('.portfolio-item').forEach(item => {
      // 레이아웃을 제목(윗줄) + 프레임(아랫줄) 세로 배치로 강제
      Object.assign(item.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      });

      // 프레임 후보
      let frame =
        item.querySelector('.media-frame') ||
        item.querySelector('.portfolio-thumbnail') ||
        item.querySelector('.thumbnail') ||
        item.querySelector('video') ||
        item.querySelector('img');

      // 1) 오버레이/마스크/그라디언트/라벨/칩 등 제거
      item.querySelectorAll(
        '[class*="overlay"],[class*="mask"],[class*="gradient"],[class*="glow"],' +
        '[class*="chip"],[class*="badge"],[class*="label"]'
      ).forEach(n => n.remove());

      // 2) 제목 후보들 확보
      const titleCand =
        item.querySelector('.video-title-box') ||
        item.querySelector('.video-title') ||
        item.querySelector('h3') ||
        item.querySelector('[class*="title"]');

      let titleText = '';
      if (titleCand) {
        titleText = titleCand.textContent.trim();
        // 이 엘리먼트와 내부 장식은 통째로 제거 (검은 캡/캡슐 흔적 방지)
        titleCand.remove();
      }

      // 3) 프레임 준비: 없으면 만들어서 썸네일/비디오 감싸기
      if (!frame) {
        const found = item.querySelector('img,video');
        if (found) frame = found.parentElement || found;
      }

      if (frame) {
        const clipTarget =
          frame.classList?.contains('media-frame') ||
          frame.classList?.contains('portfolio-thumbnail') ||
          frame.tagName === 'DIV'
            ? frame
            : frame.parentElement || frame;

        // 프레임 자체만 둥근 모서리 + 얇은 테두리 (유일한 외곽선)
        Object.assign(clipTarget.style, {
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,.08)',
          boxShadow: 'none'
        });

        // 내부 미디어는 평평하게
        clipTarget.querySelectorAll('img,video').forEach(el => {
          Object.assign(el.style, {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '0',
            boxShadow: 'none',
            border: '0',
            outline: '0'
          });
        });
      }

      // 4) 새 제목을 “텍스트만” 만들어 위쪽에 붙이기
      const newTitle = document.createElement('div');
      newTitle.className = 'pf-title';
      newTitle.textContent = titleText || item.getAttribute('data-title') || '';
      // 제목이 비어 있으면 만들지 않음
      if (newTitle.textContent.trim()) {
        Object.assign(newTitle.style, {
          background: 'rgba(255,255,255,.9)',
          color: '#111',
          border: '1px solid rgba(0,0,0,.08)',
          boxShadow: '0 3px 12px rgba(0,0,0,.08)',
          borderRadius: '10px',
          padding: '8px 12px',
          margin: '0 8px 0 8px',
          fontWeight: '800',
          textAlign: 'left',
          alignSelf: 'flex-start'
        });
        item.insertBefore(newTitle, item.firstChild);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    killAllPseudo();
    fixPortfolio();
    // 다른 스크립트가 DOM을 더 만지면 한 번 더 정리
    setTimeout(fixPortfolio, 0);
    setTimeout(fixPortfolio, 300);
  });
  window.addEventListener('load', fixPortfolio);
})();
