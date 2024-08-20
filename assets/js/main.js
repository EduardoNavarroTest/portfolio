(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();




  /*Send info more details portfolio*/

  document.addEventListener('DOMContentLoaded', function () {
    var portfolioLinks = document.querySelectorAll('.portfolio-links #sendDetailsPortfolio');
    portfolioLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var opcion = link.getAttribute('data-opcion');
        localStorage.setItem('selectedOption', opcion);
      });
    });
  });


  const objColombia = {
    title: "Travel Colombia",
    img: {
      img1: "./assets/img/portfolio/colombia-details.png",
      img2: "./assets/img/portfolio/colombia-details2.png",
      img3: "./assets/img/portfolio/colombia-details3.png",
    },
    category: "Web App",
    client: "NA - Uso personal",
    projectDate: "01/01/2024",
    urlFront: "https://colombia-navarro.vercel.app",
    urlBack: "https://github.com/EduardoNavarroTest/web-desarrollo",
    technologies: "HTML, CSS, Boostrap, SASS",
    description: "Página web basada en el turismo en Colombia, desarrollada como proyecto final para el curso 'Desarrollo Web' en Coderhouse. \n Para esta página se utilizaron tecnologías como HTML, CSS, Boostrap y SASS."
  }


  const objRentiAutos = {
    title: "RentiAutos",
    img: {
      img1: "./assets/img/portfolio/renti-details.png",
      img2: "./assets/img/portfolio/renti-details2.png",
      img3: "./assets/img/portfolio/renti-details3.png",
    },
    category: "Web App",
    client: "NA - Uso personal",
    projectDate: "24/02/2024",
    urlFront: "https://eduardonavarrotest.github.io/js-coder",
    urlBack: "https://github.com/EduardoNavarroTest/js-coder",
    technologies: "HTML, CSS, JavaScript, Boostrap",
    description: "Página web interactiva que simula la renta de Autos y Motos de lujo. Desarrollada como proyecto final para el curso 'JavaScript' en Coderhouse."
  }

  /** Recuperar la opción seleccionada del portfolio */
  document.addEventListener('DOMContentLoaded', function () {

    var selectedOption = localStorage.getItem('selectedOption');
    if (selectedOption) {
      console.log('Opción seleccionada:', selectedOption);
      let elemento = document.getElementById('informacionContainer');


      switch (selectedOption) {
        case "colombia":
          document.getElementById("title").innerText = objColombia.title;
          document.getElementById("category").innerText = objColombia.category;
          document.getElementById("category").innerText = objColombia.category;
          document.getElementById("technologies").innerText = objColombia.technologies;
          document.getElementById("client").innerText = objColombia.client;
          document.getElementById("projectDate").innerText = objColombia.projectDate;
          document.getElementById("urlFront").innerText = objColombia.urlFront;
          document.getElementById("urlFront").href = objColombia.urlFront;
          document.getElementById("urlBack").innerText = objColombia.urlBack;
          document.getElementById("urlBack").href = objColombia.urlBack;
          document.getElementById("description").innerText = objColombia.description;
          document.getElementById("imgDetails1").src = objColombia.img.img1;
          document.getElementById("imgDetails2").src = objColombia.img.img2;
          document.getElementById("imgDetails3").src = objColombia.img.img3;

          break;
        case "rentiautos":
          document.getElementById("title").innerText = objRentiAutos.title;
          document.getElementById("category").innerText = objRentiAutos.category;
          document.getElementById("technologies").innerText = objRentiAutos.technologies;
          document.getElementById("client").innerText = objRentiAutos.client;
          document.getElementById("projectDate").innerText = objRentiAutos.projectDate;
          document.getElementById("urlFront").innerText = objRentiAutos.urlFront;
          document.getElementById("urlFront").href = objRentiAutos.urlFront;
          document.getElementById("urlBack").innerText = objRentiAutos.urlBack;
          document.getElementById("urlBack").href = objRentiAutos.urlBack;
          document.getElementById("description").innerText = objRentiAutos.description;
          document.getElementById("imgDetails1").src = objRentiAutos.img.img1;
          document.getElementById("imgDetails2").src = objRentiAutos.img.img2;
          document.getElementById("imgDetails3").src = objRentiAutos.img.img3;
          break;
      }

    }
  });


  // Obtener referencias a las imágenes por sus IDs
  const html = document.getElementById("html");
  const css = document.getElementById("css");
  const javascript = document.getElementById("javascript");
  const react = document.getElementById("react");
  const boostrap = document.getElementById("boostrap");
  const sass = document.getElementById("sass");
  const java = document.getElementById("java");
  const python = document.getElementById("python");
  const visual = document.getElementById("visual-basic");
  const sql = document.getElementById("sql");
  const git = document.getElementById("git");
  const jira = document.getElementById("jira");
  const bitbucket = document.getElementById("bitbucket");
  const testcomplete = document.getElementById("testcomplete");
  const selenium = document.getElementById("selenium");

  // Asignar manejadores de eventos a cada imagen
  html.addEventListener("click", function () {
    updateProgress("HTML", 90);
  });

  css.addEventListener("click", function () {
    updateProgress("CSS", 70);
  });

  javascript.addEventListener("click", function () {
    updateProgress("JavaScript", 90);
  });

  react.addEventListener("click", function () {
    updateProgress("React", 80);
  });

  boostrap.addEventListener("click", function () {
    updateProgress("Boostrap", 70);
  });

  tailwind.addEventListener("click", function () {
    updateProgress("Tailwind", 50);
  });

  sass.addEventListener("click", function () {
    updateProgress("SASS", 60);
  });

  node.addEventListener("click", function () {
    updateProgress("Node", 75);
  });

  express.addEventListener("click", function () {
    updateProgress("Express", 75);
  });

  java.addEventListener("click", function () {
    updateProgress("Java", 50);
  });

  python.addEventListener("click", function () {
    updateProgress("Python", 30);
  });

  visual.addEventListener("click", function () {
    updateProgress("Visual Basic", 80);
  });

  sql.addEventListener("click", function () {
    updateProgress("SQL", 95);
  });

  mongo.addEventListener("click", function () {
    updateProgress("Mongo DB", 70);
  });

  ia.addEventListener("click", function () {
    updateProgress("API Integracion IA", 70);
  });

  git.addEventListener("click", function () {
    updateProgress("GIT", 90);
  });

  jira.addEventListener("click", function () {
    updateProgress("Jira", 90);
  });

  bitbucket.addEventListener("click", function () {
    updateProgress("Bitbucket", 80);
  });

  testcomplete.addEventListener("click", function () {
    updateProgress("TestComplete", 95);
  });

  selenium.addEventListener("click", function () {
    updateProgress("Selenium", 50);
  });

  postman.addEventListener("click", function () {
    updateProgress("Postman", 70);
  });



})()


function updateProgress(app, progressVal) {

  porcentaje = Math.min(100, Math.max(0, progressVal));

  document.getElementById("name-app").textContent = app;
  document.getElementById("val-app").textContent = progressVal + '%';
  let barra = document.getElementById("barraProgresoInterior");


  barra.style.width = progressVal + "%";

}


