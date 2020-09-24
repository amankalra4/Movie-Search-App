import React, { useState } from 'react';
import styles from './Display.module.css'
import {PropTypes} from 'prop-types';
import pic from '../Logos/movie.jpg'
import Pagination from './Pagination';


const Display = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const youtube = (id) => {
        const url = `https://www.youtube.com/watch?v=${id}`;
        window.open(url, '_blank');
    }

    const getVideo = (id) => {
        const {movie_api} = props;
        async function getVideos(movie_id) {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${movie_api}`);
                const data = await res.json();
                return data;
            }
            catch(e) {
                console.log(`We encountered an error: ${e} while retrieving the video from API.`);
            }
        }

        getVideos(id)
        .then((data1) => {
            if("results" in data1 && data1.results.length !== 0) {
                    youtube(data1.results[0].key);
            }
            else {
                props.onCloseProp(`Sorry, we couldn't find a related video!`);
            }
        })
        .catch((e) => {
            console.log(`We encountered an error: ${e} while getting video data.`)
        });
    }

    const paginate_func = (number) => {
        setCurrentPage(number)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    const indexOfLastMovie = currentPage;
    const indexOfFirstMovie = indexOfLastMovie - 1;

    return (
        <div>
            {props.movie_list.includes('This is default props')
            ?
                <p className = {styles.defaultProp}>Sorry! We couldn't find your data.<br/>
                                                Please try after sometime!</p>
            :   
                props.movie_list[indexOfFirstMovie].map((element) =>
                    <div key = {element.id} className = {styles.moviesDiv}>
                    <div className = {styles.row}>
                        
                        <div className = {styles.column}>
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
                        
                        <div className = {styles.column}>
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
                                    className = {styles.alternateImageClass}
                                    alt = 'Alternate text' 
                                    title = 'This is an alternate image.' />
                            }
                        </div>
                        
                        <div className = {styles.column}>
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
                        
                        <div className = {`${styles.column} ${styles.rating}`}>
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
                    <div className = {styles.trailerDiv}>
                        Click
                        <span
                            className = {styles.trailerButtonClass}
                            onClick = {() => getVideo(element.id)}>
                            here
                        </span> 
                        to watch related video/ trailer!
                    </div>
                </div>
            )}
            <Pagination 
                totalMoviesArray = {props.movie_list.length} 
                paginate = {paginate_func}
                currentPage_prop = {currentPage} />
        </div>
    );

}

Display.defaultProps = {
    movie_list: ['This is default props', 'Please try after sometime', 'Thanks for the patience'],
    movie_api: 'Invalid API key',
}

Display.propTypes = {
    movie_list: PropTypes.array,
    movie_api: PropTypes.string.isRequired,
}

export default React.memo(Display);