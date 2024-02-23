const submit = document.querySelector("button[type='submit']");
const form = document.querySelector("form");



const addInputListener = (input, inputError) => {
    input.addEventListener("input", (event) => {

        if (input.validity.valid) {
            inputError.textContent = "";
            inputError.className = "error";
            input.classList.add("valid");
        }
        else  {
            input.classList.remove("valid");
        }
    });
}

const setInputValidation = (inputId) => {
    const input = document.getElementById(inputId);
    const inputError = document.querySelector(`#${inputId} + span.error`);
    addInputListener(input, inputError);
}

const setEqualPasswordValidation = (passwordId, passwordId2) => {
    const p1 = document.getElementById(passwordId)
    const p2 = document.getElementById(passwordId2);
    const p2Error = document.querySelector(`#${passwordId2} + span.error`);

    p2.addEventListener("input", (event) => {

        if (p2.validity.valid && equalPasswords(p1, p2)) {
            p2Error.textContent = "";
            p2Error.className = "error";
            p2.classList.add("valid");
        }
        else  {
            p2.classList.remove("valid");
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setInputValidation("input-firstname");
    setInputValidation("input-lastname");
    setInputValidation("input-email");
    setInputValidation("input-telnumber");
    setInputValidation("input-password");
    setEqualPasswordValidation('input-password', 'input-password2');
});


form.addEventListener("submit", (event) => {
    let firstNameIsValid, lastNameIsValid, passwordIsValid, password2IsValid, telNumberIsValid, emailIsValid;
    firstNameIsValid = checkInput('input-firstname', {
        valueMissing: "Wpisz imię",
        typeMismatch: "Błąd w wpisanym imieniu",
    });
    lastNameIsValid = checkInput('input-lastname', {
        valueMissing: "Wpisz nazwisko",
        typeMismatch: "Błąd w wpisanym nazwisku",
    });
    passwordIsValid = checkInput('input-password', {
        valueMissing: "Wpisz hasło",
        patternMismatch: "Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną małą literę , jedną cyfrę i jeden znak specjalny",
    });
    telNumberIsValid = checkInput('input-telnumber', {
        valueMissing: "Wpisz numer telefonu",
        patternMismatch: "Błędny format numeru telefonu",
    });
    emailIsValid = checkInput('input-email', {
        valueMissing: "Wpisz adres email",
        typeMismatch: "Błędny format adresu email",
    });

    password2IsValid = checkInputPassword2('input-password', 'input-password2', {
        valueMissing: "Wpisz hasło ponownie",
        patternMismatch: "Hasło musi zawierać co najmniej 8 znaków, w tym jedną dużą literę, jedną małą literę , jedną cyfrę i jeden znak specjalny",
        diffrentPasswords: "Hasła nie są identyczne.",
    });
    if (!firstNameIsValid || !lastNameIsValid || !passwordIsValid || !password2IsValid || !telNumberIsValid || !emailIsValid) {
        event.preventDefault();
    }


});

function checkInputPassword2(passwordId, passwordId2, errorMessages) {
    const p1 = document.getElementById(passwordId);
    const p2 = document.getElementById(passwordId2);
    const p2Error = document.querySelector(`#${passwordId2} + span.error`);
    if (!equalPasswords(p1, p2)) {
        p2Error.textContent = errorMessages.diffrentPasswords;
        p2Error.className = "error active";
        return false;
    }
    else if (!p2.validity.valid) {
        errorMessages.tooShort = `Powinieneś miec co najmniej ${p2.minLength} znaków, wpisałeś ${p2.value.length}.`;
        showError(p2, p2Error, errorMessages);
        return false;
    }
    return true;
}
function checkInput(inputId, errorMessages) {
    const input = document.getElementById(inputId);
    const inputError = document.querySelector(`#${inputId} + span.error`);
    if (!input.validity.valid) {
        errorMessages.tooShort = `Powinieneś miec co najmniej ${input.minLength} znaków, wpisałeś ${input.value.length}.`;
        showError(input, inputError, errorMessages);
        return false;
    }
    return true;
}
function equalPasswords(p1, p2) {
    return p1.value === p2.value;
}
function showError(input, inputError, errorMessages) {
    if (input.validity.valueMissing) {
        inputError.textContent = errorMessages.valueMissing;
    } else if (input.validity.typeMismatch) {
        inputError.textContent = errorMessages.typeMismatch;
    } else if (input.validity.tooShort) {
        inputError.textContent = errorMessages.tooShort;
    }
    else if (input.validity.patternMismatch) {
        inputError.textContent = errorMessages.patternMismatch;
    }
    inputError.className = "error active";
}
