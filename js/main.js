document.addEventListener('DOMContentLoaded', () => {
  const htmlRoot = document.documentElement;
  
  
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Lekérjük a mentett témát a böngészőből, alapértelmezett a 'dark'
  let currentTheme = localStorage.getItem('sh_cv_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  // Gombnyomásra váltunk és mentünk
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', currentTheme);
    localStorage.setItem('sh_cv_theme', currentTheme);
    updateThemeIcon(currentTheme);
  });

  // Ikon cseréje (Nap / Hold)
  function updateThemeIcon(theme) {
    if(themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  
  const langToggle = document.getElementById('lang-toggle');
  
  // Lekérjük a mentett nyelvet, alapértelmezett a 'hu'
  let currentLang = localStorage.getItem('sh_cv_lang') || 'hu';
  applyLang(currentLang);

  // Gombnyomásra nyelvet cserélünk és mentünk
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'hu' ? 'en' : 'hu';
    localStorage.setItem('sh_cv_lang', currentLang);
    applyLang(currentLang);
  });

  // Lecseréljük a szövegeket a kiválasztott nyelvre
  function applyLang(lang) {
    // Megkeressük az összes elemet, aminek van 'data-hu' attribútuma
    const elements = document.querySelectorAll('[data-hu]');
    elements.forEach(el => {
      const translatedText = el.getAttribute(`data-${lang}`);
      if (translatedText) {
        // Az innerHTML lehetővé teszi, hogy a <strong> és más HTML tagek is működjenek a szövegben
        el.innerHTML = translatedText;
      }
    });
  }
});