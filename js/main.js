(function() {
"use strict";

gsap.registerPlugin(ScrollTrigger);

window.App = {};

App.config = {
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

window.onload = function () {
  if (App.config.cursorFollower.enabled) {
    Cursor.init();
  }

  document.fonts.ready.then(function () {
    initialReveal()
  })
}

function initialReveal() {
  const preloader = document.querySelector('.js-preloader')
  
  if (!preloader) {
    RevealAnim.init()
    initComponents()
    return
  }

  setTimeout(() => {
    preloader.classList.add('-is-hidden')
    initComponents()
    RevealAnim.init()
  }, 600)
}

// Reloads all scripts when navigating through pages
function initComponents() {
  sectionSlider()
  testimonialsSlider_1()
  marquee()
  menuEvents()
  dbSidebarToggle()
  Header.init()
  Header.headerSticky()
  Tabs.init()
  Accordion.init()
  lazyLoading()
  parallaxInit()
  mapCard()
  galleryInit()
  heroSlider7()
  heroSlider9()
  heroSlider10()
  Select.init(".js-select")
  priceRangeSliderInit()
  requestForm()
  parallaxIt()
  hero1Reveal()
  toTopButton()
  tabsSlider()
  hero5Reveal()
  testimonialsSlider1()
  sectionSliderAuto()
  lineChart()
  dropdown()
  countChange()
  initMap()
  initMapTourPages()
  initMapSingle()
  Events.init()
  pinOnScroll()
  Calendar.init()
  calendarInteraction()
  selectControl()
  liveSearch()
  verticalSlider()
  menuFullScreen()
  verticalSlider2()
  splitTextIntoLines()
  hoverImageInteraction()

  //
	// your custom plugins init here
  //
}

function hoverImageInteraction() {
  const target = document.querySelector('.hoverTitleInteraction')
  if (!target) return;
  
  const images = target.querySelectorAll('.hoverTitleInteraction__images > *')
  const links = target.querySelectorAll('.hoverTitleInteraction__links > *')

  links.forEach((el, i) => {
    el.addEventListener('mouseover', () => {
      images.forEach(el => {
        if (el.classList.contains('is-active')) {
          el.classList.remove('is-active')
        }
      })
      images[i].classList.add('is-active')
    })
  })
}

function dbSidebarToggle() {
  const target = document.querySelector(".js-toggle-db-sidebar")
  if (!target) return

  const dashboard = document.querySelector(".js-dashboard")

  if (window.innerWidth < 575) dashboard.classList.remove("-is-sidebar-visible")

  target.addEventListener('click', () => dashboard.classList.toggle("-is-sidebar-visible"))
}

function menuEvents() {
  let isMenuOpen = false
  const menuButtons = document.querySelectorAll('.js-menu-button')

  menuButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!isMenuOpen) {
        menuOpen()
        isMenuOpen = true
      } else {
        menuClose()
        isMenuOpen = false
      }
    })
  })
}

function menuOpen() {
  const menu = document.querySelector('.js-menu')
  const header = document.querySelector('.js-header')

  gsap.timeline()
    .to(menu, {
      opacity: 1,
      onStart: () => {
        menu.classList.add("-is-active")
        document.body.classList.add("overflow-hidden")
        header.classList.add("-dark")
      }
    })
}

function menuClose() {
  const menu = document.querySelector('.js-menu')
  const header = document.querySelector('.js-header')

  gsap.timeline()
    .to(menu, {
      opacity: 0,
      onStart: () => {
        menu.classList.remove("-is-active")
        document.body.classList.remove("overflow-hidden")
        header.classList.remove("-dark")
      }
    })
}


const Header = (function() {
  let navList;
  let navBtnListBack;
  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    if (document.querySelector('.desktopMenu')) {
      navList = document.querySelector('.desktopMenu .js-navList');
    } else {
      navList = document.querySelector('.js-navList');
    }

    navBtnListBack = document.querySelectorAll('.js-nav-list-back');
    menuDeepLevel = 0;
  }
  
  function init() {
    updateVars()
    menuListBindEvents()
  }

  function deepLevelCheck(level) {
    return level;
  }

  function menuListBindEvents() {
    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');
    if (!listItems.length) return;

    navBtnListBack.forEach(el => {
      el.addEventListener('click', () => {
        const visibleList = navList.querySelector('ul.-is-active');
        const parentList = visibleList.parentElement.parentElement;
  
        menuDeepLevel--;
        menuListStepAnimate(visibleList, parentList, menuDeepLevel);
      })
    })

    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;
        menuListStepAnimate(parent, subnavList, menuDeepLevel, parentLink.innerHTML);
      });
    });
  }

  function menuListStepAnimate(hideList, showList, level) {
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 1199 || document.querySelector('.js-desktopMenu')) {
      timeline
        .clear()

      if (!deepLevelCheck(level)) {
        gsap.to(navBtnListBack, {
          ease: "quart.inOut",
          duration: 0.6,
          opacity: 0,
        })
      }
      
      timeline.to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 0.8,
        y: '100%',
        onStart: () => {
          showList.classList.add('-is-active');
        },
        onComplete: () => {
          hideList.classList.remove('-is-active');
        },
      })

      if (deepLevelCheck(level)) {
        timeline.to(navBtnListBack, {
          ease: "quart.inOut",
          duration: 0.6,
          y: '0px',
          opacity: 1,
        }, '>-0.5')
      }

      timeline.to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 0.9,
        y: '0%',
      }, '>-0.6')
    }
  }

  function headerSticky() {
    const header = document.querySelector('.js-header');
    if (!header) return;
  
    let classList = ''
  
    if (header.getAttribute('data-add-bg')) {
      classList = header.getAttribute('data-add-bg')
    }

    let scrollPos = 0;
  
    new ScrollMagic.Scene()
      .on('update', (e) => {
        if (e.scrollPos > scrollPos) {
          document.querySelector('.js-header').classList.add('is-hidden-on-scroll');
        } else {
          document.querySelector('.js-header').classList.remove('is-hidden-on-scroll');
        }

        scrollPos = e.scrollPos;
      })
      .addTo(App.SMcontroller);
  
    new ScrollMagic.Scene({ offset: '6px', })
      .setClassToggle(header, classList)
      .addTo(App.SMcontroller);
  
    new ScrollMagic.Scene({ offset: '6px', })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  }

  return {
    headerSticky: headerSticky,
    init: init,
  }
})();

function marquee() {
  const targets = document.querySelectorAll('.js-marquee')

  if (!targets) return

  targets.forEach((el) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        scrub: 1,
        // markers: true,
      }
    })
  
    tl
      .to(".js-first", {duration: 4, xPercent: -80})
      .to(".js-second", {duration: 4, xPercent: 80}, "<")
  })
}

