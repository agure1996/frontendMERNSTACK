import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    
    const signUp = async (email,password) =>{

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save user to the local storage in the form of json web token
            localStorage.setItem('user' ,JSON.stringify(json))


            //update the auth context using the useauthcontext hook
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }

    }

    return {signUp, isLoading , error}
}