/* eslint-disable no-unused-vars */
import {useState } from 'react'
import { useBooksContext } from '../hooks/useBooksContext'
import { useAuthContext } from '../hooks/useAuthContext'
const BookForm = () => {
  const {dispatch} = useBooksContext()
  const { user } = useAuthContext()
  
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[pages, setPages] = useState('')
  const[contact, setContact] = useState('')
  const[error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])
  

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!user){
        setError('You must be logged in')
        return 
    }

    const book = {title,author,pages,contact}

    const response = await fetch('/api/books' , {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }

    if(response.ok){
        setTitle('')
        setAuthor('')
        setPages('')
        setContact('')
        setError(null)
        setEmptyFields([])
        console.log("New Book Added to Bookstore Library" , json)
        dispatch({type: 'CREATE_BOOK', payload:json})
    }
  }
    return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Book </h3>
        
        <label>Book Title: </label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')? 'error' : ''}
        />
        
        <label>Book Author: </label>
        <input 
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
            value={author}
            className={emptyFields.includes('author')? 'error' : ''}
        />

        <label>How Many Pages: </label>
        <input 
        type="number"
        onChange={(e) => setPages(e.target.value)}
            value={pages}
            className={emptyFields.includes('pages')? 'error' : ''}
        />

        <label>Author Contact: </label>
        <input 
        type="number"
        onChange={(e) => setContact(e.target.value)}
            value={contact}
            className={emptyFields.includes('contact')? 'error' : ''}
        />

        <button type="submit">Add Book</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default BookForm