import request from '@/service/request'

// load all
export function getList (parameter) {
    request({
        url: '/api/v1/user/changcogideloadodayca/loadalluser/list',
        method: 'GET',
        params: parameter
    })
}