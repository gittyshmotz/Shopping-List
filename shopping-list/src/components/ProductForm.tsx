import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import type { RootState, AppDispatch } from '../store'
import { addProductAsync, fetchProducts } from '../store/slices/cartSlice'

const ProductForm = () => {
  const [productName, setProductName] = useState('')
  const [categoryId, setCategoryId] = useState<number | ''>('')
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.cart.categories)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName || categoryId === '') return

    await dispatch(addProductAsync({ name: productName, categoryId }))
    dispatch(fetchProducts())
    setProductName('')
    setCategoryId('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ mb: 5 }}>
        <InputLabel>קטגוריה</InputLabel>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          label="קטגוריה"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="שם מוצר"
        fullWidth
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        sx={{ mb: 2 }}

      />

      <Button type="submit" variant="contained">
        הוסף מוצר
      </Button>
    </form>
  )
}

export default ProductForm
