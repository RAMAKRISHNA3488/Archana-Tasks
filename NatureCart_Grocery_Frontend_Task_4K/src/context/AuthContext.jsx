import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

const MOCK_DEFAULT_USER = {
  id: 'usr-1',
  name: 'Archana Sharma',
  email: 'archana@example.com',
  password: 'password123',
  phone: '9876543210',
  deliveryPincode: '400001',
  deliveryCity: 'Mumbai',
  deliveryState: 'Maharashtra'
};

const DEFAULT_ADDRESS = {
  id: 'addr-1',
  fullName: 'Archana Sharma',
  phone: '9876543210',
  house: 'Flat 402, Green Valley Apartments',
  street: 'MG Road, Sector 14',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  landmark: 'Near Central Park',
  type: 'Home',
  isDefault: true
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('naturecart_users_db', [MOCK_DEFAULT_USER]);
  const [user, setUser] = useLocalStorage('naturecart_user', MOCK_DEFAULT_USER);
  const [addresses, setAddresses] = useLocalStorage('naturecart_addresses', [DEFAULT_ADDRESS]);
  const [selectedAddressId, setSelectedAddressId] = useLocalStorage('naturecart_selected_address_id', 'addr-1');

  const isLoggedIn = !!user;

  // Helper to read latest users list synchronously from localStorage or fallback to state
  const getLatestUsers = () => {
    try {
      const stored = window.localStorage.getItem('naturecart_users_db');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return Array.isArray(users) ? users : [MOCK_DEFAULT_USER];
  };

  // 1. SIGN UP LOGIC (Independent Registration Flow)
  const signup = (userData) => {
    const rawEmail = String(userData.email || '').trim();
    const normalizedEmail = rawEmail.toLowerCase();

    const currentUsers = getLatestUsers();

    // Check duplicate email case-insensitively
    const existingUser = currentUsers.find(
      u => String(u.email || '').trim().toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // Create new account object
    const newUser = {
      id: `usr-${Date.now()}`,
      name: String(userData.name || '').trim(),
      email: rawEmail,
      phone: String(userData.phone || '').trim(),
      password: userData.password,
      deliveryPincode: '400001',
      deliveryCity: 'Mumbai',
      deliveryState: 'Maharashtra',
      createdAt: new Date().toISOString()
    };

    const updatedUsersList = [...currentUsers, newUser];

    // Persist synchronously to localStorage
    try {
      window.localStorage.setItem('naturecart_users_db', JSON.stringify(updatedUsersList));
      window.localStorage.setItem('naturecart_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('LocalStorage write error during signup:', e);
    }

    // Update Context State
    setUsers(updatedUsersList);
    setUser(newUser);

    return { success: true, user: newUser };
  };

  // 2. LOGIN LOGIC (Independent Credential Validation Flow)
  const login = (email, password) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const currentUsers = getLatestUsers();

    const foundUser = currentUsers.find(
      u => String(u.email || '').trim().toLowerCase() === normalizedEmail
    );

    // If user not found OR password mismatch -> return specific Login error
    if (!foundUser || foundUser.password !== password) {
      return { success: false, error: 'Invalid email or password.' };
    }

    // Persist active user session synchronously
    try {
      window.localStorage.setItem('naturecart_user', JSON.stringify(foundUser));
    } catch (e) {
      console.error('LocalStorage write error during login:', e);
    }

    // Update Context State
    setUser(foundUser);

    return { success: true, user: foundUser };
  };

  // 3. LOGOUT LOGIC
  const logout = () => {
    setUser(null);
    try {
      window.localStorage.removeItem('naturecart_user');
    } catch (e) {}
  };

  // 4. UPDATE PROFILE LOGIC
  const updateProfile = (updatedData) => {
    if (!user) return { success: false, error: 'No authenticated user found.' };

    const updatedUser = {
      ...user,
      name: String(updatedData.name || '').trim(),
      email: String(updatedData.email || '').trim(),
      phone: String(updatedData.phone || '').trim()
    };

    const currentUsers = getLatestUsers();
    const updatedUsersList = currentUsers.map(u => (u.id === user.id ? updatedUser : u));

    try {
      window.localStorage.setItem('naturecart_users_db', JSON.stringify(updatedUsersList));
      window.localStorage.setItem('naturecart_user', JSON.stringify(updatedUser));
    } catch (e) {}

    setUser(updatedUser);
    setUsers(updatedUsersList);

    return { success: true, user: updatedUser };
  };

  // 5. ADDRESS MANAGEMENT (CRUD)
  const addAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      isDefault: (addresses || []).length === 0 ? true : !!newAddress.isDefault
    };

    let updatedList = [addressWithId, ...(addresses || [])];
    if (newAddress.isDefault) {
      updatedList = updatedList.map(a =>
        a.id === addressWithId.id ? { ...a, isDefault: true } : { ...a, isDefault: false }
      );
    }

    setAddresses(updatedList);
    setSelectedAddressId(addressWithId.id);
  };

  const updateAddress = (updatedAddress) => {
    let updatedList = (addresses || []).map(a =>
      a.id === updatedAddress.id ? updatedAddress : a
    );

    if (updatedAddress.isDefault) {
      updatedList = updatedList.map(a =>
        a.id === updatedAddress.id ? { ...a, isDefault: true } : { ...a, isDefault: false }
      );
    }

    setAddresses(updatedList);
  };

  const deleteAddress = (addressId) => {
    const remaining = (addresses || []).filter(a => a.id !== addressId);
    setAddresses(remaining);
    if (selectedAddressId === addressId) {
      setSelectedAddressId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const setDefaultAddress = (addressId) => {
    setAddresses(prev =>
      (prev || []).map(a =>
        a.id === addressId ? { ...a, isDefault: true } : { ...a, isDefault: false }
      )
    );
    setSelectedAddressId(addressId);
  };

  const selectedAddress =
    (addresses || []).find(a => a.id === selectedAddressId) || (addresses && addresses[0]) || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isLoggedIn,
        isAuthenticated: isLoggedIn,
        login,
        signup,
        logout,
        updateProfile,
        addresses: addresses || [],
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        selectedAddress,
        selectedAddressId,
        setSelectedAddressId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