/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function sectionSlider() {
  const sectionSlider = document.querySelectorAll('.js-section-slider');
  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];

    let vertical = "horizontal"
    let prevNavElement = el.querySelector('.js-prev')
    let nextNavElement = el.querySelector('.js-next')

    if (el.getAttribute('data-nav-prev'))
      prevNavElement = document.querySelector(`.${el.getAttribute('data-nav-prev')}`)
    if (el.getAttribute('data-nav-next'))
      nextNavElement = document.querySelector(`.${el.getAttribute('data-nav-next')}`)

    if (el.hasAttribute('data-vertical'))
      vertical = "vertical"
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;
    let scrollbar = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.getAttribute('data-pagination')) {
      let paginationElement = document.querySelector(`.${el.getAttribute('data-pagination')}`)
      
      pagination = {
        el: paginationElement,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true,
      }
    }

    if (el.getAttribute('data-number-pagination')) {
      let paginationElement = document.querySelector(`.${el.getAttribute('data-number-pagination')}`)
      
      pagination = {
        el: paginationElement,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
        },
      }
    }

    if (el.getAttribute('data-progress-pagination')) {
      let paginationElement = document.querySelector(`.${el.getAttribute('data-progress-pagination')}`)
      
      pagination = {
        type: 'progressbar',
        el: paginationElement,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true,
        renderProgressbar: function (index, className) {
          return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
        },
      }
    }

    if (el.hasAttribute('data-scrollbar')) {
      scrollbar = {
        el: '.js-scrollbar',
        draggable: true,
      }
    }
   
    const colsArray = el.getAttribute('data-slider-cols').split(' ');

    let cols_base = 1;
    let cols_xl = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('xl')) cols_xl = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 600,
      autoHeight: true,
      
      centeredSlides: centered,
      parallax: true,
      watchSlidesVisibility: true,
      loop: loop,
      loopAdditionalSlides: 1,
      preloadImages: false,
      lazy: true,
      
      direction: vertical,
      
      scrollbar: scrollbar,
      pagination: pagination,
      spaceBetween: 10,
      
      // width: 330,
      slidesPerView: parseInt(cols_base),
      breakpoints: {
        1199: { slidesPerView: parseInt(cols_xl), width: null, spaceBetween: parseInt(gap), },
        991: { slidesPerView: parseInt(cols_lg), width: null, spaceBetween: parseInt(gap), },
        767:  { slidesPerView: parseInt(cols_md), width: null, spaceBetween: parseInt(gap), },
        574:  { slidesPerView: parseInt(cols_sm), width: null, spaceBetween: parseInt(gap), },
      },

      lazy: {
        loadPrevNext: true,
      },
      navigation: {
        prevEl: prevNavElement,
        nextEl: nextNavElement,
      },
    })
  }
}

function testimonialsSlider_1() {
  const slider = new Swiper('.js-testimonialsSlider-1', {
    speed: 400,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      prevEl: document.querySelector('.js-testimonialsSlider-1 .js-testimonialsSlider-1-prev'),
      nextEl: document.querySelector('.js-testimonialsSlider-1 .js-testimonialsSlider-1-next'),
    },
  })

  const paginationItems = document.querySelectorAll('.js-testimonialsSlider-1-pagination > *')

  paginationItems.forEach((el, i) => {
    el.addEventListener('click', () => {
      document
        .querySelector('.js-testimonialsSlider-1-pagination .is-active')
        .classList.remove('is-active')
      el.classList.add('is-active')
      slider.slideTo(i)
    })
  })

  slider.on('slideChangeTransitionStart', () => {
    document
      .querySelector('.js-testimonialsSlider-1-pagination .is-active')
      .classList.remove('is-active')
    paginationItems[slider.realIndex].classList.add('is-active')
  })
}

function sectionSliderAuto() {
  const slider = new Swiper('.js-section-slider-auto', {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    speed: 400,
    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      prevEl: document.querySelector('.js-slider-auto-prev'),
      nextEl: document.querySelector('.js-slider-auto-next'),
    },
  })
}

function verticalSlider() {
  const swiper = new Swiper('.js-verticalSlider', {
    direction: "vertical",
    autoHeight: true,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    speed: 400,
    slidesPerView: 1,
    mousewheel: {
      enabled: true
    },
    breakpoints: {
      991: { slidesPerView: 3, spaceBetween: 130, },
      767:  { slidesPerView: 1, spaceBetween: 30, },
      574:  { slidesPerView: 1, spaceBetween: 30, },
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: document.querySelector('.js-verticalSlider-pagination'),
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      bulletElement: 'div',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
      },
    },
    navigation: {
      prevEl: document.querySelector('.js-slider-auto-prev'),
      nextEl: document.querySelector('.js-slider-auto-next'),
    },
  });

  const section = document.querySelector('.verticalSlider-images');
  if (!section) return;
  
  swiper.on('slideChangeTransitionEnd', (e) => {
    const images = section.querySelectorAll('.verticalSlider-images__images > *');

    images.forEach(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      }
    });

    images[swiper.realIndex].classList.add('is-active');
  });
}

function verticalSlider2() {
  new Swiper('.js-verticalSlider-type-2', {
    direction: "vertical",
    autoHeight: true,
    centeredSlides: true,
    // loop: true,
    spaceBetween: 0,
    speed: 400,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: document.querySelector('.js-verticalSlider-type-2-pagination'),
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      bulletElement: 'div',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + 0 + (index + 1) + "</span>";
      },
    },
  })
}

const Tabs = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-tabs");
    if (!targets) return;

    targets.forEach(el => {
      singleTab(el)
    })
  }

  function singleTab(target) {
    const controls = target.querySelector('.js-tabs-controls');
    const controlsItems = target.querySelectorAll('.js-tabs-controls .js-tabs-button');
    const content = target.querySelector('.js-tabs-content');

    for (let l = 0; l < controlsItems.length; l++) {
      const el = controlsItems[l];
      
      el.addEventListener("click", (e) => {
        const selector = el.getAttribute('data-tab-target');

        controls.querySelector('.is-tab-el-active').classList.remove('is-tab-el-active')
        content.querySelector('.is-tab-el-active').classList.remove('is-tab-el-active')

        el.classList.add('is-tab-el-active')
        content.querySelector(selector).classList.add('is-tab-el-active')
      });
    }
  }

  return {
    init: init,
  }
})();

const Accordion = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-accordion");
    if (!targets) return;

    for (let i = 0; i < targets.length; i++) {
      const items = targets[i].querySelectorAll('.accordion__item');

      for (let l = 0; l < items.length; l++) {
        const button = items[l].querySelector('.accordion__button')
        const content = items[l].querySelector('.accordion__content')
        const titleChange = items[l].querySelector('[data-open-change-title]')
        let buttonOrigTitle
        let buttonNewTitle

        if (items[l].classList.contains('js-accordion-item-active')) {
          items[l].classList.toggle('is-active')
          content.style.maxHeight = content.scrollHeight + "px"
        }

        if (titleChange) {
          buttonOrigTitle = titleChange.innerHTML
          buttonNewTitle = titleChange.getAttribute('data-open-change-title')
        }
        
        button.addEventListener("click", (e) => {
          items[l].classList.toggle('is-active');

          if (titleChange) {
            if (items[l].classList.contains('is-active')) {
              titleChange.innerHTML = buttonNewTitle
            } else {
              titleChange.innerHTML = buttonOrigTitle
            }
          }
  
          if (content.style.maxHeight) {
            content.style.maxHeight = null
          } else {
            content.style.maxHeight = content.scrollHeight + "px"
          }
        })
      }
    }
  }

  return {
    init: init,
  }
})();

const ShowMore = (function() {
  function init() {
    const targets = document.querySelectorAll(".js-show-more");
    if (!targets) return;

    targets.forEach((el, i) => {
      const button = el.querySelector('.show-more__button')
      const content = el.querySelector('.show-more__content')
      
      button.addEventListener("click", (e) => {
        el.classList.toggle('is-active')

        if (content.style.maxHeight) {
          content.style.maxHeight = null
        } else {
          content.style.maxHeight = content.scrollHeight + "px"
        }
      })
    })
  }

  return {
    init: init,
  }
})();

