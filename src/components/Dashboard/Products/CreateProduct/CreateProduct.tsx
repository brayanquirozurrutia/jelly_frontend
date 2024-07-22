import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createProduct } from "../../../../services/Product";

const CreateProduct = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageFile) {
            setError('Please select an image file.');
            return;
        }

        try {
            await createProduct({
                name,
                description,
                price,
                stock,
                category,
                group,
                image_file: imageFile,
            });
            setSuccess('Product created successfully!');
            setError(null);
        } catch (err) {
            setError('Failed to create product.');
            setSuccess(null);
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    type="number"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Stock"
                    type="number"
                    variant="outlined"
                    value={stock}
                    onChange={(e) => setStock(parseFloat(e.target.value))}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Category (UUID)"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Group (UUID)"
                    variant="outlined"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    required
                />
                <Button
                    fullWidth
                    variant="contained"
                    component="label"
                    sx={{ margin: '16px 0' }} // Use sx prop for margin
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImageFile(e.target.files[0]);
                            }
                        }}
                    />
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ margin: '16px 0' }} // Use sx prop for margin
                >
                    Create Product
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success">{success}</Typography>}
            </form>
        </Container>
    );
};

export default CreateProduct;
