import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signin':
            return { token: action.payload, errorMessage: '' };
        case 'signout':
            return { token: null , errorMessage: '' }
        default: 
            return state;
    }
};

//auto signin if token in local storage
const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};

//clearing errorMessage in state when navigating to another screen
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
};
 
const signup = (dispatch) => async ({ email, password }) => {
    //make api request
    try {
        const response = await trackerApi.post('/signup', { email, password });
        //storing token on the device 
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ 
            type: 'signin',
            payload: response.data.token
        });
        //navigate to mainFlow
        navigate('TrackList');
    } catch(err) {
        dispatch({ 
            type: 'add_error',
            payload: 'Something went wrong with sign up'
        });
    }    
};

const signin = (dispatch) => async ({ email, password }) => {
    try{
        const response = await trackerApi.post('/signin', { email, password });
        //storing token on the device 
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ 
            type: 'signin',
            payload: response.data.token
        });
        //navigate to mainFlow
        navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    }
};


const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({
        type: 'signout'
    });
    navigate('loginFlow');
};


export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { 
        token: null,
        errorMessage: ''
    }
)