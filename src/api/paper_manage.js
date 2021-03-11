import request from '@/utils/request'

export function paper_read_history(data) {
  return request({
    url: '/paper/history',
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

export function paper_one_history(data) {
  return request({
    url: '/paper/history_by_paperID',
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

export function fetchMyPaperList(query) {
  return request({
    url: '/paper/paper_mine',
    method: 'get',
    params: query
  })
}

export function fetchConferenceList(query) {
  return request({
    url: '/paper/paper_conference',
    method: 'get',
    params: query
  })
}

export function fetchConferenceListForPaperUpload() {
  return request({
    url: '/paper/get_all_conference',
    method: 'get'
  })
}

export function fetchConferenceIdByName(name) {
  return request({
    url: '/paper/get_conference_id_by_name',
    method: 'get',
    params: { conference_name: name }
  })
}

export function updatePaper(data) {
  return request({
    url: '/paper/paper_update',
    method: 'post',
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
