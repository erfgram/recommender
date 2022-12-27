function openMenu(){
    menu = document.getElementById("overlay")
    menu.style.height = "100vh";
    menu.style.pointerEvents = "all";
    document.getElementById("myHeader").style.display = "none";
    disableScroll()
}

function closeMenu() {
    menu = document.getElementById("overlay")
    menu.style.height = "0vh";
    menu.style.pointerEvents = "none";
    enableScroll()
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}
  
function enableScroll() {
    window.onscroll = function() {};
}