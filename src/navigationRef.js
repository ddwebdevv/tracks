//access to navigation outside of component
import { NavigationActions } from 'react-navigation';


let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = ( routeName, params) => {
    //navigation works same way - dispatch actions
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
};