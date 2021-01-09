//hook for communicating different contexts.
//in this case will use info from LocationContext and actions from TrackContext
import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const { state: { locations, name }} = useContext(LocationContext);

    const saveTrack = () => {
        createTrack(name, locations);
    };

    return [saveTrack];
};