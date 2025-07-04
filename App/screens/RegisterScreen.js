import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function RegisterScreen({ navigation }) {
  const { theme, register } = useContext(TaskContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const success = await register(email, password);
    if (success) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
          Criar Conta
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Voltar para a tela anterior"
        >
          <Ionicons name="arrow-back-outline" size={24} color={theme === 'light' ? '#007AFF' : '#4DA8FF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={[styles.card, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}>
          <Ionicons
            name="person-add-outline"
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});