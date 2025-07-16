const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

document.querySelectorAll('.section').forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});

function typeText(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}
const heading = document.querySelector('#what h2');
if (heading) typeText(heading, heading.textContent.trim());

document.querySelectorAll('.section img').forEach(img => {
  img.style.transition = "transform 0.35s cubic-bezier(.23,1.08,.56,1)";
  img.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    img.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 24}deg) scale(1.08)`;
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
});

document.querySelectorAll('.counter').forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText.replace(/,/g, '');
    const increment = Math.max(1, Math.floor(target / 90));
    if (current < target) {
      counter.innerText = (current + increment).toLocaleString();
      setTimeout(update, 18);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };
  update();
});

const backBtn = document.createElement('button');
backBtn.textContent = '↑ Top';
backBtn.className = 'back-to-top';
backBtn.style.display = 'none';
backBtn.style.position = 'fixed';
backBtn.style.bottom = '28px';
backBtn.style.right = '32px';
backBtn.style.padding = '12px 18px';
backBtn.style.fontSize = '18px';
backBtn.style.background = 'var(--primary)';
backBtn.style.color = '#fff';
backBtn.style.border = 'none';
backBtn.style.borderRadius = '8px';
backBtn.style.boxShadow = '0 4px 18px rgba(13,71,161,0.09)';
backBtn.style.cursor = 'pointer';
backBtn.style.zIndex = '88888';
document.body.appendChild(backBtn);

window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 350 ? 'block' : 'none';
});
backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const toggle = document.getElementById('darkToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
  }
}

const particleCanvas = document.getElementById('particles-bg');
if (particleCanvas) {
  function resizeParticles() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  resizeParticles();
  window.addEventListener('resize', resizeParticles);

  const particles = [];
  const PARTICLE_COUNT = Math.floor(window.innerWidth / 14); // auto adjusts for screen size
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.7 + Math.random() * 2.3,
      dx: -0.25 + Math.random() * 0.5,
      dy: -0.19 + Math.random() * 0.38,
      opacity: 0.19 + Math.random() * 0.15
    });
  }
  function drawParticles() {
    const ctx = particleCanvas.getContext('2d');
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(60,95,220,${p.opacity})`;
      ctx.shadowColor = '#b9f';
      ctx.shadowBlur = 8;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -10) p.x = particleCanvas.width + 10;
      if (p.x > particleCanvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = particleCanvas.height + 10;
      if (p.y > particleCanvas.height + 10) p.y = -10;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}
