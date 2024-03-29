import axios from 'axios'

axios.defaults.baseURL = '//note-server.hunger-valley.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

export default function request (url, type='GET', data={}) {
  return new Promise((resolve, reject)=>{
    let option = {
      url,
      method: type,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status ===400
      }
    }

    if (type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }

    axios(option).then(res=>{
      if (res.status == 200) {
        resolve(res.data)
      }else {
        reject(res.data)
      }
    }).catch(err=>{
      reject({msg:'网络异常'})
    })
  })
}