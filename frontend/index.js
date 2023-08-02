const productsList = document.querySelector("#table_body");
const registerForm = document.getElementById("product_register");
const message = document.getElementById("messages");
const inputs = document.querySelectorAll("#inputs");

const url = "http://localhost:3000/products";

async function getResponse() {
  const res = await fetch(url);
  const response = await res.json();
  setInterval(() => {
    message.textContent = "";
    message.classList.remove(...message.classList);
  }, 6000);
  productsList.innerHTML = "";

  response.map((product) => {
    productsList.innerHTML += `
    <th scope="row" class="p-3" >${product.id}</th>
    <td class="p-3">${product.sector}</td>
    <td class="p-3">${product.name}</td>
    <td class="p-3">${product.quantity}</td>
    <td class="p-3">${product.price}</td>
    <td class="p-3">${product.total_income}</td>
    <td><button class="btn btn-dark btn-sm m-1" id="removeBtn" onclick="deleteProduct(this)" data-id="${product.id}">Remover</button></td>
    `;
  });
}
document.getElementById("addProd").addEventListener("click", () => {
  registerForm.style.display = "block";
});

async function postData(data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();
  
  inputs.forEach((element) => {
    if (element.value.length < 1) {
      return (
        (message.textContent = response.msg),
        message.classList.add("text-danger")
      );
    } else if (res.status != 201)
      return (
        (message.textContent = response.msg),
        message.classList.add("text-danger")
      );
    else {
      return (
        (message.textContent = response.msg),
        message.classList.add("text-success")
      );
    }
  });
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.querySelector('[name="name"]').value;
  const quantity = document.querySelector('[name="quantity"]').value;
  const price = document.querySelector('[name="price"]').value;
  const sector = document.querySelector('[name="sector"]').value;

  const data = {
    name,
    quantity,
    price,
    sector,
  };

  await postData(data);
  inputs.forEach((element) => {
    element.value = "";
  });
  getResponse();
});

async function deleteProduct(e) {
  const id = e.getAttribute("data-id");
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  getResponse();
}

window.addEventListener("load", getResponse());
