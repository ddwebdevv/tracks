import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = ({ isFocused }) => {
    const { state, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, state.recording);
    }, [state.recording]);  //callback recreated when state.recording changed

    const [err] = useLocation(isFocused, callback);
    
    return(
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2>Create a Track</Text>
            <Map />
            {err ? <Text>Please enable location services</Text> : null}
            <TrackForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);