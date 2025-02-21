import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleAddExpense = () => {
    if (!description || !amount || !paidBy) {
      Alert.alert('Please fill all fields');
      return;
    }
    console.log({ description, amount, paidBy });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add Expense</Text>
      <TextInput
        placeholder="Description"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Amount"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Paid By"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={paidBy}
        onChangeText={setPaidBy}
      />
      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: 'blue', alignItems: 'center' }}
        onPress={handleAddExpense}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExpenseScreen;
