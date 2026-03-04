//Declarar las constantes que son traidas del html
const numeroIngresado = document.getElementById("numero");
const boton = document.getElementById("boton");
const imagen = document.getElementById("estado");
const header = document.getElementById("encabezado");
const footer = document.getElementById("pie");
const temporizador = document.getElementById("temporizador");
const audio = document.getElementById("miSonido");
const botonSonido = document.getElementById("botonSonido");
const icono = botonSonido.querySelector("i");
const mensaje = document.getElementById("mensaje");
const mensajeIntento = document.getElementById("mensajeIntento");
const numerosIntento = document.getElementById("numerosIntento");
const botonReiniciar = document.getElementById("reiniciar");

//Declarar las variables a utilizar
let numeroAleatorio = Math.floor(Math.random() * 100);
let tiempo = 60;
let intervalo = null;
let sonidoActivo = false;
let intento = 0;
let intentosUsuario = [];
let juegoIniciado = false; 
let juegoTerminado = false;

//Función cada que el usuario le de click al botón
boton.addEventListener("click", function() {

    //Si el juego termina deja de ejecutarse esta función
    if (juegoTerminado) return;

    //Leer el valor que ingresa el usuario
    const valor = Number(numeroIngresado.value);

    //Guardar el valor que el usuario ingresó en un arreglo 
    intentosUsuario.push(valor);

    //Mostrar el arreglo de los intentos 
    numerosIntento.textContent = "Intentos: " + intentosUsuario.join(" - ");

    //Incrementar los intentos
    intento++

    //Un switch que muestra un mensaje e imagen diferente en cada intento 
    switch (intento) {
        case 1:
            mensajeIntento.textContent = "Te quedan 9 oportunidades";
            imagen.src = "img/intento1.png";
            break;
        
        case 2:
            mensajeIntento.textContent = "Te quedan 8 oportunidades" ;
            imagen.src = "img/intento2.png";
            break;

        case 3:
            mensajeIntento.textContent = "Te quedan 7 oportunidades" ;
            imagen.src = "img/intento3.png";
            break;

        case 4:
            mensajeIntento.textContent = "Te quedan 6 oportunidades" ;
            imagen.src = "img/intento4.png";
            break;

        case 5:
            mensajeIntento.textContent = "Te quedan 5 oportunidades" ;
            imagen.src = "img/intento5.png";
            break;

        case 6:
            mensajeIntento.textContent = "Te quedan 4 oportunidades" ;
            imagen.src = "img/intento6.png";
            break;
            
        case 7:
            mensajeIntento.textContent = "Te quedan 3 oportunidades" ;
            imagen.src = "img/intento7.png";
            break;

        case 8:
            mensajeIntento.textContent = "Te quedan 2 oportunidades" ;
            imagen.src = "img/intento8.png";
            break;

        case 9:
            mensajeIntento.textContent = "Te quedan 1 oportunidades" ;
            imagen.src = "img/intento9.png";
            break;

        case 10:
            //Mensaje cuando se acaban los intentos
            mensajeIntento.textContent = "¡Los intentos se han acabado!" ;

            //Mostrar el valor a adivinar 
            mensaje.textContent = "El número era " + numeroAleatorio;

            //Desactiva el botón
            boton.disabled = true;

            //Muestra un gif
            imagen.src = "img/finalMal.gif";

            //Detiene el temporizador 
            clearInterval(intervalo);

            //Muestra el botón de reiniciar 
            mostrarBotonReiniciar();

            //Desactiva el input
            numeroIngresado.disabled = true; 
            break;
    
        default:
            break;
    }

    //En caso de que el valor sea mayor al que hay que adivinar y no esté en el intento 10 mostrar un mensaje
    if (valor > numeroAleatorio && intento!=10) {
        mensaje.textContent = "El número es Menor";
    } 

    //En caso de que el valor sea menor al que hay que adivinar y no esté en el intento 10 mostrar un mensaje
    if (valor < numeroAleatorio && intento!=10) {
        mensaje.textContent = "El número es Mayor";
    }

    //En caso de que el usuario adivine el valor 
    if (valor == numeroAleatorio) {

        //Detiene el temporizador 
        clearInterval(intervalo);

        //Marcar que el juego terminó
        juegoTerminado = true; 

        //Mostrar un gif
        imagen.src = "img/finalBien2.gif";

        //Mostrar un mensaje 
        mensaje.textContent = "¡Número Correcto!";

        //Desactiva el botón
        boton.disabled = true;

        //Desactiva el input
        numeroIngresado.disabled = true; 

        //Muestra el botón de reiniciar 
        mostrarBotonReiniciar();
    }


    //Si el juego todavía no ha iniciado 
    if (!juegoIniciado) {

        //Marca que el juego inició
        juegoIniciado = true;

        //Intervalo que se ejecuta cada segundo
        intervalo = setInterval(function() {

            //El tiempo disminuye de a 1 
            tiempo--;

            //Actualizar tiempo en pantalla
            temporizador.textContent = tiempo;

            //Si el tiempo llega a 0
            if (tiempo <= 0) {

                //Detiene el temporizador
                clearInterval(intervalo);

                //Muestra un mensaje
                mensaje.textContent = "Se acabó el tiempo, el número era " + numeroAleatorio;

                //Desactiva el botón
                boton.disabled = true;

                //Muestra el botón de reiniciar 
                mostrarBotonReiniciar();

                //Mostrar un gif
                imagen.src = "img/finalMal.gif";

                //Desactiva el input
                numeroIngresado.disabled = true; 
            }

        }, 1000); // Se repite cada 1 segundo
    }

});

//Función cada que el usuario le de click al botón de sonido
botonSonido.addEventListener("click", function() {

    //Si el audio está apagado
    if (audio.paused) {

        //Se reproduce 
        audio.play();

        //Quitar el ícono de sonido apagado
        icono.classList.remove("fa-volume-xmark");

        //Agregar el ícono de sonido encendido
        icono.classList.add("fa-volume-high");

    } else {

        //Si el audio no está apagado
        audio.pause();

        //Quitar el ícono de sonido encendido
        icono.classList.remove("fa-volume-high");

        //Agregar el ícono de sonido apagado
        icono.classList.add("fa-volume-xmark");
    }
});


//Función para mostrar el botón de reiniciar 
function mostrarBotonReiniciar() {

    // Quitar la clase "oculto" para que el botón aparezca
    botonReiniciar.classList.remove("oculto");
}

//Función cada que el usuario le de click al botón de reinciar
botonReiniciar.addEventListener("click", function() {

    //Recarga la página
    location.reload();
});