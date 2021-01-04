import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker'; 

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { token: action.payload, errorMessage: '' };
        default: 
            return state;
    }
};
 
const signup = (dispatch) => async ({ email, password }) => {
    //make api request
    try {
        const response = await trackerApi.post('/signup', { email, password });
        //storing token on the device 
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ 
            type: 'signup',
            payload: response.data.token
        });
        //navigate to mainFlow

    } catch(err) {
        console.log(err.response.data);
        dispatch({ 
            type: 'add_error',
            payload: 'Something went wrong with sign up'
        });
    }    
};

const signin = (dispatch) => {
    return ({ email, password }) => {
        
    };
}

const signout = (dispatch) => {
    return ({ email, password }) => {
        
    };
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { 
        token: null,
        errorMessage: ''
    }
)