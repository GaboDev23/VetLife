'use strict';

const form = document.getElementById('form');
const input = document.querySelectorAll('.input');
const enviar = document.getElementById('enviar');
const resenaIMG = document.querySelectorAll('.resena__img');
const clientes = document.querySelectorAll('.client');

enviar.addEventListener('click', e => {
    for (const elemento of input) {
        if (elemento.value.trim() === '') {
            e.preventDefault();
            cambiarColor(elemento, 'rgba(255, 0, 0');
            elemento.nextElementSibling.textContent = 'Este campo es obligatorio';
            elemento.nextElementSibling.style.color = 'red';
            break;
        } else {
            let verificacion = [];
            if (elemento.name === 'nombre') {
                verificacion = verificarNombre(elemento.value);
                if (!verificacion[1]) {
                    e.preventDefault();
                    cambiarColor(elemento, 'rgba(255, 0, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'red';
                    break;
                } else {
                    cambiarColor(elemento, 'rgba(0, 200, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'green';
                }
            } else if (elemento.name === 'email') {
                verificacion = verificarEmail(elemento.value);
                if (!verificacion[1]) {
                    e.preventDefault();
                    cambiarColor(elemento, 'rgba(255, 0, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'red';
                    break;
                } else {
                    cambiarColor(elemento, 'rgba(0, 200, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'green';
                }
            } else if (elemento.name === 'telefono') {
                verificacion = verificarTelefono(elemento.value);
                if (!verificacion[1]) {
                    e.preventDefault();
                    cambiarColor(elemento, 'rgba(255, 0, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'red';
                    break;
                } else {
                    cambiarColor(elemento, 'rgba(0, 200, 0');
                    elemento.nextElementSibling.textContent = verificacion[0];
                    elemento.nextElementSibling.style.color = 'green';
                }
            }
        }
    }
});

const verificarNombre = (nombre) => {
    const regExp = /^[a-zA-Z]+$/;
    let verificacion = [];

    if (nombre.length < 3) {
        verificacion[0] = 'El nombre debe tener más de 3 caracteres';
        verificacion[1] = false;
    } else if (nombre.length > 30) {
        verificacion[0] = 'El nombre debe tener menos de 30 caracteres';
        verificacion[1] = false;
    } else if (!verificarExpr(nombre, regExp)) {
        verificacion[0] = 'El nombre solo puede contener letras';
        verificacion[1] = false;
    } else {
        verificacion[0] = 'El nombre es válido';
        verificacion[1] = true;
    }

    return verificacion;
}

const verificarEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let verificacion = [];

    if (!verificarExpr(email, regExp)) {
        verificacion[0] = 'El email no es válido';
        verificacion[1] = false;
    } else {
        verificacion[0] = 'El email es válido';
        verificacion[1] = true;
    }

    return verificacion;
}

const verificarTelefono = (telefono) => {
    const refExp = /^(\+598 ?)?(2\d{3} ?\d{4}|09\d{1} ?\d{3} ?\d{3})$/;

    let verificacion = [];

    if (!verificarExpr(telefono, refExp)) {
        verificacion[0] = 'El teléfono no es válido';
        verificacion[1] = false;
    } else {
        verificacion[0] = 'El teléfono es válido';
        verificacion[1] = true;
    }

    return verificacion;
}

const verificarExpr = (campo, expresion) => {
    if (expresion.test(campo)) {
        return true;
    } else {
        return false;
    }
}

const cambiarColor = (elemento, color) => {
    elemento.style.backgroundColor = `${color}, .1)`;
    elemento.style.border = `1px solid ${color})`;
}

const usuarios = async () => {
    const response = await fetch('https://randomuser.me/api/?results=3');
    const data = await response.json();
    return data;
}

usuarios()
    .then(data => {
        for (const usuario in resenaIMG) {
            resenaIMG[usuario].setAttribute('src', data.results[usuario].picture.thumbnail);
            clientes[usuario].textContent = `${data.results[usuario].name.first} ${data.results[usuario].name.last}`;
        }
    })
    .catch(error => console.log(error));