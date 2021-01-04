import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SaveAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return(
        <SaveAreaView forceInset={{ top: always }}>
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
            <Spacer>
                <Button
                    title='Sign Out'
                    onPress={signout}
                />
            </Spacer>
        </SaveAreaView>
    );
};

const styles = StyleSheet.create({});

export default AccountScreen;