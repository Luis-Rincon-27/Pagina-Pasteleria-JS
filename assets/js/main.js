/* let Categoria
    1 -> Productos
    2 -> Blog
*/

let salida_cartaBlog = "";
let salida_cartaProducto = "";

function iniciar_elementos() {

    iniciar_Producto();
    iniciar_Blog();

}

function iniciar_Producto() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let arreglo = JSON.parse(this.responseText);
            repetirProceso(arreglo, 1);
            console.log(arreglo);
        }
    };
    xhttp.open("GET", "https://pastelerialaceleste.cl/wp-json/wp/v2/product?per_page=100", true);
    xhttp.send()
}

function iniciar_Blog() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let arreglo = JSON.parse(this.responseText);
            repetirProceso(arreglo, 2);
        }
    };
    xhttp.open("GET", "https://pastelerialaceleste.cl/wp-json/wp/v2/posts?per_page=100", true);
    xhttp.send();
}

function repetirProceso(informacion, categoria) {
    let i;
    for (i = 0; i < informacion.length; i++) {
        if (i <= 3) {
            extraerData(informacion[i], categoria);
        } else {
            break;
        }
    }
}

function extraerData(informacion, categoria) {
    let xhttp = new XMLHttpRequest();
    let arreglo;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arreglo = JSON.parse(this.responseText);
            if (categoria == 1) {
                cartaProducto(informacion.id, informacion.title.rendered, 20, arreglo.media_details.sizes.shop_catalog.source_url)
            } else if (categoria == 2) {
                cartaBlog(informacion.id, informacion.title.rendered, informacion.excerpt.rendered, arreglo.media_details.sizes.medium.source_url);
            }
        }
    };
    xhttp.open("GET", informacion._links["wp:featuredmedia"][0].href, true);
    xhttp.send();
}

function cartaProducto(id, titulo, precio, url_img) {

    salida_cartaProducto += '<div class="col"><div class="card"><img src="' + url_img +
        '" class="card-img-top" alt="' + titulo + '"><div class="card-body" style="height:200px">' +
        '<h5 class="card-title text-center fuente_producto_carta-bold">' + titulo + '</h5><p class="card-text text-center fuente_producto_carta">' +
        precio + '$</p></p><p class="card-text text-center text-body-secondary"><a href="listaProductos.html">' +
        'Ver mas</a></p></div></div></div>';

    document.getElementById("infoproducto").innerHTML = salida_cartaProducto;

}

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog1();
});

function obtenerDatosBlog1() {
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
                        <div class="col justify-content-center">
                            <div class="card">
                                <img src="${urlImagenBlog}" class="card-img-top" alt="${titulo}">
                                <div class="card-body">
                                    <h5 class="card-title">${titulo}</h5>
                                    <p class="card-text">${contenido}</p>
                                </div>
                            </div>
                        </div>
                    `;

                    // Agregar la carta del blog al contenedor en la página
                    const contenedorBlog = document.getElementById('blog1');
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
    obtenerDatosBlog1();
});

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog1();
});

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog2();
});

function obtenerDatosBlog2() {
    fetch('https://pastelerialaceleste.cl/wp-json/wp/v2/posts/2185')
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
                                </div>
                            </div>
                        </div>
                    `;

                    // Agregar la carta del blog al contenedor en la página
                    const contenedorBlog = document.getElementById('blog2');
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
    obtenerDatosBlog2();
});

document.addEventListener('DOMContentLoaded', function () {
    obtenerDatosBlog2();
});


function fetchAndDisplayProducts() {
    fetch('https://pastelerialaceleste.cl/wp-json/wp/v2/product?per_page=100')
        .then(response => response.json())
        .then(data => {
            let productCards = '';
            data.forEach((product, index) => {
                // Iniciar una nueva fila cada 7 tarjetas
                if (index % 7 === 0) {
                    productCards += '<div class="row">';
                }
                // Obtener la URL de la imagen destacada
                const urlImagen = product._links['wp:featuredmedia'][0].href;
                fetch(urlImagen)
                    .then(response => response.json())
                    .then(mediaData => {
                        // Obtener la URL de la imagen en miniatura
                        const imageUrl = mediaData.media_details.sizes.thumbnail.source_url;
                        // Agregar la tarjeta al HTML con un espaciado de 4
                        productCards += `
                            <div class="col-sm-12 col-md-4 p-4 justify-content-center mx-auto">
                                <div class="card h-100">
                                    <a href="${product.link}" target="_blank" style="text-decoration: none; color: lightgreen;">
                                        <img src="${imageUrl}" class="card-img-top" alt="${product.title.rendered}">
                                        <div class="card-body">
                                            <h5 class="card-title">${product.title.rendered}</h5>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        `;
                        // Cerrar la fila después de 7 tarjetas o al final de la lista de productos
                        if ((index + 1) % 7 === 0 || index === data.length - 1) {
                            productCards += '</div>';
                        }
                        // Insertar las tarjetas en el DOM al final de la iteración
                        if (index === data.length - 1) {
                            document.getElementById('product-cards').innerHTML = productCards;
                        }
                    })
                    .catch(error => console.error('Error fetching image:', error));
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

fetchAndDisplayProducts();
