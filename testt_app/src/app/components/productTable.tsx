'use client';

import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'; 

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number; 
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Brand</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const discountValue = (product.price * product.discountPercentage) / 100; 
            const priceWithDiscount = (product.price - discountValue).toFixed(2); 
            
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{priceWithDiscount}€</td>
                <td>{product.brand}</td>
                <td>
                  <Button onClick={() => router.push(`/product/${product.id}`)}>
                    <FontAwesomeIcon icon={faEye} className={styles.icon} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
