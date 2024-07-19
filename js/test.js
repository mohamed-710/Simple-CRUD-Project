let products = null;
let productlist = document.getElementById('table-list');
let Warning_msg = document.getElementById('W-msg');
let tableBody = document.getElementById('table-body');
let productName = document.getElementById('product_name');
let productCategory = document.getElementById('product_category');
let productPrice = document.getElementById('product_price');
let productDescription = document.getElementById('product_desc');
let AddProductBtn = document.getElementById('add-ptn');
let productAdder = document.getElementById('submit-product');
let buttondelete = document.getElementById('clear-btn')
let productCount = document.getElementById('product_count')
let mood = 'create'
let temp;
class product {
    constructor(name, cat, price, desc, count) {
        this.name = name;
        this.cat = cat;
        this.price = price;
        this.desc = desc;
        this.count = count;
    }
}
class UserInput {
    constructor() {

    }
    showData() {
        if (products && products.length != 0) {
            productlist.classList.remove("d-none");
            productlist.classList.add("d-block");
            Warning_msg.classList.add("d-none");
            Warning_msg.classList.remove("d-block");
            tableBody.innerHTML = '';
            for (let i = 0; i < products.length; i++) {
                this.createTableRow(i)
            }
            buttondelete.classList.remove('d-none');
            this.updateDeleteButtonText();
        }
        else {
            Warning_msg.classList.remove("d-none");
            Warning_msg.classList.add("d-block");
            productlist.classList.add("d-none");
            productlist.classList.remove("d-block");
            buttondelete.classList.add("d-none");
        }
    }
    add_to_storage() {
        if (localStorage.product != null) {
            products = JSON.parse(localStorage.product);
        }
        else {
            products = [];
        }
    }
    clearData() {
        productName.value = '';
        productPrice.value = '';
        productCategory.value = '';
        productDescription.value = '';
        productCount.value = '';
    }
    deleteData(i) {
        products.splice(i, 1);
        localStorage.product = JSON.stringify(products);
        this.showData();
    }
    deleteAll() {
        localStorage.clear();
        products.splice(0);
        this.showData()
    }
    updateDeleteButtonText() {
        buttondelete.textContent = `this.Delete All (${products.length})`;
    }
    updateData(i) {
        productName.value = products[i].name;
        productDescription.value = products[i].desc;
        productPrice.value = products[i].price;
        productCategory.value = products[i].cat;
        productCount.style.display = 'none';
        AddProductBtn.innerHTML = 'Update';
        mood = 'update';
        temp = i;
        scroll({
            top: 0,
            behavior: "smooth"
        });
    }
    searchData(valueOfSearch) {
        tableBody.innerHTML = '';
        valueOfSearch = valueOfSearch.toLowerCase(); 
        for (let i = 0; i < products.length; i++) {
            if (typeof products[i] === 'object' && products[i].name && products[i].name.toLowerCase().includes(valueOfSearch)) {
                this.createTableRow(i);
            }
        }
    }

    createTableRow(i) {
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
        updateButton.addEventListener('click', () => this.updateData(i));
        const updateIcon = document.createElement('i');
        updateIcon.className = 'fa-solid fa-pen-to-square';
        updateButton.appendChild(updateIcon);
        tdUpdate.appendChild(updateButton);
        tr.appendChild(tdUpdate);


        const tdDelete = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger';
        deleteButton.addEventListener('click', () => this.deleteData(i));
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash';
        deleteButton.appendChild(deleteIcon);
        tdDelete.appendChild(deleteButton);
        tr.appendChild(tdDelete);

        tableBody.appendChild(tr);
    }
}
const User1 = new UserInput();


productAdder.onsubmit = function (event) {
    event.preventDefault();
    if (!products) {
        products = [];
    }
    const newProduct = new product(productName.value, productCategory.value, productPrice.value, productDescription.value, productCount.value)
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
            AddProductBtn.innerHTML = 'Add product';
            productCount.style.display = "block";

        }
        User1.clearData();

    }
    localStorage.setItem('product', JSON.stringify(products));
    User1.showData();
};
User1.add_to_storage();
User1.showData();

buttondelete.addEventListener('click', () => User1.deleteAll());