import axios from 'axios'

const url = 'https://webscrapperapi.onrender.com/api'

export const postUrl = (link) => axios.post(`${url}/PostInsights`,link);

export const fetchInsights = () => axios.get(`${url}/GetInsights`);

export const deleteInsight = (id) => axios.delete(`${url}/DelInsights/${id}`,id)

export const updateInsight = (id, fav) => axios.put(`${url}/PutInsights/${id}`, { fav })