//状态types
const types = {
  COM_LOADING_STATUS: "COM_LOADING_STATUS" //加载状态
};
/**
 * App通用配置
 */
const state = {
  storeData: [],
  tabS: 1, //左侧导航状态
  orderBookNumber: 0, //订单账本待处理数量
  anNumber: 0, //消息数量
  //	anNumS: false, //是否重新查询消息数量
  netCountNum: 0, //网络异常计次
  modalS: {
    warnModalS: false,
    screenPopUpModalS: false,
    screenPopUpModalSS: false,
    bulletinModalS: false,
    bulletinModalSS: false,
    detailModalS: false,
    detailMessageModalS: false,
    anDetailModalS: false,
    changePWModalS: false,
    telSetModalS: false,
    enterRowS: false
  },
  wsi: {
    polling: true, //数据轮询接口
    //		call: true, //来电弹屏循环
    queryCallInfoList: null //来电查询列表循环
    //		force: null, //通知公告循环
    //		total: null, //消息数量循环
  },
  polling: {
    tpS: false, //通知刷新转人工来电接口
    anNumQFnS: false, //通知刷新消息数量弹屏接口
    bulletinQFnS: false, //通知刷新弹屏公告接口
    realTimeQFnS: false, //实时看板接口
    orderBookQFnS: false, //订单账本未处理数量
    currentNumQFnS: false //实时看板 当前排号(海底捞实时排号变化)
  },
  xmtoken: "",
  ctoken: "",
  tokenS: true,
  queueTime: {
    //排号经验值全局onkeydown触发
    realTimePanel: {
      enter: false, //回车键
      up: false, //上
      down: false //下
    },
    consultSetting: {
      enter: false,
      up: false,
      down: false
    }
  }
};

const actions = {
  //  setLoadingState({ commit }, status) {
  //      commit(types.COM_LOADING_STATUS, status)
  //  },
  //
};

const getters = {
  //  loading: state => state.loading,
  //  showToast: state => state.showToast,
  //  showAlert: state => state.showAlert
};

const mutations = {
  //  [types.COM_LOADING_STATUS](state, status) {
  //      state.loading1 = status
  //  },
};

export default {
  state,
  actions,
  getters,
  mutations
};
