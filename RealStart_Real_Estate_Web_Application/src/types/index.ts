export type Role = 'buyer' | 'agent' | 'admin';

export type PropertyPurpose = 'For Sale' | 'For Rent';

export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Condo' | 'Commercial' | 'All Types';

export type PropertyStatus = 'active' | 'pending' | 'sold' | 'rented';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  profileImage?: string;
  passwordHash?: string;
  createdAt: string;

  // Buyer Details
  preferredType?: string;
  preferredLocation?: string;
  minPricePreference?: number;
  maxPricePreference?: number;

  // Agent Details
  agentTitle?: string;
  agencyName?: string;
  licenseNumber?: string;
  experienceYears?: number;
  bio?: string;
  rating?: number;
  propertiesCount?: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  location: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  yearBuilt: number;
  garage: number;
  parking: boolean;
  furnished?: boolean;
  amenities?: string[];
  status: PropertyStatus;
  views: number;
  inquiries: number;
  agentId: string;
  agentName: string;
  agentRole?: string;
  agentPhone: string;
  agentEmail: string;
  agentImage: string;
  images: string[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  propertiesCount: number;
  bio?: string;
  experienceYears?: number;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyPrice: number;
  propertyLocation: string;
  propertyBeds: number;
  propertyBaths: number;
  propertyArea: number;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  agentStatus: 'online' | 'offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Buying Tips' | 'Market News' | 'Investment' | 'Guides';
  excerpt: string;
  content: string;
  featuredImage: string;
  readTime: string;
  publishedAt: string;
  authorName: string;
  authorRole: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  purpose: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  minArea: number;
  maxArea: number;
  furnished: boolean | null;
  parking: boolean | null;
  amenities: string[];
  sortBy: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'popular';
  viewMode: 'grid' | 'list';
}

export interface DashboardStats {
  totalProperties: number;
  totalViews: number;
  inquiries: number;
  appointments: number;
  propertiesTrend: number;
  viewsTrend: number;
  inquiriesTrend: number;
  appointmentsTrend: number;
}
