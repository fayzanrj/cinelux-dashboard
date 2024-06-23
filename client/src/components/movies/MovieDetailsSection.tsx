import React from "react";
import { FaStar, FaClock } from "react-icons/fa";
import MovieProps from "../../props/MovieProps";
import getBgColor from "../../libs/GetBgColor";
import calculateTime from "../../libs/CalculateTime";
import formatDate from "../../libs/FormatDate";

const MovieDetailsSection: React.FC<MovieProps> = ({
  title,
  overview,
  genres,
  poster_path,
  release_date,
  runtime,
  tagline,
  vote_average,
  imdb_id,
}) => {
  return (
    <section className="flex flex-col gap-6 p-4 text-white md:flex-row">
      {/* POSTER */}
      <div className="flex-shrink-0 w-full md:w-56">
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className="w-full"
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* IMDB ID AND TAG LINE */}
        <p className="text-sm text-gray-400">
          {imdb_id} - {tagline}
        </p>

        {/* TITLE */}
        <h3 className="text-3xl font-semibold">{title}</h3>

        {/* RATING , GENRE AND RUNTIME */}
        <div className="grid grid-cols-5 gap-4">
          <div className="flex items-center col-span-1 gap-1">
            <FaStar className="text-yellow-500" /> {vote_average.toFixed(1)}/10
          </div>
          <div className="flex flex-wrap col-span-3 gap-1">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 rounded"
                style={getBgColor("secondary")}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="flex items-center col-span-1 gap-1">
            <FaClock /> {calculateTime(runtime)}
          </div>
        </div>

        {/* OVERVIEW */}
        <div>
          <p className="text-gray-200">{overview}</p>
        </div>

        {/* RELEASE DATE */}
        <div className="text-sm text-gray-400">
          Release date: {formatDate(release_date)}
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsSection;
