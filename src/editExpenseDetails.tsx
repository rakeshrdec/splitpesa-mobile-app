import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./navigation";

type EditExpenseRouteProp = RouteProp<RootStackParamList, "EditExpense">;

const EditExpenseScreen = () => {
  const route = useRoute<EditExpenseRouteProp>();
  const navigation = useNavigation();
  const { expenseId } = route.params;

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payerId, setPayerId] = useState("");

  useEffect(() => {
    // Fetch existing expense details from API
    // fetch(`https://your-api.com/expenses/${expenseId}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDescription(data.description);
    //     setAmount(String(data.amount));
    //     setPayerId(String(data.paid_by));
    //   })
    //   .catch((error) => console.error("Error fetching expense:", error));

      setDescription('data.description');
        setAmount(String('data.amount'));
        setPayerId(String('data.paid_by'));

  }, [expenseId]);

  const handleUpdateExpense = () => {
    if (!description || !amount || !payerId) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    Alert.alert("Success", "Expense updated successfully");
    navigation.goBack(); 

    // fetch(`https://your-api.com/expenses/${expenseId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ description, amount: parseFloat(amount), paid_by: payerId }),
    // })
    //   .then((response) => {
    //     if (!response.ok) throw new Error("Failed to update expense");
    //     return response.json();
    //   })
    //   .then(() => {
    //     Alert.alert("Success", "Expense updated successfully");
    //     navigation.goBack(); // Navigate back to Expense Details or Home
    //   })
    //   .catch((error) => {
    //     Alert.alert("Error", "Failed to update expense");
    //     console.error("Error:", error);
    //   });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Amount:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <Text style={styles.label}>Paid By (User ID):</Text>
      <TextInput style={styles.input} value={payerId} onChangeText={setPayerId} />

      <Button title="Update Expense" onPress={handleUpdateExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginTop: 5 },
});

export default EditExpenseScreen;
