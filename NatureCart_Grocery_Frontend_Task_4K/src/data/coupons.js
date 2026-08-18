export const VALID_COUPONS = [
  {
    code: 'NATURE10',
    type: 'percentage',
    value: 10,
    description: '10% OFF on all grocery orders',
    minSubtotal: 0
  },
  {
    code: 'FRESH50',
    type: 'flat',
    value: 50,
    description: 'Flat ₹50 OFF on your order',
    minSubtotal: 200
  },
  {
    code: 'WELCOME100',
    type: 'flat',
    value: 100,
    description: 'Flat ₹100 OFF on orders above ₹500',
    minSubtotal: 500
  }
];

export function validateCoupon(code, subtotal) {
  if (!code || !code.trim()) {
    return { valid: false, message: 'Please enter a coupon code.' };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = VALID_COUPONS.find(c => c.code === cleanCode);

  if (!coupon) {
    return { valid: false, message: 'Invalid coupon code.' };
  }

  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      message: `Coupon "${cleanCode}" requires a minimum subtotal of ₹${coupon.minSubtotal}.`
    };
  }

  let discountAmount = 0;
  if (coupon.type === 'percentage') {
    discountAmount = Math.round((subtotal * coupon.value) / 100);
  } else if (coupon.type === 'flat') {
    discountAmount = coupon.value;
  }

  return {
    valid: true,
    coupon,
    discountAmount: Math.min(discountAmount, subtotal),
    message: `Coupon "${cleanCode}" applied successfully!`
  };
}

export default VALID_COUPONS;
