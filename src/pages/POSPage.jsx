import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '../layout/MainLayout'
import axios from 'axios'
import {toast} from 'react-toastify'
import { ComponentToPrint } from '../components/ComponentToPrint'
import { useReactToPrint } from 'react-to-print'
import {VITE_BACKEND_URI} from '../App'

const POSPage = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const componentRef = useRef()
  
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true
  }
  // intial load
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let newTotalAmount = 0
    cart.forEach(item=> {
      newTotalAmount += parseInt(item.totalAmount)
    })
    setTotalAmount(newTotalAmount)
  }, [cart])


  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${VITE_BACKEND_URI}/products`)
      setProducts(await response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const removeProduct = async(product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    setCart(newCart)
    toast(`Removed ${product} from cart`)
  }

  const addProductToCart = async(product) => {
    //console.log(product)
    let findProductInCart = await cart.find(i => {
      return i.id === product.id
    });
    if (findProductInCart) {
      //
      let newCart =[];
      let newItem;
      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            "quantity": cartItem.quantity + 1,
            "totalAmount":  cartItem.totalAmount = product.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem)
        }
        else {
          newCart.push(cartItem)
        }
      })
      setCart(newCart)
      toast(`Added ${newItem.name} to cart`, toastOptions)
    }
    else {
      let addingProduct = {
        ...product, 
        "quantity" : 1,
        "totalAmount" : product.price
      }
      setCart([...cart, addingProduct])
      toast(`Added ${product.name} to cart`, toastOptions)
    }
  }

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
  const handlePrint = () => {
    handleReactToPrint();
  };

  return (
    <MainLayout>
      <div className="row">
        <div className="col-lg-8">
          { isLoading ? 
            "Loading..." : <div className="row">
            {products.map((product, key) => 
                  <div key={key} className="col-lg-4 mb-4">
                    <div className="pos-item px-3 text-center border" onClick={() => addProductToCart(product)}>
                      <p>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name}/>
                      <p>${product.price}</p>
                    </div>
                  </div>
              )}
            </div>
          }
        </div>
        <div className="col-lg-4">
          <div style={{display: "none"}}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
          </div>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                { cart ? cart.map((cartProduct, key) => <tr key={key}>
                    <td>{cartProduct.id}</td>
                    <td>{cartProduct.name}</td> 
                    <td>{cartProduct.price}</td>
                    <td>{cartProduct.quantity}</td>
                    <td>{cartProduct.totalAmount}</td>
                    <td><button onClick={() => {removeProduct(cartProduct)} }className="btn btn-danger btn-sm">Remove</button></td>
                  </tr>) : 'No item in cart'
                }
              </tbody>
            </table>
            <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2>
          </div>
          <div className="mt-3">
                {
                  totalAmount !== 0 ? <div>
                    <button className='btn btn-primary' onClick={handlePrint}>
                      Pay Now
                    </button>
                  </div> 
                  : 'No item in cart'
                }
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage