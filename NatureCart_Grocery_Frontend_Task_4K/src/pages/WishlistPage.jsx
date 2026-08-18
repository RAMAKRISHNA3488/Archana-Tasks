import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import AccountWishlist from '../components/account/AccountWishlist';

export function WishlistPage() {
  const breadcrumbItems = [
    { label: 'Wishlist' }
  ];

  return (
    <div className="wishlist-page container py-lg">
      <div className="mb-md">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-surface p-xl rounded-xl border shadow-xs">
        <AccountWishlist />
      </div>
    </div>
  );
}

export default WishlistPage;
