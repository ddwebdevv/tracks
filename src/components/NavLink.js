import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';

const NavLink = ({ navigation, text, routeName }) => {
    return(
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.signinLink}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signinLink: {
        marginHorizontal: 15,
        fontSize: 16,
        color: 'blue'
    }
});

export default withNavigation(NavLink);
