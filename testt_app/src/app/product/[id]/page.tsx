import { ProductDetail } from '../../components/productDetail';
import Header from '../../components/header';

const ProductPage = ({ params }: { params: { id: string } }) => {
  const productId = Number(params.id); // Get the product ID from params

  return (
    <div>
      <Header/>
      <ProductDetail productId={productId} />
    </div>
  );
};

export default ProductPage;
