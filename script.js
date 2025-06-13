const table = document.getElementById('cartTable');
const totalElement = document.getElementById('cartTotal');

// Obtener productos del localStorage
function getProducts() {
    try {
        const local = localStorage.getItem('products');
        return local ? JSON.parse(local) : [];
    } catch (error) {
        console.error("Error al leer productos:", error);
        return [];
    }
}

// Guardar productos
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Formatear precio
function formatCurrency(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

// Renderizar la tabla
function renderTable(products) {
    if (!products.length) {
        table.innerHTML = `<tr><td colspan="5">Tu carrito está vacío 🛒</td></tr>`;
        totalElement.textContent = '$0';
        return;
    }

    const header = `
        <tr>
            <th></th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
        </tr>
    `;

    const rows = products.map((product, index) => {
        const price = Number(product.price);
        const amount = Number(product.amount);
        const subtotal = price * amount;

        return `
            <tr>
                <td class="product-photo">
                    <img src="${product.photo}" alt="${product.name}" />
                </td>
                <td class="product-name">
                    ${product.name}
                </td>
                <td class="product-price">${formatCurrency(price)}</td>
                <td class="product-amount">
                    <button onclick="changeAmount(${index}, -1)">−</button>
                    ${amount}
                    <button onclick="changeAmount(${index}, 1)">+</button>
                </td>
                <td class="product-subtotal">${formatCurrency(subtotal)}</td>
                <td class="product-actions"><button onclick="deleteProduct(${index})">🗑️ Eliminar</button></td>
            </tr>
        `;
    }).join('');

    table.innerHTML = header + rows;

    // Mostrar total
    const total = products.reduce((acc, p) => acc + Number(p.price) * Number(p.amount), 0);
    totalElement.textContent = `${formatCurrency(total)}`;
}

// Cambiar cantidad
function changeAmount(index, delta) {
    const products = getProducts();
    products[index].amount = Math.max(1, Number(products[index].amount) + delta);
    saveProducts(products);
    renderTable(products);
}

// Eliminar producto
function deleteProduct(index) {
    const products = getProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderTable(products);
}

// Inicializar
function initCart() {
    const exists = localStorage.getItem('products');
    alert(`Se agregó----> ${exists} `);
    if (!exists) {
        const defaultProducts = [
            {
                photo: "https://dulceria.co/wp-content/uploads/2019/08/jumbo-grande-individual-600x600.jpg",
                name: "Mango biche y Mango Maduro",
                price: "7900",
                amount: "1",
                id: '1'
            }
        ];
        saveProducts(defaultProducts);
    }

    const products = getProducts();
    renderTable(products);
}

// guardar producto en local storage
document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".product");

    productos.forEach(producto =>{
        const cantidadEl = producto.querySelector(".cantidad");
        const btnAgregar = producto.querySelector(".agregar-producto");


    btnAgregar.addEventListener("click", (e) => {
        e.preventDefault();

        const id = producto.id;
        const name = producto.querySelector("h3").textContent;
        const price_ = producto.querySelector("h2").textContent;
        const price = parseInt(price_.replace(/\D/g, "")); 
        const imagen = producto.querySelector("img").getAttribute("src");
        const cantidad = parseInt(cantidadEl.value);

        const item = { id, name, price, photo: imagen, amount: cantidad };
        console.log(imagen);
        
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const index = carrito.findIndex(p => p.id === id);

        if (index !== -1) {
            carrito[index].amount = parseInt(carrito[index].amount) + cantidad;
        } else {
            carrito.push(item);
        }

        //localStorage.setItem('products', JSON.stringify(carrito)); se cambia products por el id
        localStorage.setItem(id, JSON.stringify(carrito)); 
        alert(`Se agregó ${cantidad} x ${name} al carrito`);

        });
    });
    initCart();
});




