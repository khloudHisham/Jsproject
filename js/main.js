//////////////////////////////////// slider ///////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const items = document.querySelectorAll('.slider-item');
    let currentIndex = 0;

    function showSlide(index) {
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(currentIndex);
    }

    showSlide(currentIndex);

    setInterval(nextSlide, 1500);
  });

 ///////////////////////// Categories section start ///////////////////////
//  
 document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    fetchProducts("all"); // Fetch all products when the page loads
  });

  function displayProducts(products) {
    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    if (products.length === 0) {
      const cartAmount = document.getElementById("cartAmount");
      cartAmount.textContent = "0"; // Reset cartAmount to 0 when there are no products
    } else {
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "pro";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" onclick="redirectToProductDetail('${product.id}')">
          <div class="des">
            <span>${product.category}</span>
            <h5>${product.title}</h5>
            <div class="star">
              <i class="fas fa-star" onclick="addToCart(event)"></i>
              <i class="fas fa-star half-star" onclick="addToCart(event)"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-stroke" onclick="addToCart(event)"></i>
            </div>
            <h4>${product.price} ${product.currency}</h4>
            <a href="#" onclick="addToCart(event); return false;"><i class="fa-solid fa-cart-shopping cart"></i></a>
          </div>
        `;
        productsContainer.appendChild(productCard);
      });
    }
  }

  function fetchProducts(category) {
    const cartAmount = document.getElementById("cartAmount");

    fetch("https://product-beta-six.vercel.app/products")

      .then((response) => response.json())
      .then((products) => {
        console.log("All Products:", products);
        const lowercasedCategory = category.toLowerCase();
        const filteredProducts =
          lowercasedCategory === "all"
            ? products
            : products.filter(
                (product) =>
                  product.category.toLowerCase() === lowercasedCategory
              );

        console.log("Filtered Products:", filteredProducts);

        if (filteredProducts.length === 0) {
          // Set cartAmount to 0 if there are no products
          cartAmount.textContent = "0";
          displayProducts([]);
        } else {
          displayProducts(filteredProducts);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  function filterProducts(category) {
    // Convert the category to lowercase to match the API convention
    const lowercaseCategory = category.toLowerCase();
    fetchProducts(lowercaseCategory);
  }

  function redirectToProductDetail(productId) {
    // Save the product ID in a cookie
    document.cookie = `selectedProductId=${productId}; path=/`;
    window.location.href = `detail.html`; // Redirect to the detail page
  }

  function addToCart(event) {
    event.preventDefault();
    const cartAmount = document.getElementById("cartAmount");
    const currentCount = parseInt(cartAmount.textContent, 10);
    const newCount = currentCount + 1;

    // Get the product details
    const productContainer = event.target.closest(".pro");
    const product = {
      image: productContainer.querySelector("img").src,
      title: productContainer.querySelector(".des h5").textContent,
      price: productContainer.querySelector(".des h4").textContent,
    };

    // Check if the price is a valid number, otherwise set it to a default value
    product.price = !isNaN(parseFloat(product.price))
      ? parseFloat(product.price)
      : 0.0;

    // Update the cartAmount and store it in localStorage
    cartAmount.textContent = newCount;
    localStorage.setItem("cartAmount", newCount.toString());

    // Retrieve existing cart products from the cookie or initialize an empty array
    const existingCartProducts =
      JSON.parse(getCookie("cartProducts")) || [];

    // Add the new product to the array
    existingCartProducts.push(product);

    // Store the updated cart products array in the cookie
    document.cookie = `cartProducts=${JSON.stringify(
      existingCartProducts
    )}; path=/`;

    
  }

  //*************************************** Update the cart counter on the navbar ********************/
  function updateCartCounter() {
    const cartAmount = document.getElementById("cartAmount");
    const cartProducts = JSON.parse(getCookie("cartProducts")) || [];

    // Update the cart counter based on the number of products in the cart
    cartAmount.textContent = cartProducts.length;
    localStorage.setItem("cartAmount", cartProducts.length.toString());
  }

  // Helper function to get a specific cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) =>
      cookie.trim().startsWith(`${name}=`)
    );
    return cookie ? cookie.split("=")[1] : null;
  }
  ///////////////////////// Categories section  ///////////////////////


        
        ////////////   Back to up button  start /////////////////////
   function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}
window.onscroll = function() {
    var btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {btn.style.display = "none";}
};
        ////////////   Back to up button  End /////////////////////
////////////////////form Contact Us/////////////////////////////
function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var message = document.getElementById("message").value;

    // Resetting previous error messages
    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";
    document.getElementById("messageError").innerHTML = "";

    var isValid = true;

    // Validate Name
    if (name.trim() === "") {
        document.getElementById("nameError").innerHTML = "Name is required";
        isValid = false;
    } else if (containsNumbers(name)) {
        document.getElementById("nameError").innerHTML = "Name shouldn't contain numbers";
        isValid = false;
    }

    // Validate Email
    if (email.trim() === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById("emailError").innerHTML = "Invalid email address";
        isValid = false;
    }

    // Validate Password
    if (password.trim() === "") {
        document.getElementById("passwordError").innerHTML = "Password is required";
        isValid = false;
    }

   
    // Validate Confirm Password
    if (confirmPassword.trim() === "" ){
        document.getElementById("confirmPasswordError").innerHTML = "confirm Passwords is required";
        isValid = false;}
if (confirmPassword !== password){

    document.getElementById("confirmPasswordError").innerHTML = "Passwords do not match";
    isValid = false;}
    
    // Validate Message
    if (message.trim() === "") {
        document.getElementById("messageError").innerHTML = "Message is required";
        isValid = false;
    }
    /**لوقالت مش عاوزة  الرساله تقبل رقم */
     //else if (containsNumbers(message)) {
    //     document.getElementById("messageError").innerHTML = "Message shouldn't be numbers";
    //     isValid = false;
    // }
    return isValid;
}

function isValidEmail(email) {
    // Regular expression for a valid email address
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function containsNumbers(input) {
    // Regular expression to check if input contains numbers
    var numberRegex = /\d/;
    return numberRegex.test(input);
}
//////////////////////// Card Page Starrt //////////////////////////



//////////////////////// Card Page End //////////////////////////


/**************Search Page  ***************/

// Fetch products from the API
fetch('api.json')
.then(response => response.json())
.then(products => {
    // Extract product names for suggestions
    var productNames = products.map(product => product.title);

    // Initialize Typeahead on the search input
    $('#searchInput').typeahead({
        source: productNames,
        autoSelect: true, // Autocomplete as you type
        items: 5, // Number of suggestions to show
        afterSelect: function(item) {
            // Add your custom logic here when a suggestion is selected
            console.log("Selected: " + item);
        }
    });
})
.catch(error => {
    console.error('Error fetching products:', error);
});