/**
 * Created by Ethan on 2016/12/16.
 * fetch 中间件
 */
import fetch from "isomorphic-fetch";
//import info from "../../../config/info";
const fetchOptions = {
    method: 'post',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: "same-origin"
};
const loadingOptions = {
    show: false,
    tip: ''
};

/**
 * fetch 超时响应封装，只通过中间件的才生效。
 * @param fetch_promise   fetch对象
 * @param timeout 请求超时时间，默认50秒，后端超时时间为50秒
 * @return {Promise.<*>}
 * @private
 */
let fetchTimeout = null;
function _fetchTimeout(fetch_promise, timeout) {
    //console.log("fetch_promise", fetch_promise)
    //console.log("_fetchTimeout",fetch_promise,timeout)
    let abort_fn = null;
    //这是一个可以被reject的promise
    let abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function () {
            reject({
                status:{
                    code:408,
                    message:'请求超时'
                }
            });
        };
    });
    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(function () {
        abort_fn();
    }, timeout);
    return abortable_promise;
}
const defaultSuffix = ['Request', 'Success', 'Failure'];
export default ({dispatch, getState}) => next => action => {
    if (!action || !action.fetchPayload || !action.fetchPayload.url) {
        return next(action);
    }
    let type = action.type;
    let payload = action.fetchPayload;
    let url = payload.url;
    let conditionFun = payload.condition; //条件
    let success = payload.success; // TODO 添加成功的回调，这样是否合适？
    let loading = {...loadingOptions, ...payload.loadingOptions};  //是否需要LOADING
    let options = payload.options;
    let opts = {...fetchOptions, ...options};
    let paulPayload = action.payload;
    loading.show && dispatch({type: "showLoading", payload: loading.tip, meta: '显示loading'});
    dispatch({type: type + defaultSuffix[0]});
    _fetchTimeout(fetch(url, opts), 50000)
        .then(response => response.json())
        .then(json => {
            if (json.status && json.status.code === 1200) {
                window.location.href = `/userLogin/noLogin`;
                return;
            }
            if (conditionFun) {
                if (conditionFun(json)) {
                    dispatch({type: type + defaultSuffix[1], payload: {...json, ...paulPayload}, meta: '异步请求成功'});
                    !!success && success(dispatch);
                } else {
                    dispatch({
                        type: type + defaultSuffix[2],
                        payload: {...json, ...paulPayload},
                        meta: '异步请求成功，但判断条件（condition）失败'
                    });
                }
            } else {
                dispatch({type: type + defaultSuffix[1], payload: {...json, ...paulPayload}, meta: '异步请求成功'});
                !!success && success(dispatch);
            }
            loading.show && dispatch({type: "hideLoading", meta: '隐藏loading'});
        })
        .catch(function (e) {
            loading.show && dispatch({type: "hideLoading", meta: '隐藏loading'});
            dispatch({type: type + defaultSuffix[2], payload: e, meta: '异步请求失败'});
        });
}
