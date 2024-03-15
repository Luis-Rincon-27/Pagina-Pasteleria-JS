document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog();
});

f

function obtenerDatosBlog() {
    fetch('https://pastelerialaceleste.cl/wp-json/wp/v2/posts/2183')
        .then(response => response.json())
        .then(data => {
            // Extraer información del blog
            const id = data.id;
            const titulo = data.title.rendered;
            const contenido = data.content.rendered;
            const urlImagen = data._links['wp:featuredmedia'][0].href;

            // Obtener la URL de la imagen del featured media
            fetch(urlImagen)
                .then(response => response.json())
                .then(mediaData => {
                    const urlImagenBlog = mediaData.media_details.sizes.full.source_url;

                    // Crear el HTML para la carta del blog
                    const htmlCartaBlog = `
                        <div class="col">
                            <div class="card">
                                <img src="${urlImagenBlog}" class="card-img-top" alt="${titulo}">
                                <div class="card-body">
                                    <h5 class="card-title">${titulo}</h5>
                                    <p class="card-text">${contenido}</p>
                                    <a href="${data.link}" class="btn btn-primary">Leer más</a>
                                </div>
                            </div>
                        </div>
                    `;

                    // Agregar la carta del blog al contenedor en la página
                    const contenedorBlog = document.getElementById('blog');
                    contenedorBlog.innerHTML = htmlCartaBlog;
                })
                .catch(error => {
                    console.error('Error al obtener los datos del medio destacado:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener los datos del blog:', error);
        });
};

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog();
    obtenerDatosProductos();
});

document.addEventListener('DOMContentLoaded', function() {
    obtenerDatosBlog();
    obtenerDatosProductos();
});

function obtenerDatosProductos() {
    // URL del endpoint que proporciona los datos de los productos
    const urlProductos = 'https://pastelerialaceleste.cl/wp-json/wp/v2/product?per_page=5';

    fetch(urlProductos)
        .then(response => response.json())
        .then(data => {
            // Obtener el contenedor de la lista de productos
            const contenedorProductos = document.getElementById('list_product');

            // Crear el HTML para la lista de productos
            let htmlListaProductos = '<ul class="list-group">';

            // Iterar sobre los datos de los productos y crear un elemento de lista para cada uno
            data.forEach(producto => {
                const nombre = producto.title.rendered;
                const precio = producto.price;
                const imagen = producto._links['wp:featuredmedia'][0].href; // URL de la imagen del producto

                // Agregar el elemento de lista con nombre, precio e imagen
                htmlListaProductos += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${imagen}" alt="${nombre}" style="max-width: 100px; max-height: 100px;">
                            </div>
                            <div class="col-md-8">
                                <h6>${nombre}</h6>
                                <p>Precio: ${precio}</p>
                            </div>
                        </div>
                    </li>
                `;
            });

            htmlListaProductos += '</ul>';

            // Agregar la lista de productos al contenedor en la página
            contenedorProductos.innerHTML = htmlListaProductos;
        })
        .catch(error => {
            console.error('Error al obtener los datos de los productos:', error);
        });
}
