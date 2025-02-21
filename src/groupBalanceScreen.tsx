import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Balance {
  id: number;
  from: string;
  to: string;
  amount: number;
}

const dummyBalances: Balance[] = [
  { id: 1, from: "Alice", to: "Bob", amount: 500 },
  { id: 2, from: "Charlie", to: "Alice", amount: 300 },
  { id: 3, from: "Bob", to: "Charlie", amount: 200 },
];

const GroupBalanceScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const { groupName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName} - Balances</Text>

      {/* List of Balances */}
      <FlatList
        data={dummyBalances}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.balanceItem}>
            <Text style={styles.text}>
              {item.from} owes {item.to} ₹{item.amount}
            </Text>
          </View>
        )}
      />

      {/* Settle Up Button */}
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("SettleBalance", { groupName })}
      >
        <Text style={styles.buttonText}>💰 Settle Balances</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupBalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  balanceItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
