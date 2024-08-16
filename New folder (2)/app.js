// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIq7YXYrKoPdRj8F24ZFTlExJuZWsOEng",
    authDomain: "module-653ac.firebaseapp.com",
    projectId: "module-653ac",
    storageBucket: "module-653ac.appspot.com",
    messagingSenderId: "480223277386",
    appId: "1:480223277386:web:ecf13ce543936959e851b3",
    measurementId: "G-R0E3MY8439"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');
    const signupFormContainer = document.querySelector('.form-container');
    const signinFormContainer = document.getElementById('signinFormContainer');
    const dashboard = document.getElementById('dashboard');
    const productForm = document.getElementById('productForm');
    const productCards = document.getElementById('productCards');
    const addProductBtn = document.getElementById('addProductBtn');
    const imagePreview = document.getElementById('imagePreview');

    const showDashboard = () => {
        signupFormContainer.style.display = 'none';
        signinFormContainer.style.display = 'none';
        dashboard.style.display = 'block';
    };

    // Handle Signup
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful',
                    text: `Welcome, ${username}! You have successfully signed up.`,
                }).then(() => {
                    signupForm.reset();
                    showDashboard();
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Error',
                    text: error.message,
                });
            });
    });

    // Handle Login
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back! You have successfully signed in.',
                }).then(() => {
                    signinForm.reset();
                    showDashboard();
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: error.message,
                });
            });
    });

    // Toggle between signup and login forms
    document.getElementById('showLogin').addEventListener('click', () => {
        signupFormContainer.style.display = 'none';
        signinFormContainer.style.display = 'block';
    });

    document.getElementById('showSignup').addEventListener('click', () => {
        signinFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
    });

    // Show product form when Add Product button is clicked
    addProductBtn.addEventListener('click', () => {
        productForm.style.display = 'block';
    });

    // Handle image preview on URL input change
    document.getElementById('productImage').addEventListener('input', (event) => {
        const imageUrl = event.target.value;
        if (imageUrl) {
            imagePreview.src = imageUrl;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Handle Product Addition
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').value;
        const productDescription = document.getElementById('productDescription').value;

        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4">
                <img src="${productImage}" class="card-img-top" alt="${productName}">
                <div class="card-body">
                    <h5 class="card-title">${productName}</h5>
                    <p class="card-text"><strong>Price:</strong> $${productPrice}</p>
                    <p class="card-text">${productDescription}</p>
                    <button class="btn btn-warning btn-sm editButton">Edit</button>
                    <button class="btn btn-danger btn-sm deleteButton">Delete</button>
                </div>
            </div>
        `;

        // Edit Button
        card.querySelector('.editButton').addEventListener('click', () => {
            const newProductName = prompt('Edit Product Name:', productName);
            const newProductPrice = prompt('Edit Product Price:', productPrice);
            const newProductImage = prompt('Edit Image URL:', productImage);
            const newProductDescription = prompt('Edit Product Description:', productDescription);

            if (newProductName && newProductPrice && newProductImage && newProductDescription) {
                card.querySelector('.card-title').textContent = newProductName;
                card.querySelector('.card-img-top').src = newProductImage;
                card.querySelector('.card-text').innerHTML = `<strong>Price:</strong> $${newProductPrice}<br>${newProductDescription}`;
            }
        });

        // Delete Button
        card.querySelector('.deleteButton').addEventListener('click', () => {
            card.remove();
        });

        productCards.appendChild(card);

        productForm.reset();
        imagePreview.style.display = 'none';
        productForm.style.display = 'none';
    });
});