export interface Dev {
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  location: string;
  latitude?: number;
  longitude?: number;
  html_url: string;
}

const ACCESS_TOKEN_MAP_BOX = 'access_token=pk.eyJ1IjoiYXphbm5pZWwiLCJhIjoiY2tnNm8wdzdtMDFvYjM0bGh3emFvdGVueSJ9.PgGlopnaRdM8qHM-qSYkLg'

export const fetchLocalMapBox = (local: string) => (
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
  ).then(response => response.json()).then(data => data)
)

export const fetchUserGithub = (username: string): Promise<Dev> => (
  fetch(`https://api.github.com/users/${username}`).then(response => response.json()).then(data => data)
)
