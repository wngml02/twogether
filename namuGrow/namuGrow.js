const togglingBtns = document.querySelectorAll('.emptyh'); 

togglingBtns.forEach(function(btns){ 
    btns.addEventListener ("click", function() { 
        btns.classList.toggle('heart')
    });
})