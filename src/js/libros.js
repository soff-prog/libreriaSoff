import '../css/style.css'; 
import 'flowbite';

const contenedor = document.getElementById("contenedor-libros");

//Funcion para cargar los libros - Funcion asincrona
const cargarTienda = async ()=>{
    try{
        const respuesta = await fetch("/data/libros.json");
        //vrificar si la respuesta fue exitosa
        if(!respuesta.ok) throw new Error("Error en la red");
        //convertir el cuerpo de la respuesta a un objeto json que se pueda usar
        const datos = await respuesta.json();
        //limpiar el contenedor
        contenedor.innerHTML="";
        //recorrer la lista de libros
        datos.forEach((libro) => {
            contenedor.innerHTML += `
                <div class="p-8 border rounded-lg dark:border-gray-700 hover:border-orange-700 transition-colors group bg-orange-300 shadow-xl">
                    <div class="relative overflow-hidden rounded-lg h-32 mb-4 bg-orange-200">
                        <img class="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" 
                             src="${libro.imagen}" alt="${libro.titulo}">
                    </div>

                    <div class="flex flex-col justify-between">
                        <div>
                            <h1 class="font-bold text-white uppercase text-sm line-clamp-1 mb-1">${libro.titulo}</h1>
                            <span class="text-[10px] bg-orange-500 text-white px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
                                ${libro.precio}
                            </span>
                        </div>
                        
                        <div class="flex items-center justify-between mt-6">

                            <button 
                            data-titulo="${libro.titulo}" 
                            data-precio="${libro.precio}"
                            class="btn-agregar bg-orange-600 hover:bg-orange-500 text-white p-2 rounded-lg transition-all active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;

        });
    }
    catch(error){
            console.log("Error", error);
            contenedor.innerHTML=`<p class="text-red-700 text-center col-span-full font-bold">Verificar la conexion</p>`;
        };
}

cargarTienda();


//localStorage
//Intentar recuperar los libros elegidos o seleccionados por el usuario
let carrito = JSON.parse(localStorage.getItem("carrito-libros"))

//Funcion para actualizar el carrito
const actualizarContado = () =>{
    const contador  = document.getElementById("carrito-contador");
    //si existe el contador le pongamos la longitud deñ carrito
    if(contador) contador.innerText=carrito.length;
    contenedor.addEventListener("click" , (e) =>{
        const boton = e.target.closets("btn-agregar");
        if(boton){
            const title = boton.dataset.titulo;
            const price = boton.dataset.precio;

            //crear un objeto con la informacion del libro
            const libro = {
                titulo: title,
                precio: price
            };

            //agregar al carrito
            carrito.push(libro);

            localStorage.setItem("carrito-libros", JSON.stringify(carrito));
        }
    })
}