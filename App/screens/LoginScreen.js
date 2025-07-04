import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function LoginScreen({ navigation }) {
  const { theme, login } = useContext(TaskContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigation.navigate('Tasks');
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
          Login
        </Text>
      </View>
      <View style={styles.body}>
        <View style={[styles.card, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}>
          <Ionicons
            name="person-circle-outline"
            size={40}
            color={theme === 'light' ? '#007AFF' : '#4DA8FF'}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}
            placeholder="E-mail"
            placeholderTextColor={theme === 'light' ? '#666' : '#A0A0A0'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="Campo para inserir e-mail"
          />
          <TextInput
            style={[styles.input, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}
            placeholder="Senha"
            placeholderTextColor={theme === 'light' ? '#666' : '#A0A0A0'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            accessibilityLabel="Campo para inserir senha"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={styles.links}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              accessibilityLabel="Ir para tela de registro"
            >
              <Text style={[styles.linkText, { color: theme === 'light' ? '#007AFF' : '#4DA8FF' }]}>
                Criar conta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              accessibilityLabel="Ir para tela de recuperação de senha"
            >
              <Text style={[styles.linkText, { color: theme === 'light' ? '#007AFF' : '#4DA8FF' }]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    fontSize: 14,
  },
});