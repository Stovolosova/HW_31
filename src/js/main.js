const categoriesEl = document.querySelector('.categories');
const categoriesList = document.querySelector('.categories ul');
const productsList = document.querySelector('.products ul');
const productInfo = document.querySelector('#product-info');
const productNameSpan = document.querySelector('#product-name-span');
const buyButton = document.querySelector('.buy-button');

const orderForm = document.getElementById('order-form');
const nameInput = document.getElementById('name');
const cityInput = document.getElementById('city');
const warehouseInput = document.getElementById('warehouse');
const paymentInput = document.getElementById('payment');
const quantityInput = document.getElementById('quantity');
const commentInput = document.getElementById('comment');

const myOrdersButton = document.getElementById('my-orders-button');

function addToList (el, listEl,  dataAttr) {
    const li = document.createElement('li');
    li.innerText = el.name;
    li.setAttribute(`data-${dataAttr}`, el[dataAttr]);
    listEl.appendChild(li);
}

categories.forEach((el) => {
    console.log(el.name);
    addToList(el, categoriesList, 'id');
});

categoriesList.addEventListener('click', (e) => {
    const catID = e.target.dataset.id;
    console.log(catID);
    const filteredCat = categories.filter((obj) => {
        return obj.id === catID;
    });

    console.log(filteredCat);

    productsList.innerHTML = '';

    filteredCat[0].products.forEach((product) => {
        const li = document.createElement('li');
        li.innerText = product.name;
        li.setAttribute('data-name', product.name);
        productsList.appendChild(li);
    });
 });

 productsList.addEventListener('click', (e) => {
    const productName = e.target.dataset.name;

    console.log(productsList);
   
    const filteredProduct = categories.flatMap((cat) => 
    cat.products).filter((prod) => 
    prod.name === productName);
    productNameSpan.innerText = filteredProduct[0].description;

    productInfo.style.display = 'block';
    buyButton.style.display = 'block';

    console.log(filteredProduct[0].name);

    buyButton.addEventListener('click', () => {
        myOrdersButton.style.display = 'none';
        orderForm.style.display = 'block';
    
        const productName = productNameSpan.innerText;
    
        if (productName) {
            alert(`The product ${filteredProduct[0].name} has been purchased`);
    
            productNameSpan.innerText = '';
            productInfo.innerText = '';
            buyButton.style.display = 'none';
            productInfo.style.display = 'none';
            categoriesEl.style.display = 'none';
            productsList.style.display = 'none';
        } else {
            alert(`there are no products available to purchase`);
        }
           }); 

           function buyProduct () {
            const name = nameInput.value;
            const city = cityInput.value;
            const warehouse = warehouseInput.value;
            const payment = paymentInput.value;
            const quantity = quantityInput.value;
            const comment = commentInput.value;
        
          if (!name || !city || !warehouse || !payment || !quantity || !comment){
              alert('Please, fill in all fields');
              return;
          } else {
              const orderInfo = `product: ${filteredProduct[0].name}<br> name: ${name}<br> city: ${city}<br> warehouse: ${warehouse}<br> quantity:${quantity}<br> comment: ${comment}<br>`;
              const orderInfoDiv = document.createElement('div');
              orderInfoDiv.innerHTML = orderInfo;

              const orders = JSON.parse(localStorage.getItem('orders')) || [];
              orders.push(orderInfo);
              localStorage.setItem('orders', JSON.stringify(orders));
        
              document.body.appendChild(orderInfoDiv);
        
              orderForm.style.display = 'none';
              productInfo.style.display = 'none';
              buyButton.style.display = 'none';
          }
         };
         orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            buyProduct();
        
            categoriesEl.style.display = 'none';
            productsList.style.display = 'none';
            myOrdersButton.style.display = 'block';
        });
});

function showOrders () {
    categoriesEl.style.display = 'none';
    productsList.style.display = 'none';
    const orders = JSON.parse(localStorage.getItem('orders'));

    if (orders && orders.length > 0) {
        const ordersList = document.createElement('ul');
        orders.forEach ((order, index) => {
            const orderItem = document.createElement('li');
            orderItem.innerText = `Order №${index + 1}`;
            orderItem.addEventListener ('click', () => {
                const orderDetails = document.createElement('p');
                orderDetails.innerHTML = order;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete order';
    
    deleteButton.addEventListener ('click', (event) => {
        event.preventDefault();
        const orders = JSON.parse(localStorage.getItem('orders'));
        const updateOrders = orders.filter((index) => index !== index);
        localStorage.setItem('orders', JSON.stringify(updateOrders));
        orderItem.remove();
    });
    orderItem.appendChild(deleteButton);
    orderItem.appendChild(orderDetails);
            });
            ordersList.appendChild(orderItem);
        });
        document.body.appendChild(ordersList);
    } else {
        alert ('There is no order list');
    }
}
myOrdersButton.addEventListener('click', showOrders);