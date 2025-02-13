import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    return(
        <>
            <NavigationEvents
                onWillFocus={fetchTracks}
            />
            <FlatList
            style={styles.container}
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return(
                        <TouchableOpacity
                            style={styles.space}
                            onPress={() => 
                                navigation.navigate('TrackDetail', { _id: item._id})
                            }
                        >
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {item.name}
                                    </ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    space: {
        marginHorizontal: 15
    },
    container: {
        marginTop: 20
    }
});

export default TrackListScreen;