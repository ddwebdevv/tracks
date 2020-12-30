import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Spacer>
                <Text h3>Sign Up for tracker</Text>
            </Spacer>
            <Spacer>
                <Input label="Email" />
            </Spacer>
            <Spacer>
                <Input label="Password" />
            </Spacer>
            <Spacer>
                <Button title="Sign Up" />
            </Spacer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 150
    }
});

SignupScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
};

export default SignupScreen;