/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) return;
  const target = document.querySelectorAll('[data-parallax]')

  target.forEach(el => {
    jarallax(el, {
      speed: el.getAttribute('data-parallax'),
      imgElement: '[data-parallax-target]',
    })
  })
}

/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {
  function single() {
    const animationTarget = document.querySelectorAll('[data-anim]');
    if (!animationTarget.length) return;

    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '350px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '350px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.js-chart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-chart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count);
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }

  function splitLines(target, animDelay = 0) {
  
    const lines = target.querySelectorAll('.split__line');

    gsap.to(lines, {
      delay: animDelay,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power2.out',
      y: '0%',
    });
  
  }


  function init() {
    single();
    container();
  }

  return {
    init: init,
  }
})();

function splitTextIntoLines() {
  
  let target;

  if (App.body.classList.contains('page-reveal-off')) {
    target = document.querySelectorAll("[data-split='lines']:not([data-split-page-reveal])");
  } else {
    target = document.querySelectorAll("[data-split='lines']");
  }

  if (!target.length) return;

  target.forEach(el => {
    let content;
    let test = el.querySelectorAll('* > *:not(br):not(span)');

    if (test.length > 0) {
      content = el.querySelectorAll('* > *:not(br):not(span)');
    }

    new SplitText(content, {
      type: 'lines',
      linesClass: 'overflow-hidden',
    });

    content.forEach(el => {
      const lines = el.querySelectorAll('.overflow-hidden');

      new SplitText(lines, {
        type: 'lines',
        linesClass: 'split__line',
      });
    });

    gsap.set(el.querySelectorAll('.split__line'), {
      y: '100%',
    })
  });

}

/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });
}

const Select = (function() {
  function init(selector) {
    document.querySelectorAll(selector).forEach((el) => singleSelect(el))
    document.querySelectorAll('.js-multiple-select').forEach((el) => multipleSelect(el))
  }

  function multipleSelect(target) {
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        let selectedValues = []
        el.classList.toggle('-is-choosen')

        const array = dropdown.querySelectorAll('.-is-choosen .js-target-title')
        array.forEach((el2) => {
          selectedValues.push(el2.innerHTML)
        })

        if (!array.length) {
          title.innerHTML = "Default"
          target.setAttribute("data-select-value", "")
        } else {
          title.innerHTML = selectedValues.join(', ')
          target.setAttribute("data-select-value", selectedValues.join(', '))
        }

        const checkbox = el.querySelector('input')
        checkbox.checked = !checkbox.checked
      })
    })
  }

  function singleSelect(target) {
    const button = target.querySelector('.js-button')
    const title = button.querySelector('.js-button-title')
    
    if (target.classList.contains('js-liveSearch')) {
      liveSearch(target)
    }

    button.addEventListener('click', () => {
      let dropdown = target.querySelector('.js-dropdown')
      
      if (dropdown.classList.contains('-is-visible')) {
        dropdown.classList.remove('-is-visible')
      } else {
        closeAlldropdowns()
        dropdown.classList.add('-is-visible')
      }
      
      if (target.classList.contains('js-liveSearch')) {
        target.querySelector('.js-search').focus()
      }
    })

    const dropdown = target.querySelector('.js-dropdown')
    const options = dropdown.querySelectorAll('.js-options > *')

    options.forEach((el) => {
      el.addEventListener('click', () => {
        title.innerHTML = el.innerHTML
        target.setAttribute("data-select-value", el.getAttribute('data-value'))
        dropdown.classList.toggle('-is-visible')
      })
    })
  }

  function liveSearch(target) {
    const search = target.querySelector('.js-search')
    const options = target.querySelectorAll('.js-options > *')
    
    search.addEventListener('input', (event) => {
      let searchTerm = event.target.value.toLowerCase()

      options.forEach((el) => {
        el.classList.add('d-none')

        if (el.getAttribute('data-value').includes(searchTerm)) {
          el.classList.remove('d-none')
        }
      })
    })
  }

  function closeAlldropdowns() {
    const targets = document.querySelectorAll('.js-select, .js-multiple-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }

  return {
    init: init,
  }
})()

/*--------------------------------------------------
  05. Custom cursor
---------------------------------------------------*/

const Cursor = (function() {

  const cursor = document.querySelector(".js-cursor");
  let follower;
  let label;
  let icon;

  let clientX;
  let clientY;
  let cursorWidth;
  let cursorHeight;
  let cursorTriggers;
  let state;

  function variables() {

    follower = cursor.querySelector(".js-follower");
    label = cursor.querySelector(".js-label");
    icon = cursor.querySelector(".js-icon");

    clientX = -100;
    clientY = -100;
    cursorWidth = cursor.offsetWidth / 2;
    cursorHeight = cursor.offsetHeight / 2;
    cursorTriggers;
    state = false;

  }

  function init() {

    if (!cursor) return;

    variables();
    state = true;
    cursor.classList.add('is-enabled');

    document.addEventListener("mousedown", e => {
      cursor.classList.add('is-mouse-down');
    });

    document.addEventListener("mouseup", e => {
      cursor.classList.remove('is-mouse-down');
    });

    document.addEventListener("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
    });

    const render = () => {
      cursor.style.transform = `translate(${clientX - cursorWidth}px, ${clientY - cursorHeight}px)`;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    update();
    breakpoint();

  }

  function enterHandler({ target }) {

    cursor.classList.add('is-active');

    if (target.getAttribute('data-cursor-label')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label');
      label.innerHTML = target.getAttribute('data-cursor-label');
    }

    if (target.getAttribute('data-cursor-label-light')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label-light');
      label.innerHTML = target.getAttribute('data-cursor-label-light');
    }

    if (target.getAttribute('data-cursor-icon')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-icon');
      const iconAttr = target.getAttribute('data-cursor-icon');
      icon.innerHTML = feather.icons[iconAttr].toSvg();
    }

  }
  
  function leaveHandler() {

    App.body.classList.remove('is-cursor-active');
    cursor.classList.remove('is-active');
    cursor.classList.remove('has-label');
    cursor.classList.remove('has-label-light');
    cursor.classList.remove('has-icon');
    label.innerHTML = '';
    icon.innerHTML = '';

  }

  function update() {

    if (!cursor) return;

    cursorTriggers = document.querySelectorAll([
      "button",
      "a",
      "input",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-cursor-label-light]",
      "[data-cursor-icon]",
      "textarea"
    ]);
    
    cursorTriggers.forEach(el => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

  }

  function clear() {

    if (!cursor) return;
    
    cursorTriggers.forEach(el => {
      el.removeEventListener("mouseenter", enterHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    });

  }

  function hide() {

    if (!cursor) return;
    cursor.classList.add('is-hidden');

  }

  function show() {

    if (!cursor) return;
    cursor.classList.remove('is-hidden');

  }

  function breakpoint() {

    if (!state) return;
    if (!App.config.cursorFollower.disableBreakpoint) return;

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < App.config.cursorFollower.disableBreakpoint) {
      state = false;
      cursor.classList.remove('is-enabled');
      clear();
    } else {
      state = true;
      cursor.classList.add('is-enabled');
      update();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < App.config.cursorFollower.disableBreakpoint) {
        state = false;
        cursor.classList.remove('is-enabled');
        clear();
      } else {
        state = true;
        cursor.classList.add('is-enabled');
        update();
      }
    })

  }

  return {
    init: init,
    leaveHandler: leaveHandler,
    update: update,
    clear: clear,
    hide: hide,
    show: show,
  };

})();

