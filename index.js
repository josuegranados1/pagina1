async function cargarProductos() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const productoHTML = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text text-success">$${producto.precio.toFixed(2)}</p>
                        <button class="btn btn-primary">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });
}

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const productos = await response.json();
        const resultados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(query) ||
            producto.descripcion.toLowerCase().includes(query)
        );
        mostrarProductos(resultados);
    } catch (error) {
        console.error("Error en la búsqueda:", error);
    }
});

cargarProductos();
