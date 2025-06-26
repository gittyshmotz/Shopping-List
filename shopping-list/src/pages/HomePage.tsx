import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProductForm from '../components/ProductForm'
import ProductList from '../components/ProductList'
import TotalItems from '../components/TotalItems'
import { fetchCategories, fetchProducts } from '../store/slices/cartSlice'
import type { AppDispatch } from '../store'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div>
      <h1>רשימת קניות</h1>
      <ProductForm />
      <TotalItems />
      <ProductList />
     
    </div>
  )
}

export default HomePage
