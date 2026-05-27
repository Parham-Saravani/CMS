const totalProductsCount = document.querySelectorAll('.products-data');
const totalUsersCount = document.querySelector('.users-data');
const latestUsersContainer = document.querySelector('.latest-users')
const latestProductsContainer = document.querySelector('.table-component')

let data = {
    products: [],
    users: []
};



function onPageLoad() {
    const isDataAvailable = JSON.parse(localStorage.getItem('data'));

    if (isDataAvailable) {
        data = isDataAvailable
    }
    countTotalProductsUsers()
    calculateLastFiveUsers()
    calculateLastFiveProducts()
}


// //! counts users and products 
function countTotalProductsUsers() {
    totalProductsCount.forEach(elemnt => elemnt.textContent = data.products.length)
    totalUsersCount.textContent = data.users.length;
}


//! calculate users and create elements
function calculateLastFiveUsers() {
    if (!data.users.length) {
        latestUsersContainer.insertAdjacentHTML('beforeend',
            `
            <p class="products-empty">کاربری یافت نشد :)</p>
            `
        )
    }
    if (data.users.length <= 5) {
        const lastIndex = data.users.length;
        const firstIndex = 0;
        createUsers(firstIndex, lastIndex);
    } else {
        const lastIndex = data.users.length;
        const firstIndex = lastIndex - 5;
        createUsers(firstIndex, lastIndex)
    }


}
function createUsers(firstIndex, lastIndex) {
    data.users.slice(firstIndex, lastIndex).reverse().forEach(function (item) {
        latestUsersContainer.insertAdjacentHTML('beforeend',
            `
            <article>
                <span class="icon-card">
                    <i class="fa-solid fa-user"></i>
                </span>
                <div>
                    <p class="user-name">${item.fullName}</p>
                    <p class="user-email">${item.email}</p>
                </div>
            </article>
            `
        )
    })
}

//! calculate products and create elements
function calculateLastFiveProducts() {
    if (!data.products.length) {
        latestProductsContainer.insertAdjacentHTML('beforeend',
            `
            <p class="products-empty">محصولی یافت نشد :)</p>
            `
        )
    }
    if (data.products.length <= 5) {
        const lastIndex = data.products.length;
        const firstIndex = 0;
        createProducts(firstIndex, lastIndex)
    } else {
        const lastIndex = data.products.length;
        const firstIndex = lastIndex - 5;
        createProducts(firstIndex, lastIndex)
    }



}
function createProducts(firstIndex, lastIndex) {
    data.products.slice(firstIndex, lastIndex).reverse().forEach(function (item) {
        latestProductsContainer.insertAdjacentHTML('beforeend',
            `
            <div class="table-body">
                <div class="tableRow">
                    <p class="product-title">${item.title}</p>
                    <p class="product-price">${item.price.toLocaleString()}</p>
                    <p class="product-shortName">${item.slug}</p>
                    <div class="product-manage">
                        <button class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="remove-btn">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
            `
        )
    })
}
//* events 
document.addEventListener('DOMContentLoaded', onPageLoad)
