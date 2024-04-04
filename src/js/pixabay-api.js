export function getImage(value) {
  const KEY = '43233624-a5a6de2690d501056695f3e05';
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 30,
    safesearch: true,
  });
  const url = `${BASE_URL}?${params}`;
  return fetch(url).then(res => res.json());
}