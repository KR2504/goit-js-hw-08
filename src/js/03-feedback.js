import throttle from "lodash.throttle";
const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
    button: document.querySelector('button'),
}

const LOCALSTORAGE_KEY = "feedback-form-state";

refs.form.addEventListener('submit', handleSubmit);
refs.form.addEventListener('input', throttle(onInputChange, 500));

onStorageGetFields();

function onInputChange() {
    const objSaveCurrentForm = {};
    objSaveCurrentForm.email = refs.input.value;
    objSaveCurrentForm.message = refs.textarea.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objSaveCurrentForm));
}

function onStorageGetFields() {
    const parsedStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (localStorage.getItem(LOCALSTORAGE_KEY)) {
        refs.input.value = parsedStorage.email;
        refs.textarea.value = parsedStorage.message;
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const {
        elements: { email, message }
    } = e.currentTarget;

    if (email === '' || message === '') {
        return;
    }

    const dataObject = {
        email: email.value,
        message: message.value,
    }


    console.log(dataObject);
    localStorage.clear();
    e.currentTarget.reset()
}