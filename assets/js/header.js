var below = document.getElementById('below');
var white = document.getElementById('white1');
below.addEventListener('click',function(){
  below.classList.add('bottom');
  white.classList.add('blue');
  white.classList.remove('white');
});

