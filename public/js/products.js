const createProductBtn = document.querySelector('#create-product');
const modal = document.querySelector('.modal-screen');
const modalContent = document.querySelector('.modal');
const productsContainer = document.querySelector('.table-body')
const productsNumber = document.querySelector('.products-data')

const paginationContainer = document.querySelector('.pagination')
//toast 
const toast = document.querySelector('.toast')
const toastProgress = document.querySelector('.process')
const toastContent = document.querySelector('.toast-content')


let data = {
  products: [],
  users: []
};
let index = 0;
let currentPage = 1;
let totalPages = 0;
let indexPerPage = 7;


//! on Dom load
function onPageLoad() {
  const isDataAvailable = JSON.parse(localStorage.getItem('data'));
  if (isDataAvailable) {
    data = isDataAvailable;
  }
  calculateAllProduc();
  createUsersElements()
  // pagination
  calculateTotalPages();
  createPaginationButtons();
  createPerPageElements();
}

// 7 > 1 * 7 2
// 14 > 
//! pagination 
function calculateTotalPages() {
  totalPages = Math.floor(data.products.length / 7);

  if (data.products.length > totalPages * indexPerPage) {
    totalPages++;
    return;
  }
}
function createPaginationButtons() {
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.insertAdjacentHTML('beforeend',
      `
      <span tabindex="1" class="page" data-page="${i}">${i}</span>
      `
    )
  };
  const currentActivePage = document.querySelector(`[data-page="${currentPage}"]`);
  if (currentActivePage) {
    currentActivePage.classList.add('active')
  }
}
function createPerPageElements() {
  productsContainer.innerHTML = '';
  const firstIndex = (currentPage - 1) * indexPerPage;
  const secondIndex = firstIndex + indexPerPage;
  data.products.slice(firstIndex, secondIndex).forEach(function (item) {
    productsContainer.insertAdjacentHTML('beforeend',
      `
          <div class="tableRow">
                <p class="product-title">${item.title}</p>
                <p class="product-price">${item.price.toLocaleString()}</p>
                <p class="product-shortName">${item.slug}</p>
                <div class="product-manage">
                    <button class="edit-btn" data-id="${item.id}">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="remove-btn" data-id="${item.id}">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
          </div>
      `
    )
  })
}

//! pagination btns click handler
function switchPageHandler(event) {
  const pageBtn = event.target.closest('.page')
  if (pageBtn) {
    const currentActivePage = document.querySelector('.page.active');
    if (currentActivePage) {
      currentActivePage.classList.remove('active')
    }
    event.target.classList.add('active');
    const page = +pageBtn.dataset.page;
    currentPage = page;

    createPerPageElements();
  }
}
//! create Product
function openModalToAddNewProducts(events) {
  events.preventDefault();
  addModalHandler()
}

//! create product elements
function createUsersElements() {

  if (!data.products.length) {
    productsContainer.innerHTML = `<p class="products-empty">محصولی یافت نشد :)</p>`
    return;
  }

  if (data.products.length > currentPage * indexPerPage) {
    calculateTotalPages();
    createPaginationButtons();
  } else if (currentPage === totalPages) {
    createPerPageElements();
  }
  else {
    productsContainer.innerHTML = '';
    data.products.forEach(function (item) {
      productsContainer.insertAdjacentHTML('beforeend',
        `
          <div class="tableRow">
                <p class="product-title">${item.title}</p>
                <p class="product-price">${item.price.toLocaleString()}</p>
                <p class="product-shortName">${item.slug}</p>
                <div class="product-manage">
                    <button class="edit-btn" data-id="${item.id}">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="remove-btn" data-id="${item.id}">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
          </div>
      `
      )
    })
  }
}









//! handle delete and edit product 
function editOrDeleteProductHandler(event) {
  const deleteBtn = event.target.closest('.remove-btn');
  const editBtn = event.target.closest('.edit-btn');

  if (deleteBtn) {
    const productId = +deleteBtn.dataset.id;
    index = data.products.findIndex(item => item.id === productId)
    deleteModalHandler()
  }
  if (editBtn) {
    const productId = +editBtn.dataset.id;
    editModalHandler(productId);
  }

}

