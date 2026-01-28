import '../css/style.css'; 
import 'flowbite';


const lista = document.getElementById("lista-carrito");
const totalPago= document.getElementById("total-compra");

//traer la informacion de la memoria del localStorege
let libroCarrito = JSON.parse(localStorage.getItem("carrito-libros"))||[];

const mostrarCarrito= ()=>{
    lista.innerHTML = "";
    let total = 0;

    libroCarrito.forEach((libro, index) => {
        total += parseFloat(libro.precio);

        //CARRITO
        lista.innerHTML += `
            <div class="flex justify-between items-center border-b border-slate-700 py-4">
                <p class="font-bold">${libro.titulo}</p>
                <div class="flex items-center gap-4">
                    <span class="text-orange-600 font-bold">$${libro.precio}</span>
                    <button data-index="${index}" class="btn-eliminar text-red-800 text-xs">Eliminar</button>
                </div>
            </div>
        `;
    });
totalPago.innerText=`$${total.toFixed(2)}`;
;}

lista.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if(boton){
        const index = parseInt(boton.dataset.index);
        //Eliminar el libro del carrito basandose en la posicion seleccionada
        libroCarrito.splice(index, 1); //splice es un metodo para eliminar
        //actualizar los datos
        localStorage.setItem("carrito-libros", JSON.stringify(libroCarrito));
        mostrarCarrito();
    }
})
mostrarCarrito();