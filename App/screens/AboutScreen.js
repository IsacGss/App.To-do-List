import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function AboutScreen({ navigation }) {
  const { theme } = useContext(TaskContext);

  const openSupportLink = () => {
    const url = 'interdart93@gmail.com';
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Não foi possível abrir o link: " + url);
        }
      })
      .catch(err => console.error('Erro ao abrir o link:', err));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
          Sobre o App
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Voltar para a tela anterior"
        >
          <Ionicons name="arrow-back-outline" size={24} color={theme === 'light' ? '#007AFF' : '#4DA8FF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={[styles.infoCard, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}>
          <Ionicons
            name="list-outline"
            size={40}
            color={theme === 'light' ? '#007AFF' : '#4DA8FF'}
            style={styles.icon}
          />
          <Text style={[styles.title, { color: theme === 'light' ? '#333' : '#FFF' }]}>
            App de Tarefas
          </Text>
          <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
            Um aplicativo simples e intuitivo para gerenciar suas tarefas diárias com eficiência.
          </Text>
          <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
            Versão: 1.0.0
          </Text>
          <Text style={[styles.text, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
            Desenvolvedor: Isaac, gpto, grok3
          </Text>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={openSupportLink}
            accessibilityLabel="Enviar e-mail para suporte"
          >
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
            <Text style={styles.supportButtonText}>Contato: interdart93@gmail.com</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  infoCard: {
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 10,
  },
  supportButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});