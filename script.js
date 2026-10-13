/*
============================================================
DỰ ÁN: Những con người làm thay đổi thế giới
NHÂN VẬT: Sir Nicholas Winton
NHÓM: 12A11 - Nhóm 14 - Phạm Gia Khánh & Lữ Gia Bảo
FILE: script.js - Menu hamburger + Nhạc nền + Hiệu ứng
============================================================
*/

// ============================================================
// 1. MENU HAMBURGER
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const navOverlay = document.getElementById('navOverlay');

if (menuToggle && navOverlay) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : '';
  });

  // Đóng menu khi click link
  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// 2. NHẠC NỀN
// ============================================================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

// Đặt âm lượng nhẹ nhàng
if (music) {
  music.volume = 0.25;
}

// Khôi phục trạng thái nhạc từ sessionStorage (để nhạc tiếp tục khi chuyển trang)
if (music && sessionStorage.getItem('musicPlaying') === 'true') {
  const wasPlaying = true;
  // Chờ user tương tác trước khi phát (do chính sách autoplay của trình duyệt)
  const resumePlay = () => {
    music.play()
      .then(() => {
        if (musicBtn) {
          musicBtn.classList.add('playing');
          musicBtn.textContent = '🎵 Tắt nhạc nền';
        }
      })
      .catch(() => {});
    document.removeEventListener('click', resumePlay);
  };
  document.addEventListener('click', resumePlay);
}

if (musicBtn && music) {
  // Đồng bộ text ban đầu
  if (sessionStorage.getItem('musicPlaying') === 'true' && !music.paused) {
    musicBtn.classList.add('playing');
    musicBtn.textContent = '🎵 Tắt nhạc nền';
  } else {
    musicBtn.textContent = '🎵 Bật nhạc nền';
  }

  musicBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play()
        .then(() => {
          musicBtn.classList.add('playing');
          musicBtn.textContent = '🎵 Tắt nhạc nền';
          sessionStorage.setItem('musicPlaying', 'true');
        })
        .catch(err => {
          console.error('Không thể phát nhạc:', err);
        });
    } else {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '🎵 Bật nhạc nền';
      sessionStorage.setItem('musicPlaying', 'false');
    }
  });
}

// ============================================================
// 3. HIỆU ỨNG FADE-IN KHI CUỘN
// ============================================================
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.timeline-item, .card, .gallery-item, .personal-note').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
