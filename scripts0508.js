$(document).ready(function() { 
	$('a[href^="#"]').on('click', function(event) {
		var target =  $(this).attr('href');
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 800);
    location.hash = target;
  });
  
  let Navbar = document.getElementById('navbar');
  let Omnie = document.getElementById('OMnie');
  let WorkEdu = document.getElementById('WorkEdu');
  let Umiejetnosci = document.getElementById('Umiejetnosci');
  let MojProj = document.getElementById('MojProj');
  let Snake = document.getElementById('Snake');
  let Kontakt = document.getElementById('Kontakt');
  let AktywneMenu = 'link1';
  
  window.onscroll = function(){
    if (window.pageYOffset  < (OMnie.offsetTop )) AktywneMenu = 'link1';
    if (window.pageYOffset > (WorkEdu.offsetTop - Navbar.clientHeight)) AktywneMenu = 'link2';
    if ((window.pageYOffset + window.innerHeight) > (Umiejetnosci.offsetTop + Umiejetnosci.clientHeight)) AktywneMenu = 'link3';
    if ((window.pageYOffset + window.innerHeight) > (MojProj.offsetTop + MojProj.clientHeight)) AktywneMenu = 'link4';
    if ((window.pageYOffset + window.innerHeight) > (Snake.offsetTop + Snake.clientHeight)) AktywneMenu = "link5";
    if ((window.pageYOffset + window.innerHeight) > (Kontakt.offsetTop + 200)) AktywneMenu = 'link6';
  
    let Aktywuj = document.getElementById(AktywneMenu);
    let link = document.getElementById('link1').classList.remove('active');
    link = document.getElementById('link2').classList.remove('active');
    link = document.getElementById('link3').classList.remove('active');
    link = document.getElementById('link4').classList.remove('active');
    link = document.getElementById('link5').classList.remove('active');
    link = document.getElementById('link6').classList.remove('active');
    Aktywuj.classList.add('active');
  };

  
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("logo");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("opis");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}



/// WĄŻ

var gameOver = false;
document.getElementById('btGraj').onclick = function(){   
  if (this.innerHTML == 'GRAJ!') {
    document.body.style.overflow = "hidden"; 
    Snake();
    this.innerHTML='KONIEC';
  } else
  if (this.innerHTML == 'KONIEC') {
    document.body.style.overflow = "visible";
    gameOver = true;
    this.innerHTML = 'GRAJ!'
  }
}

