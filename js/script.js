'use strict';

window.addEventListener('DOMContentLoaded', function() {

    //                         Tabs

    const tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    const showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //                         Timer
    
    const deadline = '2018-10-30';

    const getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)) % 60);

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    const setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime);

            if ( t.hours < 10) { t.hours = '0' + t.hours; }
            hours.textContent = t.hours;
            if ( t.minutes < 10) { t.minutes = '0' + t.minutes; }
            minutes.textContent = t.minutes;
            if ( t.seconds < 10) { t.seconds = '0' + t.seconds; }
            seconds.textContent = t.seconds;

            if ( t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    //                         Modal

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

    //                         Form

    let message = {
        loading: 'Loading...',
        success: 'Thank you, we will be in touch soon!',
        failure: 'Something went wrong...'
    }
    
    let form = document.querySelector('.main-form'),
        formTwo = document.querySelector('#form');
    
    function sendForm(event) {
        event.preventDefault();
        let input = this.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        this.appendChild(statusMessage);
    
        let formData = new FormData(this);
        
        function postData(data) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
    
                request.open("POST", "server.php");
    
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
                request.onreadystatechange = function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState == 4) {
                        if (request.status == 200 && request.status < 300) {
                            resolve();
                        }
                        else {
                            reject();
                        }
                    }
                }
                request.send(data);
            });
        }
        
        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }
        
        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)	
            .then(() => {
                setTimeout(() => {
                    statusMessage.innerHTML = message.success;
                }, 2000);
                setTimeout(() => {
                    statusMessage.innerHTML = "";
                }, 4000);
            })
            .catch(() => statusMessage.innerHTML = message.failture)
            .then(clearInput)     	       
        }
        
        form.addEventListener('submit', sendForm);
        formTwo.addEventListener('submit', sendForm); 

    //                         Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //                         Restrict Calc input to numbers, codes are (48-57) && (96-105 / numlock) and backSpace (8)

    // document.addEventListener("keydown", function(event) {
    //     console.log(event.which);
    // });

    let inputs = document.querySelectorAll('.counter-block-input');

    for (let i = 0; i < inputs.length; i++) {

        inputs[i].addEventListener('keydown', function(e) {

            let keyCode = e.keyCode || e.which;
            if(!((keyCode >= 48 && keyCode <= 57) || (keyCode >=96 && keyCode <= 105) || keyCode == 8)) {
                e.preventDefault();
            }

        });

    }

    //                         Calc
    
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('input', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('input', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    })

});
