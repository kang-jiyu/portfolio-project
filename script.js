// =====================
// Mobile Navigation
// =====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );
}

// =====================
// Social Media Posts - Read More Links & Image Click
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // "Read more" 버튼 → 새 탭 링크
  document.querySelectorAll(".post-card .read-more").forEach((button) => {
    button.addEventListener("click", function () {
      const postCard = this.closest(".post-card");
      const link = postCard.getAttribute("data-link");
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    });
  });

  // 이미지 클릭 → 새 탭 링크
  document.querySelectorAll(".post-card img").forEach((img) => {
    img.addEventListener("click", function () {
      const postCard = this.closest(".post-card");
      const link = postCard.getAttribute("data-link");
      if (link) window.open(link, "_blank", "noopener,noreferrer");
    });
    img.style.cursor = "pointer";
  });
});

// =====================
// Smooth Scroll
// =====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    // e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// =====================
// Navbar on Scroll
// =====================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// =====================
// Section Reveal
// =====================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// =====================
// Button hover micro-anim
// =====================
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
  });
});

// =====================
// Video Modal
// =====================
const videoModal = document.getElementById("videoModal");
const videoModalTitle = document.getElementById("videoModalTitle");
const videoModalPlayer = document.getElementById("videoModalPlayer");
const videoModalClose = document.querySelector(".video-modal-close");

if (videoModal && videoModalTitle && videoModalPlayer && videoModalClose) {
  // 비디오 링크 클릭 시 모달 열기
  document.querySelectorAll(".video-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      // e.preventDefault();

      // 더 정확한 비디오 찾기 방법
      const video =
        link.querySelector("video source") ||
        link.querySelector(".portfolio-thumbnail video source") ||
        link.querySelector(".media-frame video source");

      const title = link.querySelector("h3")?.textContent || "Video";

      console.log("Found video:", video); // 디버깅용
      console.log("Video src:", video?.src); // 디버깅용

      if (video && video.src) {
        videoModalPlayer.src = video.src;
        videoModalTitle.textContent = title;
        // videoModal.classList.add("show");
        // document.body.style.overflow = "hidden";
      } else {
        console.error("Video not found or no source:", link);
      }
    });
  });

  // 모달 닫기
  videoModalClose.addEventListener("click", () => {
    videoModal.classList.remove("show");
    document.body.style.overflow = "";
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;
  });

  // 모달 외부 클릭 시 닫기
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("show");
      document.body.style.overflow = "";
      videoModalPlayer.pause();
      videoModalPlayer.currentTime = 0;
    }
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.classList.contains("show")) {
      videoModal.classList.remove("show");
      document.body.style.overflow = "";
      videoModalPlayer.pause();
      videoModalPlayer.currentTime = 0;
    }
  });
}