function Snake(){
  const canvasElem = document.getElementById('canvas');
  const rys = canvasElem.getContext('2d');
  const img = new Image();
  img.src = 'img/snake.png'
  let punkty = 0;

  const CanWidth = 960;
  const CanHeight = 576;
  const SizeImg = 64;  //rozmiar obrazków w pliku 
  const SizeCan = 64;  //rozmiar wyświetlany
  let klawisz;
  let dx = SizeCan; 
  let dy = 0;
  let owocX =128;
  let owocY =128;
  const waz = [];
  waz[0] = [256, 256];
  waz[1] = [192, 256];
  waz[2] = [128, 256];
  
  document.getElementById('divWynik').innerHTML='wynik: '+punkty;

  img.addEventListener('load', function(){
    rys.drawImage(img, 0, 192, SizeImg, SizeImg, owocX, owocY, SizeCan, SizeCan);
    wyswietl();
  });

  window.addEventListener('keydown', function(event) {
    if (dx)
      if (event.keyCode == 38 || event.keyCode == 40)
        klawisz = event.keyCode;
    if (dy)
      if (event.keyCode == 37 || event.keyCode == 39)
        klawisz = event.keyCode;
  }, false);

  let btUp = document.getElementById('btUp');
  let btDown = document.getElementById('btDown');
  let btLeft = document.getElementById('btLeft');
  let btRight = document.getElementById('btRight');
  btUp.addEventListener('click', function(){
    if (dx) klawisz = 38;
  });
  btDown.addEventListener('click', function(){
    if (dx )klawisz = 40;
  });
  btLeft.addEventListener('click', function(){
    if (dy )klawisz = 37;
  });
  btRight.addEventListener('click', function(){
    if (dy) klawisz = 39;
  });


  function wyswietl(){
    let xPozycji, yPozycji;

    function znajdzPozycje(nrSegmentu){ 
      if (nrSegmentu == 0) {  //głowa
        if (dy < 0){ //głowa góra
          xPozycji = 192;
          yPozycji = 0;
        } else
        if (dy > 0){ //głowa dół
          xPozycji = 256;
          yPozycji = 64;
        } else
        if (dx < 0){ //głowa w lewo
          xPozycji = 192;
          yPozycji = 64;
        } else
        if (dx > 0){ //głowa w prawo
          xPozycji = 256;
          yPozycji = 0;
        } 
      } else
      if (nrSegmentu == waz.length-1) {  //ogon
        if (waz[nrSegmentu][1] > waz[nrSegmentu - 1][1]){ // w górę
          xPozycji = 192;
          yPozycji = 128;
        } else
        if (waz[nrSegmentu][1] < waz[nrSegmentu - 1][1]){ // w dół
          xPozycji = 256;
          yPozycji = 192;
        }
        if (waz[nrSegmentu][0] > waz[nrSegmentu - 1][0]){ // w lewo
          xPozycji = 192;
          yPozycji = 192;
        } else
        if (waz[nrSegmentu][0] < waz[nrSegmentu - 1][0]){ // w prawo
          xPozycji = 256;
          yPozycji = 128;
        }
      } else
      if ((nrSegmentu > 0) && (nrSegmentu < waz.length-1)) {  //część środkowa     
        if (waz[nrSegmentu][0] == waz[nrSegmentu+1][0] && waz[nrSegmentu][0] == waz[nrSegmentu-1][0]) { // pion    
          xPozycji = 128;
          yPozycji = 64;
        } else 
        if (waz[nrSegmentu][1] == waz[nrSegmentu+1][1] && waz[nrSegmentu][1] == waz[nrSegmentu-1][1]) { // poziom
          xPozycji = 64;
          yPozycji = 0;
        } else // skręty
        if ((waz[nrSegmentu-1][1] > waz[nrSegmentu][1] && waz[nrSegmentu+1][0] > waz[nrSegmentu][0]) || // w górę i prawo / w lewo i dół
           (waz[nrSegmentu+1][1] > waz[nrSegmentu][1] && waz[nrSegmentu-1][0] > waz[nrSegmentu][0])) {
          xPozycji = 0;
          yPozycji = 0;
        } else
        if ((waz[nrSegmentu-1][0] > waz[nrSegmentu][0] && waz[nrSegmentu+1][1] < waz[nrSegmentu][1]) || // w lewo i do góry
           (waz[nrSegmentu+1][0] > waz[nrSegmentu][0] && waz[nrSegmentu-1][1] < waz[nrSegmentu][1])) {
          xPozycji = 0;
          yPozycji = 64;
        } else
        if ((waz[nrSegmentu-1][1] < waz[nrSegmentu][1] && waz[nrSegmentu+1][0] < waz[nrSegmentu][0]) || // w dół i lewo
           (waz[nrSegmentu+1][1] < waz[nrSegmentu][1] && waz[nrSegmentu-1][0] < waz[nrSegmentu][0])) {
          xPozycji = 128;
          yPozycji = 128;
        } else
        if ((waz[nrSegmentu-1][0] < waz[nrSegmentu][0] && waz[nrSegmentu+1][1] > waz[nrSegmentu][1]) || // w prawo i dół
           (waz[nrSegmentu+1][0] < waz[nrSegmentu][0] && waz[nrSegmentu-1][1] > waz[nrSegmentu][1])) {
          xPozycji = 128;
          yPozycji = 0;
        }
      } 
    }

    rys.clearRect(0, 0, CanWidth, CanHeight);
    rys.drawImage(img, 0, 192, SizeImg, SizeImg, owocX, owocY, SizeCan, SizeCan);
    
    for (let i = 0; i < waz.length; i++){
      znajdzPozycje(i);
      rys.drawImage(img, xPozycji, yPozycji, SizeImg, SizeImg, waz[i][0], waz[i][1], SizeCan, SizeCan);
    }
  }

  function zjedzonyOwoc(){
    function znajdz(){
      for(let i=0; i<waz.length; i++){
        if (waz[i][0] == owocX && waz[i][1] == owocY) { return true; }
      }
      return false;
    }

    punkty++;
    document.getElementById('divWynik').innerHTML='wynik: '+punkty;

    do { 
      owocX = Math.floor(Math.random() * (CanWidth / SizeCan)) * SizeCan;
      owocY = Math.floor(Math.random() * (CanHeight / SizeCan)) * SizeCan;
    } while(znajdz())
  }

  let krok = setInterval(function(){
    switch (klawisz) {  
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
    waz.unshift([waz[0][0]+dx, waz[0][1]+dy]);

    if (waz[0][0] == owocX && waz[0][1] == owocY){
      zjedzonyOwoc();
    } else waz.pop();

    wyswietl();

    if (waz[0][0] < 0 || (waz[0][0]+SizeCan) > CanWidth || waz[0][1] < 0 || (waz[0][1]+SizeCan) > CanHeight) { 
      gameOver = true;
    }

    for(let i=1; i<waz.length; i++){  
      if (waz[0][0] == waz[i][0] && waz[0][1] == waz[i][1]) gameOver = true;
    }

    if (gameOver) {
      clearInterval(krok);
      document.body.style.overflow = "visible";
      gameOver = false;
      document.getElementById('btGraj').innerHTML = 'GRAJ!'
    }
  }, 200);
}