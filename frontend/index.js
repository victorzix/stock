const productsList = document.querySelector('#table_body');
const registerForm = document.getElementById('product_register');

const url = 'http://localhost:3000/products';

async function getResponse() {
  const res = await fetch(url);
	const response = await res.json();
  
  productsList.innerHTML = ''
  
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

document.getElementById('addProd').addEventListener('click', () => {
  registerForm.style.display = 'block';
});

async function postData(data) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return res.json();
}

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
	const name = document.querySelector('[name="name"]').value;
	const quantity = document.querySelector('[name="quantity"]').value;
	const price = document.querySelector('[name="price"]').value;
	const sector = document.querySelector('[name="sector"]').value;
  
  const data = {
    name,
    quantity,
    price,
    sector
  }
  await postData(data);
  getResponse()
});

async function deleteProduct(e){
  const id = e.getAttribute('data-id');
  const res = await 
}

window.addEventListener('load', getResponse());
