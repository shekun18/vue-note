import request from '@/utils/request';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getAll() {
    return request(URL.GET)
  },
  revert(noteId) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  },
  delete(noteId) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  }
}