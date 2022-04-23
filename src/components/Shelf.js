import React from 'react';
import Book from './Book';


/**
 * @description Represent Self component
 * @param  {String} shelfType
 * @param  {Array} books
 * @param  {Function} updateBookType
 */

const Shelf = (props) => {

    const { books, shelfType, updateBookType } = props
        return (
            <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter( book => book.shelf === shelfType ).map( (book) => {
                return(
                  <Book
                  key={book.id}
                  book={book}
                  updateBookType={updateBookType}
                  shelfType = {shelfType}
                  />
                )}
              )}
            </ol>
          </div>
        )
    }
export default Shelf