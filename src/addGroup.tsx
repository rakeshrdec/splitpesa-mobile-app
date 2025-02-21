import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface User {
  id: number;
  name: string;
  isSelected: boolean;
}

const mockUsers: User[] = [
  { id: 1, name: "Alice", isSelected: false },
  { id: 2, name: "Bob", isSelected: false },
  { id: 3, name: "Charlie", isSelected: false },
  { id: 4, name: "David", isSelected: false },
];

const AddGroupScreen: React.FC = () => {
  const navigation = useNavigation();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<User[]>(mockUsers);

  const handleMemberSelect = (userId: number) => {
    setMembers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isSelected: !user.isSelected } : user))
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName) {
      Alert.alert("Please enter a group name");
      return;
    }

    const selectedMembers = members.filter((user) => user.isSelected);
    if (selectedMembers.length === 0) {
      Alert.alert("Please select at least one member");
      return;
    }

    const groupData = {
      name: groupName,
      members: selectedMembers.map((user) => ({ userId: user.id, name: user.name })),
    };

    try {
      // TODO: Replace with actual API call
      console.log("Creating Group:", groupData);
      Alert.alert("Group created successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Failed to create group");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Create Group</Text>

      {/* Group Name Input */}
      <TextInput
        placeholder="Enter Group Name"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        value={groupName}
        onChangeText={setGroupName}
      />

      {/* Member Selection */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select Members:</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleMemberSelect(item.id)}
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

      {/* Create Group Button */}
      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: "blue", alignItems: "center" }}
        onPress={handleCreateGroup}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddGroupScreen;
