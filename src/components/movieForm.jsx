import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie, getMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number In Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Form</h1>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genreId', 'Genre', this.state.genres)}
        {this.renderInput('numberInStock', 'Number In Stock', 'number')}
        {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
        {this.renderButton('Save')}
      </form>
    );
  }
}

export default MovieForm;
