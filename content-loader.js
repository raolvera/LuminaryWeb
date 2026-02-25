// Content Loader - Loads CMS content from JSON files
(async function() {
  try {
    // Load theme settings
    const theme = await fetch('/content/theme.json').then(r => r.json());
    document.documentElement.style.setProperty('--bg-black', theme.bg_color);
    document.documentElement.style.setProperty('--text-white', theme.text_color);
    document.documentElement.style.setProperty('--accent', theme.accent_color);
    document.documentElement.style.setProperty('--border-color', theme.border_color);
    document.body.style.fontFamily = theme.font_family;

    // Load page-specific content
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    if (page === 'index' || page === '') {
      const home = await fetch('/content/home.json').then(r => r.json());
      
      // Hero section
      document.querySelector('.hero h1').textContent = home.hero_title;
      document.querySelector('.hero p').textContent = home.hero_description;
      if (home.hero_image) {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${home.hero_image})`;
      }
      
      // Our Story section
      document.querySelector('.content-text h3').textContent = home.story_title;
      document.querySelector('.content-text p').textContent = home.story_text;
      if (home.story_video) {
        document.querySelector('.video-placeholder source').src = home.story_video;
        document.querySelector('.video-placeholder video').load();
      }
      
      // Chef Philosophy section
      const chefSection = document.querySelectorAll('.content-text')[1];
      chefSection.querySelector('h3').textContent = home.chef_title;
      chefSection.querySelector('p').textContent = home.chef_text;
      document.querySelector('.image-placeholder img').src = home.chef_image;
    }
    
    if (page === 'about') {
      const about = await fetch('/content/about.json').then(r => r.json());
      
      document.querySelector('.about-banner h1').textContent = about.page_title;
      
      const sections = document.querySelectorAll('.content-text');
      sections[0].querySelector('h2').textContent = about.story_title;
      sections[0].querySelector('p').textContent = about.story_text;
      
      if (about.story_video) {
        document.querySelector('.video-placeholder source').src = about.story_video;
        document.querySelector('.video-placeholder video').load();
      }
      
      sections[1].querySelector('h2').textContent = about.chef_title;
      sections[1].querySelector('p').textContent = about.chef_text;
      
      if (about.chef_image) {
        document.querySelector('.image-placeholder img').src = about.chef_image;
      }
    }
    
    if (page === 'events') {
      const events = await fetch('/content/events.json').then(r => r.json());
      
      document.querySelector('.about-banner h1').textContent = events.page_title;
      
      const sections = document.querySelectorAll('.content-text');
      sections[0].querySelector('h2').textContent = events.main_title;
      sections[0].querySelector('p').textContent = events.main_description;
      
      const images = document.querySelectorAll('.image-placeholder img');
      if (events.main_image) images[0].src = events.main_image;
      
      sections[1].querySelector('h2').textContent = events.secondary_title;
      sections[1].querySelector('p').textContent = events.secondary_description;
      
      if (events.secondary_image) images[1].src = events.secondary_image;
    }
    
  } catch (error) {
    console.log('Content loading skipped:', error.message);
    // Fallback: content stays as hardcoded in HTML
  }
})();
