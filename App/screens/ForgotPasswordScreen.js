import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function ForgotPasswordScreen({ navigation }) {
  const { theme, forgotPassword } = useContext(TaskContext);
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira um e-mail.');
      return;
    }
    const success = await forgotPassword(email);
    if (success) {
      Alert.alert('Sucesso', 'Instruções de recuperação foram enviadas para o seu e-mail.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Erro', 'E-mail não encontrado.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
          Recuperar Senha
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
            name="mail-outline"
            size={40}
            color={theme === 'light' ? '#007AFF' : '#4DA8FF'}
            style={styles.icon}
          />
          <Text style={[styles.infoText, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
            Insira seu e-mail para receber instruções de recuperação.
          </Text>
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
          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Enviar</Text>
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
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
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