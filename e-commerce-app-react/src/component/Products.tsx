/**
 * Show list Out all products
 */
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getAllProducts } from '../services/ProductService';

import ProductCard from './ProductCard';
import Product from '../models/Product';


const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