/*--------------------------------------------------
  ?. Map
---------------------------------------------------*/

class HTMLMapMarker extends google.maps.OverlayView {
  constructor(args) {
    super();
    this.latlng = args.latlng
    this.html = args.html
    this.setMap(args.map)
  }

  createDiv() {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    
    if (this.html) {
      this.div.innerHTML = this.html;
    }
    google.maps.event.addDomListener(this.div, 'click', event => {
      google.maps.event.trigger(this, 'click');
    });
  }

  appendDivToOverlay() {
    const panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div);
  }

  positionDiv() {
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    if (point) {
      this.div.style.left = `${point.x}px`;
      this.div.style.top = `${point.y}px`;
    }
  }

  draw() {
    if (!this.div) {
      this.createDiv();
      this.appendDivToOverlay();
    }
    this.positionDiv();
  }

  remove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }

  getVisible() {
    return this.latlng;
  }

  getPosition() {
    return new google.maps.LatLng(this.latlng);
  }

  getDraggable() {
    return false;
  }
}

function initMap() {
  if (!document.querySelector('.js-map')) return

  const map = new google.maps.Map(document.querySelector('.js-map'), {
    zoom: 12,
    center: {
      lat: 40.69,
      lng: -73.88
    }
  })

  const locations = [
    { lat: 40.800610, lng: -74.035242 },
    { lat: 40.730610, lng: -73.935242 },
    { lat: 40.740610, lng: -73.825242 },
    { lat: 40.700610, lng: -73.885242 },
    { lat: 40.670610, lng: -73.785242 },
    { lat: 40.680610, lng: -73.905242 },
  ]

  const contentString = `
    <div class="tourCard -type-1 pt-10 pb-15 px-10 border-1 rounded-12">
      <div class="tourCard__header">
        <div class="tourCard__image ratio ratio-28:20">
          <img src="img/tourCards/1/1.png" alt="image" class="img-ratio rounded-12">
        </div>

        <button class="tourCard__favorite">
          <i class="icon-heart"></i>
        </button>
      </div>

      <div class="tourCard__content px-10 pt-15">
        <div class="tourCard__location d-flex items-center text-13 text-light-2">
          <i class="icon-pin d-flex text-16 text-light-2 mr-5"></i>
          New York, USA
        </div>
        
        <h3 class="tourCard__title text-16 fw-500 mt-10">
          <span>Phi Phi Islands Day Tour from Phuket</span>
        </h3>

        <div class="tourCard__rating d-flex items-center text-13 mt-10">
          <div class="d-flex x-gap-5">
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
            <div><i class="icon-star text-10 text-yellow-2"></i></div>
          </div>

          <span class="text-dark-1 ml-10">4.8 (269)</span>
        </div>

        <div class="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-15 mt-15">
          <div class="d-flex items-center">
            <i class="icon-clock text-16 mr-5"></i>
            4 days
          </div>

          <div>From <span class="text-16 fw-500">$771,00</span></div>
        </div>
      </div>
    </div>
  `;

  const markers = locations.map((location) => {
    const marker = new HTMLMapMarker({
      latlng: location,
      map: map,
      html: `
        <div class="mapMarker bg-white rounded-200 border-dark-1 px-20 py-10">
          <div class="text-14 fw-500">US$72</div>
        </div>
      `
    })

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close()
    })
  
    marker.addListener("click", () => {
      setTimeout(() => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      }, 50);
    })

    return marker;
  })

  new markerClusterer.MarkerClusterer({ map, markers: markers })
}

function initMapTourPages() {
  if (!document.querySelector('.js-map-tour')) return

  const map = new google.maps.Map(document.querySelector('.js-map-tour'), {
    zoom: 10,
    center: {
      lat: 40.8,
      lng: -74.02
    }
  })

  const locations = [
    { lat: 40.800610, lng: -74.035242 },
    { lat: 41.000610, lng: -74.135242 },
    { lat: 40.700610, lng: -73.835242 },
  ]

  const contentString = `
    <div class="flex-center rounded-4">
      <div class="px-15 py-15">
        <div class="text-16 fw-500">Khao Sok National Park</div>
      </div>
    </div>
  `;

  const markers = locations.map((location, index) => {
    const marker = new HTMLMapMarker({
      latlng: location,
      map: map,
      html: `
        <div class="mapMarker button -outline-accent-1 flex-center bg-white rounded-200 border-accent-1 size-40 text-accent-1">
          <div class="text-14 fw-500">${index + 1}</div>
        </div>
      `
    })

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close()
    })
  
    marker.addListener("click", () => {
      setTimeout(() => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      }, 50);
    })

    return marker;
  })

  new markerClusterer.MarkerClusterer({ map, markers: markers })
}

function initMapSingle() {
  if (!document.querySelector('.js-map-single')) return

  const map = new google.maps.Map(document.querySelector('.js-map-single'), {
    zoom: 12,
    center: {
      lat: 40.8,
      lng: -74.02
    }
  })

  const locations = [
    { lat: 40.800610, lng: -74.035242 },
  ]

  const markers = locations.map((location) => {
    const marker = new HTMLMapMarker({
      latlng: location,
      map: map,
      html: `
        <div class="mapMarker flex-center rounded-200 bg-accent-2 size-60">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 0.78125C7.73438 0.78125 3.90625 4.60938 3.90625 9.375C3.90625 16.0156 11.6406 23.6719 11.9531 23.9844C12.1094 24.1406 12.2656 24.2188 12.5 24.2188C12.7344 24.2188 12.8906 24.1406 13.0469 23.9844C13.3594 23.6719 21.0938 16.0156 21.0938 9.375C21.0938 4.60938 17.2656 0.78125 12.5 0.78125ZM12.5 22.3438C10.7812 20.4688 5.46875 14.4531 5.46875 9.375C5.46875 5.46875 8.59375 2.34375 12.5 2.34375C16.4062 2.34375 19.5312 5.46875 19.5312 9.375C19.5312 14.375 14.2188 20.4688 12.5 22.3438Z" fill="#122223"/>
            <path d="M17.7344 8.125C17.6562 7.8125 17.4219 7.65625 17.1094 7.57812L14.4531 7.1875L13.2812 4.76562C13.0469 4.21875 12.1094 4.21875 11.875 4.76562L10.7031 7.1875L8.04687 7.57812C7.65625 7.65625 7.42187 7.8125 7.26562 8.125C7.1875 8.4375 7.26563 8.75 7.5 8.90625L9.45312 10.7812L8.98437 13.4375C8.90625 13.75 9.0625 14.0625 9.29687 14.2188C9.53125 14.375 9.84375 14.4531 10.1562 14.2969L12.5781 13.0469L15 14.2969C15.0781 14.375 15.2344 14.375 15.3906 14.375C15.5469 14.375 15.7031 14.2969 15.8594 14.2188C16.0937 14.0625 16.25 13.75 16.1719 13.4375L15.7031 10.7812L17.6562 8.90625C17.7344 8.75 17.8125 8.4375 17.7344 8.125ZM14.2188 10C14.0625 10.1562 13.9844 10.4687 13.9844 10.7031L14.2188 12.1875L12.8906 11.4844C12.8125 11.4062 12.6562 11.4062 12.5 11.4062C12.3437 11.4062 12.2656 11.4062 12.1094 11.4844L10.7812 12.1875L11.0156 10.7031C11.0937 10.4687 10.9375 10.1562 10.7812 10L9.6875 8.90625L11.1719 8.67188C11.4062 8.67188 11.6406 8.4375 11.7969 8.28125L12.5 6.875L13.2031 8.28125C13.2812 8.51562 13.5156 8.67188 13.8281 8.67188L15.3125 8.90625L14.2188 10Z" fill="#122223"/>
          </svg>
        </div>
      `
    })

    return marker;
  })

  new markerClusterer.MarkerClusterer({ map, markers: markers })
}

