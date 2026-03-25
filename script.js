// ===== THIBAULT MERLE - SITE SCRIPT =====

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile Menu ----
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Scroll Reveal Animation ----
const revealElements = () => {
  const elements = document.querySelectorAll(
    '.problem-card, .feature-card, .with-card, .pricing-card, .coaching-card, .about-chapter, .solution-quote, .profile-card, .service-other-card'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 4) * 0.1;
    el.style.transitionDelay = `${delay}s`;
  });
};
revealElements();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Section title animate on scroll ----
const sectionTitles = document.querySelectorAll('.section-title, .service-big-title');
sectionTitles.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

sectionTitles.forEach(el => titleObserver.observe(el));

// ---- Contact Form (fake submit) ----
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSending = submitBtn.querySelector('.btn-sending');
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnSending.style.display = 'inline';

    // Simulate send (replace with real API call — e.g. Formspree, EmailJS)
    setTimeout(() => {
      submitBtn.style.display = 'none';
      formSuccess.style.display = 'block';
      contactForm.reset();
    }, 1800);
  });
}

// ---- Smooth active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links .nav-link:not(.cta-nav)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.style.color = '';
    link.style.fontWeight = '';
    const href = link.getAttribute('href');
    if (href && href === `#${current}`) {
      link.style.color = '#ffffff';
      link.style.fontWeight = '700';
    }
  });
});

// ---- Parallax effet léger sur hero ----
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBlob = hero.querySelector('.hero-img-blob');
    if (heroBlob && scrolled < window.innerHeight) {
      heroBlob.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }, { passive: true });
}

// ---- Hover ripple effect on buttons ----
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      transform: scale(0);
      animation: ripple-anim 0.6s linear;
      width: 80px; height: 80px;
      left: ${x - 40}px;
      top: ${y - 40}px;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Create ripple keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const category = btn.closest('.faq-category');
    const isActive = item.classList.contains('active');

    // Close all items in the same category
    category.querySelectorAll('.faq-item.active').forEach(openItem => {
      openItem.classList.remove('active');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle the clicked one
    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- FAQ Category Reveal ----
document.querySelectorAll('.faq-category').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// ---- Formulaire adaptatif (créateur / marque) ----
const profilSelect = document.getElementById('profil');
const sujetSelect  = document.getElementById('sujet');

const sujetOptions = {
  createur: [
    { value: '',                   label: 'Selectionner...',                    disabled: true },
    { value: 'content-management', label: 'Demande de Devis (Influence/Content)' },
    { value: 'talent-management',  label: 'Intéressé par le Pack Suivi (5h/10h)' },
    { value: 'montage',            label: 'Montage Vidéo' },
    { value: 'autre',              label: 'Autre' },
  ],
  marque: [
    { value: '',                       label: 'Selectionner...',            disabled: true },
    { value: 'recherche-influenceurs', label: 'Recherche d\'influenceurs'  },
    { value: 'brief-campagne',         label: 'Brief de campagne'          },
    { value: 'partenariat',            label: 'Partenariat long terme'     },
    { value: 'autre',                  label: 'Autre'                      },
  ],
};

const fieldConfig = {
  createur: {
    prenom:  { label: 'Prénom',               placeholder: 'Thibault'   },
    insta:   { label: 'Insta / TikTok',       placeholder: '@...'       },
    youtube: { label: 'Lien chaîne YouTube',  placeholder: '@...',         type: 'url'  },
    message: { placeholder: 'Parle-moi de tes besoins, de tes objectifs sur les réseaux, de tes problématiques ou tes projets. Je reviens vers toi sous 48h !' },
  },
  marque: {
    prenom:  { label: 'Prénom & Nom',         placeholder: 'Jean Dupont'         },
    insta:   { label: 'Nom de la marque',     placeholder: 'Nike, L\'Oréal...'   },
    youtube: { label: 'Site web (optionnel)', placeholder: 'https://votresite.com', type: 'url' },
    message: { placeholder: 'Décrivez votre marque, votre cible, le type de collaboration recherché et vos objectifs. Je reviens vers toi sous 48h !' },
  },
};

if (profilSelect && sujetSelect) {
  profilSelect.addEventListener('change', () => {
    const profil = profilSelect.value;
    const config = fieldConfig[profil];
    if (!config) return;

    // Labels & placeholders
    document.querySelector('label[for="prenom"]').textContent  = config.prenom.label;
    document.getElementById('prenom').placeholder              = config.prenom.placeholder;

    document.querySelector('label[for="insta"]').textContent   = config.insta.label;
    document.getElementById('insta').placeholder               = config.insta.placeholder;

    const youtubeInput = document.getElementById('youtube');
    document.querySelector('label[for="youtube"]').textContent = config.youtube.label;
    youtubeInput.placeholder                                   = config.youtube.placeholder;
    youtubeInput.type                                          = config.youtube.type;

    document.getElementById('message').placeholder = config.message.placeholder;

    // Options du sujet
    sujetSelect.innerHTML = '';
    sujetOptions[profil].forEach(opt => {
      const el = document.createElement('option');
      el.value       = opt.value;
      el.textContent = opt.label;
      if (opt.disabled) { el.disabled = true; el.selected = true; }
      sujetSelect.appendChild(el);
    });
  });
}

console.log('🚀 ThibaultMerle.fr — Site chargé avec succès !');
