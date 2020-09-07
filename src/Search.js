import React, { Component } from 'react';
import './movie.css'
import Display from './Display';
import ErrorComp from './ErrorComp';
import Modal from './Modal';
require('dotenv').config();
let API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

class Search extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
        this.state = {
            query: '',
            result_arr: [],
            last_movie_state: '',
            showComp: false,
            check: false,
            modal_show: false,
            modal_text: '',
            pages: 0
        }
        this.handleChange = this.handleChange.bind(this);
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

        async function getMovie (movie_name_param) {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movie_name_param}&page=1&include_adult=false`)
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
                    this.setState({pages: data1.total_pages})
                    for (let i = 1; i <= data1.total_pages; i++) {
                        this.newMethod(i, current_movie)
                        .then((total_data) => {
                            this.setState({result_arr: [...this.state.result_arr, total_data]});
                            this.setState({showComp: true});
                        })
                        .catch((e) => {
                            console.log(`We encountered an error while getting the current movie data: ${e}`)
                        });
                    }
                    this.setState({last_movie_state: current_movie});
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
                console.log(`We encountered an error ${e}`)
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
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movie}&page=${pages}&include_adult=false`);
                const data = await res.json();
                return data.results;
            }
        catch (e) {
            console.log(`We encountered an error while getting movie pages data: ${e}`)
        }
    }

    handleChange(event) {
        
        if(event.target.name === 'query') {
            this.setState({query: event.target.value});
            this.setState({showComp: false});
            this.setState({last_movie_state: ''});
            this.setState({result_arr: []});
            this.setState({pages: 0});
        }
        else if (event.target.name === 'checkbox') {
            // this.setState({check: !this.state.check});
            this.setState((prevState) => {
                return {check: !prevState.check}
            })
            let getTrailerClass = document.getElementsByClassName('trailerButtonClass');
            if(this.state.check === true) {
                document.body.style.backgroundColor = '#fbdb89';
                document.getElementById('root').style.backgroundColor = '#fbdb89';
                document.getElementById('root').style.color = '#000000';
                for(let i = 0; i < getTrailerClass.length; i++) {
                    getTrailerClass[i].style.color = '#19191b';
                }
            }
            else {
                // #19191b - black background
                document.body.style.backgroundColor = '#19191b';
                document.getElementById('root').style.backgroundColor = '#19191b';
                document.getElementById('root').style.color = '#efeaea';
                for(let i = 0; i < getTrailerClass.length; i++) {
                    getTrailerClass[i].style.color = '#efeaea';
                }
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

    render() {
        let displayComp = null, loadingText = null;

        if(this.state.showComp === true && this.state.query !== '' && this.state.result_arr.length === this.state.pages) {
            displayComp = (
                <Display 
                    movie_list = {this.state.result_arr} 
                    movie_api = {API_KEY} 
                    onCloseProp = {this.showModal}/>
            );
        }

        if(this.state.result_arr.length !== this.state.pages) {
            loadingText = (
                <div 
                    style = {{fontSize: '20px', textAlign: 'center', fontFamily: 'arial', margin: '40px'}}>
                Loading...
                </div>
            );
        }

        return (
            <div style = {{margin: '20px'}}>
                <form onSubmit = {this.handleSearchButton}>
                    <div className = 'row'>
                        <div className = 'column mainElement'>
                            <label 
                                className = 'movie_label' 
                                htmlFor = 'movie_search'>
                                Enter movie here 
                            </label>
                            <input 
                                className = 'movie_input' 
                                id = 'movie_search' 
                                ref = {this.inputElementRef}
                                name = 'query' 
                                autoComplete = 'off'
                                spellCheck = 'false'
                                value = {this.state.query} 
                                type = 'text' 
                                placeholder = 'Type movie name' 
                                onChange = {this.handleChange} />
                        </div>
                        <div className = 'column mainElement'>
                            <button className = 'search' type = 'submit'>
                                Search
                            </button>
                            <Modal 
                                show = {this.state.modal_show} 
                                onClose = {this.showModal} 
                                modal_text_prop = {this.state.modal_text} />
                        </div>
                    </div>
                </form>
                        <label 
                            htmlFor = 'toggle' 
                            className = 'mode'>
                            Dark Theme
                        </label>
                        <label className = 'switch' htmlFor = 'toggle'>
                            <input 
                                name = 'checkbox' 
                                id = 'toggle' 
                                value = {this.state.check} 
                                type = 'checkbox'
                                onChange = {this.handleChange} />
                            <span className = 'slider round'></span>
                        </label>
                <ErrorComp>
                    {loadingText}
                    {displayComp}
                </ErrorComp>
                <button id = 'myBtn' onClick = {this.handleTopButton}>Top</button>
            </div>
        );
    }
}

export default Search;