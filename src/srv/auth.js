import api from '@/srv/api'

export default{
  register (credentials) {
    return api().post('register', credentials)
  }
}
