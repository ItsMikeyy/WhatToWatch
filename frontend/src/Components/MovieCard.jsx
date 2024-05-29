import "./MovieCard.css"

const MovieCard = (props) => {

    return (
        <div className="movie-card">
            <h1 className="title primary-text">{props.name}</h1>
            <img src={props.img} />
            <h2 className="description primary-text">{props.description}</h2>
            <a className="link-text" href={props.link} target="_blank">View on IMDb</a>
        </div>
    )
}

export default MovieCard