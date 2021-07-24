import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(page, size) {
    return apiClient.get('/passenger?page=' + page + '&size=' + size)
  },
  //Added new call
  getEvent(id) {
    return apiClient.get('/passenger/' + id)
  }
}
