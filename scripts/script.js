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
    /* тут я пытался сделать validationError[i].nextElementSibling, и ему менять style.display = 'none', но не срабатывало, я так понимаю из-за того, чо не у всех ошибок есть следующий элемент, либо не понимаю из-за чего */

    for (let i = 0; i < validationErrorPoint.length; i++) {
        validationErrorPoint[i].style.display = 'none';
    }


    // fullName.onkeydown = (e) => {
    //     let num = parseInt(e.key);
    //     if (!isNaN(num)) {
    //         e.preventDefault();
    //         // return false;
    //     }
    // }
    // userName.onkeydown = (e) => {
    //     if (e.key === ',' || e.key === '.') {
    //         e.preventDefault();
    //     }
    // }


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

        // for (let i = 0; i < validationError.length; i++) {
        //     validationError[i].style.display = 'none';
        // }
        validationError.forEach((errors) => {
            errors.style.display = 'none';
        });
        // тут решил переписать на forEach после того как сделал forEach для инпутов

        /* тут я пытался сделать validationError[i].nextElementSibling,
        и ему менять style.display = 'none', но не срабатывало, я так понимаю из-за того,
        чо не у всех ошибок есть следующий элемент, либо не понимаю из-за чего */

        // for (let i = 0; i < validationErrorPoint.length; i++) {
        //     validationErrorPoint[i].style.display = 'none';
        // }
        validationErrorPoint.forEach((errorsPoint) => {
            errorsPoint.style.display = 'none';
        });
        // тут решил переписать на forEach тоже

        let borderColorError = '#ff0000';
        let borderColor = '#C6C6C4';


        /* тут я вроде бы разобрался с изменением цветов бордера, через обычный цикл он не работал, т.е. обратно
        при верной валидации бордер не становился нормального цвета, а всегда был красный, если при отправки формы валидация
        была не верно, он становился красный, далее делаю валидацию верную, он оставался красным, с форич данная фича работает,
        цикл фор оставлю всё равно. Но тут пришлось из-за этого document.getElementsByClassName менять на document.querySelectorAll,
        правильно же? что с ClassName forEach работать не будет?
         */
        formInput.forEach((border) => {
            border.style.borderColor = borderColor;
        });
        // for (let i; i < formInput.length; i++) {
        //     formInput[i].style.borderColor = borderColor;
        // }

        /* let symbolsRegExp = new RegExp(/[\d#%&@!\[\]\\\^\$\.\|\?\*\+\(\)]+/)
            тут я пытался вставить данную переменную к fullName, а в userName ещё добавить пробелы \s,
            но у меня не получается сложить, не знаю как объяденить переменную регулярного выражения
            userName.value.match(symbolsRegExp + /\s/)
            userName.value.match('symbolsRegExp' + '/\s/')
            userName.value.match('symbolsRegExp' + '[/\s/]')
            userName.value.match('symbolsRegExp', '[/\s/]')
            вообщем разные способы пробовал, но не получилось, буду рад подсказке
         */
        formButton.removeEventListener('click', loginButton);


        if (!fullName.value.match(/[а-яёА-ЯЁa-zA-Z\s*]/) || fullName.value.match(/[\d#%&@!\[\]\\\^\$\.\|\?\*\+\(\)]+/)) {
            errors = true;
            fullName.nextElementSibling.style.display = 'block';
            fullName.style.borderColor = borderColorError;
            // fullName.style.borderColor = borderColorError; если делаю так, то при правильной валидации, border-color остаётся красным
            /* formInput[0].style.borderColor = borderColorError; так тоже не возвращается цвет бордера в нормальный,
             но полагаю, что через [] не очень верно это делать и первый вариант более правильный */

        }
        if (!userName.value.match(/([a-zA-Z0-9а-яёА-ЯЁ])([-_]*)/) || userName.value.match(/[#%&@!\[\]\\\^\$\.\|\?\*\+\(\)\s]+/)) {
            errors = true;
            userName.nextElementSibling.style.display = 'block';
            userName.style.borderColor = borderColorError;
            userName.nextElementSibling.nextElementSibling.style.display = 'block'; // не знаю насколько верное данное решение, но думаю validationErrorPoint[0].style.display = 'block' тоже не очень верно
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

        if (!errors) {
            modalWindow.classList.remove('disabled');
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
        formButton.onclick = null;
        formButton.addEventListener('click', loginButton);
        userName.nextElementSibling.innerText = 'Заполните username'
        password.nextElementSibling.innerText = 'Заполните password';
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
        if (!userName.value) {
            alert('Заполните поле Username');
            return false;
        }
        if (!password.value) {
            alert('Заполните поле Password');
            return false;
        }
        if (password.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return false;
        }
        alert('Добро пожаловать ' + userName.value + "!");
        myForm.reset();
    }


    //Вернуться на страницу регистрации, подумал только о таком варианте, чтобы полностью обновить страницу, если есть другие варианты, буду рад узнать)
    function formReset () {
        myForm.reset();
        location.reload();
    }

    myForm.onsubmit = (send) => {
        send.preventDefault();
    }
}

