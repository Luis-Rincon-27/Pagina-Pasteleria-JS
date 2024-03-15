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

function iniciar_Producto(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let arreglo = JSON.parse(this.responseText);
            repetirProceso(arreglo, 1);
            console.log(arreglo);
        }
    };
    xhttp.open("GET", "https://pastelerialaceleste.cl/wp-json/wp/v2/product?per_page=100", true);
    xhttp.send()
}

function iniciar_Blog(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let arreglo = JSON.parse(this.responseText);
            repetirProceso(arreglo, 2);
        }
    };
    xhttp.open("GET", "https://pastelerialaceleste.cl/wp-json/wp/v2/posts?per_page=100", true);
    xhttp.send();
}

function repetirProceso(informacion, categoria){
    let i;
    for(i = 0; i < informacion.length; i++) {
        if(i<=3){
            extraerData(informacion[i], categoria);
        }else{
            break;
        }
    }
}

function extraerData(informacion, categoria){
    let xhttp = new XMLHttpRequest();
    let arreglo;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            arreglo = JSON.parse(this.responseText);
            if(categoria==1){
                cartaProducto(informacion.id, informacion.title.rendered, 20, arreglo.media_details.sizes.shop_catalog.source_url)
            }else if(categoria==2){
                cartaBlog(informacion.id, informacion.title.rendered, informacion.excerpt.rendered, arreglo.media_details.sizes.medium.source_url);
            }
        }
    };
    xhttp.open("GET", informacion._links["wp:featuredmedia"][0].href, true);
    xhttp.send();
}

function cartaProducto(id, titulo, precio, url_img){

    salida_cartaProducto +='<div class="col"><div class="card"><img src="'+url_img+ 
    '" class="card-img-top" alt="'+titulo+'"><div class="card-body" style="height:200px">'+
    '<h5 class="card-title text-center fuente_producto_carta-bold">'+titulo+'</h5><p class="card-text text-center fuente_producto_carta">'+
    precio+'$</p></p><p class="card-text text-center text-body-secondary"><a href="'+'">'+
    'Ver mas</a></p></div></div></div>';
       
    document.getElementById("infoproducto").innerHTML = salida_cartaProducto;   

}

function cartaBlog(id, titulo, contenido, url_img){
    let arreglo=contenido.split("/\s*\n\s*/");
    let cont_filtrado=arreglo[0].split("</p>");
    
    salida_cartaBlog  +='<div class="col"><div class="card"><img src="'+url_img+ 
    '" class="card-img-top" alt="'+titulo+'"><div class="card-body" style="height:200px">'+
    '<h5 class="card-title text-center">'+titulo+'</h5><p class="card-text text-center">'+
    cont_filtrado[0]+'...</p></p><p class="card-text text-center text-body-secondary"><a href="blog1.html">'+
    'Ver mas</a></p></div></div></div>';
       
    document.getElementById("infoblog").innerHTML = salida_cartaBlog;   

}

    

