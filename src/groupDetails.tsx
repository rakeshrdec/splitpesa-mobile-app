import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface GroupDetailsProps {
  route: any;
}

const GroupDetailsScreen: React.FC<GroupDetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const { groupId, groupName, members, expenses } = route.params;

  return (
    <View style={styles.container}>
      {/* Group Name */}
      <Text style={styles.groupTitle}>{groupName}</Text>
      
      {/* Members List */}
      <Text style={styles.sectionTitle}>Members</Text>
      <FlatList
        data={members}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text>{item.name}</Text>
            <Text style={styles.balance(item.balance)}>
              {item.balance > 0 ? `+₹${item.balance}` : `-₹${Math.abs(item.balance)}`}
            </Text>
          </View>
        )}
      />

      {/* Expense List */}
      <Text style={styles.sectionTitle}>Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>₹{item.amount}</Text>
            <Text>Paid by: {item.paidBy}</Text>
          </View>
        )}
      />

      {/* Actions */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddGroupExpense", { groupId, groupName, members })}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>

         {/* View Balances Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GroupBalance", { groupName })}
      >
        <Text style={styles.buttonText}>💰 View Balances</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
  groupTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  memberItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#FFF", marginBottom: 5, borderRadius: 8 },
  balance: (amount: number) => ({ color: amount >= 0 ? "green" : "red", fontWeight: "bold" }),
  expenseItem: { padding: 10, backgroundColor: "#FFF", marginBottom: 5, borderRadius: 8 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { backgroundColor: "#007BFF", padding: 12, borderRadius: 8, flex: 1, marginHorizontal: 5 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "bold" },
});

export default GroupDetailsScreen;
