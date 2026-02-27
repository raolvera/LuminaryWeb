// Content Loader - Loads CMS content from JSON files
(async function() {
  document.body.style.opacity = '0';
  
  try {
    const theme = await fetch('/content/theme.json').then(r => r.json());
    document.documentElement.style.setProperty('--bg-black', theme.bg_color);
    document.documentElement.style.setProperty('--text-white', theme.text_color);
    document.documentElement.style.setProperty('--accent', theme.accent_color);
    document.documentElement.style.setProperty('--border-color', theme.border_color);
    document.body.style.fontFamily = theme.font_family;

    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    if (page === 'index' || page === '') {
      const home = await fetch('/content/home.json').then(r => r.json());
      
      document.querySelector('.hero h1').textContent = home.hero_title;
      document.querySelector('.hero p').textContent = home.hero_description;
      if (home.hero_image) {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${home.hero_image})`;
      }
      
      const storySection = document.querySelectorAll('.content-text')[0];
      storySection.querySelector('h2').textContent = home.story_title;
      storySection.querySelector('p').textContent = home.story_text;
      if (home.story_video) {
        document.querySelector('.video-placeholder source').src = home.story_video;
        document.querySelector('.video-placeholder video').load();
      }
      
      const chefSection = document.querySelectorAll('.content-text')[1];
      chefSection.querySelector('h2').textContent = home.chef_title;
      chefSection.querySelector('p').textContent = home.chef_text;
      if (home.chef_image) {
        document.querySelector('.image-placeholder img').src = home.chef_image;
      }
    }
    
    if (page === 'about') {
      const about = await fetch('/content/about.json').then(r => r.json());
      
      document.querySelector('.about-banner h1').textContent = about.page_title;
      
      const sections = document.querySelectorAll('.content-text');
      const storyTitle = sections[0].querySelector('.section-title');
      if (storyTitle) storyTitle.textContent = about.story_title;
      
      const storyParas = sections[0].querySelectorAll('p');
      if (storyParas[0]) storyParas[0].textContent = about.story_text_1;
      if (storyParas[1]) storyParas[1].textContent = about.story_text_2;
      
      if (about.story_video) {
        const storyVideo = document.querySelector('.video-placeholder source');
        if (storyVideo) {
          storyVideo.src = about.story_video;
          storyVideo.parentElement.load();
        }
      }
      
      const storyParas2 = sections[1].querySelectorAll('p');
      if (storyParas2[0]) storyParas2[0].textContent = about.story_text_3;
      if (storyParas2[1]) storyParas2[1].textContent = about.story_text_4;
      
      const storyImg = document.querySelector('.image-placeholder img');
      if (storyImg && about.story_image) storyImg.src = about.story_image;
      
      const chefTitle = sections[2].querySelector('.section-title');
      if (chefTitle) chefTitle.textContent = about.chef_title;
      
      const chefParas = sections[2].querySelectorAll('p');
      if (chefParas[0]) chefParas[0].textContent = about.chef_text_1;
      if (chefParas[1]) chefParas[1].textContent = about.chef_text_2;
      
      if (about.chef_video) {
        const chefVideos = document.querySelectorAll('.video-placeholder source');
        if (chefVideos[1]) {
          chefVideos[1].src = about.chef_video;
          chefVideos[1].parentElement.load();
        }
      }
      
      const chefParas2 = sections[3].querySelectorAll('p');
      if (chefParas2[0]) chefParas2[0].textContent = about.chef_text_3;
      if (chefParas2[1]) chefParas2[1].textContent = about.chef_text_4;
      
      const chefImg = document.querySelectorAll('.image-placeholder img')[1];
      if (chefImg && about.chef_image) chefImg.src = about.chef_image;
    }
    
    if (page === 'menu') {
      const menuItems = await fetch('/content/menu-combined.json').then(r => r.json());
      const categoryOrder = ['Appetizers', 'Desserts', 'Entrees', 'Beverages', 'Cocktails'];
      const grouped = {};
      menuItems.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });
      Object.values(grouped).forEach(arr => arr.sort((a, b) => (a.order || 0) - (b.order || 0)));

      const slides = document.querySelectorAll('.carousel-slide');
      categoryOrder.forEach((cat, i) => {
        const slide = slides[i];
        if (!slide || !grouped[cat]) return;
        const items = grouped[cat];

        const img = slide.querySelector('.image-display img');
        if (img && items[0] && items[0].image) {
          img.src = items[0].image;
          img.alt = items[0].name;
        }

        const textItems = slide.querySelectorAll('.menu-text-item');
        items.forEach((item, j) => {
          if (!textItems[j]) return;
          const h4 = textItems[j].querySelector('h4');
          const p = textItems[j].querySelector('p');
          if (h4) h4.innerHTML = item.name + ' <span>/ ' + item.price + '</span>';
          if (p) p.textContent = item.description;
        });
      });
    }

    if (page === 'events') {
      const events = await fetch('/content/events.json').then(r => r.json());
      
      document.querySelector('.about-banner h1').textContent = events.page_title;
      
      const sections = document.querySelectorAll('.content-text');
      sections[0].querySelector('h2').textContent = events.private_title;
      
      const privateParas = sections[0].querySelectorAll('p');
      if (privateParas[0]) privateParas[0].textContent = events.private_text_1;
      if (privateParas[1]) privateParas[1].textContent = events.private_text_2;
      
      const privateImg = document.querySelector('.image-placeholder img');
      if (privateImg && events.private_image) privateImg.src = events.private_image;
      
      sections[1].querySelector('h2').textContent = events.hosting_title;
      
      const hostingParas = sections[1].querySelectorAll('p');
      if (hostingParas[0]) hostingParas[0].textContent = events.hosting_text_1;
      if (hostingParas[1]) hostingParas[1].textContent = events.hosting_text_2;
      
      if (events.hosting_video) {
        const hostingVideo = document.querySelector('.video-placeholder source');
        if (hostingVideo) {
          hostingVideo.src = events.hosting_video;
          hostingVideo.parentElement.load();
        }
      }
    }
    
  } catch (error) {
    console.log('Content loading skipped:', error.message);
  }
  
  document.body.style.transition = 'opacity 0.3s';
  document.body.style.opacity = '1';
})();
