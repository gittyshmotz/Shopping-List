import { useSelector, useDispatch } from 'react-redux'
import { IconButton, Card, CardContent, Typography, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { RootState, AppDispatch } from '../store'
import { deleteProductAsync } from '../store/slices/cartSlice'

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.cart.products)
  const categories = useSelector((state: RootState) => state.cart.categories)

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {categories.map((cat) => {
        const productsInCategory = products.filter((p) => p.categoryId === cat.id)
        if (productsInCategory.length === 0) return null

        return (
          <Card key={cat.id} sx={{ backgroundColor: '#f5f5f5', boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {cat.name} ({productsInCategory.length})
              </Typography>
              {productsInCategory.map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: 1,
                    borderRadius: 1,
                    mb: 1,
                    boxShadow: 1,
                  }}
                >
                  <IconButton
                    onClick={() => {

                      dispatch(deleteProductAsync(p.id))
                    }}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography>

                    {p.name} ({p.quantity ?? 1})
                  </Typography>

                </Box>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </Box>
  )
}

export default ProductList
