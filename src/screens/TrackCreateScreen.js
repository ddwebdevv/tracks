import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Entypo } from '@expo/vector-icons'; 
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);  //callback recreated when state.recording changed

    const [err] = useLocation(isFocused || recording, callback);
    
    return(
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Create Track',
    tabBarIcon: <Entypo name="plus" size={40} color="#555" />,
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
            fontWeight:'bold'
        }
    }
};

export default withNavigationFocus(TrackCreateScreen);