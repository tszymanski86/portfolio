document.addEventListener("DOMContentLoaded", function() {
  smoothScrolling();
  showSection();
  hamburgerMenu();
  Slider.showMini();
  Slider.showSlides(0);
  snake();
});


function smoothScrolling(){
  $(document).ready(function() { 
    $('a[href^="#"]').on('click', function(event) {
      var target =  $(this).attr('href');
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 800);
      location.hash = target;
    });
  });  
}

function showSection(){
  const Sections = document.querySelectorAll('section');
  const Links = document.querySelectorAll('#navbar a');
  let activeLink;

  window.onscroll = function(){
    Sections.forEach(function(section, index){
      Links[index].classList.remove('active');
      if ((window.pageYOffset + window.innerHeight) >= (section.offsetTop + section.clientHeight))
        activeLink = Links[index];
    });
    activeLink.classList.add('active');
  }
}

function hamburgerMenu(){
  const Hamburger = document.getElementById('hamburger');
  const Navbar = document.getElementById('navbar');

  Hamburger.addEventListener('click', function(){
    Hamburger.classList.toggle('showMenu');
    Navbar.classList.toggle('showMenu');
    if (Navbar.style.display === 'block') {
      Navbar.style.display = 'none';
    } else {
      Navbar.style.display = 'block';
    }
  });

  Navbar.addEventListener('click', function(){
    if (Hamburger.classList.contains('showMenu')) {
      Hamburger.classList.remove('showMenu');
      Navbar.style.display = 'none';
    }
  });

  window.addEventListener('resize', function() {
    if (this.innerWidth >= 900) {
      Navbar.style.display = 'block';
      Hamburger.classList.remove('showMenu');
    } else {
      Navbar.style.display = 'none';
    }
  });
}

const Slider = {
  slideIndex : 0,
  miniImg : document.querySelectorAll('.demo'),
  logos   : document.querySelectorAll(".logo"),

  showMini : function(){
    Slider.miniImg.forEach(function(mini, index){
      mini.addEventListener('click', function(){
        Slider.slideIndex = index;
        Slider.showSlides(index);
      });
    });
  },

  showSlides : function(n){
    let captionText = document.getElementById("name");
    if (n >= Slider.logos.length) {Slider.slideIndex = 0}
    if (n < 0) {Slider.slideIndex = Slider.logos.length-1}
    for (i = 0; i < Slider.logos.length; i++) {
      Slider.logos[i].style.display = "none";
    }
    for (i = 0; i < Slider.miniImg.length; i++) {
      Slider.miniImg[i].className = Slider.miniImg[i].className.replace(" active", ""); 
    }
    Slider.logos[Slider.slideIndex].style.display = "block";
    Slider.miniImg[Slider.slideIndex].className += " active";
    captionText.innerHTML = Slider.miniImg[Slider.slideIndex].alt;
  },

  plusSlides : function (n){
    Slider.showSlides(Slider.slideIndex += n);
  }
}


