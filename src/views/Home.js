import React from 'react';
import { Link } from 'react-router-dom'
import Shelf from '../components/Shelf';

/**
 * @description Represent Home view
 * @param  {String} shelfType
 * @param  {Array} books
 * @param  {Function} updateBookType
 */
const Home = (props) => {

    const {shelfType, books, updateBookType} = props

     return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(shelfType.shelfTypes).map( (key) =>  (
            <div className="bookshelf" key={key}>
                <h2 className="bookshelf-title">{shelfType.shelfTypes[key].name}</h2>
                <Shelf
                  books = {books}
                  shelfType = {shelfType.shelfTypes[key].id}
                  updateBookType = {updateBookType}
                />
            </div>
          )
          )}
        </div>
        <div className="open-search">
          <Link to='/search' >Add a book</Link>
        </div>
      </div>
     )

}

export default Home

