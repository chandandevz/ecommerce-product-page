const productCardContainer = document.querySelector(".product-card-container");
const searchField = document.querySelector("#search-field");

async function fetchProducts() {
  let url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

const productsData = fetchProducts();

function displayData(products) {
  products.then((data) => {
    data.forEach((product) => {
      // console.log(product()

      const { image, title, description, price } = product;
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
                <div class="product-img">
                    <img src=${image} alt="">
                </div>
                <div class="product-details">
                    <p id="product-title">${title}</p>
                    <p id="product-description">${description}</p>
                    <span id="price">${price} $</span>
                </div>`;

      productCardContainer.appendChild(productCard);
    });
  });
}

function searchData() {
  productCardContainer.innerHTML = null;
  const filteredData = productsData.then((data) => {
    return data.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchField.value.toLowerCase()) ||
        product.price.toString().includes(searchField.value) ||
        product.description.toString().includes(searchField.value)
      );
    });
  });

  // console.log(filteredData)
  displayData(filteredData)

}

searchField.addEventListener("input", searchData);

displayData(productsData);
