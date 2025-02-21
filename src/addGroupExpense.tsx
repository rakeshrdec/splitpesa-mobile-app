import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";

interface User {
  id: number;
  name: string;
  isSelected: boolean;
}

interface RouteParams {
  groupId: number;
  groupName: string;
  members: User[];
}

const AddGroupExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();

  const { groupId, groupName, members } = route.params;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<number | null>(null);
  const [splitAmong, setSplitAmong] = useState<User[]>(members);

  const handleSelectPayer = (userId: number) => {
    setPaidBy(userId);
  };

  const handleSplitAmongToggle = (userId: number) => {
    setSplitAmong((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isSelected: !user.isSelected } : user))
    );
  };

  const handleAddExpense = async () => {
    if (!description || !amount || paidBy === null) {
      Alert.alert("Please fill all fields and select payer");
      return;
    }

    const selectedMembers = splitAmong.filter((user) => user.isSelected);
    if (selectedMembers.length === 0) {
      Alert.alert("Please select at least one member to split the expense");
      return;
    }

    const expenseData = {
      groupId,
      description,
      amount: parseFloat(amount),
      paidBy,
      splitAmong: selectedMembers.map((user) => ({ userId: user.id, name: user.name })),
    };

    try {
      // TODO: Replace with actual API call
      console.log("Adding Group Expense:", expenseData);
      Alert.alert("Expense added successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Failed to add expense");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Add Expense to {groupName}</Text>

      {/* Expense Description */}
      <TextInput
        placeholder="Expense Description"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={description}
        onChangeText={setDescription}
      />

      {/* Expense Amount */}
      <TextInput
        placeholder="Amount"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Select Who Paid */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Who Paid?</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectPayer(item.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderWidth: 1,
              marginBottom: 5,
              backgroundColor: paidBy === item.id ? "lightgreen" : "white",
            }}
          >
            <Text>{item.name}</Text>
            <Text>{paidBy === item.id ? "✅" : "❌"}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Select Who Shares the Expense */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Split Among:</Text>
      <FlatList
        data={splitAmong}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSplitAmongToggle(item.id)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              borderWidth: 1,
              marginBottom: 5,
              backgroundColor: item.isSelected ? "lightblue" : "white",
            }}
          >
            <Text>{item.name}</Text>
            <Text>{item.isSelected ? "✅" : "❌"}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Expense Button */}
      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: "blue", alignItems: "center" }}
        onPress={handleAddExpense}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddGroupExpenseScreen;
