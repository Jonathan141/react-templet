import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const ListResultState = {}
export const homeRows = handleActions({
  'request home list'(state, action) {
    return { ...state, loading: false }
  },
  'receive home list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, ListResultState)

const caizhongId = 1
export const caizhongType = handleActions({
  'update caizhong type'(state, action) {
    const { caizhongId } = action.payload
    return caizhongId
  },
  'receive caizhong type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { caizhongId } = action.payload
    return caizhongId
  },
}, caizhongId)

const caizhongObj = {}
export const caizhongObjQuery = handleActions({
  'update caizhong obj'(state, action) {
    const { caizhongObj } = action.payload
    return caizhongObj
  },
  'receive caizhong obj'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { caizhongObj } = action.payload
    return caizhongObj
  },
}, caizhongObj)


const platformId = 1
export const platformIdValue = handleActions({
  'update platform type'(state, action) {
    const { platformId } = action.payload
    return platformId
  },
  'receive platform type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { platformId } = action.payload
    return platformId
  },
}, platformId)


const playObj = {}
export const onPlayObj = handleActions({
  'update playObj value'(state, action) {
    const { playObj } = action.payload
    return playObj
  },
  'receive playObj type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { playObj } = action.payload
    return playObj
  },
}, playObj)


const uiObj = {}
export const uiStyleObj = handleActions({
  'update uiStyle type'(state, action) {
    const { uiObj } = action.payload
    return uiObj
  },
  'receive uiStyle type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { uiObj } = action.payload
    return uiObj
  },
}, uiObj)

const keyValues = []
export const keyValuesObj = handleActions({
  'update keyValue type'(state, action) {
    const { keyValues } = action.payload
    return keyValues
  },
  'receive keyValue type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { keyValues } = action.payload
    return keyValues
  },
}, keyValues)



const bettingValue = 0
export const bettingValueObj = handleActions({
  'update bettingValue type'(state, action) {
    const { bettingValue } = action.payload
    return bettingValue
  },
  'receive bettingValue type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { bettingValue } = action.payload
    return bettingValue
  },
}, bettingValue)

const allValues = []
export const allBettingValues = handleActions({
  'update allValues type'(state, action) {
    const { allValues } = action.payload
    return allValues
  },
  'receive allValues type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { allValues } = action.payload
    return allValues
  },
}, allValues)

const batchStates= [1,2,3,4,5,6,7,8,9]
export const batchStatesArray = handleActions({
  'update batchStates type'(state, action) {
    const { batchStates } = action.payload
    return batchStates
  },
  'receive batchStates type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { batchStates } = action.payload
    return batchStates
  },
}, batchStates)


const lotteryList= {}
export const lotteryListQuery = handleActions({
  'update lotteryList type'(state, action) {
    return { ...state, loading: false }
  },
  'receive lotteryList type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, lotteryList)

const lotteryObj= {}
export const lotteryObjQuery = handleActions({
  'update lotteryObj type'(state, action) {
    return { ...state, loading: false }
  },
  'receive lotteryObj type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, lotteryObj)

const orderObj= {}
export const orderObjQuery = handleActions({
  'update order list'(state, action) {
    return { ...state, loading: false }
  },
  'receive order list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, orderObj)

const chaseOrderObj= {}
export const chaseOrderObjQuery = handleActions({
  'update chaseOrderObj type'(state, action) {
    return { ...state, loading: false }
  },
  'receive chaseOrderObj type'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, chaseOrderObj)

