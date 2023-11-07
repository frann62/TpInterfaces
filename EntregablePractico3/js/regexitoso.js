document.addEventListener('DOMContentLoaded', function() {
    var registroBtn = document.getElementById('registro');
    var registroExito = document.getElementById('registro-exitoso');
  
    registroBtn.addEventListener('click', function(e) {
      e.preventDefault();
  
      registroExito.style.display = 'block';
  
      setTimeout(function() {
        registroExito.style.display = 'none';
        window.location.href = "home.html";
      }, 4000);
    });
  });
  