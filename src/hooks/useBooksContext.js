import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";

export const useBooksContext = () => {

    const context = useContext(BooksContext)

    if(!context){
        throw Error('UseBooksContext must be used inside a BooksContextProvider')
    }
    return context
}