// =====================
// Project Modal
// =====================
(() => {
  const projectModal = document.getElementById("projectModal");
  const projectModalTitle = document.getElementById("projectModalTitle");
  const projectModalContent = document.querySelector(".project-modal-content");
  const projectModalBody = document.querySelector(".project-modal-body");
  const projectModalClose = document.querySelector(".project-modal-close");

  // 프로젝트 데이터
  window.projectData = {
    "happy-pop-detail": {
      title: "해피팝 상세페이지",
      slides: [
        {
          src: "assets/images/해피팝상세페이지/Artboard 1.png",
          title: "1. 커버",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 2.png",
          title: "2. 브랜드 스토리",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 3.png",
          title: "3. 제품 소개",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 4.png",
          title: "4. 안전성 메시지",
        },
        {
          src: "assets/images/해피팝상세페이지/GIF/4-1.gif",
          title: "4-1. 안전성 메시지 애니메이션",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 5.png",
          title: "5. 인증/스펙",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 6.png",
          title: "6. 구성품 상세",
        },
        {
          src: "assets/images/해피팝상세페이지/GIF/6-1.gif",
          title: "6-1. 구성품 상세 애니메이션",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 7.png",
          title: "7. 체크포인트",
        },
        {
          src: "assets/images/해피팝상세페이지/GIF/7-1.gif",
          title: "7-1. 체크포인트 애니메이션",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 8.png",
          title: "8. 사용 씬",
        },
        {
          src: "assets/images/해피팝상세페이지/Artboard 9.png",
          title: "9. 리뷰/소셜 프루프",
        },
      ],
    },
    "sns-strategy": {
      title: "SNS 운영계획서",
      slides: [
        {
          src: "assets/images/SNS 운영계획서/Artboard 1.png",
          title: "1. SNS 운영계획서 1",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 2.png",
          title: "2. SNS 운영계획서 2",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 3.png",
          title: "3. SNS 운영계획서 3",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 4.png",
          title: "4. SNS 운영계획서 4",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 5.png",
          title: "5. SNS 운영계획서 5",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 6.png",
          title: "6. SNS 운영계획서 6",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 7.png",
          title: "7. SNS 운영계획서 7",
        },
        {
          src: "assets/images/SNS 운영계획서/Artboard 8.png",
          title: "8. SNS 운영계획서 8",
        },
      ],
    },
    "happy-pop-video": {
      title: "해피팝 광고영상기획서",
      slides: [
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 1.png",
          title: "1. 커버",
        },
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 2.png",
          title: "2. 스토리보드 1",
        },
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 3.png",
          title: "3. 스토리보드 2",
        },
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 4.png",
          title: "4. 스토리보드 3",
        },
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 5.png",
          title: "5. 스토리보드 4",
        },
        {
          src: "assets/images/해피팝광고영상기획서/Artboard 6.png",
          title: "6. 스토리보드 5",
        },
      ],
    },
    "instagram-report": {
      title: "인스타 운영 및 성과보고서",
      slides: [
        {
          src: "assets/images/인스타 운영 및 성과 보고서/Instagram _1.jpg",
          title: "1. 인스타 운영 및 성과보고서",
        },
        {
          src: "assets/images/인스타 운영 및 성과 보고서/Instagram _2.jpg",
          title: "2. 인스타 운영 및 성과보고서",
        },
        {
          src: "assets/images/인스타 운영 및 성과 보고서/Instagram _3.jpg",
          title: "3. 인스타 운영 및 성과보고서",
        },
        {
          src: "assets/images/인스타 운영 및 성과 보고서/Instagram _4.jpg",
          title: "4. 인스타 운영 및 성과보고서",
        },
        {
          src: "assets/images/인스타 운영 및 성과 보고서/Instagram _5.jpg",
          title: "5. 인스타 운영 및 성과보고서",
        },
      ],
    },
  };

  // 현재 프로젝트와 슬라이드 상태
  let currentProject = null;
  let currentSlide = 0;
  let previewSize = null; // 프로젝트 카드 썸네일의 실제 표시 크기

  // 프로젝트 모달 열기
  function openProjectModal(projectId) {
    const project = window.projectData[projectId];
    if (!project) return;

    currentProject = project;
    currentSlide = 0;

    projectModalTitle.textContent = project.title;

    // 화면 맞춤(이미지 전체 보이기, 스크롤 없음) 모드 활성화
    if (projectModal && !projectModal.classList.contains("fit-page")) {
      projectModal.classList.add("fit-page");
    }

    // 썸네일 그리드 생성
    const thumbGrid = document.getElementById("thumbGrid");
    if (thumbGrid) {
      thumbGrid.innerHTML = project.slides
        .map(
          (slide, index) => `
        <div class="thumbnail-item ${
          index === 0 ? "active" : ""
        }" data-index="${index}">
          <img src="${slide.src}" alt="${slide.title}" />
        </div>
      `
        )
        .join("");

      // 썸네일 클릭 이벤트 추가
      thumbGrid.querySelectorAll(".thumbnail-item").forEach((item, index) => {
        item.addEventListener("click", () => goToSlide(index));
      });
    }

    // 메인 이미지 설정
    const mainImage = document.getElementById("mainImage");
    if (mainImage && project.slides.length > 0) {
      mainImage.src = project.slides[0].src;
    }

    // 썸네일 표시 크기에 맞춰 미리보기 영역 크기 조정
    const mainImageContainer = document.querySelector(".main-image-container");
    if (mainImageContainer) {
      if (previewSize && previewSize.w && previewSize.h) {
        mainImageContainer.style.width = previewSize.w + "px";
        mainImageContainer.style.height = previewSize.h + "px";
        mainImageContainer.style.margin = "0 auto";
        projectModal.classList.add("thumb-sized");
      } else {
        mainImageContainer.style.removeProperty("width");
        mainImageContainer.style.removeProperty("height");
        mainImageContainer.style.removeProperty("margin");
        projectModal.classList.remove("thumb-sized");
      }
    }

    // 페이지 정보 업데이트
    const pageInfo = document.getElementById("pageInfo");
    if (pageInfo) {
      pageInfo.textContent = `1 / ${project.slides.length}`;
    }

    // 페이지넘김 버튼 이벤트 추가
    initNavigationButtons();

    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";

    // 더블클릭 안내: title 부여 + 컨트롤바 안쪽에 인라인 힌트 생성
    const mainImageContainer = document.querySelector(".main-image-container");
    const viewerControls = document.getElementById("viewerControls");
    if (mainImageContainer) {
      mainImageContainer.setAttribute(
        "title",
        "더블클릭: 전체화면 전환 / 한 번 더 더블클릭: 종료"
      );
    }
    if (
      viewerControls &&
      !viewerControls.querySelector(".viewer-hint-inline")
    ) {
      const hintInline = document.createElement("span");
      hintInline.className = "viewer-hint-inline";
      hintInline.textContent = "더블클릭: 전체화면";
      viewerControls.appendChild(hintInline);
    }

    // 표시 직후 오버레이 중앙 정렬 보정
    setTimeout(() => {
      try {
        recenterOverlay();
      } catch (_) {}
    }, 0);
  }

  // 페이지넘김 기능 함수들
  function goToSlide(index) {
    if (!currentProject || index < 0 || index >= currentProject.slides.length)
      return;

    currentSlide = index;
    updateSlideView();
  }

  function nextSlide() {
    if (currentProject && currentSlide < currentProject.slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentProject && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  function updateSlideView() {
    if (!currentProject) return;

    const mainImage = document.getElementById("mainImage");
    const pageInfo = document.getElementById("pageInfo");
    const thumbGrid = document.getElementById("thumbGrid");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // 메인 이미지 업데이트
    if (mainImage) {
      mainImage.src = currentProject.slides[currentSlide].src;
      // 이미지 로드 후 컨트롤 재정렬
      mainImage.onload = () => {
        recenterOverlay();
      };
      // 혹시 캐시로 즉시 완료 시 재정렬 시도
      if (mainImage.complete) {
        setTimeout(recenterOverlay, 0);
      }
    }

    // 페이지 정보 업데이트
    if (pageInfo) {
      pageInfo.textContent = `${currentSlide + 1} / ${
        currentProject.slides.length
      }`;
    }

    // 썸네일 활성 상태 업데이트
    if (thumbGrid) {
      thumbGrid.querySelectorAll(".thumbnail-item").forEach((item, index) => {
        item.classList.toggle("active", index === currentSlide);
      });
    }

    // 이전/다음 버튼 상태 업데이트
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === currentProject.slides.length - 1;
    }
    // 슬라이드 전환 시에도 재정렬
    recenterOverlay();
  }

  // 페이지넘김 버튼 초기화
  function initNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", prevSlide);
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", nextSlide);
    }

    // 초기 버튼 상태 설정
    updateSlideView();
  }

  // 컨트롤/힌트를 실제 이미지 중앙 기준으로 정렬
  function recenterOverlay() {
    const controls = document.getElementById("viewerControls");
    if (!controls) return;
    // 중앙 정렬은 CSS에 맡김. JS 보정 제거.
    controls.style.removeProperty("left");
    controls.style.removeProperty("right");
    controls.style.removeProperty("transform");
  }

  // 리사이즈 시에도 재정렬
  window.addEventListener("resize", recenterOverlay);

  // 프로젝트 모달 닫기
  function closeProjectModal() {
    projectModal.classList.remove("show");
    document.body.style.overflow = "";

    // 상태 초기화
    currentProject = null;
    currentSlide = 0;
    previewSize = null;

    // 화면 맞춤 모드 해제 (다음에 열릴 때 깔끔하게)
    if (projectModal && projectModal.classList.contains("fit-page")) {
      projectModal.classList.remove("fit-page");
    }
    projectModal.classList.remove("thumb-sized");

    // 미리보기 영역 인라인 크기 제거
    const mic = document.querySelector(".main-image-container");
    if (mic) {
      mic.style.removeProperty("width");
      mic.style.removeProperty("height");
      mic.style.removeProperty("margin");
    }

    // 전체화면 모드였다면 종료
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }

    // 힌트 텍스트 제거
    const vc = document.getElementById("viewerControls");
    vc?.querySelector(".viewer-hint-inline")?.remove();
  }

  // 모달 닫기 이벤트
  if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
  }

  // 모달 외부 클릭 시 닫기
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // ESC 키로 닫기 및 방향키로 페이지넘김
  document.addEventListener("keydown", (e) => {
    if (projectModal.classList.contains("show")) {
      if (e.key === "Escape") {
        closeProjectModal();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    }
  });

  // 포트폴리오 썸네일 테두리 강제 제거
  function removePortfolioBorders() {
    const portfolioElements = document.querySelectorAll(
      ".portfolio-thumbnail, .media-frame, .portfolio-item"
    );
    portfolioElements.forEach((element) => {
      element.style.border = "none";
      element.style.outline = "none";
      element.style.boxShadow = "none";

      // 자식 요소들도 테두리 제거
      const children = element.querySelectorAll("*");
      children.forEach((child) => {
        child.style.border = "none";
        child.style.outline = "none";
        child.style.boxShadow = "none";
      });
    });
  }

  // 프로젝트 버튼 이벤트 리스너
  document.addEventListener("DOMContentLoaded", () => {
    // ====== 전체화면 더블클릭 ======
    const container = document.querySelector(".main-image-container");
    if (container) {
      const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
          container.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      };
      container.addEventListener("dblclick", toggleFullscreen);
      // 단축키: F 키로도 토글
      document.addEventListener("keydown", (e) => {
        if (!projectModal.classList.contains("show")) return;
        if (e.key.toLowerCase() === "f") {
          toggleFullscreen();
        }
      });

      // 전체화면 진입/종료 시 힌트 숨김/표시
      document.addEventListener("fullscreenchange", () => {
        const hint = document
          .getElementById("viewerControls")
          ?.querySelector(".viewer-hint-inline");
        if (!hint) return;
        if (document.fullscreenElement) {
          hint.style.opacity = "0";
          hint.style.transition = "opacity .25s ease";
        } else {
          hint.style.opacity = "1";
        }
      });
    }

    // 페이지 로드 시 테두리 제거
    removePortfolioBorders();

    // DOM 변경 감지하여 테두리 제거
    const observer = new MutationObserver(removePortfolioBorders);
    observer.observe(document.body, { childList: true, subtree: true });
    const viewProjectBtns = document.querySelectorAll(".view-project-btn");

    viewProjectBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // e.preventDefault();
        const projectItem = btn.closest(".project-item");
        if (!projectItem) return;

        const projectId = projectItem.getAttribute("data-project");
        if (!projectId) return;

        console.log("Project button clicked:", projectId); // 디버깅용

        // 썸네일 표시 크기 측정 (카드의 미리보기 이미지/컨테이너)
        const pv =
          projectItem.querySelector(".project-preview img") ||
          projectItem.querySelector(".project-preview video") ||
          projectItem.querySelector(".project-preview");
        if (pv) {
          const r = pv.getBoundingClientRect();
          previewSize = { w: Math.round(r.width), h: Math.round(r.height) };
        }

        // 상세페이지는 새 창으로, 나머지는 모달로
        if (projectId === "happy-pop-detail") {
          // 해피팝 상세페이지는 새 창에서 열기
          const project = window.projectData?.[projectId];
          if (project) {
            const newWindow = window.open(
              "",
              "_blank",
              "width=800,height=1200,scrollbars=yes,resizable=yes"
            );
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
                      ${project.slides
                        .map(
                          (slide) => `
                        <div class="image-item">
                          <img src="${slide.src}" alt="${slide.title}" />
                        </div>
                      `
                        )
                        .join("")}
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

    // 썸네일/프리뷰 이미지를 클릭해도 동일 동작
    document
      .querySelectorAll(".project-item .project-preview, .project-item img")
      .forEach((el) => {
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
          const projectItem = el.closest(".project-item");
          if (!projectItem) return;
          const projectId = projectItem.getAttribute("data-project");
          if (!projectId) return;

          // 클릭한 썸네일의 실제 표시 크기 사용
          const r = el.getBoundingClientRect();
          previewSize = { w: Math.round(r.width), h: Math.round(r.height) };

          if (projectId === "happy-pop-detail") {
            const project = window.projectData?.[projectId];
            if (project) {
              const newWindow = window.open(
                "",
                "_blank",
                "width=800,height=1200,scrollbars=yes,resizable=yes"
              );
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
                        ${project.slides
                          .map(
                            (slide) => `
                          <div class="image-item">
                            <img src="${slide.src}" alt="${slide.title}" />
                          </div>
                        `
                          )
                          .join("")}
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
            openProjectModal(projectId);
          }
        });
      });
  });
})();
