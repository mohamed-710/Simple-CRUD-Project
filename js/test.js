let products = null;
let productlist = document.getElementById('table-list');
let Warning_msg = document.getElementById('W-msg');
let tableBody = document.getElementById('table-body');
let productName = document.getElementById('product_name');
let productCategory = document.getElementById('product_category');
let productPrice = document.getElementById('product_price');
let productDescription = document.getElementById('product_desc');
let createPtn = document.getElementById('add-ptn');
let productRegest = document.getElementById('submit-product');
let buttondelete = document.getElementById('clear-btn')
let productCount = document.getElementById('product_count')
let mood = 'create'
let temp;
function showData() {
    if (products && products.length != 0) {
        productlist.classList.remove("d-none");
        productlist.classList.add("d-block");
        Warning_msg.classList.add("d-none");
        Warning_msg.classList.remove("d-block");

        let table = '';
        for (let i = 0; i < products.length; i++) {
            table +=
                `
              <tr>
                    <th>${i + 1}</th>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].cat}</td>
                    <td>${products[i].desc}</td>
                    <td>
                        <button onclick="updateData(${i})" class="btn btn-outline-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button onclick="deleteData( ${i})" class="btn  btn-outline-danger">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
           `;
        }
        tableBody.innerHTML = table;
        buttondelete.classList.remove('d-none');
        updateDeleteButtonText();

    }
    else {
        Warning_msg.classList.remove("d-none");
        Warning_msg.classList.add("d-block");
        productlist.classList.add("d-none");
        productlist.classList.remove("d-block");
        buttondelete.classList.add("d-none");

    }
}
function add_to_storage() {
    if (localStorage.product != null) {
        products = JSON.parse(localStorage.product);
    }
    else {
        products = [];
    }

}
productRegest.onsubmit = function (event) {
    event.preventDefault();
    if (!products) {
        products = [];
    }
    let newProduct = {
        name: productName.value,
        cat: productCategory.value,
        price: productPrice.value,
        desc: productDescription.value,
        count: productCount.value,
    };
    if (productName.value != '' &&
        productPrice.value != ''
        && productCategory.value != ''
        && newProduct.count < 100
    ) {
        if (mood === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    products.push(newProduct);

                }
            }
            else {
                products.push(newProduct);
            }
        }
        else {
            products[temp] = newProduct;
            mood = 'create'
            createPtn.innerHTML = 'Add product';
            productCount.style.display = "block";

        }
        clearData();

    }


    localStorage.setItem('product', JSON.stringify(products));
    showData();

};
function clearData() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDescription.value = '';
    productCount.value = '';
}




function deleteData(i) {

            products.splice(i, 1);
            localStorage.product = JSON.stringify(products);
            showData();
        }
function deleteAll() {
    localStorage.clear();
    products.splice(0);
    showData()
}
function updateDeleteButtonText() {
    buttondelete.textContent = `Delete All (${products.length})`;
}
function updateData(i) {
    productName.value = products[i].name;
    productDescription.value = products[i].desc;
    productPrice.value = products[i].price;
    productCategory.value = products[i].cat;
    productCount.style.display = 'none';
    createPtn.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({

        top: 0,
        behavior: "smooth"
    })
}
add_to_storage();
showData();
