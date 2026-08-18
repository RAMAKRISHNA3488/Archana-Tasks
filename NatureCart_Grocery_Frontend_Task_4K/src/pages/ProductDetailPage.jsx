import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductDetailSkeleton from '../components/common/ProductDetailSkeleton';
import ProductNotFound from './ProductNotFound';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductHighlights from '../components/product/ProductHighlights';
import DeliveryInformation from '../components/product/DeliveryInformation';
import ProductDescription from '../components/product/ProductDescription';
import ProductSpecifications from '../components/product/ProductSpecifications';
import RelatedProducts from '../components/product/RelatedProducts';
import RecentlyViewed from '../components/product/RecentlyViewed';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useNotification();

  const product = useMemo(() => {
    return PRODUCTS.find(p => p.id === productId || p.name.toLowerCase().replace(/\s+/g, '-') === productId);
  }, [productId]);

  const categoryObj = useMemo(() => {
    if (!product) return null;
    return CATEGORIES.find(c => c.slug === product.category || c.id === product.category);
  }, [product]);

  useEffect(() => {
    setIsLoading(true);
    setQuantity(1);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [productId]);

  if (!isLoading && !product) {
    return <ProductNotFound />;
  }

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleQuantityIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      showToast('Minimum order quantity is 1.', 'warning');
    }
  };

  const handleAddToCart = () => {
    if (!product || !product.inStock) {
      showToast('This product is currently unavailable.', 'warning');
      return;
    }
    if (quantity < 1) {
      showToast('Please select a valid quantity.', 'warning');
      return;
    }
    addToCart(product, quantity);
    showToast(`${product.name} added to your cart.`, 'success');
  };

  const handleBuyNow = () => {
    if (!product || !product.inStock) {
      showToast('This product is currently unavailable.', 'warning');
      return;
    }
    if (quantity < 1) {
      showToast('Please select a valid quantity.', 'warning');
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product);
    showToast(
      isWishlisted ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist.`,
      'success'
    );
  };

  const breadcrumbItems = [
    { label: 'Categories', link: '/categories' },
    ...(categoryObj ? [{ label: categoryObj.name, link: `/categories/${categoryObj.slug}` }] : []),
    { label: product ? product.name : 'Product Details' }
  ];

  return (
    <div className="product-detail-page container py-xl">
      {/* 1. Breadcrumbs */}
      <div className="mb-lg">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <>
          {/* 2. Main Product Info Split View */}
          <div className="product-hero-card grid grid-cols-12 gap-2xl bg-surface p-2xl rounded-2xl border shadow-sm mb-2xl items-start">
            {/* Left: Product Gallery */}
            <div className="col-span-5 w-full">
              <ProductGallery
                mainImage={product.image}
                images={product.images}
                altTitle={product.name}
                discountPercentage={product.discountPercentage}
                isBestseller={product.isBestseller}
              />
            </div>

            {/* Right: Product Details & Actions */}
            <div className="col-span-7 w-full">
              <ProductInfo
                product={product}
                quantity={quantity}
                onQuantityIncrease={handleQuantityIncrease}
                onQuantityDecrease={handleQuantityDecrease}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onWishlistToggle={handleWishlistToggle}
                isWishlisted={isWishlisted}
              />
            </div>
          </div>

          {/* 3. Product Highlights & Delivery Check Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl mb-2xl">
            <ProductHighlights highlights={product.highlights} />
            <DeliveryInformation />
          </div>

          {/* 4. Product Description & Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl mb-2xl">
            <ProductDescription description={product.description} />
            <ProductSpecifications specifications={product.specifications} />
          </div>

          {/* 5. Related Products */}
          <div className="mt-2xl pt-2xl border-t mb-2xl">
            <RelatedProducts currentProductId={product.id} category={product.category} />
          </div>

          {/* 6. Recently Viewed Products */}
          <div className="mt-2xl pt-2xl border-t mb-xl">
            <RecentlyViewed currentProductId={product.id} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailPage;
