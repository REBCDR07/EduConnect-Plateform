import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'educonnect_users';
const CURRENT_USER_KEY = 'user'; // Simplification du nom pour la cohérence

const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const authService = {
  register: (userData) => {
    const users = getStoredUsers();
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) throw new Error('Un utilisateur avec cet email existe déjà.');
    
    const { confirmPassword, ...userToSave } = userData;
    const newUser = { id: uuidv4(), ...userToSave };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  login: (email, password) => {
    const users = getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }
    throw new Error('Email ou mot de passe incorrect.');
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  },
};
export default authService;