const Events = (function() {
  function init() {
    const targets = document.querySelectorAll("[data-x-click]")
    if (!targets) return

    targets.forEach((eventTarget) => {
      const attributes = eventTarget.getAttribute('data-x-click').split(', ')
      
      attributes.forEach((el) => {
        const target = document.querySelector(`[data-x=${el}]`)
        
        eventTarget.addEventListener('click', () => {
          const toggleClass = target.getAttribute('data-x-toggle')
          if (!target.classList.contains(toggleClass)) {
            closeAllDropdowns()
          }
          target.classList.toggle(toggleClass)
        })
      })
    })
  }

  function ddInit() {
    const targets = document.querySelectorAll(".js-form-dd")
    if (!targets) return

    targets.forEach((el) => {
      const eventTarget = el.querySelector('[data-x-dd-click]')
      const attributes = eventTarget.getAttribute('data-x-dd-click').split(', ')
      
      attributes.forEach((el2) => {
        const target = el.querySelector(`[data-x-dd=${el2}]`)
        const toggleClass = target.getAttribute('data-x-dd-toggle')
        
        eventTarget.addEventListener('click', () => {
          if (eventTarget.querySelector('.js-dd-focus'))
            eventTarget.querySelector('.js-dd-focus').focus()

          if (target.classList.contains(toggleClass)) {
            target.classList.remove(toggleClass)
            el.classList.remove("-is-dd-wrap-active")
          } else {
            closeAllDropdowns()
            target.classList.add(toggleClass)
            el.classList.add("-is-dd-wrap-active")
          }
        })
      })
    })
  }

  // function closeAllDropdowns() {
  //   // const classes = document.querySelectorAll(".-is-dd-wrap-active")
  //   // if (classes) {
  //   //   classes.forEach(el => {
  //   //     el.classList.remove('-is-dd-wrap-active')
  //   //   });
  //   // }

  //   const targets = document.querySelectorAll(".js-form-dd")
  //   if (!targets) return
  
  //   targets.forEach((el) => {
  //     const eventElement = el.querySelector('[data-x-dd]')
  //     const eventTarget = el.querySelector('[data-x-dd-click]')
  //     const attributes = eventTarget.getAttribute('data-x-dd-click').split(', ')
      
  //     attributes.forEach((el) => {
  //       eventElement.classList.remove('-is-active')
  //       const target = document.querySelector(`[data-x-dd=${el}]`)
  //       const toggleClass = target.getAttribute('data-x-dd-toggle')
  //       target.classList.remove(toggleClass)
  //     })
  //   })
  // }

  return {
    ddInit: ddInit,
    closeAllDropdowns: closeAllDropdowns,
    init: init,
  }
})()


function closeAllDropdowns() {
  const targets = document.querySelectorAll(".js-form-dd")
  if (!targets) return

  targets.forEach((el) => {
    if (el.querySelector('.is-active')) {
      el.querySelector('.is-active').classList.remove('is-active')
    }
  })

  const alldds = document.querySelectorAll('.js-dropdown.is-active')

  alldds.forEach(el => {
    el.classList.remove('is-active')
  })
}

