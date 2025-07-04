import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskContext } from '../TaskContext';

export default function TaskScreen({ navigation }) {
  const { theme, tasks, setTasks, logout } = useContext(TaskContext);
  const [task, setTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [fadeAnim] = useState(new Animated.Value(0));

  const animateList = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const addTask = () => {
    if (!task.trim()) {
      setError('Por favor, insira uma tarefa válida');
      return;
    }
    
    if (editingTaskId) {
      setTasks(tasks.map(t => t.id === editingTaskId ? { ...t, title: task } : t));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), title: task, completed: false }]);
    }
    setTask('');
    setError('');
    animateList();
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    animateList();
  };

  const startEditing = (id) => {
    const taskToEdit = tasks.find(t => t.id === id);
    setTask(taskToEdit.title);
    setEditingTaskId(id);
    setError('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#F8F8FA' : '#1C2526' }]}>
      <Header navigation={navigation} theme={theme} logout={logout} />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: theme === 'light' ? 'white' : '#2C3E50',
              borderColor: error ? '#FF3B30' : 'transparent'
            }]}
            placeholder={editingTaskId ? "Editar tarefa" : "Nova tarefa"}
            placeholderTextColor={theme === 'light' ? '#666' : '#A0A0A0'}
            value={task}
            onChangeText={setTask}
            accessibilityLabel={editingTaskId ? "Editar tarefa" : "Adicionar nova tarefa"}
            onSubmitEditing={addTask}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: editingTaskId ? '#34C759' : '#007AFF' }]} 
            onPress={addTask}
            accessibilityLabel={editingTaskId ? "Salvar edição" : "Adicionar tarefa"}
          >
            <Ionicons name={editingTaskId ? "checkmark" : "add"} size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterContainer}>
          {['all', 'pending', 'completed'].map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, filter === type && styles.activeFilter]}
              onPress={() => setFilter(type)}
              accessibilityLabel={`Filtrar por ${type === 'all' ? 'todas' : type === 'pending' ? 'pendentes' : 'concluídas'}`}
            >
              <Text style={[styles.filterText, filter === type && styles.activeFilterText]}>
                {type === 'all' ? 'Todas' : type === 'pending' ? 'Pendentes' : 'Concluídas'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.taskItem, { 
                backgroundColor: theme === 'light' ? 'white' : '#2C3E50',
                opacity: item.completed ? 0.6 : 1
              }]}>
                <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                  <Ionicons 
                    name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={item.completed ? '#34C759' : theme === 'light' ? '#666' : '#A0A0A0'} 
                  />
                </TouchableOpacity>
                <Text style={[styles.taskText, { 
                  color: theme === 'light' ? '#333' : '#FFF',
                  textDecorationLine: item.completed ? 'line-through' : 'none'
                }]}>
                  {item.title}
                </Text>
                <View style={styles.taskActions}>
                  <TouchableOpacity 
                    onPress={() => startEditing(item.id)}
                    accessibilityLabel="Editar tarefa"
                  >
                    <Ionicons name="pencil-outline" size={20} color={theme === 'light' ? '#007AFF' : '#4DA8FF'} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => deleteTask(item.id)}
                    accessibilityLabel="Excluir tarefa"
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={[styles.emptyText, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
              {filter === 'all' ? 'Sem tarefas' : filter === 'completed' ? 'Nenhuma tarefa concluída' : 'Nenhuma tarefa pendente'}
            </Text>}
          />
        </Animated.View>
      </View>
      <Footer theme={theme} taskCount={tasks.length} />
    </View>
  );
}

function Header({ navigation, theme, logout }) {
  return (
    <View style={[styles.header, { backgroundColor: theme === 'light' ? '#007AFF' : '#1A73E8' }]}>
      <Text style={styles.headerText}>Tarefas</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('About')} 
          accessibilityLabel="Sobre o aplicativo"
        >
          <Ionicons name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Configurações"
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={logout} 
          accessibilityLabel="Sair do aplicativo"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Footer({ theme, taskCount }) {
  return (
    <View style={[styles.footer, { backgroundColor: theme === 'light' ? 'white' : '#2C3E50' }]}>
      <Ionicons name="calendar-outline" size={20} color={theme === 'light' ? '#666' : '#A0A0A0'} />
      <Text style={[styles.footerText, { color: theme === 'light' ? '#666' : '#A0A0A0' }]}>
        Tarefas 2025 ({taskCount} {taskCount === 1 ? 'tarefa' : 'tarefas'})
      </Text>
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
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 8,
  },
  addButton: {
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    elevation: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  taskItem: {
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 12,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  footerText: {
    fontSize: 14,
  },
});