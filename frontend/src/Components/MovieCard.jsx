import "./MovieCard.css"

const MovieCard = (props) => {




    return (
        <div className="container movie-card">
            <h1 className="title">{props.name}</h1>
            <img src={props.img} />
            <h2 className="description">Description</h2>
        </div>
    )
}

export default MovieCard