import React, { Component } from 'react';
import './movie.css'
import ErrorComp from './ErrorComp';
import Modal from '../Components/Modal';
import Spinner from '../Spinner/Spinner';
import Display from '../Components/Display';
import { MOVIE_LIST_URL, MOVIES_PAGE } from '../constants/URLs';
import Pagination from '../Components/Pagination';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            result_arr: {},
            last_movie_state: '',
            showComp: false,
            modal_show: false,
            modal_text: '',
            pages: 0,
            currentPage: 0,
            clicked: false
        }
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        let mybutton = document.getElementById('myBtn');
        // When you scroll for 60px from top then show the button else dont show it.
        window.onscroll = function() {
            if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 150) {
                mybutton.style.display = 'block';
            } else {
                mybutton.style.display = 'none';
            }
        };
        // When component is mounted then display it with #efeaea - white background
        document.body.style.backgroundColor = '#fbdb89'; 
        document.getElementById('root').style.backgroundColor = '#fbdb89';
        // focuses on search box
        this.inputElementRef.current.focus();
    }

    handleSearchButton = (event) => {
        event.preventDefault();
        this.setState({clicked: true});
        async function getMovie (movie_name_param) {
            try {
                let moviesUrl = MOVIE_LIST_URL.replace('%s', movie_name_param);
                const res = await fetch(moviesUrl);
                const data = await res.json();
                return data;
            }
            catch (e) {
                console.log(`We encountered an error with the API call: ${e}`);
            }
        }
        
        let current_movie = this.state.query;
        let last_movie = this.state.last_movie_state;
        if(current_movie !== last_movie) {
            getMovie(current_movie)
            .then((data1) => {
                if (data1.total_pages === 0) {
                    this.showModal(`We couldn't find a movie by this name`);
                }
                else if (data1.total_pages >= 1) {
                    this.setState({pages: data1.total_pages});
                    this.setState({result_arr: {...this.state.result_arr, [data1.page]: data1.results}});
                    this.setState({currentPage: data1.page});
                    this.setState({last_movie_state: current_movie});
                    this.setState({showComp: true});
                }
                else if(data1.status_code === 7) {
                    this.showModal('Please check your API key.');
                    this.setState({showComp: false});
                }
                else {
                    this.showModal('Please enter a movie.');
                    this.setState({showComp: false});
                }
            })
            .catch((e) => {
                console.log(`We encountered an error ${e}`);
            });
        }
        else if (current_movie === '') {
            this.showModal('Please enter a movie.');
            this.setState({showComp: false});
        }
        else if (this.state.showComp && current_movie === last_movie) {
            this.showModal('You are currently viewing the same movie.');
        }
        else {
            this.setState({showComp: true});
        }
    }

    newMethod = async (pages, movie) => {
        try {
                let newPageMovies = MOVIES_PAGE.replace('%s1', movie).replace('%s2', pages);
                const res = await fetch(newPageMovies);
                const data = await res.json();
                return data;
            }
        catch (e) {
            console.log(`We encountered an error while getting movie pages data: ${e}`);
        }
    }

    handleChange = (event) => {
        if(event.target.name === 'query') {
            this.setState({query: event.target.value});
            this.setState({showComp: false});
            this.setState({last_movie_state: ''});
            this.setState({result_arr: {}});
            this.setState({clicked: false});
            if(this.state.modal_text !== '') {
                this.setState({modal_text: ''});
            }
        }
    }

    handleTopButton = () => {
        // Whenever top button is clicked, then scroll back to top with 0px
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    showModal = (str) => {
        if(str !== '') {
            this.setState({modal_text: str});
        }
        this.setState((prevState) => {
            return {modal_show: !prevState.modal_show}
        })
    };

    paginate_func = (number) => {
        if(!this.state.result_arr.hasOwnProperty(number))
        {
            this.setState({showComp: false});
            this.newMethod(number, this.state.last_movie_state)
            .then( data1 => {
                this.setState({result_arr: {...this.state.result_arr, [data1.page]: data1.results}});
                this.setState({pages: data1.total_pages})
                this.setState({currentPage: number});
                this.setState({showComp: true});
            })
            .catch(e => console.log(`We encountered an error while navigating movies: ${e}`));
            this.setState({currentPage: number});
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        else {
            this.setState({currentPage: number});
        }
    };

    render() {
        let displayComp = null, loadingText = null, pageNumbers = null;

        if(this.state.showComp === true && this.state.query !== '') {
            displayComp = (
                <Display 
                    movie_list = {this.state.result_arr[this.state.currentPage]} 
                    onCloseProp = {this.showModal}/>
            );
            pageNumbers = (
                <Pagination 
                    totalMoviesArray = {this.state.pages} 
                    paginate = {this.paginate_func}
                    currentPage_prop = {this.state.currentPage} />
            );
        }

        if(!this.state.showComp && this.state.clicked && this.state.modal_text === '') {
            loadingText = (
                <div>
                    <Spinner/>
                </div>
            );
        }

        return (
            <div style = {{margin: '32px 10px 0'}}>
                <form onSubmit = {this.handleSearchButton} className="formContainer">
                    <input 
                        className = 'movie_input' 
                        id = 'movie_search' 
                        ref = {this.inputElementRef}
                        name = 'query' 
                        autoComplete = 'off'
                        spellCheck = 'false'
                        value = {this.state.query} 
                        type = 'text' 
                        placeholder = 'Search for a movie name!' 
                        onChange = {this.handleChange} />
                    <button className = 'search' type = 'submit'>
                        Search
                    </button>
                    <Modal 
                        show = {this.state.modal_show} 
                        onClose = {this.showModal} 
                        modal_text_prop = {this.state.modal_text} />
                </form>
                <ErrorComp>
                    {loadingText}
                    {displayComp}
                    {pageNumbers}
                </ErrorComp>
                <button id = 'myBtn' onClick = {this.handleTopButton}>Top</button>
            </div>
        );
    }
}

export default Search;
