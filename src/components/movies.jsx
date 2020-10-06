import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedMovies = () => {
        const {
            currentPage,
            pageSize,
            selectedGenre,
            sortColumn,
            movies: allMovies
        } = this.state;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter(m => selectedGenre._id === m.genre._id)
                : allMovies;

        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, movies };
    };

    render() {
        const { currentPage, pageSize, sortColumn } = this.state;

        const { length: count } = this.state.movies;
        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, movies } = this.getPagedMovies();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies from the database.</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
