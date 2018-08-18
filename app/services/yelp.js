import axios from 'axios'

const YELP_API_KEY = 'Your Yelp API_KEY goes here.';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
})

const getRestaurants = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 50,
        categories: 'restaurants, food, dinner, lunch',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
        }
      })
    )
    .catch(error => console.error(error))
}

export default {
      getRestaurants,
}