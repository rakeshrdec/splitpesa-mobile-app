// src/navigation/AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import HomeScreen from '../screens/HomeScreen';
// import AddExpenseScreen from '../screens/AddExpenseScreen';
import AuthScreen from './loginSignUp';
import HomeScreen from './homeScreen';
import AddExpenseScreen from './addExpense';
import ExpenseDetailsScreen from './expanseDetails';
import EditExpenseScreen from './editExpenseDetails';

import GroupsScreen from './groupScreen';
import GroupDetailsScreen from './groupDetails';
import AddGroupScreen from './addGroup';
import AddGroupExpenseScreen from './addGroupExpense';
import GroupBalanceScreen from './groupBalanceScreen';

const Stack = createNativeStackNavigator();
export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    AddExpense: undefined;
    ExpenseDetails: { expenseId: string };
    EditExpense: { expenseId: string };
  };


export default function AppNavigator() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loginsignup" component={AuthScreen} />
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen name="addexpense" component={AddExpenseScreen} />
        <Stack.Screen name="expensedetailsscreen" component={ExpenseDetailsScreen} />
        <Stack.Screen name="editexpensescreen" component={EditExpenseScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen name="AddGroup" component={AddGroupScreen} />
        <Stack.Screen name="AddGroupExpense" component={AddGroupExpenseScreen} />
        <Stack.Screen name="GroupBalance" component={GroupBalanceScreen} />

      </Stack.Navigator>
    // </NavigationContainer>
  );
}