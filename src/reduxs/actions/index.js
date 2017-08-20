/**
 * Created by xujunchao on 2017/6/27.
 */


//添加
export const ADD_TODO = 'ADD_TODO';
export function actionsTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
//指标数据录入页面-指标查询
export const LOGIN = 'login';
export function fetchLogin(username, password) {
    return (dispatch, getState) => {
        dispatch({
            type: LOGIN,
            payload: {     //真实的payload传值
                username
            },
            fetchPayload: {  //fetch传值
                url: '/alarm/login',
                options: {
                    method: 'post',
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    credentials: "same-origin"
                },
                loadingOptions: { //是否显示LOADING
                    show: true
                },
                condition: function(json) {   //判断成功状态条件,如不输入,默认请求成功就返回成功
                    return json.status.code === 200 ? true : false;
                }
            }
        })
    }
}
