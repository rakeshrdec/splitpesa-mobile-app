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
      </Stack.Navigator>
    // </NavigationContainer>
  );
}