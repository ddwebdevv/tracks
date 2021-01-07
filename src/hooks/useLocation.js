//creating reusable hooks for working with location data. so can reuse it in other projects
import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setError] = useState(null);

    //moved inside useEffect as good practice to see all dependancies
    // const startWatching = async () => {
    //     try {            
    //         const { granted } = await requestPermissionsAsync();
    //         if (!granted) {
    //             throw new Error('Location permission not granted');
    //         }
    //         const sub = await watchPositionAsync(
    //             {
    //                 accuracy: Accuracy.BestForNavigation,
    //                 timeInterval: 1000,
    //                 distanceInterval: 10
    //             },                
    //             callback
    //         );
    //         setSubscriber(sub);
    //     } catch (error) {
    //         setError(error);
    //     }
    // };

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {            
                const { granted } = await requestPermissionsAsync();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    },                
                    callback
                );
            } catch (error) {
                setError(error);
            }
        };

        if (shouldTrack) {
            startWatching();
        } else {
            //stop tracking location
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        //adding cleanup function as return so when useEffect renders next time it'll not create another listener
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);  //run it when value of shouldTrack is changed or callback,
                                    //useCallback will return same callback until recordind is the same
                                    //so useEffect will render correctly without stale referenses or memory leak
                                    //from docs: need add all dependencies(var that changing) inside second parameter
                                    //to avoid stale referenses or memory leak
    return [err];

}