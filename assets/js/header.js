document.addEventListener("DOMContentLoaded", function() {
  var navIcon = document.getElementById('nav-icon');
  var navList = document.getElementById('nav-list');
  
  navIcon.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent the document click event from triggering immediately
      navList.classList.toggle('active');
  });
  
  document.addEventListener('click', function (event) {
      if (event.target !== navIcon) {
          navList.classList.remove('active');
      }
  });
});
