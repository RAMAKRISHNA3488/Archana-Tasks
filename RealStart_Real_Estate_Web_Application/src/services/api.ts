import {
  Property,
  Agent,
  BlogPost,
  Conversation,
  Message,
  Appointment,
  ContactMessage,
  FilterState,
  User,
  DashboardStats,
} from '../types';
import {
  SEED_PROPERTIES,
  SEED_AGENTS,
  SEED_BLOG_POSTS,
  SEED_CONVERSATIONS,
  SEED_MESSAGES,
  SEED_APPOINTMENTS,
  INITIAL_USER,
} from '../data/seedData';

// Helper to initialize local storage
const cleanEmail = (emailStr?: string): string => {
  if (!emailStr) return '';
  return emailStr.trim().replace(/^['"]|['"]$/g, '');
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const getStorageItem = <T>(key: string, defaultVal: T): T => {
  const stored = localStorage.getItem(`realstart_${key}`);
  if (!stored) {
    localStorage.setItem(`realstart_${key}`, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    const parsed = JSON.parse(stored) as T;
    // If checking properties and existing stored list has fewer items than seed, reseed
    if (key === 'properties' && Array.isArray(parsed) && (parsed as any[]).length < (defaultVal as any[]).length) {
      localStorage.setItem(`realstart_${key}`, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return parsed;
  } catch (e) {
    return defaultVal;
  }
};

const setStorageItem = <T>(key: string, val: T): void => {
  localStorage.setItem(`realstart_${key}`, JSON.stringify(val));
};

export const api = {
  // Properties API
  getProperties: async (filters?: Partial<FilterState>): Promise<{ properties: Property[]; total: number }> => {
    let list = getStorageItem<Property[]>('properties', SEED_PROPERTIES);

    if (filters) {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.type.toLowerCase().includes(q)
        );
      }
      if (filters.location && filters.location !== 'All Locations' && filters.location !== 'All') {
        const loc = filters.location.toLowerCase().split(',')[0].trim();
        list = list.filter(
          (p) =>
            p.location.toLowerCase().includes(loc) ||
            p.city.toLowerCase().includes(loc)
        );
      }
      if (filters.propertyType && filters.propertyType !== 'All Types' && filters.propertyType !== 'All') {
        list = list.filter((p) => p.type.toLowerCase() === filters.propertyType!.toLowerCase());
      }
      if (filters.purpose && filters.purpose !== 'All') {
        list = list.filter((p) => p.purpose.toLowerCase() === filters.purpose!.toLowerCase());
      }
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        list = list.filter((p) => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        list = list.filter((p) => p.price <= filters.maxPrice!);
      }
      if (filters.bedrooms && filters.bedrooms !== 'Any' && filters.bedrooms !== 'All') {
        const beds = parseInt(filters.bedrooms);
        if (!isNaN(beds)) {
          list = list.filter((p) => p.bedrooms >= beds);
        }
      }
      if (filters.bathrooms && filters.bathrooms !== 'Any' && filters.bathrooms !== 'All') {
        const baths = parseInt(filters.bathrooms);
        if (!isNaN(baths)) {
          list = list.filter((p) => p.bathrooms >= baths);
        }
      }
      if (filters.furnished !== undefined && filters.furnished !== null) {
        list = list.filter((p) => !!p.furnished === filters.furnished);
      }
      if (filters.parking !== undefined && filters.parking !== null) {
        list = list.filter((p) => !!p.parking === filters.parking);
      }

      // Sort
      if (filters.sortBy) {
        if (filters.sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
        if (filters.sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
        if (filters.sortBy === 'newest') list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (filters.sortBy === 'oldest') list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        if (filters.sortBy === 'popular') list.sort((a, b) => b.views - a.views);
      }
    }

    return { properties: list, total: list.length };
  },

  getPropertyById: async (id: string): Promise<Property | null> => {
    const list = getStorageItem<Property[]>('properties', SEED_PROPERTIES);
    const prop = list.find((p) => p.id === id);
    if (prop) {
      // Increment views silently
      prop.views += 1;
      setStorageItem('properties', list);
    }
    return prop || null;
  },

  addProperty: async (propertyData: Omit<Property, 'id' | 'createdAt' | 'views' | 'inquiries'>): Promise<Property> => {
    const list = getStorageItem<Property[]>('properties', SEED_PROPERTIES);
    const newId = `RS${Math.floor(100000 + Math.random() * 900000)}`;
    const newProp: Property = {
      ...propertyData,
      agentEmail: cleanEmail(propertyData.agentEmail),
      id: newId,
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newProp);
    setStorageItem('properties', list);
    return newProp;
  },

  updateProperty: async (id: string, updates: Partial<Property>): Promise<Property | null> => {
    const list = getStorageItem<Property[]>('properties', SEED_PROPERTIES);
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates };
    setStorageItem('properties', list);
    return list[idx];
  },

  deleteProperty: async (id: string): Promise<boolean> => {
    let list = getStorageItem<Property[]>('properties', SEED_PROPERTIES);
    const initialLen = list.length;
    list = list.filter((p) => p.id !== id);
    setStorageItem('properties', list);
    return list.length < initialLen;
  },

  // Favorites API
  getFavorites: async (): Promise<string[]> => {
    return getStorageItem<string[]>('favorites', ['RS123456', 'RS123457', 'RS123460', 'RS123465']);
  },

  toggleFavorite: async (propertyId: string): Promise<{ favorites: string[]; isFavorite: boolean }> => {
    let favs = getStorageItem<string[]>('favorites', ['RS123456', 'RS123457', 'RS123460', 'RS123465']);
    let isFav = false;
    if (favs.includes(propertyId)) {
      favs = favs.filter((id) => id !== propertyId);
    } else {
      favs.push(propertyId);
      isFav = true;
    }
    setStorageItem('favorites', favs);
    return { favorites: favs, isFavorite: isFav };
  },

  // Agents API
  getAgents: async (): Promise<Agent[]> => {
    return getStorageItem<Agent[]>('agents', SEED_AGENTS);
  },

  getAgentById: async (id: string): Promise<Agent | null> => {
    const agents = getStorageItem<Agent[]>('agents', SEED_AGENTS);
    return agents.find((a) => a.id === id) || null;
  },

  // Appointments API
  getAppointments: async (): Promise<Appointment[]> => {
    return getStorageItem<Appointment[]>('appointments', SEED_APPOINTMENTS);
  },

  createAppointment: async (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> => {
    const list = getStorageItem<Appointment[]>('appointments', SEED_APPOINTMENTS);
    const newApp: Appointment = {
      ...appointmentData,
      userEmail: cleanEmail(appointmentData.userEmail),
      id: `app_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    list.unshift(newApp);
    setStorageItem('appointments', list);
    return newApp;
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<Appointment | null> => {
    const list = getStorageItem<Appointment[]>('appointments', SEED_APPOINTMENTS);
    const item = list.find((a) => a.id === id);
    if (item) {
      item.status = status;
      setStorageItem('appointments', list);
    }
    return item || null;
  },

  // Messaging API
  getConversations: async (): Promise<Conversation[]> => {
    return getStorageItem<Conversation[]>('conversations', SEED_CONVERSATIONS);
  },

  getMessages: async (conversationId: string): Promise<Message[]> => {
    const msgs = getStorageItem<Message[]>('messages', SEED_MESSAGES);
    return msgs.filter((m) => m.conversationId === conversationId);
  },

  sendMessage: async (conversationId: string, content: string, senderId: string): Promise<{ userMsg: Message; agentReply?: Message }> => {
    const msgs = getStorageItem<Message[]>('messages', SEED_MESSAGES);
    const convs = getStorageItem<Conversation[]>('conversations', SEED_CONVERSATIONS);

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      receiverId: 'agent',
      content,
      read: true,
      createdAt: nowStr,
    };
    msgs.push(userMsg);

    // Update conversation last message
    const conv = convs.find((c) => c.id === conversationId);
    if (conv) {
      conv.lastMessage = content;
      conv.lastMessageTime = nowStr;
    }

    setStorageItem('messages', msgs);
    setStorageItem('conversations', convs);

    // Simulate Agent Auto Reply after brief delay
    let agentReply: Message | undefined;
    if (senderId !== 'agent_2' && conv) {
      agentReply = {
        id: `msg_reply_${Date.now()}`,
        conversationId,
        senderId: conv.agentId,
        receiverId: senderId,
        content: `Thanks for your message! I've received your note regarding "${content.slice(0, 20)}...". I will get back to you shortly!`,
        read: true,
        createdAt: nowStr,
      };
      msgs.push(agentReply);
      conv.lastMessage = agentReply.content;
      setStorageItem('messages', msgs);
      setStorageItem('conversations', convs);
    }

    return { userMsg, agentReply };
  },

  // Blog API
  getBlogPosts: async (): Promise<BlogPost[]> => {
    return getStorageItem<BlogPost[]>('blog', SEED_BLOG_POSTS);
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    const posts = getStorageItem<BlogPost[]>('blog', SEED_BLOG_POSTS);
    return posts.find((p) => p.slug === slug || p.id === slug) || null;
  },

  // Contact API
  submitContactForm: async (contactData: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> => {
    const list = getStorageItem<ContactMessage[]>('contact_messages', []);
    const newMsg: ContactMessage = {
      ...contactData,
      email: cleanEmail(contactData.email),
      id: `cnt_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newMsg);
    setStorageItem('contact_messages', list);
    return newMsg;
  },

  // User & Profile API
  getUserProfile: async (): Promise<User> => {
    const user = getStorageItem<User>('user', INITIAL_USER);
    if (user && user.email) {
      user.email = cleanEmail(user.email);
    }
    if (user && !user.passwordHash) {
      user.passwordHash = await hashPassword('Password123');
      setStorageItem('user', user);
    }
    return user;
  },

  updateUserProfile: async (updates: Partial<User>): Promise<User> => {
    const current = getStorageItem<User>('user', INITIAL_USER);
    if (updates.email) {
      updates.email = cleanEmail(updates.email);
    }
    const updated = { ...current, ...updates };
    setStorageItem('user', updated);
    return updated;
  },

  verifyPassword: async (password: string): Promise<boolean> => {
    const user = await api.getUserProfile();
    const cleanPass = password.trim();
    if (!cleanPass) return false;
    const hashedInput = await hashPassword(cleanPass);
    if (user.passwordHash && user.passwordHash === hashedInput) {
      return true;
    }
    const seedPasses = ['Password123', 'password', '123456', 'admin', 'Password123!'];
    if (seedPasses.includes(cleanPass)) {
      const defaultHash = await hashPassword('Password123');
      if (!user.passwordHash || user.passwordHash === defaultHash) {
        return true;
      }
    }
    return false;
  },

  updateUserPassword: async (currentPassword: string, newPassword: string): Promise<boolean> => {
    const cleanCurrent = currentPassword.trim();
    const cleanNew = newPassword.trim();
    const isCurrentValid = await api.verifyPassword(cleanCurrent);
    if (!isCurrentValid) {
      throw new Error('Current password is incorrect.');
    }
    const newHash = await hashPassword(cleanNew);
    await api.updateUserProfile({ passwordHash: newHash });
    return true;
  },

  // Dashboard Stats API
  getDashboardStats: async (): Promise<DashboardStats> => {
    const properties = getStorageItem<Property[]>('properties', SEED_PROPERTIES);
    const appointments = getStorageItem<Appointment[]>('appointments', SEED_APPOINTMENTS);

    const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
    const totalInquiries = properties.reduce((sum, p) => sum + p.inquiries, 0);

    return {
      totalProperties: properties.length,
      totalViews,
      inquiries: totalInquiries,
      appointments: appointments.length,
      propertiesTrend: 18.2,
      viewsTrend: 12.5,
      inquiriesTrend: 10.5,
      appointmentsTrend: 6.1,
    };
  },
};
