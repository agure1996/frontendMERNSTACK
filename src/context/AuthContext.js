import { createContext, useReducer , useEffect } from 'react'


export const AuthContext = createContext();

//handle difference cases: login and logout cases
export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    /*imported useEffect and use it once when the component first renders(when app starts) check for token in local storage to see if we have a value for it in there if we do then the value is logged in otherwise it wont be logged in, this prevents details from being left in the application on website which can be seen*/

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem('user'))

        //if userlogged in we dispatch the login action below
        if(user){
            dispatch({type:'LOGIN' , payload:user})
        }
    },[])

    //use this console log to keep track of the state of the authcontext
    console.log('AuthContext state: ' , state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}