const local = localStorage.getItem('products');
let data = [];

if (local) {
    const obj = JSON.parse(localStorage.getItem('products'))

    console.log(obj)

    const table = document.getElementById('table');


    data = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
        </tr>
        ${obj.map((product) => {
            return `
                <tr>
                    <td>
                        <img src="${product.photo}" alt="${product.name}" />
                        ${product.name}
                    </td>
                    <td>
                        ${product.price}
                    </td>
                    <td>
                        ${product.amount}
                    </td>
                    <td>
                        ${product.amount * product.price}
                    </td>
                </tr>
            `
        }).join('')}
    `
    table.innerHTML = data;

    console.log(data)
} else {

    const defaultProducts = [
        {
            "photo": "https://dulceria.co/wp-content/uploads/2019/08/jumbo-grande-individual-600x600.jpg",
            "name": "Mango biche y Mango Maduro",
            "price": "7900",
            "amount": "1",
            "id": '1'
        },
    ]

    localStorage.setItem('products', JSON.stringify(defaultProducts))
}

function deleteProduct(id) {
    const localClone = [...data];

}