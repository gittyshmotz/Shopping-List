import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/Product'
import type { Category } from '../../types/Category'


export type NewProduct = {
  name: string
  categoryId: number
}

export type CartState = {
  products: Product[]
  categories: Category[]
}

const initialState: CartState = {
  products: [],
  categories: []
}


export const fetchProducts = createAsyncThunk('cart/fetchProducts', async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`)
  return await res.json()
})


export const fetchCategories = createAsyncThunk('cart/fetchCategories', async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
  return await res.json()
})


export const addProductAsync = createAsyncThunk<Product, NewProduct>(
  'cart/addProductAsync',
  async (product) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    return await res.json()
  }
)
export const deleteProductAsync = createAsyncThunk<number, number>(
  'cart/deleteProductAsync',
  async (productId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
      method: 'DELETE',
    })
    return productId
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload)
      })

      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload
      })
      .addCase(addProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        const existing = state.products.find(
          (p) => p.name === action.payload.name && p.categoryId === action.payload.categoryId
        )
        if (existing) {
          existing.quantity += 1
        } else {
          state.products.push({ ...action.payload, quantity: 1 })
        }
      })
  }
})

export default cartSlice.reducer
