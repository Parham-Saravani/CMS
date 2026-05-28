const modalOpener = document.querySelector('#create-user')
const modal = document.querySelector('.modal-screen');
const modalContent = document.querySelector('.modal');
const totalUsersCount = document.querySelector('.users-data')
const usersContainer = document.querySelector('.table-body')
const paginationContainer = document.querySelector('.pagination')

const toast = document.querySelector('.toast')
const toastProgress = document.querySelector('.process')
const toastContent = document.querySelector('.toast-content')



let data = {
    products: [],
    users: []
};


let currentPage = 1;
let totalPages = 0;
let indexPerPage = 7;


//! on Dom load
function onPageLoad() {
    const isDataAvailable = JSON.parse(localStorage.getItem('data'));
    if (isDataAvailable) {
        data = isDataAvailable;
    }
    calculateTotalUsersNumber();
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
    totalPages = Math.floor(data.users.length / 7);

    if (data.users.length > totalPages * indexPerPage) {
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
    usersContainer.innerHTML = '';
    const firstIndex = (currentPage - 1) * indexPerPage;
    const secondIndex = firstIndex + indexPerPage;
    data.users.slice(firstIndex, secondIndex).forEach(function (item) {
        usersContainer.insertAdjacentHTML('beforeend',
            `
          <div class="tableRow">
                <p class="user-fullName">${item.fullName}</p>
                <p class="user-username">${item.userName}}</p>
                <p class="user-email">${item.email}</p>
                <p class="user-password">${item.password}</p>
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

//! create product elements
function createUsersElements() {

    if (!data.users.length) {
        usersContainer.innerHTML = `<p class="products-empty">محصولی یافت نشد :)</p>`
        return;
    }

    if (data.users.length > currentPage * indexPerPage) {
        calculateTotalPages();
        createPaginationButtons();
    } else if (currentPage === totalPages) {
        createPerPageElements();
    }
    else {
        usersContainer.innerHTML = '';
        data.users.forEach(function (item) {
            usersContainer.insertAdjacentHTML('beforeend',
                `
            <div class="tableRow">
                <p class="user-fullName">${item.fullName}</p>
                <p class="user-username">${item.userName}}</p>
                <p class="user-email">${item.email}</p>
                <p class="user-password">${item.password}</p>
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

















//! change modal content by click status
function createUserModal() {
    showModal();
    addModalHandler();
}

// ? modal handlers
function addModalHandler() {
    showModal();
    modalContent.innerHTML = `
     <header class="modal-header">
        <h3>ایجاد کاربر جدید</h3>
        <button class="close-modal" onclick="hideModal()">
            <i class="fas fa-times"></i>
        </button>
    </header>
    <main class="modal-content">
        <input
            type="text"
            class="modal-input"
            placeholder="نام و نام خانوادگی را وارد نمائید ..."
            id="user-fullName"
          />
            <p class="input__alerts hidden" id="name__alert">نام و نام خانوادگی را وارد کنید</p>
        <input
            type="text"
            class="modal-input"
            id="user-username"
            placeholder="نام کاربری را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="username__alert">نام کاربری را وارد کنید</p>
        <input
            type="email"
            class="modal-input"
            id="user-email"
            placeholder="ایمیل را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="email__alert">ایمیل رو وارد کنید</p>
        <input
            type="password"
            class="modal-input"
            id="user-password"
            placeholder="رمز عبور را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="password__alert">رمز عبور را وارد کنید</p>
    </main>
    <footer class="modal-footer">
          <button class="cancel" onclick="hideModal()">انصراف</button>
          <button class="submit" onclick="createUserFormValidator()">تائید</button>
    </footer>
    `;
}
function deleteModalHandler() {
    showModal()
    modalContent.innerHTML = `
          <i class="ui-border top red"></i>
          <i class="ui-border bottom red"></i>
          <header class="modal-header">
              <h3>حذف محصول</h3>
              <button class="close-modal" onclick="hideModal()">
                  <i class="fas fa-times"></i>
              </button>
          </header>
          <main class="modal-content">
              <p class="remove-text">آیا از حذف این محصول اطمینان دارید؟</p>
          </main>
          <footer class="modal-footer">
              <button class="cancel" onclick="hideModal()">انصراف</button>
              <button class="submit" onclick="deleteUserHandler()">تائید</button>
          </footer>
  `;
}
function editModalHandler(productId) {
    showModal();
    modalContent.innerHTML = `
  <header class="modal-header">
        <h3>ایجاد کاربر جدید</h3>
        <button class="close-modal" onclick="hideModal()">
            <i class="fas fa-times"></i>
        </button>
    </header>
    <main class="modal-content">
        <input
            type="text"
            class="modal-input"
            placeholder="نام و نام خانوادگی را وارد نمائید ..."
            id="edit__user-fullName"
          />
            <p class="input__alerts hidden" id="edit__name__alert">نام و نام خانوادگی را وارد کنید</p>
        <input
            type="text"
            class="modal-input"
            id="edit__user-username"
            placeholder="نام کاربری را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="edit__username__alert">نام کاربری را وارد کنید</p>
        <input
            type="email"
            class="modal-input"
            id="edit__user-email"
            placeholder="ایمیل را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="edit__email__alert">ایمیل رو وارد کنید</p>
        <input
            type="password"
            class="modal-input"
            id="edit__user-password"
            placeholder="رمز عبور را وارد نمائید ..."
        />
        <p class="input__alerts hidden" id="edit__password__alert">رمز عبور را وارد کنید</p>
    </main>
    <footer class="modal-footer">
          <button class="cancel" onclick="hideModal()">انصراف</button>
          <button class="submit submit__edit">تائید</button>
    </footer>
  
  `
    editSubmitHandler(productId);
}




//! create user
function createUserFormValidator() {
    const name = document.querySelector('#user-fullName').value.trim();
    const nameAlert = document.querySelector('#name__alert');
    const userName = document.querySelector('#user-username').value.trim();
    const userNameAlert = document.querySelector('#username__alert');
    const email = document.querySelector('#user-email').value.trim();
    const emailAlert = document.querySelector('#email__alert');
    const password = document.querySelector('#user-password').value.trim();
    const passwordAlert = document.querySelector('#password__alert');

    let isValid = true;
    if (!name) {
        showAlert(nameAlert);
        isValid = false;
    } else if (name) {
        hideAlert(nameAlert)
    }

    if (!userName) {
        showAlert(userNameAlert);
        isValid = false;

    } else if (userName) {
        hideAlert(userNameAlert)
    }

    if (!email) {
        showAlert(emailAlert);
        emailAlert.textContent = 'ایمیل را وارد کنید';
        isValid = false;

    }
    else if (email) {
        hideAlert(emailAlert)
    }
    if (email && !email.includes('@gmail.com')) {
        emailAlert.textContent = 'ایمیل وارد شده معتبر نمیباشد!';
        showAlert(emailAlert);
        isValid = false;
    }
    if (!password) {
        showAlert(passwordAlert);
        isValid = false;
    } else if (password) {
        hideAlert(passwordAlert)
    }
    if (password.length < 8) {
        isValid = false;
        showAlert(passwordAlert);
        passwordAlert.textContent = 'پسوورد باید حداقل ۸ کارکتر باشد';
    } else if(password.length >= 8){
        isValid = true;
    }

    if (isValid) {
        addNewUser(name, userName, email, password);
        createUsersElements();
        hideModal()
    }
}

//! add new User
function addNewUser(fullName, userName, email, password) {
    const number = Math.floor(Math.random() * 100000)
    const newUser = {
        id: number,
        fullName: fullName,
        userName: userName,
        email: email,
        password: password
    }
    data.users.push(newUser);
    saveDataInLocalStorage();
    calculateTotalUsersNumber();
    showToast('success', 'افزودن کاربر با موفقیت انجام شد');

}

//! delete user
function deleteUserHandler(index) {
    data.users.splice(index, 1);
    createUsersElements();
    calculateTotalPages();
    createPaginationButtons();
    saveDataInLocalStorage();
    hideModal();
    calculateTotalUsersNumber();
    showToast('success', 'حذف کاربر با موفقیت انجام شد');

    if (currentPage !== 1 && data.users.length === totalPages * indexPerPage) {
        currentPage--;
        createPerPageElements();
        const currentActivePage = document.querySelector(`[data-page="${currentPage}"]`);
        if (currentActivePage) {
            currentActivePage.classList.add('active')
        }
    }
}


//! delete and edit user 
function deleteOrEditUsersHandler(event) {
    const deleteBtn = event.target.closest('.remove-btn')
    const editBtn = event.target.closest('.edit-btn')

    if (deleteBtn) {
        const id = +deleteBtn.dataset.id;
        const userIndex = data.users.findIndex(item => item.id === id);
        showModal()
        deleteModalHandler(userIndex)

    }
    if (editBtn) {
        const id = +editBtn.dataset.id;
        editModalHandler(id)
    }
}

//! edit user
function editSubmitHandler(productId) {

    const fullNameAlert = document.querySelector('#edit__name__alert');
    const userNameAlert = document.querySelector('#edit__username__alert');
    const emailAlert = document.querySelector('#edit__email__alert');
    const passwordAlert = document.querySelector('#edit__password__alert');

    const submitBtn = document.querySelector('.submit__edit');
    submitBtn.addEventListener('click', submitHandler);

    const fullNameInput = document.querySelector('#edit__user-fullName')
    const userNmaeInput = document.querySelector('#edit__user-username')
    const emailInput = document.querySelector('#edit__user-email')
    const passwordInput = document.querySelector('#edit__user-password')

    const itemIndex = data.users.findIndex(item => item.id === productId);

    const itemData = data.users[itemIndex]

    fullNameInput.value = itemData.fullName;
    userNmaeInput.value = itemData.userName;
    emailInput.value = itemData.email;
    passwordInput.value = itemData.password;

    const fullName = fullNameInput.value.trim();
    const userNmae = userNmaeInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();


    function submitHandler() {

        let isValid = true;
        if (!fullName) {
            showAlert(fullNameAlert);
            isValid = false;
        } else {
            hideAlert(fullNameAlert)
        }

        if (!userNmae) {
            showAlert(userNameAlert);
            isValid = false;
        } else {
            hideAlert(userNameAlert)
        }

        if (!email) {
            showAlert(emailAlert);
            isValid = false;
        } else {
            hideAlert(emailAlert)
        }
        if (!password) {
            showAlert(passwordAlert);
            isValid = false;
        } else {
            hideAlert(passwordAlert)
        }
        if (password.length < 8) {
            isValid = false;
            showAlert(passwordAlert);
            passwordAlert.textContent = 'پسوورد باید حداقل ۸ کارکتر باشد';
            return;
        } 
        if (!email.includes('@gmail.com')) {
            showAlert(emailAlert);
            emailAlert.textContent = 'ایمیل وارد شده صحیح نمیباشد';
            isValid = false;
        }

        if (isValid) {
            itemData.fullName = fullNameInput.value.trim();
            itemData.userName = userNmaeInput.value.trim();
            itemData.email = emailInput.value.trim();
            itemData.password = passwordInput.value.trim();
            saveDataInLocalStorage();
            createUsersElements();
            hideModal();
            showToast('success', 'ویرایش کاربر با موفقیت انجام شد');
        }
    }
}



//? helper functions

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
function calculateTotalUsersNumber() {
    totalUsersCount.textContent = data.users.length
}


//! save data in localstorage
function saveDataInLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data))
}


//* events
document.addEventListener('DOMContentLoaded', onPageLoad)
modalOpener.addEventListener('click', createUserModal)
usersContainer.addEventListener('click', deleteOrEditUsersHandler)
paginationContainer.addEventListener('click', switchPageHandler)
