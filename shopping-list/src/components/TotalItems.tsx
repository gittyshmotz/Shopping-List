import { useSelector } from 'react-redux'
import type { RootState } from '../store'

const TotalItems = () => {
  const products = useSelector((state: RootState) => state.cart.products)
  const total = products.reduce((sum, p) => sum + (p.quantity || 1), 0)

  return <p>סה״כ מוצרים: {total}</p>
}

export default TotalItems
