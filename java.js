const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

//Cogermos el mensaje que escribe el usuario y lo transformamos en un array todo en mayuscula.
const mensaje = () => {
    const palabraArray = [...inputOriginal.value.toUpperCase()];
    imprimirCaracter(0, palabraArray);
}

const imprimirCaracter = (currentLetterIndex, palabraArray) => {
    // Comprobamos si hemos alcanzado el final del array. Si hemos llegado al final entonces acabamos la funcion.
    if(palabraArray.length === currentLetterIndex) return;
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    /*En la funcion animarCaracter lo que ahcemos es animar al caracter y cuando se termine lo codificamos si es necesario
    o se muestra sin cambios.*/
    animarCaracter(spanChar)
        .then( () => {
            const caracterSinModificar = palabraArray[currentLetterIndex];
            //Si el caracter esta en el alfabeto este se modifica, si no estuviera lo dejamos igual
            spanChar.innerHTML = alfabeto.includes(caracterSinModificar) ? 
                alfabeto[(alfabeto.indexOf(caracterSinModificar) + parseInt(rango.value)) % alfabeto.length] : 
                caracterSinModificar
            //Aqui la hacemos recursiva    
            imprimirCaracter(currentLetterIndex + 1, palabraArray);
        });
}

const animarCaracter = spanChar => {
    let cambiosDeLetra = 0;
    //Aqui devolvemos una promesa que se resolvera cuando se acabe la animacion
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            //Agregamos un caracter del alfabeto al span que habiamos creado antes
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            //Despues de 3 cambios paramos el intervalo y resolvemos la promesa
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    mensaje()
}

cifrador.onsubmit = submit;