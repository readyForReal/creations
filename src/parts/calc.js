const calc = () => {

    //                         Restrict Calc input to numbers, codes are (48-57) && (96-105 / numlock) and backSpace (8)

    let inputs = document.querySelectorAll('.counter-block-input');
    
    for (let i = 0; i < inputs.length; i++) {

        inputs[i].addEventListener('change', (e) => {

            let keyCode = e.keyCode || e.which;

            if (inputs[i].value.length == 1 && inputs[i].value == 0) {
                inputs[i].value = '';
                totalValue.innerHTML = 0;
            } else if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >=96 && keyCode <= 105) || keyCode == 8)) {
                e.preventDefault();
            }

            console.log()

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
    });

};

module.exports = calc;