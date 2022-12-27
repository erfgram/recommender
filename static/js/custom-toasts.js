// ewer //

// Hide toasts after a specific time

const customToast = document.querySelector('.bs-toast');

function Handler() {
    this.toastShowHide = ()=> {
        if (customToast){
            customToast.classList.add('showing');
            setTimeout( ()=> {
                customToast.classList.remove('showing');
            } , 100);

            setTimeout( ()=> {
                customToast.classList.add('showing');
            } , 5100);
            
            setTimeout( ()=> {
                customToast.classList.remove('showing');
                customToast.classList.remove('show');
                customToast.classList.add('hide');
            } , 5400);
        }
    }
}

const handel = new Handler();
handel.toastShowHide()