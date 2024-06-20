
import React from 'react'
import './App.css'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Category from './components/Category/Category'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import CatDetails from './components/CatDetails/CatDetails'
import WishList from './components/WishList/WishList'
import SubCategories from './components/SubCategories/SubCategories'
import BrandDetails from './components/BrandDetails/BrandDetails'
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders'
import Contact from './components/Contact/Contact'



export default function App() {

  const queryClient  = new  QueryClient()
  let routes = createBrowserRouter([{
    path:"", element:<Layout/>, children:[
      {index:true, element:<Home/>},
      {path:"register", element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"login", element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:"productdetails/:id", element:<ProductDetails/>},
      {path:"cart", element:<ProtectedRoutes> <Cart/></ProtectedRoutes>},
      {path:"wish", element:<ProtectedRoutes> <WishList/></ProtectedRoutes>},
      {path:"products", element:<Products/>},
      {path:"cat", element: <Category/>},
      {path:"sub", element: <SubCategories/>},
      {path:"catdetails/:id", element: <CatDetails><Category/></CatDetails>},
      {path:"brands", element: <Brands/>},
      {path:"branddetails/:id", element:<BrandDetails/>},
      {path:"checkout", element:<ProtectedRoutes> <Checkout/></ProtectedRoutes>},
      {path:"allorders", element:<ProtectedRoutes> <Allorders/></ProtectedRoutes>},
      {path:"contact", element:<Contact/>},


   
      {path:"*", element:<Notfound/>},

    ]
  }])
  return (
    <>
    <QueryClientProvider  client={queryClient}>
  <RouterProvider router={routes}></RouterProvider>
  <ReactQueryDevtools  initialIsOpen={false}></ReactQueryDevtools>
  <Toaster/>
  </QueryClientProvider>
    </>
  )
}
