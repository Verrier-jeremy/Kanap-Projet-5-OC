let allCart = JSON.parse(localStorage.getItem("elementsCart"));

if (allCart.length < 1) {
    let emptyCart = document.querySelector('h1');
    emptyCart.innerText = 'Votre Panier est vide !';
}
else {
    console.log(allCart.length);
    let allCartWithInfo = [];

    async function fetchProductInCart() {
        let promiseArray = [];
        for (let i = 0; i < allCart.length; i++) {
            promiseArray.push(new Promise((resolve) => {
                fetch("http://localhost:3000/api/products/" + allCart[i].id)
                    .then(function (respons) {
                        return respons.json();
                    })
                    .then(function (cartResult) {
                        const dataCart = { ...cartResult, ...allCart[i] };
                        /*const dataCart =[
                            id:allCart[i].id,
                            color: allCart[i].color,
                            quantity: allCart[i].quantity,
                            imageUrl
                        ]*/
                        resolve(dataCart);
                    })
            }))
        }

        const results = await Promise.all(promiseArray);
        return results;

    }

    async function displayCart() {
        const results = await fetchProductInCart();
        allCartWithInfo = results;
        let quantity = 0;
        let price = 0;
        let totalQuantity = document.querySelector("#totalQuantity");
        let totalPrice = document.querySelector("#totalPrice");
        const elementCart = document.querySelector("#cart__items");


        for (let i = 0; i < allCartWithInfo.length; i++) {

            quantity += allCartWithInfo[i].quantity;
            price += allCartWithInfo[i].quantity * allCartWithInfo[i].price;
            totalQuantity.innerText = `${quantity}`;
            totalPrice.innerText = `${price}`;


            // Déclaration de la variable articleCart en créant un article avec le parent elementCart
            let articleCart = document.createElement('article');
            articleCart.classList.add('cart__item');
            articleCart.setAttribute("data-id", `${allCartWithInfo[i].id}`);
            articleCart.setAttribute("data-color", `${allCartWithInfo[i].color}`);
            elementCart.appendChild(articleCart);

            // Déclaration de la variable imageDiv en créant une div avec le parent articleCart
            let imageDiv = document.createElement('div');
            imageDiv.classList.add('cart__item__img');
            articleCart.appendChild(imageDiv);

            // Déclaration de la variable imageProduct en créant une image avec le parent imageDiv
            let imageProduct = document.createElement('img');
            imageProduct.src += `${allCartWithInfo[i].imageUrl} `;
            imageProduct.alt += `alt=${allCartWithInfo[i].altTxt}`;
            imageDiv.appendChild(imageProduct);

            // Déclaration de la variable globalDescriptionProduct en créant une div avec le parent articleCart
            let globalDescriptionProduct = document.createElement('div');
            globalDescriptionProduct.classList.add('cart__item__content');
            articleCart.appendChild(globalDescriptionProduct);

            // Déclaration de la variable descriptionProduct en créant une div avec le parent globalDescriptionProduct
            let descriptionProduct = document.createElement('div');
            descriptionProduct.classList.add('cart__item__content__description');
            descriptionProduct.innerHTML += `<h2>${allCartWithInfo[i].name}</h2><p>${allCartWithInfo[i].color}</p><p>${allCartWithInfo[i].price} €</p>`;
            globalDescriptionProduct.appendChild(descriptionProduct);

            // Déclaration de la variable cartSetting en créant une div avec le parent globalDescriptionProduct
            let cartSetting = document.createElement('div');
            cartSetting.classList.add('cart__item__content__settings');
            globalDescriptionProduct.appendChild(cartSetting);

            // Déclaration de la variable inputQuantity en créant une input avec le parent cartSetting
            let inputQuantity = document.createElement('div');
            inputQuantity.classList.add('cart__item__content__settings__quantity');
            inputQuantity.innerHTML += `<p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${allCartWithInfo[i].quantity}">`;
            cartSetting.appendChild(inputQuantity);

            // Déclaration de la variable inputQuantity en créant une input avec le parent cartSetting
            let deleteCartProduct = document.createElement('div');
            deleteCartProduct.classList.add('cart__item__content__settings__delete');
            cartSetting.appendChild(deleteCartProduct);

            // Déclaration de la variable inputQuantity en créant une input avec le parent cartSetting
            let deleteProduct = document.createElement('p');
            deleteProduct.classList.add('deleteItem');
            deleteProduct.innerText = 'supprimer';
            deleteCartProduct.appendChild(deleteProduct);
            deleteProduct.addEventListener('click', (deleteProductToCart) => {

                deleteProductToCart.preventDefault;
                let deleteId = allCart[i].id;
                let deleteColor = allCart[i].color;
                allCart = allCart.filter(element => element.id != deleteId || element.color != deleteColor);
                localStorage.setItem('elementsCart', JSON.stringify(allCart));
                alert('Votre article a bien été supprimé.');
                location.reload();
            })

        }
    }
    displayCart();
}




















