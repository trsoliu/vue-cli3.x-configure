/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import router from '@/router'
import store from '@/vuex/store'
//const t = Vue.prototype;
//const baseUrl = "/rest/mcdPhoneBar/";
const axiosUtil = {
	that: Vue.prototype,
	baseUrl: "/rest/mcdPhoneBar/",
	noticeRes: (res, noticeParams) => {
		let t = axiosUtil.that;
		if(!!noticeParams && Object.keys(noticeParams).length != 0) {
			t.$Notice.close(noticeParams.name);
			if(typeof res.data.code === 'number' && res.data.code !== 0 && res.data.code !== 9999) {
				t.$Notice.warning({
					title: noticeParams.title,
					desc: res.data.desc,
					name: noticeParams.name
				});
			}
		}
	},
	noticeErr: (res, noticeParams) => {
		let t = axiosUtil.that;
		if(!!noticeParams && Object.keys(noticeParams).length != 0) {
			t.$Notice.close(noticeParams.name);
			t.$Notice.warning({
				title: noticeParams.title,
				desc: "网络异常",
				name: noticeParams.name
			});
		}
	}
}

//console.log(process.env.NODE_ENV,1111112233333)
var instance = axios.create({
	//	baseURL: 'http://aicy.iflytek.com',
	timeout: 30000,
	//	headers: {
	//		'Content-Type': 'application/x-www-form-urlencoded'
	//	},
});

// *********添加request拦截器****************************************
instance.interceptors.request.use(
	config => {
		let xmtoken = window.sessionStorage.getItem("xmtoken"),
			ctoken = window.sessionStorage.getItem("ctoken");
		//		console.log(xmtoken,ctoken,router)
		//		console.log(xmtoken,ctoken,router.currentRoute.meta.requireAuth)
		if(xmtoken && router.currentRoute.meta.requireAuth) { // 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.xmtoken = xmtoken;
		} else if(ctoken && !router.currentRoute.meta.requireAuth) {
			config.headers.ctoken = ctoken;
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});

// *********添加response拦截器****************************************
instance.interceptors.response.use(function(response) {
	//重置网络异常计次
	//	store.state.common.netCountNum = 0;
	//9999,鉴权失败，跳转登录页面
	//返回状态码
	//	console.log('code', code,window.sessionStorage.getItem("xmtoken"), response);
	//	console.log(code === 9999 || !!window.sessionStorage.getItem("xmtoken") && !router.currentRoute.meta.requireAuth,21321,response)
	//	if(code === 9999 && !!window.sessionStorage.getItem("xmtoken") ) {
	if(9999 === response.data.code && router.currentRoute.meta.key !="0") {
		router.replace({
			name: 'login'
		})
	}
	return response;
}, function(error) {
	//超过三次等不到数据，报网络异常，修改状态
	//	store.state.common.netCountNum > 1 ? store.state.common.modalS.warnModalS = true : store.state.common.netCountNum++;
	//	console.log('error123', error, store.state.common.netCountNum)
	// 对响应错误做点什么
	if(error.response && router.currentRoute.meta.key !="0") {
		switch(error.response.status) {
			case 401:
			case 403:
			case 404:
			case 500:
			case 502:
				router.replace({
					name: 'login'
				})
				break;
				//				case 500:
		}
	}
	return Promise.reject(error.response.data) // 返回接口返回的错误信息
});
// *********添加响应拦截器****************************************
//const apiUtil = {
//	URL: '',
//	changeUrl: function(url) {
//		let t = this;
//		//		console.log(t.URL,url,process.env.I_NODE_ENV,process.env.NODE_ENV,8888999)
//		if(!!process.env.I_NODE_ENV) {
//			t.URL = url.replace(/pbsevice/g, 'devpbsevice');
//		} else {
//			t.URL = url;
//		}
//		return t.URL;
//	}
//}

/**
 * *get 方法
 */

const Get = (url, noticeParams) => {
	return new Promise((resolve, reject) => {
		instance({
			url: axiosUtil.baseUrl + url,
			method: 'get',
		}).then(res => {
			if(res.status === 200) {
				//console.log(res,res.data.data,12312331)
				axiosUtil.noticeRes(res, noticeParams);
				resolve(res.data);
			} else {
				throw res;
			}
		}).catch(err => {
			console.error(err, "Get err");
			axiosUtil.noticeErr(err, noticeParams);
			reject(err);
		})
	})
};

/**
 * *post 方法 入参是json格式
 */
const Post = (url, params, noticeParams) => {
	return new Promise((resolve, reject) => {
		instance({
			url: axiosUtil.baseUrl + url,
			method: 'post',
			data: params,
		}).then(res => {
			//console.log(res, 6789)
			if(res.status === 200) {
				//				console.log(res.data.code, 78898)
				//				if(!!res.data.code && res.data.code == 9999) {
				//					router.replace({
				//						name: 'login'
				//					})
				axiosUtil.noticeRes(res, noticeParams);
				//				} else {
				//				res.data.code = 9999;
				//				if(!!res.data.code && res.data.code == 9999) {
				//									console.log(res, 89,typeof res.data.code ==='number')
				//					res.data.desc = "账号权限";
				//				}
				resolve(res.data);
				//				}

			} else {
				throw res;
			}
		}).catch(err => {
			//			console.error(err, "Post err");
			axiosUtil.noticeErr(err, noticeParams);
			reject(err);
		})
	})
};
/**
 * *post 方法 入参是string格式
 */
const PostString = (url, params, noticeParams) => {
	//	url = apiUtil.changeUrl(url);
	return new Promise((resolve, reject) => {
		instance({
			url: axiosUtil.baseUrl + url,
			method: 'post',
			data: qs.stringify(params),
		}).then(res => {
			if(res.status === 200) {
				axiosUtil.noticeRes(res, noticeParams);
				resolve(res.data);
			} else {
				throw res;
			}
		}).catch(err => {
			console.error(err, "Post err");
			axiosUtil.noticeErr(err, noticeParams);
			reject(err);
		})
	})
};

/**
 * *post 方法 入参是form-data格式
 */
const PostFile = (url, params, onUploadProgressFn) => {
	//	url = apiUtil.changeUrl(url);
	return new Promise((resolve, reject) => {
		instance({
			url: url,
			method: 'post',
			data: params,
			onUploadProgress: onUploadProgressFn
		}).then(res => {
			if(res.status === 200) {
				resolve(res.data);
			} else {
				throw res;
			}
		}).catch(err => {
			console.error(err, "Post err");
			reject(err);
		})
	});
};

//Vue.prototype.$http = {
//	get: Get,
//	post: Post,
//	postString: PostString,
//	postFile: PostFile
//}
export default {
	get: Get,
	post: Post,
	postString: PostString,
	postFile: PostFile
};