import React, { useState } from 'react';
import styles from './Display.module.css'
import {PropTypes} from 'prop-types';
import pic from '../Logos/movie.jpg'
import { TRAILER_URL } from '../constants/URLs';

const Display = (props) => {
    const youtube = (id) => {
        const url = `https://www.youtube.com/watch?v=${id}`;
        window.open(url, '_blank');
    }

    const getVideo = (id) => {
        async function getVideos(movie_id) {
            try {
                let trailerUrl = TRAILER_URL.replace('%s', movie_id);
                const res = await fetch(trailerUrl);
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

    return (
        <div>
            {(props.movie_list.length === 0 || props.movie_list.includes('This is default props'))
            ?
                <p className = {styles.defaultProp}>Thanks for visiting! We couldn't find more movies.</p>
            :   
                props.movie_list.map((element) =>
                    <div key = {element.id} className = {styles.moviesDiv}>
                    <div className = {styles.row}>
                        
                        <div className = {`${styles.column} ${styles.movieNameDiv}`}>
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
                                    className = {styles.displayImage}
                                    title = {element.title} />
                            :
                                <img 
                                    src = {pic}
                                    className = {styles.alternateImageClass}
                                    alt = 'Alternate text' 
                                    title = 'This is an alternate image.' />
                            }
                        </div>
                        
                        <div className = {`${styles.column} ${styles.overview}`}>
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
        </div>
    );

}

Display.defaultProps = {
    movie_list: ['This is default props', 'Please try after sometime', 'Thanks for the patience'],
}

Display.propTypes = {
    movie_list: PropTypes.array,
}

export default React.memo(Display);
