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
  }
});