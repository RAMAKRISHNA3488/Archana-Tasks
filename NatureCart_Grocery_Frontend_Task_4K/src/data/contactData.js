export const CONTACT_INFO = {
  phone: {
    display: '1800-123-4567',
    link: 'tel:18001234567',
    subtext: 'Toll-free customer hotline'
  },
  email: {
    display: 'support@naturecart.com',
    link: 'mailto:support@naturecart.com',
    subtext: 'We respond within 2 hours'
  },
  address: {
    title: 'NatureCart Fresh Grocery Store',
    street: 'Sector 14, MG Road',
    cityStatePin: 'Mumbai, Maharashtra - 400001',
    link: 'https://maps.google.com/?q=Mumbai+Maharashtra',
    subtext: 'Main Flagship Store & Distribution Hub'
  },
  support: {
    title: 'Customer Assistance',
    hours: 'Available 24/7',
    deliveryHours: 'Delivery Operating Hours: 6:00 AM – 11:00 PM',
    subtext: 'Instant chat & phone support'
  }
};

export const CONTACT_FAQS = [
  {
    id: 'faq-1',
    question: 'How do I track my active grocery order?',
    answer: 'You can track your order in real-time by visiting "My Account -> My Orders" or clicking the tracking link sent via SMS and email after placing your order.'
  },
  {
    id: 'faq-2',
    question: 'What are NatureCart Express delivery timings?',
    answer: 'Express delivery orders are dispatched within 15 minutes and delivered within 60 minutes. Express slots operate daily from 6:00 AM to 11:00 PM.'
  },
  {
    id: 'faq-3',
    question: 'What if a produce or dairy item arrives damaged or fresh quality issue?',
    answer: 'We guarantee 100% freshness! If any item does not meet your quality expectations, notify us within 24 hours via phone or the contact form above for an immediate replacement or full refund.'
  },
  {
    id: 'faq-4',
    question: 'Can I modify or cancel my order after placement?',
    answer: 'Orders can be cancelled before packing begins directly from your Order Tracking page or by contacting our 24/7 customer support line at 1800-123-4567.'
  }
];

export default CONTACT_INFO;
