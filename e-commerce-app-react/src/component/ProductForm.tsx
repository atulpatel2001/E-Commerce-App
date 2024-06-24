import React, { useState } from 'react';
import { Button, TextField, TextareaAutosize, Typography } from '@mui/material'; // Import Material-UI components
import {createProduct} from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const ProductForm: React.FC = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, price, description, category, image } = formData;

    if (!name || !price || !description || !category || !image) {
      alert('Please fill in all fields');
      return;
    }
    console.log(image);
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('price', price.toString());
    formDataToSend.append('description', description);
    formDataToSend.append('category', category);
    formDataToSend.append('image', image as File); 
    try {
      const createdProduct = await createProduct(formDataToSend);
      console.log('Product created successfully:', createdProduct);
      navigate("/products");
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextareaAutosize
        
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: '16px', padding: '10px' }}
      />
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
        {formData.image && <Typography>{formData.image.name}</Typography>}
      </label>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Create Product
      </Button>
    </form>
  );
};

export default ProductForm;
