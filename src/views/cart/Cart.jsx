import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import './CartDetail.css';

export default function Cart(){
    const {request, token, setToken} = useContext(AppContext);

    const [cart, setCart] = useState({cartDetails: []});

    useEffect(() => {
        if(token){
            request("/api/cart").then(setCart).catch(console.error)
        }
    }, [token])
    return <>
        <h1>Мій кошик</h1>
        {!token && <h2>Авторизуйтесь для перегляду кошику</h2>}
        {!!token && <div>
            <h2 className="cart-header">Товари у кошику:</h2>
            <div className="cart-items-container">
                {cart.cartDetails.map(cd => <CartDetail key={cd.id} cartItem={cd}/>)}
            </div>
            <div className="row summary-price">
                <div className="offset-8 col-lg-3 col-md-4 col-sm-5">
                    Загальна вартість замовлення, ₴:
                </div>
                <div className="col-1">
                    <b>{cart.price}</b>
                </div>
            </div>
            <div className="row buy-cancel-btns">
                <div className="offset-9 col-lg-3 col-md-4 col-sm-5 text-end">
                    {cart.momentCancel != null || cart.momentBuy != null && <button className="btn btn-success" data-cart-repeat="@Model.ActiveCart.Id">Повторити</button>}
                    {cart.momentCancel == null && cart.momentBuy == null && <>
                        <button className="btn btn-danger" data-cart-cancel="@Model.ActiveCart.Id">Скасувати</button>
                        <button className="btn btn-success" data-cart-buy="@Model.ActiveCart.Id">Придбати</button>
                        </>}
                </div>
            </div>
        </div>}
    </>;
}

function CartDetail({cartItem}){
    const delClick = () => {
        console.log('del ' + cartItem.id)
    }

    const decClick = () => {
        console.log('- ' + cartItem.id)
    }

    const incClick = () => {
        console.log('+ ' + cartItem.id)
    }


    return <>
        <div className="row cart-detail">
            <Link to={"/product/" + (cartItem.product.slug || cartItem.product.id)} className="col-9">
                <div className="col-2">
                    <img src={cartItem.product.imagesCsv.split(',')[0]}/>
                </div>
                <div className="col-2 name" id="product-name">{cartItem.product.name}</div>
                <div className="col-6 description">{cartItem.product.description}</div>
                <div className="col-2">₴ {cartItem.product.price} шт.</div>
            </Link>
            <div className="col-lg-2 col-md-3 col-sm-4">
                <button onClick={delClick} className="btn btn-outline-danger">x</button>
                <button onClick={decClick} className="btn btn-outline-warning">-</button>
                <span className="editable-qnt" contentEditable="true">{cartItem.quantity}</span>
                <button onClick={incClick} className="btn btn-outline-success">+</button>
            </div>
            <Link to={"/product/" + (cartItem.product.slug || cartItem.product.id)} className="col-1">
                <div className="col-12">₴ {cartItem.price}</div>
            </Link>
        </div>
    </>
}