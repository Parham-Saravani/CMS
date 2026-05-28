# CMS Dashboard

A lightweight and responsive CMS dashboard built with vanilla JavaScript for managing users and products.  
The project includes full CRUD functionality, toast notifications, localStorage persistence, dark/light theme switching, dynamic pagination, and Persian language support.

---

## Overview

This project is a front-end CMS dashboard developed as a portfolio project to demonstrate practical JavaScript skills, state management, and interactive UI behavior.  
It is designed with a Persian interface and supports RTL-friendly layouts for a better localized user experience.

![App Screenshot](Images/homePage.png)

---

## Features

- **User Management**  
  Add, edit, and delete users with an intuitive and responsive interface.
  ![UserPage Screenshot](Images/users.png)

- **Product Management**  
  Add, edit, and delete products with persistent storage using `localStorage`.
  
  ![UserPage Screenshot](Images/products.png)

- **Toast Notifications**  
  Visual feedback is provided for all actions, including success messages, validation errors, and delete confirmations.

- **Dark / Light Theme**  
  Users can switch between dark and light modes, with the selected theme saved in `localStorage`.
  
![LightTheme Screenshot](Images/lightTheme.png)

![DarkTheme Screenshot](Images/darkTheme.png)

- **Dynamic Pagination**  
  Content is displayed through live pagination for better usability and cleaner navigation.
  
- **Persian Language Support**  
  The interface is fully available in Persian and optimized for RTL layouts.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- localStorage

---

## How It Works

- Users and products can be created, updated, and removed directly from the dashboard.
- All data is stored locally in the browser using `localStorage`.
- Theme preferences are preserved across sessions.
- Pagination is updated dynamically based on the available data.
- Toast notifications provide immediate feedback for user actions.

---

## Project Structure
```bash
project-root/
├── index.html
├── style.css
├── script.js
└── assets/
