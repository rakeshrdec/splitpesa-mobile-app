import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// Define route type
type ExpenseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ExpenseDetails'>;

interface Props {
  route: ExpenseDetailsScreenRouteProp;
}

const ExpenseDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { expense } = route.params;

  const handleEdit = () => {
    navigation.navigate('editexpensescreen', { expense });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Expense deleted') }
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Expense Details</Text>
      <Text style={{ fontSize: 18 }}>Description: {'expense.description'}</Text>
      <Text style={{ fontSize: 18 }}>Amount: ₹{'expense.amount'}</Text>
      <Text style={{ fontSize: 18 }}>Paid By: {'expense.paidBy'}</Text>

      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: 'green', alignItems: 'center' }}
        onPress={handleEdit}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Edit Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 10, padding: 15, backgroundColor: 'red', alignItems: 'center' }}
        onPress={handleDelete}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Delete Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseDetailsScreen;
