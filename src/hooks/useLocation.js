//creating reusable hooks for working with location data. so can reuse it in other projects
import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setError] = useState(null);
    const [subscriber, setSubscriber] = useState(null);

    const startWatching = async () => {
        try {            
            const { granted } = await requestPermissionsAsync();
            if (!granted) {
                throw new Error('Location permission not granted');
            }
            const sub = await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },                
                callback
            );
            setSubscriber(sub);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (shouldTrack) {
            startWatching();
        } else {
            //stop tracking location
            subscriber.remove();
            setSubscriber(null);
        }
    }, [shouldTrack]);  //run it when value of shouldTrack is changed

    return [err];

}