# CMS Dashboard

A lightweight and responsive CMS dashboard built with vanilla JavaScript for managing users and products.  
The project includes full CRUD functionality, toast notifications, localStorage persistence, dark/light theme switching, dynamic pagination, and Persian language support.

---

## 🛠 Tech Stack

<p align="left">
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/sabzlearn-ir/sabzlearn-ir/4d2a781931f79c747a132c28eae4ebfbb8eaa7d7/javascript-colored.svg" width="40" height="40" alt="Javascript" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/sabzlearn-ir/sabzlearn-ir/4d2a781931f79c747a132c28eae4ebfbb8eaa7d7/html5-colored.svg" width="40" height="40" alt="HTML5" /></a>
    <a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/sabzlearn-ir/sabzlearn-ir/4d2a781931f79c747a132c28eae4ebfbb8eaa7d7/css3-colored.svg" width="40" height="40" alt="CSS3" /></a>
       <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/Parham-Saravani/Parham-Saravani/117c3e04fa5a212738f84c5085a21f725ac7ed0d/Icons/Tailwind.svg" width="40" height="40" alt="Tailwind Css" /></a>
</p>

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
