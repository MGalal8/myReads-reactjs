import React from 'react';
import * as BooksAPI from '.././BooksAPI'
import Book from '../components/Book';
import {Link} from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';


/**
 * @description Handle search form and results
 * @param  {string} query
 * @returns render Search form and Search results
 */
class Search extends React.Component {

    state = {
        query : '',
        searchResult: []
    }
    /**
     * @description Remove white space from string
     * @param  {String} str
     */
    removeWhiteSpace = (str) => (str.replace(/  +/g,' ').trim())


    /**
     * @description Update Search query then call handleSearch method
     * @param  {string} query
     */
    updateQuery = (e) => {
        this.setState( () => ({query: e.target.value }))
        this.handleSearch(this.state.query)
    }

    /**
     * @description Call Search method API to retrieve books then search for book resualts into our book to sync their shelf.
     * @param  {} query
     */
    handleSearch = (query) => {

        query = this.removeWhiteSpace(query)
        if (query.length === 0) {
            this.setState( () => ( {searchResult : []} ))
            return
        }

        this.setState( () => ( {searchResult : []} ))
        BooksAPI.search(query).then( (res) => {

            const result = Boolean(res.error)? [] : res

            result.forEach( item => {
                const existBook = this.props.books.find( myBook => myBook.id === item.id )
                existBook? item.shelf = existBook.shelf: item.shelf = 'none';
            })
            this.setState( () => ( {searchResult : result} ))
        })
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'  className ="close-search">Back Home </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <DebounceInput
                            className='search-input'
                            placeholder='Search for Books'
                            onChange={this.updateQuery}
                            value={this.state.query}
                            minLength={2}
                            debounceTimeout={300}
                        />
                    </div>
                </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.searchResult.map( (book) => {
                        return(
                            <Book
                                key={book.id}
                                book={book}
                                updateBookType={this.props.updateBookType}
                                shelfType = {book.shelf}/>
                        )}
                    )}
                </ol>
            </div>
        </div>
        )
    }
}

export default Search

