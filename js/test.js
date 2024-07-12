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
        tableBody.innerHTML = '';
        for (let i = 0; i < products.length; i++) {

            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.textContent = i + 1;
            tr.appendChild(th);


            const tdName = document.createElement('td');
            tdName.textContent = products[i].name;
            tr.appendChild(tdName);

            const tdPrice = document.createElement('td');
            tdPrice.textContent = products[i].price;
            tr.appendChild(tdPrice);

            const tdCat = document.createElement('td');
            tdCat.textContent = products[i].cat;
            tr.appendChild(tdCat);

            const tdDesc = document.createElement('td');
            tdDesc.textContent = products[i].desc;
            tr.appendChild(tdDesc);


            const tdUpdate = document.createElement('td');
            const updateButton = document.createElement('button');
            updateButton.className = 'btn btn-outline-success';
            updateButton.setAttribute('onclick', `updateData(${i})`);
            const updateIcon = document.createElement('i');
            updateIcon.className = 'fa-solid fa-pen-to-square';
            updateButton.appendChild(updateIcon);
            tdUpdate.appendChild(updateButton);
            tr.appendChild(tdUpdate);


            const tdDelete = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-outline-danger';
            deleteButton.setAttribute('onclick', `deleteData(${i})`);
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa-solid fa-trash';
            deleteButton.appendChild(deleteIcon);
            tdDelete.appendChild(deleteButton);
            tr.appendChild(tdDelete);

            tableBody.appendChild(tr);
        }
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

function searchData(value) {
    tableBody.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(value)) {


            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.textContent = i + 1;
            tr.appendChild(th);


            const tdName = document.createElement('td');
            tdName.textContent = products[i].name;
            tr.appendChild(tdName);

            const tdPrice = document.createElement('td');
            tdPrice.textContent = products[i].price;
            tr.appendChild(tdPrice);

            const tdCat = document.createElement('td');
            tdCat.textContent = products[i].cat;
            tr.appendChild(tdCat);

            const tdDesc = document.createElement('td');
            tdDesc.textContent = products[i].desc;
            tr.appendChild(tdDesc);


            const tdUpdate = document.createElement('td');
            const updateButton = document.createElement('button');
            updateButton.className = 'btn btn-outline-success';
            updateButton.setAttribute('onclick', `updateData(${i})`);
            const updateIcon = document.createElement('i');
            updateIcon.className = 'fa-solid fa-pen-to-square';
            updateButton.appendChild(updateIcon);
            tdUpdate.appendChild(updateButton);
            tr.appendChild(tdUpdate);


            const tdDelete = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-outline-danger';
            deleteButton.setAttribute('onclick', `deleteData(${i})`);
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa-solid fa-trash';
            deleteButton.appendChild(deleteIcon);
            tdDelete.appendChild(deleteButton);
            tr.appendChild(tdDelete);

            tableBody.appendChild(tr);
        }
    }
}

add_to_storage();
showData();
