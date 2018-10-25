<style lang="scss" scoped>
@import "./sessionLogs.scss";
</style>
<template>
	<div class="sessionLogs">
		<div class="modal-wrap">
			<div class="m" @click.stop="">
				<div class="header">
					<div class="l "><i class="iconfont">&#xe60d;</i>{{call.calldetail.caller}}</div>
					<div class="l "><i class="iconfont">&#xe629;</i>当日第<b style="color: #f00;">{{call.calldetail.callnum}}</b>次来电</div>
				</div>
				<div class="header">
					<div class="l ">联系手机号：{{call.calldetail.contactPhoneNumber}}</div>
					<div class="l ">来电意图：{{callpurposeArry[call.calldetail.callpurpose]}}</div>
				</div>
				<div class="c">
					<div class="sessionLogs">
						<div class="title">小美通话内容</div>
						<div v-for="(item,index) in call.data">
							<div class="lBubble" v-if="item.speak=='robot' && !!item.text ">
								<div class="l-b-content">
									<div class="triangle-l"></div>
									<div class="l-b-text">{{item.text}}</div>
								</div>
							</div>
							<div class="rBubble" v-if="item.speak=='people' && !!item.text ">
								<div class="r-b-content">
									<div class="triangle-r"></div>
									<div class="r-b-text">{{item.text}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      callpurposeArry: ["全部", "催单", "其他"],
      call: {
        calldetail: {
          caller: "",
          callnum: "",
          contactPhoneNumber: "",
          callpurpose: "",
          createtime: "",
          duration: 0,
          filesize: 0,
          path: ""
        },
        data: []
      }
    };
  },
  methods: {
    /**
     *@Function: 获取url?后面的参数
     */
    GetRequest() {
      const url =
        window.document.URL ||
        window.document.baseURI ||
        window.document.documentURI; //获取url中"?"符后的字串
      const theRequest = new Object();
      //				console.log(url.substr(1).split("?"),66)
      if (url.indexOf("?") != -1) {
        let str = url.substr(1).split("?")[1];
        const strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    /**
     * 007接口
     * **/
    getcalldetail() {
      let t = this;
      //重置数据
      t.call = {
        calldetail: {
          caller: "",
          callnum: "",
          contactPhoneNumber: "",
          callpurpose: "",
          createtime: "",
          duration: 0,
          filesize: 0,
          path: ""
        },
        data: [
          { speak: "people", text: "asdhajkhk" },
          { speak: "robot", text: "ihajshdka" }
        ]
      };
      t.$http
        .post("api/getcatail123123", {
          originCallNo: t.GetRequest().originCallNo || "",
          originCalledNo: t.GetRequest().originCalledNo || "",
          token: t.GetRequest().token || "",
          tokenId: t.GetRequest().tokenId || ""
        })
        .then(function(response) {
          if (response.code == 0) {
            //人机对话音频、用户信息和人机对话文字内容
            t.call = response;
          }
        });
    }
  },
  mounted() {
    //获取弹框信息
    this.getcalldetail();
  }
};
</script>