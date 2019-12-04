import request from '@/utils/request';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:notebookId',
  DELETE: '/notebooks/:notebookId'
}

export default {
  getAll() {
    return request(URL.GET)
  },
  add({ title = "" } = { title: "" }) {
    return request(URL.ADD, 'POST', { title })
  },
  update(notebookId, { title = "" }) {
    return request(URL.UPDATE.replace(':notebookId', notebookId), 'PATCH', { title })
  },
  delete(notebookId) {
    return request(URL.DELETE.replace(':notebookId', notebookId), 'DELETE')
  }
}