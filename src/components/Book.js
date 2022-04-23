import React from 'react';

/**
 * @description Represent Book sub-component
 * @param  {String} shelfType
 * @param  {object} book
 * @param  {Function} updateBookType
 */

const Book = (props) => {

    const { book, updateBookType, shelfType } = props;

    /* Update Book's shelf */
    const updateBook = (shelf) => {
        updateBookType(book, shelf)
    }
    const hasImage = book.hasOwnProperty('imageLinks') ? true : false
    return(
        <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${hasImage && book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={shelfType} onChange={(e) => updateBook(e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
        </li>
    )
}

export default Book