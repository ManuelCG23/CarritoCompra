//Variables
const carrito = document.querySelector('#carrito'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarrioBtn = document.querySelector('#vaciar-carrito'),
      listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

cargarEvenetListeners();

function cargarEvenetListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     //Elimina cursos delc arrito

     carrito.addEventListener('click', eliminarCurso);

     //Vaciar el carrito de compra

     vaciarCarrioBtn.addEventListener('click', () => {
         articuloCarrito = [];
         limpiarHTML();
     });

}



//Funciones
function agregarCurso(e) {
    e.preventDefault();                                                 //Para que al clicar en el boton no se vaya para arriba

    if(e.target.classList.contains('agregar-carrito')){                 //Al clicar en el boton
        const cursoSelect = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelect);
    }
}

//Elimina un curso del carrito

function eliminarCurso(e) {
    //console.log(e.target.classList);

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo articulosCarrito por el data-id
        articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); 

    }
}



// Lee los datos del curso
function leerDatosCurso(curso){
    //Creamos objeto con el contenido del curso

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    //Revisa si un elemento existe en el carrito

    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id );

    if(existe){
        const cursos = articuloCarrito.map(curso => {
            if(curso.id === infoCurso.id ){
                curso.cantidad ++;
                return curso;
            }else{
                return curso;
            }
        });
        articuloCarrito = [...cursos];
    }else{      
        //Agrega elementos al arreglo articuloCarrito
        articuloCarrito = [...articuloCarrito, infoCurso];
    }

   // console.log(articuloCarrito);

    carritoHTML();
}


//Muestra el carrito de compra en el html

function carritoHTML(){

    //Vaciamos el carrito (HTML)
    limpiarHTML();

    articuloCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width = "100" >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id = "${id}"  > X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody

        contenedorCarrito.appendChild(row);

    })
}

function limpiarHTML(){
    // forma lenta
    // contenedorCarrito.innerHTML = '';

    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}