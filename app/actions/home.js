import {
  createAction,
} from 'redux-actions'
// import {
//   home,
// } from 'api'
import * as api from "api/url";
import {
  createAjaxAction,createAjaxGetAction,createAjaxPostAction
} from 'utils'


export const updateChaseOrderQuery = createAction('update chaseOrder list');
export const receiveChaseOrderList = createAction('receive chaseOrder list');
export const fetchChaseOrderList = createAjaxPostAction(
	api.PREBUY_LIST,
	updateChaseOrderQuery,
	receiveChaseOrderList
)
export const updateOrderQuery = createAction('update order list');
export const receiveOrderList = createAction('receive order list');
export const fetchOrderList = createAjaxPostAction(
	api.ORDER_LIST,
	updateOrderQuery,
	receiveOrderList
)
export const updatelotteryListQuery = createAction('update lotteryList type');
export const receivelotteryList = createAction('receive lotteryList type');
export const fetchlotteryList = createAjaxGetAction(
	api.OPEND_LOTTERY_LIST,
	updatelotteryListQuery,
	receivelotteryList
)
export const updatelotteryObjQuery = createAction('update lotteryObj type');
export const receivelotteryObj = createAction('receive lotteryObj type');
export const fetchlotteryObj = createAjaxGetAction(
	api.OPEND_LOTTERY_OBJ,
	updatelotteryObjQuery,
	receivelotteryObj
)
export const changeBatchStates = createAction('update batchStates type');
export const addAllValues = createAction('update allValues type');
export const setPlayObjValue = createAction('update playObj value');
export const getbettingValues = createAction('update bettingValue type');
export const changeKeyValues = createAction('update keyValue type');
export const changeUiStyle = createAction('update uiStyle type');

export const getCaizhongObj = createAction('update caizhong obj');

export const requestPlatformId = createAction('update platform type');
export const requestCaizhongId = createAction('update caizhong type');
export const requestHomeList = createAction('request home list');
export const recevieHomeList = createAction('receive home list');
export const fetchHomeList = createAjaxAction(
	api.LOTTERY_LIST,
	requestHomeList,
	recevieHomeList
)
