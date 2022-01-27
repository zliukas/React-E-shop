import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
   
  } from "react-router-dom";

import {  Navbar, Nav, Container } from 'react-bootstrap';

import Product from './Product';
import Cart from './Cart';
import ErrorPage from './ErrorPage';

const ProductsList = () => {

    // prekiu krepseliui
    const [product, setProduct] = useState([]);   

    const addToCart= (item) => {
        // susikuriu state esancio krepselio kopija
        const newCart = [...product];
        //tikrinu, ar jau yra preke tokiu pavadinimu
        let productInCart = newCart.find(
            (localVar) => item.id === localVar.id
        )  
            if(productInCart === undefined && item.countInStock > 0){
                productInCart = {
                    ...item,
                    quantity: 1,
                } 
                newCart.push(productInCart);
            } else if(productInCart && productInCart.quantity < item.countInStock){
                    productInCart.quantity++;
            } else{
                alert("Insufficient quantity in stock, we will contact you soon");
            }
        setProduct(newCart);        
    }

    // kiekio didinimas
    const increaseQuantity = (item) => {
        //console.log(item)
        const newCart = [...product];

        let productInCart = newCart.find(
            (localVar) => item.id === localVar.id
        ) 

        if(productInCart && productInCart.quantity < item.countInStock){
            productInCart.quantity++;
            productInCart.countInStock--;
    } else{
        alert("Insufficient quantity in stock, we will contact you soon");
    }
    setProduct(newCart);  

    }

    //kiekio mazinimas
    const decreaseQuantity = (item) =>{
       // console.log(item)
        const newCart = [...product];

        let productInCart = newCart.find(
            (localVar) => item.id === localVar.id
        ) 
        if(productInCart && productInCart.quantity > 1){
            productInCart.quantity --;   
            productInCart.countInStock++;        
           
        } else{
           newCart.splice(productInCart, 1);
        }
        setProduct(newCart);
    }
// konkrecios prekes pasalinimas
const deleteProduct = (item) =>{
   setProduct(product.filter((local) => local !== item))
    
}

    //krepselio valymas, reset
    const clearCart = () =>{
        setProduct([]);
    }
    
console.log(product);
    

  return (
   
            <Router>
                <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/" className='nav-link'>React Eshop</Link>
                    <Nav className="me-auto">
                    <Link to="/" className='nav-link'>Product List </Link>
                    <Link to="/cart" className='nav-link'> Cart </Link>         
                    </Nav>
                </Container>
                </Navbar>
            <Routes>
                <Route path="/" element={<Product addToCart={addToCart} />} />
                <Route path="/cart"  element={<Cart product={product} 
                                    clearCart={ clearCart} increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    deleteProduct={deleteProduct}/>} />    
                <Route path="*" element={<ErrorPage />} />      
            </Routes>
            </Router>   
    
  )
       
}

export default ProductsList;
