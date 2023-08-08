let icon = document.querySelectorAll('ion-icon');
/*
icon.onclick = function(){
  icon.classList.toggle('active');
}
*/
icon.forEach(function(icons){
  icons.onclick = function(){
    icons.classList.toggle('active');
  }
})