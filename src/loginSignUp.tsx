import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type AuthScreenProps = {
    navigation: any;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleLogin = (): void => {
        console.log('Logging in with:', email, password);
        console.log('here call API');
        navigation.navigate('homescreen')
        
    };
    
    const handleSignup = (): void => {
        console.log('Signing up with:', email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Splitwise Clone</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>GetIn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                <Text style={styles.signupText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    signupButton: {
        marginTop: 10,
    },
    signupText: {
        color: '#007bff',
    },
});

export default AuthScreen;
