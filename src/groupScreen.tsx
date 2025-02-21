import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation";
import { fetchGroups } from "./services/api";

type GroupsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Groups">;

const GroupsScreen = () => {
  const navigation = useNavigation<GroupsScreenNavigationProp>();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
    //   const response = await fetchGroups();
      const response = [{'id':1, 'name':'Graop 1'}, {'id':2, 'name': 'group 2'}]
    setGroups(response);
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Groups</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => navigation.navigate("GroupDetails", 
                {
                     id: item.id,  
                     groupId: item.id, 
                     groupName : item.name, 
                     members : [{id:1,'name':'a', balance:100},{id:2,'name':'b', balance:100},{id:3,'name':'c', balance:0}], 
                     expenses: [{id:1,'paidBy':'a', amount:100, description:'daru ka kharcha'},{id:2,'paidBy':'b', amount:100, description:'daru ka kharcha'},{id:3,'paidBy':'c', amount:100, description:'daru ka kharcha'}],  
                }
                    
                    )}
            >
              <Text style={styles.groupName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddGroup")}>
        <Text style={styles.addButtonText}>+ Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupsScreen;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  groupItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
