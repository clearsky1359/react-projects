import { Card, Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/formatCurrency"
type StoreItemProps={
    id:number,
    name:string,
    price:number,
    imgUrl:string
}


export function StoreItem({id, name, price, imgUrl }:StoreItemProps){
    const{getItemQuantity, increaseCartQuantity,decreaseCartQuantity, removeFromCart, cartItems}=useShoppingCart()
    const quantity=getItemQuantity(id);

    return<Card className='h-100'>
            <Card.Img variant='top' src={imgUrl} height='200px' style={{objectFit:'cover'}}></Card.Img>
            <Card.Body className=" d-flex flex-column  ">
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto text-center">
                    {quantity===0 ? (<Button className="w-100" onClick={()=>increaseCartQuantity(id)}>+ ADD to Cart</Button>) : <div className='d-flex flex-column align-items-center' style={{gap:'0.5rem'}}>
                        <div className="d-flex align-items-center justify-content-center" style={{gap:'0.5rem'}}>
                            <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span> in Cart
                            </div>
                            <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
                            </div>
                        </div>}
                        <Button variant='danger' size='sm'onClick={()=>removeFromCart(id)}>Remove</Button>
                </div>   
            </Card.Body>
        </Card>
}