//? modal functions for add or delete and edit products
function addModalHandler() {
  showModal();
  modalContent.innerHTML = `
    <header class="modal-header">
            <h3>ایجاد محصول</h3>
            <button class="close-modal" onclick="hideModal()">
              <i class="fas fa-times"></i>
            </button>
          </header>
          <main class="modal-content">
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان محصول را وارد نمائید ..."
              id="product-title"
            />
            <p class="input__alerts hidden" id="title__alert">عنوان محصول را وارد کنید</p>
            <input
              maxlength="10"
              type="number"
              class="modal-input"
              placeholder="قیمت محصول را وارد نمائید ..."
              id="product-price"
            />
            <p class="input__alerts hidden" id="price__alert">قیمت محصول را وارد کنید</p>
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان کوتاه محصول را وارد نمائید ..."
              id="product-shortName"
            />
            <p class="input__alerts hidden" id="slug__alert">عنوان کوتاه محصول را وارد کنید</p>
          </main>
          <footer class="modal-footer">
            <button class="cancel" onclick="hideModal()">انصراف</button>
            <button class="submit" onclick="addNewProduct()">تائید</button>
          </footer>
    `;
  priceInputHandler(`product-price`)
}
function deleteModalHandler() {
  showModal()
  modalContent.innerHTML = `
          <i class="ui-border top red"></i>
          <i class="ui-border bottom red"></i>
          <header class="modal-header" onclick="hideModal()">
              <h3>حذف محصول</h3>
              <button class="close-modal">
                  <i class="fas fa-times"></i>
              </button>
          </header>
          <main class="modal-content">
              <p class="remove-text">آیا از حذف این محصول اطمینان دارید؟</p>
          </main>
          <footer class="modal-footer">
              <button class="cancel" onclick="hideModal()">انصراف</button>
              <button class="submit" onclick="deleteProduct()">تائید</button>
          </footer>
  `
}
function editModalHandler(productId) {
  showModal();
  modalContent.innerHTML = `
    <header class="modal-header">
            <h3>ویرایش محصول</h3>
            <button class="close-modal" onclick="hideModal()">
              <i class="fas fa-times"></i>
            </button>
    </header>
    <main class="modal-content">
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان محصول را وارد نمائید ..."
              id="edit__product-title"
            />
            <p class="input__alerts hidden" id="title__alert">عنوان محصول را وارد کنید</p>
            <input
              type="number"
              class="modal-input"
              placeholder="قیمت محصول را وارد نمائید ..."
              id="edit__product-price"
            />
            <p class="input__alerts hidden" id="price__alert">قیمت محصول را وارد کنید</p>
            <input
              type="text"
              class="modal-input"
              placeholder="عنوان کوتاه محصول را وارد نمائید ..."
              id="edit__product-shortName"
            />
            <p class="input__alerts hidden" id="slug__alert">عنوان کوتاه محصول را وارد کنید</p>
      </main>
      <footer class="modal-footer">
            <button class="cancel" onclick="hideModal()">انصراف</button>
            <button class="submit">تائید</button>
      </footer>
  
  `
  editSubmitHandler(productId);
}

function editSubmitHandler(productId) {

  const titleAlert = document.querySelector('#title__alert');
  const priceAlert = document.querySelector('#price__alert');
  const slugAlert = document.querySelector('#slug__alert');


  const submitBtn = document.querySelector('.submit');
  submitBtn.addEventListener('click', submitHandler);
  const titleInput = document.querySelector('#edit__product-title')
  const priceInput = document.querySelector('#edit__product-price')
  const slueInput = document.querySelector('#edit__product-shortName')

  const itemIndex = data.products.findIndex(item => item.id === productId);

  const itemData = data.products[itemIndex]
  titleInput.value = itemData.title;
  priceInput.value = itemData.price;
  slueInput.value = itemData.slug;

  const title = titleInput.value.trim();
  const price = +priceInput.value.trim();
  const slug = slueInput.value.trim();


  function submitHandler() {

    let isValid = true;
    if (!title) {
      showAlert(titleAlert);
      isValid = false;
    } else {
      hideAlert(titleAlert)
    }

    if (!price) {
      showAlert(priceAlert);
      isValid = false;
    } else {
      hideAlert(priceAlert)
    }

    if (!slug) {
      showAlert(slugAlert);
      isValid = false;
    } else {
      hideAlert(slugAlert)
    }

    if (isValid) {
      itemData.title = titleInput.value.trim();
      itemData.price = +priceInput.value.trim();
      itemData.slug = slueInput.value.trim();
      console.log(data.products);
      saveDataInLocalStorage();
      createPerPageElements();
      hideModal();
      showToast('success', 'ویرایش   محصول با موفقیت انجام شد')

      // saveDataInLocalStorage()
    }
  }
}
//! price
function priceInputfunction(event) {
  console.log(event.target.value);

}
function priceInputHandler(elementId) {
  const input = document.querySelector(`#${elementId}`);
  input.addEventListener('input', priceInputfunction)
}


