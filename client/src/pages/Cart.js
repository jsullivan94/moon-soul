function Cart( { cart } ) {
    
    const pInCart = cart.map(item => {
        return (
            <div>
            <h1>{item.name}</h1>
            <h2>{item.price}</h2>
            <h4>{item.description}</h4>
            </div>
        )
    })
    return (
        <div>{pInCart}</div>
    )
    
}

export default Cart;