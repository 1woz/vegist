import React, { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteId, setFavoriteId] = useState("");

  useEffect(() => {
    fetch("/api/vegist")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setFavorites(json);
      })
      .catch((error) => {});
  }, []);

  function getFavoriteID(favoriteId) {
    fetch(`api/vegist/${favoriteId}`)
      .then((result) => result.json())
      .then((favoriteId) => {
        setFavoriteId(favoriteId);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  }

  useEffect(() => {
    getFavoriteID(favoriteId);
    // eslint-disable-next-line
  }, []);

  const handleDelete = (favorite) => {
    deleteFavorite(favorite);
  };

  const deleteFavorite = (favorite) => {
    fetch(`/api/vegist/${favorite}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedFav) => {
        setFavorites(updatedFav);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="card--list">
      {favorites.map((favorite, index) => {
        return (
          <div className="card" key={index}>
            <h2 className="card--title--fav">{favorite.title}</h2>
            <a href={favorite.source_url}>
              <button type="button" className="btn--view">
                link to recipe
              </button>
            </a>
            <button
              type="button"
              className="btn--delete btn btn-danger"
              style={{ margin: "10px" }}
              onClick={() => handleDelete(favorite.id)}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
