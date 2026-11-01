document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const langToggle = document.getElementById('lang-toggle');
  const langText = document.getElementById('lang-text');
  const htmlRoot = document.documentElement;

  // 1. Téma kezelése (Mentés LocalStorage-ba)
  const savedTheme = localStorage.getItem('sh_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('sh_theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // 2. Kétnyelvű mód (Magyar <-> Angol)
  let currentLang = localStorage.getItem('sh_lang') || 'hu';
  applyLanguage(currentLang);

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'hu' ? 'en' : 'hu';
    localStorage.setItem('sh_lang', currentLang);
    applyLanguage(currentLang);
    updateCaptcha(currentLang);
  });

  function applyLanguage(lang) {
    langText.textContent = lang === 'hu' ? 'EN' : 'HU';

    // Minden data-hu és data-en attribútummal ellátott elem cseréje
    document.querySelectorAll('[data-hu]').forEach(el => {
      const translated = el.getAttribute(`data-${lang}`);
      if (translated) {
        el.innerHTML = translated;
      }
    });

    // Placeholder-ek kezelése
    document.querySelectorAll('[data-hu-placeholder]').forEach(el => {
      const placeholderText = el.getAttribute(`data-${lang}-placeholder`);
      if (placeholderText) {
        el.setAttribute('placeholder', placeholderText);
      }
    });
  }

  // 3. Egyszerű Matematikai CAPTCHA generálás és ellenőrzés
  const num1 = Math.floor(Math.random() * 8) + 2;
  const num2 = Math.floor(Math.random() * 8) + 1;
  const correctAnswer = num1 + num2;

  const captchaLabel = document.getElementById('captcha-label');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const captchaInput = document.getElementById('form-captcha');
  const floatingCaptchaText = document.getElementById('floating-captcha-text');

  function updateCaptcha(lang) {
    if (lang === 'hu') {
      captchaLabel.textContent = `Mennyi ${num1} + ${num2}?`;
      if (floatingCaptchaText) floatingCaptchaText.textContent = 'Matematikai CAPTCHA aktív';
    } else {
      captchaLabel.textContent = `What is ${num1} + ${num2}?`;
      if (floatingCaptchaText) floatingCaptchaText.textContent = 'Mathematical CAPTCHA active';
    }
  }
  updateCaptcha(currentLang);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userAnswer = parseInt(captchaInput.value, 10);

    if (userAnswer !== correctAnswer) {
      const errText = currentLang === 'hu' ? 'Hibás CAPTCHA eredmény! Kérlek próbáld újra.' : 'Incorrect CAPTCHA answer! Please try again.';
      formFeedback.textContent = errText;
      formFeedback.className = 'form-feedback error';
      return;
    }

    // Sikeres küldés szimulációja
    const succText = currentLang === 'hu' ? 'Köszönöm az üzenetet! Hamarosan válaszolok.' : 'Thank you for your message! I will reply soon.';
    formFeedback.textContent = succText;
    formFeedback.className = 'form-feedback success';
    contactForm.reset();
  });
});