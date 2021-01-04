import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
            <NavigationEvents
                onWillFocus={clearErrorMessage}
            />
            <AuthForm
                headerText='Sign In for Tracker'
                errorMessage={state.errorMessage}
                submitButtonText='Sign In'
                onSubmit={signin}
            />
            <NavLink
                routeName='Signup'
                text="Don't have an account? Sign up instead!"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 30
    }    
});

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
};

export default SigninScreen;

