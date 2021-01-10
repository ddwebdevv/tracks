import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return(
        <SafeAreaView forceInset={{ top: 'always'}}>
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
            <Spacer>
                <Button
                    title='Sign Out'
                    onPress={signout}
                />
            </Spacer>
        </SafeAreaView>
    );
};

AccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <Ionicons name="ios-settings" size={35} color="#555" />
};

const styles = StyleSheet.create({});

export default AccountScreen;