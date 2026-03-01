// Content Loader - Loads CMS content from JSON files
(async function() {
  document.body.style.opacity = '0';

  try {
    const theme = await fetch('/content/theme.json').then(r => r.json());

    // Apply global colors
    var g = theme.global || {};
    document.documentElement.style.setProperty('--bg-black', g.header_bg || '#000000');
    document.documentElement.style.setProperty('--accent', g.accent_color || '#FFD700');
    document.documentElement.style.setProperty('--border-color', g.border_color || '#333333');
    document.documentElement.style.setProperty('--footer-bg', g.footer_bg || '#000000');
    document.documentElement.style.setProperty('--text-white', g.footer_text || '#ffffff');

    // Apply header background
    var header = document.querySelector('header');
    if (header) header.style.backgroundColor = g.header_bg || '#000000';

    // Apply footer colors
    var footer = document.querySelector('footer');
    if (footer) {
      footer.style.backgroundColor = g.footer_bg || '#000000';
      footer.style.color = g.footer_text || '#ffffff';
    }

    // Apply header logo colors
    var headerLogo = document.querySelector('[data-logo="header"]');
    if (headerLogo) {
      var headerTextPaths = headerLogo.querySelectorAll('.logo-text');
      var headerStarPaths = headerLogo.querySelectorAll('.logo-star');
      headerTextPaths.forEach(function(p) { p.setAttribute('fill', g.header_logo_color || '#A7977E'); });
      headerStarPaths.forEach(function(p) { p.setAttribute('fill', g.header_logo_star_color || '#EDE8E1'); });
    }

    // Apply footer logo colors
    var footerLogo = document.querySelector('[data-logo="footer"]');
    if (footerLogo) {
      var footerTextPaths = footerLogo.querySelectorAll('.logo-text');
      var footerStarPaths = footerLogo.querySelectorAll('.logo-star');
      footerTextPaths.forEach(function(p) { p.setAttribute('fill', g.footer_logo_color || '#A7977E'); });
      footerStarPaths.forEach(function(p) { p.setAttribute('fill', g.footer_logo_star_color || '#EDE8E1'); });
    }

    // Apply font
    if (theme.font_family) document.body.style.fontFamily = theme.font_family;

    // Helper to apply bg + text color to an element
    function applyColors(el, bg, text) {
      if (!el) return;
      if (bg) el.style.backgroundColor = bg;
      if (text) el.style.color = text;
    }

    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    if (page === 'index' || page === '') {
      var home = await fetch('/content/home.json').then(r => r.json());
      var hc = theme.home || {};

      document.querySelector('.hero h1').textContent = home.hero_title;
      document.querySelector('.hero p').textContent = home.hero_description;
      if (home.hero_image) {
        var heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + home.hero_image + ')';
      }

      // Apply Home page section colors
      var sections = document.querySelectorAll('.section-wrapper');

      // Our Story section (first section-wrapper)
      applyColors(sections[0], hc.story_bg, hc.story_text);

      // Chef Philosophy section (second section-wrapper)
      applyColors(sections[1], hc.chef_bg, hc.chef_text);

      // Menu section (third section-wrapper)
      applyColors(sections[2], hc.menu_bg, hc.menu_text);

      var storySection = document.querySelectorAll('.content-text')[0];
      storySection.querySelector('h2').textContent = home.story_title;
      storySection.querySelector('p').textContent = home.story_text;
      if (home.story_video) {
        document.querySelector('.video-placeholder source').src = home.story_video;
        document.querySelector('.video-placeholder video').load();
      }

      var chefSection = document.querySelectorAll('.content-text')[1];
      chefSection.querySelector('h2').textContent = home.chef_title;
      chefSection.querySelector('p').textContent = home.chef_text;
      if (home.chef_image) {
        document.querySelector('.image-placeholder img').src = home.chef_image;
      }
    }

    if (page === 'about') {
      var about = await fetch('/content/about.json').then(r => r.json());
      var ac = theme.about || {};

      // Apply About page banner colors
      var banner = document.querySelector('.about-banner');
      applyColors(banner, ac.banner_bg, ac.banner_text);

      document.querySelector('.about-banner h1').textContent = about.page_title;

      // Apply About page section colors
      var sections = document.querySelectorAll('.section-wrapper');

      // Our Story section
      applyColors(sections[0], ac.story_bg, ac.story_text);

      // Chef Philosophy section
      applyColors(sections[1], ac.chef_bg, ac.chef_text);

      var contentSections = document.querySelectorAll('.content-text');
      var storyTitle = contentSections[0].querySelector('.section-title');
      if (storyTitle) storyTitle.textContent = about.story_title;

      var storyParas = contentSections[0].querySelectorAll('p');
      if (storyParas[0]) storyParas[0].textContent = about.story_text_1;
      if (storyParas[1]) storyParas[1].textContent = about.story_text_2;

      if (about.story_video) {
        var storyVideo = document.querySelector('.video-placeholder source');
        if (storyVideo) {
          storyVideo.src = about.story_video;
          storyVideo.parentElement.load();
        }
      }

      var storyParas2 = contentSections[1].querySelectorAll('p');
      if (storyParas2[0]) storyParas2[0].textContent = about.story_text_3;
      if (storyParas2[1]) storyParas2[1].textContent = about.story_text_4;

      var storyImg = document.querySelector('.image-placeholder img');
      if (storyImg && about.story_image) storyImg.src = about.story_image;

      var chefTitle = contentSections[2].querySelector('.section-title');
      if (chefTitle) chefTitle.textContent = about.chef_title;

      var chefParas = contentSections[2].querySelectorAll('p');
      if (chefParas[0]) chefParas[0].textContent = about.chef_text_1;
      if (chefParas[1]) chefParas[1].textContent = about.chef_text_2;

      var chefImg = document.querySelectorAll('.image-placeholder img')[1];
      if (chefImg && about.chef_image) chefImg.src = about.chef_image;
    }

    if (page === 'menu') {
      var mc = theme.menu || {};

      // Apply Menu page colors
      var menuSection = document.querySelector('.section-wrapper');
      applyColors(menuSection, mc.bg, mc.text);

      var menuItems = await fetch('/content/menu-combined.json').then(r => r.json());
      var menuCats = await fetch('/content/menu-categories.json').then(r => r.json());
      var categoryOrder = ['Appetizers', 'Desserts', 'Entrees', 'Beverages', 'Cocktails'];
      var categoryKeys = ['appetizers', 'desserts', 'entrees', 'beverages', 'cocktails'];
      var grouped = {};
      menuItems.forEach(function(item) {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });
      Object.values(grouped).forEach(function(arr) { arr.sort(function(a, b) { return (a.order || 0) - (b.order || 0); }); });

      var slides = document.querySelectorAll('.carousel-slide');
      categoryOrder.forEach(function(cat, i) {
        var slide = slides[i];
        if (!slide || !grouped[cat]) return;
        var items = grouped[cat];

        var img = slide.querySelector('.image-display img');
        if (img && items[0] && items[0].image) {
          img.src = items[0].image;
          img.alt = items[0].name;
        }

        var textItems = slide.querySelectorAll('.menu-text-item');
        items.forEach(function(item, j) {
          if (!textItems[j]) return;
          var h4 = textItems[j].querySelector('h4');
          var p = textItems[j].querySelector('p');
          if (h4) h4.innerHTML = item.name + ' <span>/ ' + item.price + '</span>';
          if (p) p.textContent = item.description;
        });
      });

      // Build category descriptions lookup and set initial descriptions
      var catDescriptions = {};
      categoryOrder.forEach(function(cat, i) {
        var key = categoryKeys[i];
        catDescriptions[cat] = [
          menuCats[key + '_desc_1'] || '',
          menuCats[key + '_desc_2'] || '',
          menuCats[key + '_desc_3'] || '',
          menuCats[key + '_desc_4'] || ''
        ];
      });

      // Store on window for carousel.js to access
      window.categoryDescriptions = catDescriptions;

      // Set initial descriptions for first category
      var descContainer = document.getElementById('category-descriptions');
      if (descContainer) {
        var descParagraphs = descContainer.querySelectorAll('.cat-desc');
        var initialDescs = catDescriptions[categoryOrder[0]] || [];
        descParagraphs.forEach(function(p, idx) {
          p.textContent = initialDescs[idx] || '';
        });
      }
    }

    if (page === 'events') {
      var events = await fetch('/content/events.json').then(r => r.json());
      var ec = theme.events || {};

      // Apply Events page banner colors
      var banner = document.querySelector('.about-banner');
      applyColors(banner, ec.banner_bg, ec.banner_text);

      // Apply Events page section colors
      var sections = document.querySelectorAll('.section-wrapper');

      // Private Dining section
      applyColors(sections[0], ec.private_bg, ec.private_text);

      // Event Hosting section
      applyColors(sections[1], ec.hosting_bg, ec.hosting_text);

      document.querySelector('.about-banner h1').textContent = events.page_title;

      var contentSections = document.querySelectorAll('.content-text');
      contentSections[0].querySelector('h2').textContent = events.private_title;

      var privateParas = contentSections[0].querySelectorAll('p');
      if (privateParas[0]) privateParas[0].textContent = events.private_text_1;
      if (privateParas[1]) privateParas[1].textContent = events.private_text_2;

      var privateImg = document.querySelector('.image-placeholder img');
      if (privateImg && events.private_image) privateImg.src = events.private_image;

      contentSections[1].querySelector('h2').textContent = events.hosting_title;

      var hostingParas = contentSections[1].querySelectorAll('p');
      if (hostingParas[0]) hostingParas[0].textContent = events.hosting_text_1;
      if (hostingParas[1]) hostingParas[1].textContent = events.hosting_text_2;

      if (events.hosting_video) {
        var hostingVideo = document.querySelector('.video-placeholder source');
        if (hostingVideo) {
          hostingVideo.src = events.hosting_video;
          hostingVideo.parentElement.load();
        }
      }
    }

    if (page === 'book') {
      var bc = theme.book || {};

      // Apply Book page banner colors
      var banner = document.querySelector('.about-banner');
      applyColors(banner, bc.banner_bg, bc.banner_text);

      // Apply reservation section colors
      var reservationSection = document.querySelector('.reservation-section');
      if (reservationSection && bc.section_bg) {
        reservationSection.style.backgroundColor = bc.section_bg;
      }

      // Apply form colors
      var formContainer = document.querySelector('.form-container');
      if (formContainer) {
        applyColors(formContainer, bc.form_bg, bc.form_text);
      }

      // Apply button colors
      if (bc.button_bg) {
        document.documentElement.style.setProperty('--book-btn-bg', bc.button_bg);
      }
      if (bc.button_text) {
        document.documentElement.style.setProperty('--book-btn-text', bc.button_text);
      }

      // Apply input / dropdown colors
      if (bc.input_bg) {
        document.documentElement.style.setProperty('--book-input-bg', bc.input_bg);
      }
      if (bc.input_text) {
        document.documentElement.style.setProperty('--book-input-text', bc.input_text);
      }
      if (bc.input_border) {
        document.documentElement.style.setProperty('--book-input-border', bc.input_border);
      }

      // Apply calendar / picker modal colors
      if (bc.picker_bg) {
        document.documentElement.style.setProperty('--book-picker-bg', bc.picker_bg);
      }
      if (bc.picker_text) {
        document.documentElement.style.setProperty('--book-picker-text', bc.picker_text);
      }
      if (bc.calendar_today_bg) {
        document.documentElement.style.setProperty('--book-today-bg', bc.calendar_today_bg);
      }
      if (bc.calendar_today_text) {
        document.documentElement.style.setProperty('--book-today-text', bc.calendar_today_text);
      }
    }

    if (page === 'confirmation') {
      var cc = theme.confirmation || {};

      // Apply Confirmation page banner colors
      var banner = document.querySelector('.about-banner');
      applyColors(banner, cc.banner_bg, cc.banner_text);

      // Apply reservation section colors
      var reservationSection = document.querySelector('.reservation-section');
      if (reservationSection && cc.section_bg) {
        reservationSection.style.backgroundColor = cc.section_bg;
      }

      // Apply card colors
      var card = document.querySelector('.reservation-section .card');
      if (card) {
        applyColors(card, cc.card_bg, cc.card_text);
      }
      var cardInner = document.querySelector('.card-inner');
      if (cardInner) {
        applyColors(cardInner, cc.card_bg, cc.card_text);
      }

      // Apply icon colors
      if (cc.icon_bg) {
        document.documentElement.style.setProperty('--confirm-icon-bg', cc.icon_bg);
      }
      if (cc.icon_text) {
        document.documentElement.style.setProperty('--confirm-icon-text', cc.icon_text);
      }

      // Apply card text color variable
      if (cc.card_text) {
        document.documentElement.style.setProperty('--confirm-card-text', cc.card_text);
      }

      // Apply button colors
      if (cc.home_btn_bg) {
        document.documentElement.style.setProperty('--confirm-home-btn-bg', cc.home_btn_bg);
      }
      if (cc.home_btn_text) {
        document.documentElement.style.setProperty('--confirm-home-btn-text', cc.home_btn_text);
      }
      if (cc.rebook_btn_bg) {
        document.documentElement.style.setProperty('--confirm-rebook-btn-bg', cc.rebook_btn_bg);
      }
      if (cc.rebook_btn_text) {
        document.documentElement.style.setProperty('--confirm-rebook-btn-text', cc.rebook_btn_text);
      }

      // Override favicon color for confirmation page
      if (cc.favicon_color) {
        var faviconSvg = '<svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8865 0C22.8865 0 24.1249 11.8655 29.0679 16.8187C33.9856 21.7464 45.773 23.0422 45.773 23.0422C45.773 23.0422 33.9856 24.3379 29.0679 29.2656C24.1249 34.2188 22.8865 46.0843 22.8865 46.0843C22.8865 46.0843 21.6481 34.2188 16.7051 29.2656C11.7874 24.3379 0 23.0422 0 23.0422C0 23.0422 11.7874 21.7464 16.7051 16.8187C21.6481 11.8655 22.8865 0 22.8865 0Z" fill="' + cc.favicon_color + '"/></svg>';
        var faviconDataUrl = 'data:image/svg+xml,' + encodeURIComponent(faviconSvg);
        var faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink) {
          faviconLink.href = faviconDataUrl;
        }
      }
    }

  } catch (error) {
    console.log('Content loading skipped:', error.message);
  }

  document.body.style.transition = 'opacity 0.3s';
  document.body.style.opacity = '1';
})();
