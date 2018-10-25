<style lang="scss">
	@import "./login.scss";
</style>
<template>
	<div class="login">
		<div class="bg">
			<div class="content">
				<div class="l">
					<Spin fix v-show="showLoading">
						<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
						<div class="load-text">正在登录...</div>
					</Spin>
					<!--<iframe  src="http://172.19.128.125:8001/#/sessionLogs?originCallNo=18616639201&originCalledNo=02166608073&token=123&tokenId=123" width="500" height="500"></iframe>-->
					<i class="iconfont">&#xe69d;</i>
					<h1>xxxxx</h1>
					<div class="text">
						<div class="user">
							<i class="iconfont">&#xe698;</i>
							<Input class="input" v-model.trim="user.account" placeholder="请输入账号" style="width: 100%"></Input>
						</div>

						<div class="user ">
							<!--<Tooltip content="大小写锁定已打开" placement="bottom-start" :disabled="capsLockTips">-->
							<Poptip trigger="focus" content="大小写锁定已打开" placement="bottom-start" :class="[capsLockTips?'poptip_close':'poptip_open']">
								<i class="iconfont">&#xe699;</i>
								<Input class="input" v-model.trim="user.password" @on-enter="loginFn" type="password" placeholder="请输入密码" @on-keypress="detectCapsLock($event)" @on-blur="detectCapsLock($event)"></Input>
							</Poptip>
						</div>

						<div class="user">
							<i class="iconfont">&#xe61b;</i>
							<Input class="input" v-model.trim="user.ctext" @on-enter="loginFn" type="text" placeholder="请输入验证码" style="width: 100%"></Input>
						</div>
						<div class="user second">
							<img :src="codeUrl" alt="刷新获取验证码" />
							<a class="verificationCode" @click="getVerificationCode()">点击刷新</a>
							<!--<Input class="input" v-model="user.ctext" @on-enter="loginFn" type="text" placeholder="请输入验证码" style="width: 100%"></Input>-->
						</div>

						<div class="hintStatus">{{hintStatus?desc:""}}</div>
						<Button class="button" type="primary" style="width: 100%" @click="loginFn">登录</Button>
						<CheckboxGroup v-model="rPassowrd">
							<Checkbox label="记住密码"></Checkbox>
						</CheckboxGroup>
					</div>
				</div>
				<img class="r" src="./img/login_r.jpg" />
			</div>
			<MyCanvas class="canvas" :dotsNum="dotsNum" :isColor="false" :lineColor="lineColor" :roundColor="roundColor"></MyCanvas>
		</div>
	</div>
</template>
<script>
	import MyCanvas from "vue-atom-canvas";
	import util from "./../../assets/js/libs/util";
	import { JSEncrypt } from "jsencrypt";
	//	import { mapState } from 'vuex';
	export default {
		name: "login",
		components: {
			MyCanvas
		},
		data() {
			return {
				lineColor: "rgba(140,178,218,0.1)",
				roundColor: "rgba(140,178,218,0.1)",
				dotsNum: 80,
				showLoading: false,
				user: {
					account: "",
					password: "",
					ctext: ""
				},
				capsLockTips: true, //检测键盘是否开启大小写状态
				rPassowrd: [],
				codeUrl: "",
				// url: ',
				hintStatus: false,
				desc: ""
			};
		},
		computed: {
			//			...mapState(["loading"]),
			//			orderedTotal: {
			//				get: function() {
			//					return this.$store.state.common.orderedTotal
			//				},
			//				set: function(newValue) {
			//					this.$store.state.common.orderedTotal = newValue
			//				}
			//			}
		},
		methods: {
			//获取验证码
			getVerificationCode() {
				let t = this;
				t.$http.post("1213123", {time: Date.now().then(function(response) {})})
			},
			/**
			 * 检测键盘是否开启大小写
			 * */
			detectCapsLock(event) {
				let t = this,
					e = event || window.event,
					keyCode = e.keyCode || e.which; // 按键的keyCode
				let isShift = e.shiftKey || keyCode == 16 || !1; // shift键是否按住
				//console.log(e, keyCode, isShift)
				// Caps Lock 打开，且没有按住shift键   // Caps Lock 打开，且按住shift键
				if(
					(keyCode >= 65 && keyCode <= 90 && !isShift) ||
					(keyCode >= 97 && keyCode <= 122 && isShift)
				) {
					t.capsLockTips = false;
				} else {
					t.capsLockTips = true;
				}
			},
			/**
			 * 0.1 登录接口
			 * */
			loginFn() {
				let t = this;
				if(t.user.account.replace(/\s+/g, "") !== "" &&t.user.password.replace(/\s+/g, "") !== "") {
					//安全锁关
					//t.$store.state.common.az = true;
					t.showLoading = true;
					let je = new JSEncrypt();
					je.setPublicKey(
						"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDc1wqPJHvDrQi+zfrIYq3k6LquimN1OkwDuJEOAVcU//c7JnOSb9ay2vDfM9Yccfl6DaFi96qHd20AcxanZ+2zrCae9KTJrvXAOafS3s4WWKwblSXicdbt4lwdi5huskj7Ei3eIvD8XBRaaztIUXiOMoj1YWJJvpdihyFy8wB65wIDAQAB"
					);
					//console.log("je.encrypt(t.user.password)",je.encrypt(t.user.password))
					t.$http
						.postString("login", {
							username: t.user.account.replace(/\s+/g, ""),
							ctext: t.user.ctext,
							password: je.encrypt(t.user.password.replace(/\s+/g, ""))
						}, {
							titile: "登录",
							name: "login"
						})
						.then(function(response) {})
						.catch(function(error) {});
				} else {
					//报错提示
					t.desc = "您输入的账户名或密码不能为空！";
					t.hintStatus = true;
				}
			},
			loadAccountInfo() {
				let t = this;
				let accountInfo = util.getCookie("accountInfo");
				if(accountInfo) {
					let index = accountInfo.indexOf("&");
					t.rPassowrd = ["记住密码"];
					t.user.account = accountInfo.substring(0, index);
					t.user.password = accountInfo.substring(index + 1);
				} else {
					t.rPassowrd = [];
				}
			}
		},
		mounted() {
			let t = this;
			t.getVerificationCode();
			t.loadAccountInfo();
		}
	};
</script>