function snake(){
  var gameOver = false;
  document.getElementById('btGraj').onclick = function(){   
    if (this.innerHTML == 'GRAJ!') {
      document.body.style.overflow = "hidden"; 
      startSnake();
      this.innerHTML='KONIEC';
    } else
    if (this.innerHTML == 'KONIEC') {
      document.body.style.overflow = "visible";
      gameOver = true;
      this.innerHTML = 'GRAJ!'
    }
  }

function startSnake(){
  const canvasElem = document.getElementById('canvas');
  const cnavas = canvasElem.getContext('2d');
  const img = new Image();
  img.src = 'img/snake.png'
  let points = 0;

  const CanWidth = 960;
  const CanHeight = 576;
  const SizeImg = 64;  //rozmiar obrazków w pliku 
  const SizeCan = 64;  //rozmiar wyświetlany
  let key;
  let dx = SizeCan; 
  let dy = 0;
  let fruitX = 128;
  let fruitY = 128;
  const body = [];
  body[0] = [256, 256];
  body[1] = [192, 256];
  body[2] = [128, 256];
  
  document.getElementById('divWynik').innerHTML = 'wynik: ' + points;

  img.addEventListener('load', function(){
    cnavas.drawImage(img, 0, 192, SizeImg, SizeImg, fruitX, fruitY, SizeCan, SizeCan);
    print();
  });

  controls();

  function controls(){
    window.addEventListener('keydown', function(event) {
      if (dx)
        if (event.keyCode == 38 || event.keyCode == 40)
          key = event.keyCode;
      if (dy)
        if (event.keyCode == 37 || event.keyCode == 39)
          key = event.keyCode;
    }, false);
  
    let btUp = document.getElementById('btUp');
    let btDown = document.getElementById('btDown');
    let btLeft = document.getElementById('btLeft');
    let btRight = document.getElementById('btRight');
    btUp.addEventListener('click', function(){
      if (dx) key = 38;
    });
    btDown.addEventListener('click', function(){
      if (dx)key = 40;
    });
    btLeft.addEventListener('click', function(){
      if (dy)key = 37;
    });
    btRight.addEventListener('click', function(){
      if (dy) key = 39;
    });
  }


  function print(){
    let xFragment, yFragment;

    function findBodyFragment(nrSegmentu){ 
      if (nrSegmentu == 0) {  //głowa
        if (dy < 0){ //głowa góra
          xFragment = 192;
          yFragment = 0;
        } else
        if (dy > 0){ //głowa dół
          xFragment = 256;
          yFragment = 64;
        } else
        if (dx < 0){ //głowa w lewo
          xFragment = 192;
          yFragment = 64;
        } else
        if (dx > 0){ //głowa w prawo
          xFragment = 256;
          yFragment = 0;
        } 
      } else
      if (nrSegmentu == body.length-1) {  //ogon
        if (body[nrSegmentu][1] > body[nrSegmentu - 1][1]){ // w górę
          xFragment = 192;
          yFragment = 128;
        } else
        if (body[nrSegmentu][1] < body[nrSegmentu - 1][1]){ // w dół
          xFragment = 256;
          yFragment = 192;
        }
        if (body[nrSegmentu][0] > body[nrSegmentu - 1][0]){ // w lewo
          xFragment = 192;
          yFragment = 192;
        } else
        if (body[nrSegmentu][0] < body[nrSegmentu - 1][0]){ // w prawo
          xFragment = 256;
          yFragment = 128;
        }
      } else
      if ((nrSegmentu > 0) && (nrSegmentu < body.length-1)) {  //część środkowa     
        if (body[nrSegmentu][0] == body[nrSegmentu+1][0] && body[nrSegmentu][0] == body[nrSegmentu-1][0]) { // pion    
          xFragment = 128;
          yFragment = 64;
        } else 
        if (body[nrSegmentu][1] == body[nrSegmentu+1][1] && body[nrSegmentu][1] == body[nrSegmentu-1][1]) { // poziom
          xFragment = 64;
          yFragment = 0;
        } else // skręty
        if ((body[nrSegmentu-1][1] > body[nrSegmentu][1] && body[nrSegmentu+1][0] > body[nrSegmentu][0]) || // w górę i prawo / w lewo i dół
           (body[nrSegmentu+1][1] > body[nrSegmentu][1] && body[nrSegmentu-1][0] > body[nrSegmentu][0])) {
          xFragment = 0;
          yFragment = 0;
        } else
        if ((body[nrSegmentu-1][0] > body[nrSegmentu][0] && body[nrSegmentu+1][1] < body[nrSegmentu][1]) || // w lewo i do góry
           (body[nrSegmentu+1][0] > body[nrSegmentu][0] && body[nrSegmentu-1][1] < body[nrSegmentu][1])) {
          xFragment = 0;
          yFragment = 64;
        } else
        if ((body[nrSegmentu-1][1] < body[nrSegmentu][1] && body[nrSegmentu+1][0] < body[nrSegmentu][0]) || // w dół i lewo
           (body[nrSegmentu+1][1] < body[nrSegmentu][1] && body[nrSegmentu-1][0] < body[nrSegmentu][0])) {
          xFragment = 128;
          yFragment = 128;
        } else
        if ((body[nrSegmentu-1][0] < body[nrSegmentu][0] && body[nrSegmentu+1][1] > body[nrSegmentu][1]) || // w prawo i dół
           (body[nrSegmentu+1][0] < body[nrSegmentu][0] && body[nrSegmentu-1][1] > body[nrSegmentu][1])) {
          xFragment = 128;
          yFragment = 0;
        }
      } 
    }

    cnavas.clearRect(0, 0, CanWidth, CanHeight);
    cnavas.drawImage(img, 0, 192, SizeImg, SizeImg, fruitX, fruitY, SizeCan, SizeCan);
    
    for (let i = 0; i < body.length; i++){
      findBodyFragment(i);
      cnavas.drawImage(img, xFragment, yFragment, SizeImg, SizeImg, body[i][0], body[i][1], SizeCan, SizeCan);
    }
  }

  function eatenFruit(){
    function findCollision(){
      for(let i=0; i<body.length; i++){
        if (body[i][0] == fruitX && body[i][1] == fruitY) { return true; }
      }
      return false;
    }

    points++;
    document.getElementById('divWynik').innerHTML = 'wynik: ' + points;

    do { 
      fruitX = Math.floor(Math.random() * (CanWidth / SizeCan)) * SizeCan;
      fruitY = Math.floor(Math.random() * (CanHeight / SizeCan)) * SizeCan;
    } while(findCollision())
  }

  let move = setInterval(function(){
    switch (key) {  
      case 37: // lewo
          dx = -SizeCan;
          dy = 0;
      break;   
      case 38: // góra
          dy = -SizeCan;
          dx = 0;
      break;   
      case 39: // prawo
          dx = SizeCan;
          dy = 0;
      break;  
      case 40: // dół
          dy = SizeCan;
          dx = 0;
      break;
    }
    body.unshift([body[0][0]+dx, body[0][1]+dy]);

    if (body[0][0] == fruitX && body[0][1] == fruitY){
      eatenFruit();
    } else body.pop();

    print();

    if (body[0][0] < 0 || (body[0][0]+SizeCan) > CanWidth || body[0][1] < 0 || (body[0][1]+SizeCan) > CanHeight) { 
      gameOver = true;
    }

    for(let i=1; i<body.length; i++){  
      if (body[0][0] == body[i][0] && body[0][1] == body[i][1]) gameOver = true;
    }

    if (gameOver) {
      clearInterval(move);
      document.body.style.overflow = "visible";
      gameOver = false;
      document.getElementById('btGraj').innerHTML = 'GRAJ!'
    }
  }, 200);
}

}

// przewijanie nie działa, nie do tego miejsca co trzeba, ucina nagłówki

