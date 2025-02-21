import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
}

const expenses: Expense[] = [
  { id: '1', description: 'Dinner', amount: 500, paidBy: 'John' },
  { id: '2', description: 'Movie Tickets', amount: 300, paidBy: 'Jane' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleExpensePress = (expenseId: string) => {
    navigation.navigate("expensedetailsscreen", { expenseId });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Expenses
      </Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleExpensePress(item.id)}>
            <Text>{item.description} - ₹{item.amount} (Paid by {item.paidBy})</Text>
            <Text style={{width:'100%', backgroundColor:'black', height:1, marginVertical:5}}></Text>
            </TouchableOpacity>
        )}

      />

    <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: 'blue', alignItems: 'center' }}
        onPress={() => { navigation.navigate("AddGroup")}}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>+ Add Group</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: 'blue', alignItems: 'center' }}
        onPress={() => navigation.navigate("Groups")}
        >
            <Text style={{ color: 'white', fontSize: 18 }}>View Groups</Text>
     </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: 'blue', alignItems: 'center' }}
        onPress={() => { navigation.navigate("addexpense")}}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>+ Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