window.onclick = function(event) {
  if (
    !event.target.closest(".js-form-dd")
  ) {
    closeAllDropdowns()
  }

  if (!event.target.closest('.js-select')) {
    const targets = document.querySelectorAll('.js-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }

  if (!event.target.closest('.js-multiple-select')) {
    const targets = document.querySelectorAll('.js-multiple-select')
    if (!targets) return
    
    targets.forEach(el => {
      if (el.querySelector('.-is-visible')) {
        el.querySelector('.-is-visible').classList.remove('-is-visible')
      }
    })
  }
}

const Calendar = (function() {
  const startYear = 2024
  const startMonth = 1
  const monthRange = 12
  const weekDaysOrder = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
  let calendarEl

  function updateVars() {
    calendarEl = document.querySelectorAll('.js-calendar-el')
    if (!calendarEl.length) return
  }

  const getAllDaysInMonth = (month, year) => {
    let initialMonthArray = Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => {
        return {
          weekDay: weekDaysOrder[new Date(year, month - 1, i + 1).getDay()],
          dayNum: i + 1,
        }
      }
    )

    let daysInBeginning = weekDaysOrder.indexOf(initialMonthArray[0].weekDay)

    let testDate = new Date(year, month, 0)
    testDate = new Date(testDate.setDate(0)).toISOString()

    testDate = Array.from(
      { length: new Date(testDate).getDate() },
      (_, i) => {
        return {
          weekDay: weekDaysOrder[new Date(new Date(testDate).getFullYear(), new Date(testDate).getMonth(), i + 1).getDay()],
          dayNum: i + 1,
        }
      }
    ).slice(-daysInBeginning)

    if (daysInBeginning == 0) {
      testDate = []
    }

    const months = ["january","february","march","april","may","june","july","august","september","october","november","december"]
    let monthName = months[new Date(year, month, 0).getUTCMonth()]

    return {
      monthName,
      initialMonthArray,
      firstDates: testDate
    }
  }

  function getFullYearDates(startDate, countOfMonthToTake) {
    const date = startDate.split('/')
    let allYearMonths = []

    for (let i = date[0]; i < parseInt(date[0]) + parseInt(countOfMonthToTake); i++) {
      allYearMonths.push(getAllDaysInMonth(i, date[1]))
    }

    return allYearMonths
  }

  function init() {
    updateVars()
    if (!calendarEl.length) return

    calendarEl.forEach(calendarElement => {
      let calendarGrid = calendarElement.querySelector('.js-calendar-el-calendar')
      
      let allYearMonths = getFullYearDates(`${startMonth}/${startYear}`, monthRange)
      let globalIndex = 0

      function globalIndexUp() {
        globalIndex = globalIndex + 1
        return globalIndex
      }

      calendarGrid.innerHTML += `
        <div class="elCalendar__slider js-calendar-slider">
          <div class="swiper-wrapper">
            ${allYearMonths.map((month, i) => {
              return `
                <div class="swiper-slide">
                  <div class="capitalize text-18 fw-500 text-center mb-20">
                    ${month.monthName} ${startMonth + i > 12 ? startYear + 1 : startYear}
                  </div>

                  <div class="elCalendar__month">
                    <div class="elCalendar__header">
                      ${weekDaysOrder.map(el => `<div class="elCalendar__header__sell">${el}</div>`).join('')}
                    </div>
        
                    <div class="elCalendar__body">
                      ${month.firstDates.map(el => `
                        <div
                          data-index="${globalIndexUp()}" data-week="${el.weekDay}" data-month="${month.monthName.slice(0, 3)}"
                          class="elCalendar__sell -dark"
                        >
                          <span class="js-date">
                            ${el.dayNum}
                          </span>
                        </div>
                      `).join('')}
        
                      ${month.initialMonthArray.map(el => `
                        <div
                          data-index="${globalIndexUp()}" data-week="${el.weekDay}" data-month="${month.monthName.slice(0, 3)}"
                          class="elCalendar__sell"
                        >
                          <span class="js-date">
                            ${el.dayNum}
                          </span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `
            }).join('')}
          </div>

          <button class="elCalendar__sliderNav -prev flex-center js-calendar-slider-prev">
            <i class="icon-arrow-left text-20"></i>
          </button>

          <button class="elCalendar__sliderNav -next flex-center js-calendar-slider-next">
            <i class="icon-arrow-right text-20"></i>
          </button>
        </div>
      `

      calendarSlider(calendarElement)
    })
  }

  function calendarSlider(container) {
    const attributeCheck = container.getAttribute('data-slider-cols-2');
    let breakpoints = false;

    if (attributeCheck) {
      breakpoints = {
        991: { slidesPerView: 2 },
      }
    }
    
    new Swiper(container.querySelector('.js-calendar-slider'), {
      speed: 600,
      autoHeight: true,
      spaceBetween: 30,
      slidesPerView: 1,
      breakpoints: breakpoints,
      navigation: {
        prevEl: '.js-calendar-slider-prev',
        nextEl: '.js-calendar-slider-next',
      },
    })
  }
  
  return {
    init: init,
  }
})();

function calendarInteraction() {
  const target = document.querySelectorAll('.js-calendar')
  if (!target) return

  target.forEach(elTarget => {
    const gridCells = elTarget.querySelectorAll('.elCalendar__body > *')

    const firstDate = elTarget.querySelector('.js-first-date')
    const lastDate = elTarget.querySelector('.js-last-date')

    let completeState = false
    let firstItem = false
    let lastItem = false

    gridCells.forEach((el, i) => {
      el.addEventListener('click', () => {
        el.classList.add('-is-active')

        if (firstItem && getIndex(firstItem) > getIndex(el)) {
          lastItem = firstItem
          firstItem = el
        }

        if (firstItem && !lastItem) {
          lastItem = el
        }
        
        if (!firstItem) {
          firstItem = el
        }
        
        if (completeState) {
          firstItem = false
          lastItem = false
          
          const array = elTarget.querySelectorAll('.-is-active')
          array.forEach(el2 => {
            el2.classList.remove('-is-active')
          })
          
          const array2 = elTarget.querySelectorAll('.-is-in-path')
          array2.forEach(el2 => {
            el2.classList.remove('-is-in-path')
          })

          completeState = false

        } else if (firstItem && lastItem) {
          const iterationCount = Math.abs(getIndex(firstItem) - getIndex(lastItem))
    
          for (let l = 1; l < iterationCount; l++) {
            const item = elTarget.querySelector(`[data-index="${ getIndex(firstItem) + l }"]`)
            item.classList.add('-is-in-path')
          }

          if (firstDate) firstDate.innerHTML = `${firstItem.getAttribute('data-week')} ${firstItem.querySelector('.js-date').innerHTML} ${firstItem.getAttribute('data-month')}`
          if (lastDate) lastDate.innerHTML = `${lastItem.getAttribute('data-week')} ${lastItem.querySelector('.js-date').innerHTML} ${lastItem.getAttribute('data-month')}`
    
          completeState = true
        }
      })
    })
  })

  function getIndex(element) {
    return parseInt(element.getAttribute('data-index'))
  }
}


function selectControl() {
  const targets = document.querySelectorAll('.js-select-control')
  if (!targets) return

  targets.forEach(el => {
    const chosen = el.querySelector('.js-select-control-chosen')
    const counters = el.querySelectorAll('.js-select-control-counter')

    let arr = []

    counters.forEach((counter, index) => {
      const title = counter.querySelector('.js-search-title').innerHTML
      const counterTarget = counter.querySelector('.js-search-counter')
      const number = counterTarget.querySelector('.js-number')

      arr.push({ title: title, value: 0 })

      counterTarget.querySelector('.js-remove').addEventListener('click', () => {
        if (parseInt(number.innerHTML) > 0) {
          number.innerHTML = parseInt(number.innerHTML) - 1
          arr[index].value = number.innerHTML

          chosen.innerHTML = arr.map(el => {
            if (el.value > 0) {
              return ` ${el.title} ${el.value}`
            } else {
              return ""
            }
          })
        }
      })

      counterTarget.querySelector('.js-add').addEventListener('click', () => {
        number.innerHTML = parseInt(number.innerHTML) + 1
        arr[index].value = number.innerHTML
        
        chosen.innerHTML = arr.map(el => {
          if (el.value > 0) {
            return ` ${el.title} ${el.value}`
          } else {
            return ""
          }
        })
      })
    })
  })
}

function dropdown() {
  const targets = document.querySelectorAll('.js-dropdown')
  if (!targets.length) return

  targets.forEach((target) => {
    const title = target.querySelector('.js-title')
    const button = target.querySelector('.js-button')
    const menuItems = target.querySelectorAll('.js-menu-items > *')

    if (button) {
      button.addEventListener('click', () => {
        closeAllDropdowns()
        target.classList.toggle('is-active')
      })
    }

    menuItems.forEach((el) => {
      el.addEventListener('click', () => {
        if (!target.classList.contains('js-dont-close')) {
          target.classList.toggle('is-active')
          title.innerHTML = el.innerHTML
        }
        target.setAttribute("data-main-value", el.getAttribute('data-value'))
      })
    })
  })
}

function galleryInit() {
  GLightbox({
    selector: '.js-gallery',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
  });
}

function menuFullScreen() {
  const menu = document.querySelector('.js-menuFullScreen');
  if (!menu) return;

  const openBtn = document.querySelectorAll('.js-menuFullScreen-open');
  const closeBtn = document.querySelectorAll('.js-menuFullScreen-close');
  const toggleBtn = document.querySelectorAll('.js-menuFullScreen-toggle');

  const openMenu = () => {
    const topMobile = menu.querySelector('.js-menuFullScreen-topMobile');
    const mobileBg = menu.querySelector('.js-menuFullScreen-mobile-bg');
    const bg = menu.querySelector('.js-menuFullScreen-bg');
    const bgImage = menu.querySelector('.js-menuFullScreen-bg > *');
    const closeBtn = menu.querySelector('.js-menuFullScreen-close-btn');
    const links = menu.querySelectorAll('.js-menuFullScreen-links > .menuFullScreen-links__item > a');
    const right = menu.querySelector('.js-menuFullScreen-right');
    const buttomMobile = menu.querySelector('.js-menuFullScreen-buttomMobile');

    menu.classList.toggle('is-active');

    gsap.timeline()
      .fromTo(mobileBg, {
        scaleY: "0",
      }, {
        scaleY: "1",
        duration: 1.5,
        ease: "quart.inOut",
      })
      .fromTo(bgImage, {
        scale: 1.3,
      }, {
        scale: 1,
        duration: 4.0,
        ease: "expo.out",
      }, '0')
      .fromTo(bg, {
        clipPath: "rect(0px 100% 0% 0px)",
      }, {
        clipPath: "rect(0px 100% 100% 0px)",
        duration: 1.5,
        ease: "expo.inOut",
      }, '<')

      .fromTo(topMobile, {
        opacity: 0,
        y: '20px',
      }, {
        opacity: 1,
        y: '0px',
        duration: 0.8,
        ease: "quart.out",
      }, '<+1.0')
      .fromTo(closeBtn, {
        opacity: 0,
        y: '20px',
      }, {
        opacity: 1,
        y: '0px',
        duration: 0.8,
        ease: "quart.out",
      }, '<')

      .fromTo(links, {
        y: '100%',
      }, {
        y: '0%',
        duration: 0.8,
        stagger: 0.08,
        ease: "quart.out",
      }, '>-0.7')

      .fromTo(buttomMobile, {
        opacity: 0,
        y: '40px',
      }, {
        opacity: 1,
        y: '0px',
        duration: 0.8,
        ease: "quart.out",
      }, '>-0.7')

      .fromTo(right, {
        opacity: 0,
        x: '20px',
      }, {
        opacity: 1,
        x: '0px',
        duration: 0.8,
        ease: "quart.out",
      }, '<')
  }

  const closeMenu = () => {
    const topMobile = menu.querySelector('.js-menuFullScreen-topMobile');
    const mobileBg = menu.querySelector('.js-menuFullScreen-mobile-bg');
    const bg = menu.querySelector('.js-menuFullScreen-bg');
    const closeBtn = menu.querySelector('.js-menuFullScreen-close-btn');
    const links = menu.querySelectorAll('.js-menuFullScreen-links > .menuFullScreen-links__item > a');
    const right = menu.querySelector('.js-menuFullScreen-right');
    const buttomMobile = menu.querySelector('.js-menuFullScreen-buttomMobile');

    gsap.timeline()
      .fromTo(topMobile, {
        opacity: 1,
        y: '0px',
      }, {
        opacity: 0,
        y: '20px',
        duration: 0.8,
        ease: "quart.out",
      })
      .fromTo(closeBtn, {
        opacity: 1,
        y: '0px',
      }, {
        opacity: 0,
        y: '20px',
        duration: 0.8,
        ease: "quart.out",
      }, '<')

      .fromTo(links, {
        y: '0%',
      }, {
        y: '100%',
        duration: 0.8,
        ease: "quart.out",
      }, '>-0.7')
      .fromTo(buttomMobile, {
        opacity: 1,
        y: '0px',
      }, {
        opacity: 0,
        y: '40px',
        duration: 0.8,
        ease: "quart.out",
      }, '>-0.7')
      .fromTo(right, {
        opacity: 1,
        x: '0px',
      }, {
        opacity: 0,
        x: '20px',
        duration: 0.8,
        ease: "quart.out",
      }, '<')

      .fromTo(mobileBg, {
        scaleY: "1",
      }, {
        scaleY: "0",
        duration: 1.5,
        ease: "quart.inOut",
      }, '<-0.2')
      .fromTo(bg, {
        clipPath: "rect(0% 100% 100% 0px)",
      }, {
        clipPath: "rect(100% 100% 100% 0px)",
        duration: 1.5,
        ease: "expo.inOut",
        onComplete: () => menu.classList.remove('is-active'),
      }, '<-0.2')
  }

  toggleBtn.forEach(el => {
    el.addEventListener('click', () => {
      if (menu.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    })
  })

  openBtn.forEach(el => {
    el.addEventListener('click', () => openMenu())
  })
  
  closeBtn.forEach(el => {
    el.addEventListener('click', () => closeMenu())
  })

  const menuHasChildren = menu.querySelectorAll('.js-menuFullScreen-has-children');

  menuHasChildren.forEach(el => {
    const link = el.querySelector('* > a');
    const subnav = el.querySelector('.js-menuFullScreen-subnav');

    link.addEventListener('click', () => {
      if (subnav.style.maxHeight) {
        link.classList.remove('is-mobile-active');
        subnav.style.maxHeight = null
      } else {
        link.classList.add('is-mobile-active');
        subnav.style.maxHeight = subnav.scrollHeight + "px"
      }
    })
  })
}

function lineChart() {
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Feb', 'Marc', 'April', 'May', 'Jun', 'July', 'Agust', 'Sept', 'Oct', 'Now', 'Dec',
      ],
      datasets: [{
        label: '#',
        data: [148, 100, 205, 110, 165, 145, 180, 156, 148, 220, 180, 245],
        tension: 0.4,
        backgroundColor: '#336CFB',
        borderColor: '#336CFB',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 300,
          ticks: {
            stepSize: 50
          }
        }
      },
    },
  })
}

function countChange() {
  const counters = document.querySelectorAll('.js-counter')
  if (!counters) return

  counters.forEach(el => {
    const count = el.querySelector('.js-count')
    const buttonDown = el.querySelector('.js-down')
    const buttonUp = el.querySelector('.js-up')

    buttonDown.addEventListener('click', () => {
      if (count.innerHTML != 0) {
        count.innerHTML = parseInt(count.innerHTML) - 1
      }
    })

    buttonUp.addEventListener('click', () => {
      count.innerHTML = parseInt(count.innerHTML) + 1
    })
  })
}

function pinOnScroll() {
  const target = document.querySelectorAll('.js-pin-container');
  if (!target) return;

  target.forEach(el => {
    const sceneDuration = el.offsetHeight;
    const sceneOffset = el.querySelector('.js-pin-content').offsetHeight + 90;

    const scene = new ScrollMagic.Scene({
      duration: sceneDuration - sceneOffset,
      offset: sceneOffset,
      triggerElement: el,
      triggerHook: "onEnter",
    })
    .setPin(".js-pin-content")
    .addTo(App.SMcontroller)

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < 992) {
      scene.duration('1px')
      scene.refresh()
    } else {
      scene.duration(sceneDuration - sceneOffset)
      scene.refresh()
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < 992) {
        scene.duration('1px');
        scene.refresh();
      } else {
        scene.duration(sceneDuration - sceneOffset);
        scene.refresh();
      }
    })
  });
}

function toTopButton() {
  const button = document.querySelector('.js-top-button')
  if (!button) return

  const pageContentHeight = document.querySelector('main').offsetHeight

  new ScrollMagic.Scene({ duration: pageContentHeight - 1600, })
    .setClassToggle(button, 'is-hidden')
    .addTo(App.SMcontroller)

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

function parallaxIt() {
  const target = document.querySelectorAll('.js-mouse-move-container')

  target.forEach(container => {
    const $this = container
    const targets = container.querySelectorAll('.js-mouse-move')
    
    targets.forEach(el => {
      const movement = el.getAttribute('data-move')

      document.addEventListener('mousemove', (e) => {
        const relX = e.pageX - $this.offsetLeft
        const relY = e.pageY - $this.offsetTop
      
        gsap.to(el, {
          x: (relX - $this.offsetWidth / 2) / $this.offsetWidth * -movement,
          duration: 0.4,
        })
      })
    })
  })
}

function requestForm() {
  const buttons = document.querySelectorAll('.js-toggle-requestForm')
  const form = document.querySelector('.js-requestForm')

  if (!buttons || !form) return

  buttons.forEach((el) => {
    el.addEventListener('click', () => form.classList.toggle('is-active'))
  })
}

function priceRangeSliderInit() {
  const targets = document.querySelectorAll('.js-price-rangeSlider')

  targets.forEach(el => {
    const slider = el.querySelector('.js-slider')

    noUiSlider.create(slider, {
      start: [20, 70000],
      step: 1,
      connect: true,
      range: {
        'min': 0,
        'max': 100000
      },
      format: {
        to: function (value) {
          return "$" + value.toFixed(0)
        },
  
        from: function (value) {
          return value
        }
      }
    })
  
    const snapValues = [
      el.querySelector('.js-lower'),
      el.querySelector('.js-upper')
    ]
  
    slider.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].innerHTML = values[handle];
    })
  })
}

function mapCard() {
  const targets = document.querySelectorAll('.js-mapPlaces')
  
  targets.forEach((target) => {
    const cards = target.querySelectorAll('[data-map-card]')
    const buttons = target.querySelectorAll(`[data-map-place]`)

    cards.forEach((el) => {
      const attrVal = el.getAttribute('data-map-card')
      const button = target.querySelector(`[data-map-place="${attrVal}"]`)

      el.addEventListener('click', (e) => {
        cards.forEach((el) => el.classList.remove('isCardActive'))
        buttons.forEach((el) => el.classList.remove('isActive'))

        if (!el.classList.contains('isCardActive')) {
          button.classList.toggle('isActive')
          el.classList.add('isCardActive')
        }
      })
    })
  })
}

function liveSearch() {
  const targets = document.querySelectorAll('.js-liverSearch')
  if (!targets) return

  const data = [
    { icon: "icon-pin", title: "Phuket", text: "Thailand, Asia" },
    { icon: "icon-price-tag", title: "London Day Trips", text: "England" },
    { icon: "icon-flag", title: "Europe", text: "Country" },
    { image: "img/misc/icon.png", title: "Centipede Tour - Guided Arizona Desert Tour by ATV", text: "Country" },
    { icon: "icon-pin", title: "Istanbul", text: "Turkey" },
    { icon: "icon-pin", title: "Berlin", text: "Germany, Europe" },
    { icon: "icon-pin", title: "London", text: "England, Europe" },
  ]

  targets.forEach(el => {
    const search = el.querySelector('.js-search')
    const results = el.querySelector('.js-results')
    let searchTerm = ''

    results.querySelectorAll('.js-search-option').forEach(option => {
      const title = option.querySelector('.js-search-option-target').innerHTML
      option.addEventListener('click', () => search.value = title)
    })

    search.addEventListener('input', (event) => {
      searchTerm = event.target.value.toLowerCase()
      showList(searchTerm, results)

      results.querySelectorAll('.js-search-option').forEach(option => {
        const title = option.querySelector('.js-search-option-target').innerHTML
        option.addEventListener('click', () => search.value = title)
      })
    })
  })

  const showList = (searchTerm, resultsEl) => {
    resultsEl.innerHTML = '';

    data
      .filter((item) => item.title.toLowerCase().includes(searchTerm))
      .forEach((e) => {
        const div = document.createElement('div')

        if (e.image) {
          div.innerHTML = `
            <button class="headerSearchRecent__item js-search-option" data-x-click="headerSearch">
              <div class="size-50 bg-white rounded-12 border-1 flex-center">
                <img src="${e.image}" alt="image" class="rounded-12">
              </div>
              <div class="ml-10">
                <div class="text-overflow fw-500 js-search-option-target">${e.title}</div>
                <div class="lh-14 text-14 text-light-2">${e.text}</div>
              </div>
            </button>
          `
        } else {
          div.innerHTML = `
            <button class="headerSearchRecent__item js-search-option" data-x-click="headerSearch">
              <div class="size-50 bg-white rounded-12 border-1 flex-center">
                <i class="${e.icon} text-20"></i>
              </div>
              <div class="ml-10">
                <div class="fw-500 js-search-option-target">${e.title}</div>
                <div class="lh-14 text-14 text-light-2">${e.text}</div>
              </div>
            </button>
          `
        }

        resultsEl.appendChild(div)
      })
  }
}

function tabsSlider() {
  const slider = document.querySelector('.js-tabsSlider')

  if (!slider) return

  new Swiper(slider, {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    // effect: "fade",
    navigation: {
      prevEl: '.js-tabsSlider-prev',
      nextEl: '.js-tabsSlider-next',
    },
    pagination: {
      el: document.querySelector('.js-tabsSlider-pagination'),
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className}">VILLA STYLE ${index + 1}</div>`
      },
    }
  })
}

