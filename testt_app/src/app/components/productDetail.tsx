'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css'; 
// Define the Product interface to represent the structure of a product object.
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number; 
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  thumbnail: string; 
}
// Component to display detailed information about a product.
export const ProductDetail = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
    
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    };

    fetchProduct();
  }, [productId]);

  // Variables to hold the calculated discount price and original price.
  let priceWithDiscount: string | null = null;
  let originalPrice: string | null = null;
// If the product exists, calculate the discount value and the final price with the discount.
  if (product) {
    const discountValue = (product.price * product.discountPercentage) / 100; 
    priceWithDiscount = (product.price - discountValue).toFixed(2);
    originalPrice = product.price.toFixed(2);
  }
// Return the JSX for rendering the product details.
  return (
    <div className={styles.productDetail}>
      {product ? (
        <>
          <Image 
            src={product.thumbnail} 
            alt={product.title} 
            width={300} 
            height={300} 
            className={styles.productImage} 
          />
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productDetails}>Brand: {product.brand ? product.brand : '-'}</p>
          <p className={styles.productDetails}>Category: {product.category}</p>
          <p className={styles.productDetails}>Stock: {product.stock}</p>
          <p className={styles.productDetails}>Raking: {product.rating}</p>
          {product.discountPercentage > 0 && (
              <span className={styles.discountBadge}>
                Discount: {product.discountPercentage}%
              </span>
            )}
          <p className={styles.productPrice}>
            {product.discountPercentage > 0 && (
              <>
                <span className={styles.discountedPrice}>{priceWithDiscount}€</span> {' '}
                <span className={styles.originalPrice}>{originalPrice}€</span>
              </>
            )}
            {product.discountPercentage === 0 && (
              <span>{originalPrice}€</span>
            )}
          </p>
        </>
      ) : null}
    </div>
  );
};
