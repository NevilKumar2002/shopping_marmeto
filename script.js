const leftContainer = document.getElementById("left-container");
let selectedSize1=null;
let selectedColor1=null;
const CardMessage= document.getElementById("cartMessage");

async function getDetails() {
    const result = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448');
    const response = await result.json();
    console.log(response);
    const productPrice = response.product.price; 
    const comparedAtPrice =response.product.compare_at_price; 
    console.log(typeof productPrice);
    const price1 = extractNumericValue(productPrice);
    const price2 = extractNumericValue(comparedAtPrice);
  
  // Calculate the discount percentage
  if (!isNaN(price1) && !isNaN(price2) && price2 > 0) {
    const discountPercentage = ((price2 - price1) / price2) * 100;
    document.getElementById('percentageOff').textContent =`${Math.floor(discountPercentage)}% Off`;
  }
    else {
    console.error('Invalid or missing price data. Cannot calculate discount percentage.');
  }
// Calculate the discount percentage
const discountPercentage = ((comparedAtPrice - productPrice) / comparedAtPrice) * 100;
console.log(discountPercentage)
    document.getElementById('productVendor').textContent = `${response.product.vendor}`;
    document.getElementById('productTitle').textContent = ` ${response.product.title}`;
    document.getElementById('productPrice').textContent = `${productPrice}`;
    document.getElementById('compareAtPrice').textContent = `${comparedAtPrice}`;
  
    const colorSelector = document.getElementById('colorSelector');
    console.log(response.product.options[0].values[0]);
    displayColorOptions(response.product.options[0].values);
    displaySizeOptions(response.product.options);
//product Description
const productdesc= document.getElementById('product-description');
const div= document.createElement('p');
div.innerHTML=`
${response.product.description}`;
productdesc.append(div);


}
function displayColorOptions(colors) {
    const colorContainer = document.getElementById("colorSelector");
    colors.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = Object.values(color)[0];

        const tickMark = document.createElement("div");
        tickMark.className = "tick-mark";

        colorBox.appendChild(tickMark);

        colorBox.addEventListener("click", () => handleColorClick(colorBox, tickMark,color));
        colorContainer.appendChild(colorBox);
        
    });
}
const sizeSelectorContainer = document.getElementById("sizeSelector");

function handleColorClick(colorBox, tickMark,color) {
   
    colorBox.classList.toggle("selected");
    alert("Selected Color: " + Object.keys(color)[0]);
    selectedColor1 = Object.keys(color)[0];
    console.log("Selected Color: " + selectedColor1);
    // selectedColor1=Object.keys(color)[0];
    


}
function displaySizeOptions(sizeOptions) {
    const sizeSelectorContainer = document.getElementById("sizeSelector");
  
    // Function to handle size selection
    const handleSizeSelection = (event) => {
      const selectedSize = event.target.value;
      console.log("Selected Size:", selectedSize);
      selectedSize1=selectedSize;
  
      // You can perform additional actions with the selected size if needed
    };
  
    // Clear existing content in the container
    sizeSelectorContainer.innerHTML = "";
  
    // Create and add size radio buttons to the container
    sizeOptions.forEach(option => {
      if (option.name === "Size") {
        option.values.forEach(sizeValue => {
          const radioInput = document.createElement("input");
     
          radioInput.type = "radio";
          radioInput.name = "size";
          radioInput.value = sizeValue;
          radioInput.addEventListener("change", handleSizeSelection); // Add event listener
  
          const label = document.createElement("label");
          label.textContent = sizeValue;
          // label.className="radio-input"
  
          sizeSelectorContainer.appendChild(radioInput);
          sizeSelectorContainer.appendChild(label);
        });
      }
    });
  }
  
  
let currentQuantity = 1; // Initial quantity

function increaseQuantity() {
  currentQuantity++;
  updateQuantityInput();
}

function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    updateQuantityInput();
  }
}

function updateQuantityInput() {
  const quantityInput = document.getElementById('quantity');
  quantityInput.value = currentQuantity;
}

function addToCart() {
  // Get selected variant details
  const selectedColor = document.getElementById('colorSelector').value;
  const selectedSize = document.getElementById('sizeSelector').value;
  const selectedQuantity = currentQuantity;

  // Perform any additional logic if needed

  // Display cart message
  const cartMessage = document.getElementById('cartMessage');
cartMessage.style.display='block';
  cartMessage.innerHTML = `Embrace Sideboard with Color ${selectedColor1}  and Size ${selectedSize1} and Quantity  ${selectedQuantity}  added to cart `;
  cartMessage.style.display = 'block';
  // Embrace Sideboard with Color Yellow and Size Small added to cart

  console.log(selectedColor1, selectedSize1);
}





document.addEventListener('DOMContentLoaded', function () {
    getDetails();
});


function extractNumericValue(priceString) {
    return parseFloat(priceString.replace(/[^\d.]/g, ''));
  }
  
  
  