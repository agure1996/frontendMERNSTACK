import { useEffect } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'
//Components
import BookDetails from '../components/BookDetails'
import BookForm from '../components/BookForm'

const Home = () => {

   const {books, dispatch} =  useBooksContext()
   const {user} = useAuthContext()
   
   
    useEffect(() =>{

        const fetchBooks = async () =>{
            const response = await fetch('/api/books' , {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()


            if (response.ok){
                dispatch({type: 'SET_BOOKS',payload:json})   
            }
        }
        //If user not logged in
        if(user){
          fetchBooks()   
        }

        
    } ,[dispatch, user])
    return (
        <div className='home'>
            <div className="books">
                {books && books.map(book =>(
                    <BookDetails key={book._id}
                    book = {book}
                     />
                ))}
            </div>
            <BookForm />
        </div>
    )
}

export default Home