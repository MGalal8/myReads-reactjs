import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import shelfType from './config/shelfType'
import Home from './views/Home'
import Search from './views/Search'


class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount = () => {
    this.getBooks();
  }

  /**
   * @description  update books state
   */
  getBooks = () => {
    BooksAPI.getAll()
            .then( books => {this.setState( {books: books} )
            })
  }

  /**
   * @description Update book's shelf
   * @param  {object} book
   * @param  {string} newShelf
   */
  updateBookType = (book, newShelf) => {

    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }



  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element= {
            <Home
            shelfType={shelfType}
            books={this.state.books}
            updateBookType={this.updateBookType}
            />
          }/>

          <Route path='/search' element={
            <Search
            updateBookType = {this.updateBookType}
            shelfTypes = {shelfType.shelfTypes}
            books = {this.state.books}
            />
          }/>
          <Route path="*" element={<Navigate to="/" replace />}  />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