function testimonialsSlider1() {
  const slider = document.querySelector('.js-section-slider-testimonials')
  if (!slider) return

  const images = document.querySelector('.js-section-slider-testimonials-images')

  const swiper = new Swiper(slider, {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      prevEl: '.js-section-slider-testimonials-prev',
      nextEl: '.js-section-slider-testimonials-next',
    },
  })

  swiper.on('slideChange', function () {
    console.log(swiper.realIndex)
    images.style.transform = `translateX(${swiper.realIndex * -100}%)`
  })
}

function heroSlider7() {
  const target = document.querySelector('.js-hero-type-7 .js-slider')

  new Swiper(target, {
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,

    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      prevEl: ".js-prev",
      nextEl: ".js-next",
    },
  })
}

function heroSlider9() {
  const target = document.querySelector('.js-hero-type-9 .js-slider')

  if (!target) return

  new Swiper(target, {
    // direction: "vertical",
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.js-nav',
      clickable: true,
      renderBullet: function (index, className) {
        return `<div class="${className}">0${index + 1}</div>`
      },
    },
    navigation: {
      prevEl: ".js-prev",
      nextEl: ".js-next",
    },
  })
}

function heroSlider10() {
  const target = document.querySelector('.js-hero-type-10 .js-slider')

  new Swiper(target, {
    direction: "vertical",
    speed: 600,
    parallax: true,
    lazy: true,
    spaceBetween: 0,
    slidesPerView: 1,
    mousewheel: {
      invert: false,
    },
    lazy: {
      loadPrevNext: true,
    },
    pagination: {
      el: '.js-pagination',
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      bulletElement: 'div',
      clickable: true
    }
  })
}


