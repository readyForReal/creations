function modal() {

    const more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        about = document.querySelector('#about');

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    about.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('more') || 
        target && target.classList.contains('description-btn')) {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

    //                         Phone input restrict to numbers and + sign

    let phone = document.querySelectorAll("input[type=tel]");

    for (let i = 0; i < phone.length; i++) {
        phone[i].addEventListener('input', function() {
            phone[i].value = phone[i].value.match(/[\+0-9]+/ig);
        });
    }

}

export default modal;