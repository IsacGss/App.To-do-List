import React, { createContext, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user, setUser] = useState(null); // Estado do usuário logado

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };

  const register = async (email, password) => {
    try {
      const userData = { email, password };
      await AsyncStorage.setItem(`user_${email}`, JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const storedData = await AsyncStorage.getItem(`user_${email}`);
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.password === password) {
          setUser(userData);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const storedData = await AsyncStorage.getItem(`user_${email}`);
      if (storedData) {
        // Simula envio de e-mail ou redefinição de senha
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setTasks([]);
  };

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    tasks,
    setTasks,
    notificationsEnabled,
    toggleNotifications,
    clearTasks,
    user,
    register,
    login,
    forgotPassword,
    logout,
  }), [theme, tasks, notificationsEnabled, user]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};