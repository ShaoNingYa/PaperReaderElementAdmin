import request from '@/utils/request'

export function todolist_get_today(data) {
  return request({
    url: '/study/todolist_get_today',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: [
      function(data) {
        var ret = ''
        for (var it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    data
  })
}

export function todolist_update_today(data) {
  return request({
    url: '/study/todolist_update_today',
    method: 'post',
    transformRequest: [
      function(data) {
        let ret = ''
        ret += encodeURIComponent('token') + '=' + encodeURIComponent(data['token']) + '&'
        ret += encodeURIComponent('data') + '='
        let data_text = ''
        for (const index in data['data']) {
          data_text += data['data'][index]['text'] + ', ' + data['data'][index]['done'] + ' {end}'
        }
        data_text += ''
        ret += encodeURIComponent(data_text) + '&'
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    data
  })
}

export function todolist_get_history(data) {
  return request({
    url: '/study/todolist_get_history',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: [
      function(data) {
        var ret = ''
        for (var it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    data
  })
}

export function todolist_get_template(data) {
  return request({
    url: '/study/todolist_get_template',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    transformRequest: [
      function(data) {
        var ret = ''
        for (var it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    data
  })
}

export function todolist_update_template(data) {
  return request({
    url: '/study/todolist_update_template',
    method: 'post',
    transformRequest: [
      function(data) {
        let ret = ''
        ret += encodeURIComponent('token') + '=' + encodeURIComponent(data['token']) + '&'
        ret += encodeURIComponent('title') + '=' + encodeURIComponent(data['title']) + '&'
        ret += encodeURIComponent('data') + '='
        let data_text = ''
        for (const index in data['data']) {
          data_text += data['data'][index]['text'] + ', ' + data['data'][index]['done'] + ' {end}'
        }
        data_text += ''
        ret += encodeURIComponent(data_text) + '&'
        ret = ret.substring(0, ret.lastIndexOf('&'))
        return ret
      }
    ],
    data
  })
}

