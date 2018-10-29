const form = () => {

    let message = {
        loading: 'Loading...',
        success: 'Thank you, we will be in touch soon!',
        failure: 'Something went wrong...'
    };
    
    let form = document.querySelector('.main-form'),
        formTwo = document.querySelector('#form');
    
    const sendForm = (event) => {
        event.preventDefault();
        let input = this.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        this.appendChild(statusMessage);
    
        let formData = new FormData(this);
        
        const postData = (data) => {
            return new Promise( (resolve, reject) => {
                let request = new XMLHttpRequest();
    
                request.open("POST", "server.php");
    
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
                request.onreadystatechange = () => {
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
                };
                request.send(data);
            });
        };
        
        const clearInput = () => {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        };
        
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
            .then(clearInput);     	       
        };
        
        form.addEventListener('submit', sendForm);
        formTwo.addEventListener('submit', sendForm); 

};

module.exports = form;