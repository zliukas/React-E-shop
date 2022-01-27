import React from 'react';
import { Card, Button } from 'react-bootstrap';
import data from '../data/Data';


const Product = ({addToCart}) => {
    //console.log(data);
  return(
    <div  className='d-flex flex-wrap justify-content-center'>
        {
            data.map((item, index) => (

                <Card style={{ width: '18rem', margin: "1rem" }} key={index}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <Card.Text>$ {item.price}</Card.Text>
                        <Button variant="primary" onClick={()=>addToCart(item)}>Buy</Button>
                    </Card.Body>
                </Card>
            ))
        }
        
    </div>
  ) 
};

export default Product;
