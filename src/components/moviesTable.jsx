import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
    columns = [
        {
            label: "Title",
            path: "title",
            content: movie => (
                <Link to={`movies/${movie._id}`}>{movie.title}</Link>
            )
        },
        { label: "Genre", path: "genre.name" },
        { label: "Stock", path: "numberInStock" },
        { label: "Rate", path: "dailyRentalRate" },
        {
            key: "like",
            content: movie => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            )
        },
        {
            key: "delete",
            content: movie => (
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.props.onDelete(movie)}
                >
                    Delete
                </button>
            )
        }
    ];

    render() {
        const { movies, onSort, sortColumn } = this.props;

        return (
            <Table
                data={movies}
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
            />
        );
    }
}

export default MoviesTable;
