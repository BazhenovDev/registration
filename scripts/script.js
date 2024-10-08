'use strict';

window.onload = () => {
    let fullName = document.getElementById('full-name');
    let userName = document.getElementById('username');
    let checkbox = document.getElementById('checkbox');
    let formButton = document.getElementById('btn');
    let formEmail = document.getElementById('email');
    let password = document.getElementsByName('password')[0];
    let repeatPassword = document.getElementsByName('repeat-password')[0];
    let myForm = document.getElementsByTagName('form')[0];
    let modalWindow = document.getElementsByClassName('modal')[0];
    let modalButton = document.getElementsByClassName('modal__btn')[0];
    let title = document.getElementsByTagName('h1')[0];
    let removes = document.querySelectorAll('.remove');
    let link = document.getElementsByClassName('registration__link')[0];
    let formInput = document.querySelectorAll('.form__input');
    let validationError = document.querySelectorAll('.validation-error');
    let validationErrorPoint = document.querySelectorAll('.validation-error-point');

    for (let i = 0; i < validationError.length; i++) {
        validationError[i].style.display = 'none';
    }

    for (let i = 0; i < validationErrorPoint.length; i++) {
        validationErrorPoint[i].style.display = 'none';
    }

    checkbox.addEventListener('click', checkboxChecked);

    function checkboxChecked(e) {
        if (e.target.checked) {
            console.log('Согласен')
        } else {
            console.log('Не согласен')
        }
    }

    formButton.addEventListener('click', formBtn);

    function formBtn() {
        let errors = false;

        validationError.forEach((errors) => {
            errors.style.display = 'none';
        });

        validationErrorPoint.forEach((errorsPoint) => {
            errorsPoint.style.display = 'none';
        });

        let borderColorError = '#ff0000';
        let borderColor = '#C6C6C4';

        formInput.forEach((border) => {
            border.style.borderColor = borderColor;
        });

        formButton.removeEventListener('click', loginButton);

        if (!fullName.value.match(/[а-яёА-ЯЁa-zA-Z\s*]/) || fullName.value.match(/[\d#%&@!\[\]\\\^\$\.\|\?\*\+\(\)]+/)) {
            errors = true;
            fullName.nextElementSibling.style.display = 'block';
            fullName.style.borderColor = borderColorError;
        }
        if (!userName.value.match(/([a-zA-Z0-9а-яёА-ЯЁ])([-_]*)/) || userName.value.match(/[#%&@!\[\]\\\^\$\.\|\?\*\+\(\)\s]+/)) {
            errors = true;
            userName.nextElementSibling.style.display = 'block';
            userName.style.borderColor = borderColorError;
            userName.nextElementSibling.nextElementSibling.style.display = 'block';
        }
        if (!formEmail.value.match(/([a-zA-Z0-9]{2,})@([a-zA-Z]{2,})\.([a-zA-Z]{2,})/)) {
            errors = true;
            formEmail.nextElementSibling.style.display = 'block';
            formEmail.style.borderColor = borderColorError;
        }
        if (!password.value.match(/[a-zA-Zа-яёА-ЯЁ0-9]/) || !password.value.match(/[A-ZА-ЯЁ]+/) || !password.value.match(/[#%&@!\[\]\\\^\$\.\|\?\*\+\(\)]+/) || !password.value.match(/[0-9]+/) || password.value.length < 8) {
            errors = true;
            password.nextElementSibling.style.display = 'block';
            password.nextElementSibling.nextElementSibling.style.display = 'block'; // такая же ситуация как и с userName
            password.style.borderColor = borderColorError;
        }

        if (!repeatPassword.value || password.value !== repeatPassword.value) {
            errors = true;
            repeatPassword.nextElementSibling.style.display = 'block';
            repeatPassword.style.borderColor = borderColorError;

        }
        if (!checkbox.checked) {
            errors = true;
            checkbox.nextElementSibling.nextElementSibling.style.display = 'block' // так же не знаю насколько верно сделан данный вариант
            checkbox.style.border = borderColorError;
        }

        let clientsArray = [];
        if (!errors) {
            modalWindow.classList.remove('disabled');
            let clients = localStorage.getItem('client');
            if (clients) {
                clientsArray = JSON.parse(clients);
            }

            let client = {
                user: userName.value,
                password: password.value,
                name: fullName.value,
            };
            clientsArray.push(client);
            localStorage.setItem('client', JSON.stringify(clientsArray));
        }
    }


    function login(login) {
        modalWindow.classList.add('disabled');
        myForm.reset();
        title.innerText = 'Log in to the system';
        removes.forEach((remove) => {
            remove.remove();
        });
        formButton.innerText = 'Sign In';
        formButton.removeEventListener('click', formBtn);
        formButton.addEventListener('click', loginButton);

        userName.nextElementSibling.innerText = 'Такой пользователь не зарегистрирован'
        password.nextElementSibling.innerText = 'Неверный пароль';

        validationErrorPoint.forEach((remove) => {
            remove.remove();
        })
        link.innerText = 'Registration.';
        link.removeEventListener('click', login);
        link.addEventListener('click', formReset);
    }

    link.addEventListener('click', login);
    modalButton.addEventListener('click', login);

    function loginButton() {

        let borderColorError = '#ff0000';
        let borderColor = '#C6C6C4';

        let hasError = true;

        validationError.forEach((errors) => {
            errors.style.display = 'none';
        });

        formInput.forEach((errors) => {
            errors.style.borderColor = borderColor;
        });

        let clientsIndex = JSON.parse(localStorage.getItem('client'));

        for (let i = 0; i < clientsIndex.length; i++) {
            if (userName.value !== clientsIndex[i].user) {
                userName.nextElementSibling.style.display = 'block';
                userName.style.borderColor = borderColorError;
                console.log('net');
                hasError = true;
            } else {
                console.log('da');
                userName.nextElementSibling.style.display = 'none';
                userName.style.borderColor = borderColor;
                hasError = false;
                break;
            }
        }

        let clientName = null;

        for (let i = 0; i < clientsIndex.length; i++) {
            if (password.value !== clientsIndex[i].password || userName.value !== clientsIndex[i].user) {
                password.nextElementSibling.style.display = 'block';
                password.style.borderColor = borderColorError;
                hasError = true;
            } else {
                password.nextElementSibling.style.display = 'none';
                password.style.borderColor = borderColor;
                clientName = clientsIndex[i].name;
                hasError = false;
                break;
            }
        }
        if (!hasError) {
            let formLabel = document.querySelectorAll('.form__label');
            let description = document.getElementsByClassName('description')[0];
            title.innerText = 'Welcome, ' + clientName + '!';
            title.style.marginBottom = '200px';
            formButton.innerText = 'Exit';
            formButton.removeEventListener('click', loginButton);
            formButton.addEventListener('click', formReset);
            link.classList.add('disabled');
            formLabel.forEach((label) => {
                label.classList.add('disabled');
            });
            description.classList.add('disabled');
        }
    }

    function formReset() {
        myForm.reset();
        location.reload();
    }

    myForm.onsubmit = (send) => {
        send.preventDefault();
    }
}

