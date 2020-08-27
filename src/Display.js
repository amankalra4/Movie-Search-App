import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import pic from './movie.jpg';
import Pagination from './Pagination';

class Display extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            moviesArrayPerPage: 1
        }
    }

    getVideo = (id) => {
        const {movie_api} = this.props;
        async function getVideos(movie_id) {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${movie_api}`);
                const data = await res.json();
                return data;
            }
            catch(e) {
                console.log(`We encountered an error ${e}`);
            }
        }

        getVideos(id)
        .then((data1) => {
            if("results" in data1 && data1.results.length !== 0) {
                    this.youtube(data1.results[0].key);
            }
            else {
                this.props.onCloseProp(`Sorry, we couldn't find a related video!`);
            }
        })
        .catch((e) => {
            console.log(`We encountered an error ${e}`)
        });
    }

    youtube = (id) => {
        const url = `https://www.youtube.com/watch?v=${id}`;
        window.open(url, '_blank');
    }

    paginate_func = (number) => {
        this.setState({currentPage: number});
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    render () {
        const indexOfLastMovie = this.state.currentPage * this.state.moviesArrayPerPage;
        const indexOfFirstMovie = indexOfLastMovie - this.state.moviesArrayPerPage;
        // let currentMovie = this.props.movie_list.slice(indexOfFirstMovie, indexOfLastMovie);
        return (
            <div>
                {this.props.movie_list.includes('This is default props')
                ?
                    <p className = 'defaultProp'>Sorry! We couldn't find your data.<br/>
                                                    Please try after sometime!</p>
                :   
                    this.props.movie_list[indexOfFirstMovie].map((element) =>
                            <div key = {element.id} className = 'moviesDiv'>
                            <div className = 'row'>
                                
                                <div className = 'column'>
                                    <p>
                                        <strong>Movie: </strong>
                                        {element.title}
                                    </p>

                                    {("release_date" in element && element.release_date !== '')
                                    ?
                                        <p>
                                            <strong>Release year: </strong>
                                            {element.release_date.substring(0, 4)}
                                        </p>
                                    :
                                        <p>
                                            <strong>Release year: </strong>
                                            Sorry, we couldn't fetch the release year.
                                        </p>
                                    }
                                </div>
                                
                                <div className = 'column'>
                                    {element.poster_path !== null 
                                    ? 
                                        <img 
                                            src = {`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${element.poster_path}`}
                                            alt = 'Alternate text' 
                                            style = {{border: '0.5px solid black'}} 
                                            title = {element.title} />
                                    :
                                        <img 
                                            src = {pic}
                                            className = 'alternateImageClass'
                                            alt = 'Alternate text' 
                                            title = 'This is an alternate image.' />
                                    }
                                </div>
                                
                                <div className = 'column'>
                                    {element.overview !== ''
                                    ?
                                        <p style = {{textAlign: 'justify'}}>
                                            <strong>Overview: </strong>
                                            {element.overview}
                                        </p>
                                    :
                                        <p>
                                            <strong>Overview: </strong>
                                            Currently, there is no overview available for this movie.
                                        </p>
                                    }
                                </div>
                                
                                <div className = 'column rating'>
                                    {element.vote_average !== 0
                                    ?
                                        <p>
                                            <strong>Rating: </strong>
                                            {element.vote_average}
                                        </p>
                                    :
                                        <p>
                                            <strong>Rating: </strong>
                                            Currently, there is no rating available for this movie.
                                        </p>
                                    }
                                </div>

                            </div>
                            <div className = 'trailerDiv'>
                                Click
                                <span
                                    className = 'trailerButtonClass' 
                                    onClick = {() => this.getVideo(element.id)}>
                                    here
                                </span> 
                                to watch related video/ trailer!
                            </div>
                        </div>
                        
                )}
                <Pagination 
                    moviesArrayPerPage = {this.state.moviesArrayPerPage} 
                    totalMoviesArray = {this.props.movie_list.length} 
                    paginate = {this.paginate_func}
                    currentPage_prop = {this.state.currentPage} />
            </div>
        );
    }
}

Display.defaultProps = {
    movie_list: ['This is default props', 'Please try after sometime', 'Thanks for the patience'],
    movie_api: 'Invalid API key',
}

Display.propTypes = {
    movie_list: PropTypes.array,
    movie_api: PropTypes.string.isRequired,
}

export default Display;