function hero1Reveal() {
  const hero = document.querySelector('.js-hero-type-1')
  if (!hero) return

  const title = hero.querySelectorAll('.js-title > .char')
  const bg = hero.querySelector('.js-bg')
  const image = hero.querySelector('.js-image')

  gsap.timeline()
    .fromTo(title, {
      opacity: 0,
      y: "-100%",
      rotate: "12deg",
    }, {
      rotate: "0",
      y: "0%",
      opacity: 1,
      duration: 0.25,
      delay: 1.0,
      stagger: 0.1,
    })
    .fromTo(image, {
      opacity: 0,
      y: "32px",
    }, {
      y: "0px",
      opacity: 1,
      duration: 0.5,
    })
}

function hero5Reveal() {
  const hero = document.querySelector('.js-hero-type-5')
  if (!hero) return

  const lines = hero.querySelector('.js-lines')
  const icon = hero.querySelector('.js-icon')
  const image = hero.querySelector('.js-image')
  const subtitle = hero.querySelectorAll('.js-subtitle > *')
  const title = hero.querySelector('.js-title')
  const text = hero.querySelector('.js-text')
  const button = hero.querySelector('.js-button')

  gsap.timeline()
    .fromTo(lines, {
      opacity: 0,
      scale: 0.95,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.5,
    })
    .fromTo(icon, {
      opacity: 0,
      scale: 0.95,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: 0.1,
    })
    .fromTo(image, {
      opacity: 0,
      x: "32px",
    }, {
      x: "0px",
      opacity: 1,
      duration: 0.5,
      delay: 0.1,
    })

    .fromTo(subtitle, {
      opacity: 0,
      scale: 0.95,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
      delay: 0.2,
    })
    .fromTo([title, text, button], {
      opacity: 0,
      x: "20px",
    }, {
      x: "0px",
      opacity: 1,
      duration: 0.5,
      stagger: 0.5,
    })
}


})();