//! add delete edit products 
//* add new Product and validate inputs
function addNewProduct() {
  const titleElement = document.querySelector('#product-title');
  const titleAlert = document.querySelector('#title__alert');
  const priceElement = document.querySelector('#product-price');
  const priceAlert = document.querySelector('#price__alert');
  const slugElement = document.querySelector('#product-shortName');
  const slugAlert = document.querySelector('#slug__alert');

  const title = titleElement.value.trim();
  const price = +priceElement.value.trim();
  const slug = slugElement.value.trim();

  let isAllValid = true;

  if (!title) {
    showAlert(titleAlert);
    isAllValid = false;
  } else if (title) {
    hideAlert(titleAlert);
  }

  if (!price) {
    showAlert(priceAlert);
    isAllValid = false;
  } else if (price) {
    hideAlert(priceAlert);
  }

  if (!slug) {
    showAlert(slugAlert);
    isAllValid = false;
  } else if (slug) {
    hideAlert(slugAlert);
  }

  // if everything goes well
  if (isAllValid) {
    const randomNum = Math.floor(Math.random() * 100000);
    const newProduct = {
      id: randomNum,
      title: title,
      price: price,
      slug: slug,
    };
    data.products.push(newProduct);
    hideModal();
    createUsersElements()
    saveDataInLocalStorage();
    calculateAllProduc();
    showToast('success', 'افزدون محصول با موفقیت انجام شد')
  }
}
function deleteProduct() {
  data.products.splice(index, 1);
  createUsersElements();
  saveDataInLocalStorage();
  calculateAllProduc();
  hideModal();
  showToast('success', 'حذف محصول با موفقیت انجام شد');
  calculateTotalPages();
  createPaginationButtons();

  if (currentPage !== 1 && data.products.length === totalPages * indexPerPage) {
    currentPage--;
    createPerPageElements();
    const currentActivePage = document.querySelector(`[data-page="${currentPage}"]`);
    if (currentActivePage) {
      currentActivePage.classList.add('active')
    }
  }
}

//? helper functions 
function showModal() {
  modal.classList.remove('hidden')
}
function hideModal() {
  modal.classList.add('hidden')
}
function showAlert(element) {
  element.classList.remove('hidden')
}
function hideAlert(element) {
  element.classList.add('hidden')
}
function showToast(status, text) {
  toast.classList.remove('hidden');
  switch (status) {
    case 'failed': {
      toastContentHandler('مشکلی پیش آمده است', 'failed', 'failed')
      break;
    }
    case 'success': {
      toastContentHandler(text, 'success', 'success')
      break;
    }
  }
}
function toastContentHandler(text, classStatus, progressStatus) {
  toastContent.textContent = text
  toast.classList.add(classStatus);
  toastProgressBar(progressStatus);
}
function toastProgressBar(status) {
  let num = 0;
  switch (status) {
    case 'failed': {
      const progressWidth = setInterval(function () {
        num++;
        toastProgress.style.width = `${num}%`;
        if (num === 170) {
          toastProgress.style.width = `0%`;
          clearInterval(progressWidth);
          toast.classList.add('hidden')
        }
      }, 20)
      break;
    }
    case 'success': {
      const progressWidth = setInterval(function () {
        num++;
        toastProgress.style.width = `${num}%`;
        if (num === 170) {
          toastProgress.style.width = `0%`;
          clearInterval(progressWidth);
          toast.classList.add('hidden')
        }
      }, 20)
      break;
    }
  }
}
function calculateAllProduc() {
  productsNumber.textContent = data.products.length
}


//! save data in localStorage
function saveDataInLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data))
}

//* events
document.addEventListener('DOMContentLoaded', onPageLoad)
createProductBtn.addEventListener('click', openModalToAddNewProducts);
productsContainer.addEventListener('click', editOrDeleteProductHandler)
paginationContainer.addEventListener('click', switchPageHandler)
