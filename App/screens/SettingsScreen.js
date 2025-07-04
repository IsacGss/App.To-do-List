import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme, notificationsEnabled, toggleNotifications, clearTasks } = useContext(TaskContext);

  const handleClearTasks = () => {
    Alert.alert(
      'Limpar Tarefas',
      'Tem certeza que deseja excluir todas as tarefas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: clearTasks },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
          Configurações
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={theme === 'light' ? '#007AFF' : '#4DA8FF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="moon-outline" size={20} color={theme === 'light' ? '#333' : '#FFF'} />
            <Text style={[styles.settingText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
              Tema Escuro
            </Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={theme === 'dark' ? '#4DA8FF' : '#FFF'}
            accessibilityLabel="Alternar tema claro e escuro"
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="notifications-outline" size={20} color={theme === 'light' ? '#333' : '#FFF'} />
            <Text style={[styles.settingText, { color: theme === 'light' ? '#333' : '#FFF' }]}>
              Notificações
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={notificationsEnabled ? '#4DA8FF' : '#FFF'}
            accessibilityLabel="Ativar ou desativar notificações"
          />
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearTasks}>
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          <Text style={styles.clearButtonText}>Limpar Todas as Tarefas</Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingText: {
    fontSize: 16,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});