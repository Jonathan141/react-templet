import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,
} from './house'
import {
  loginResponse,
} from './common'
import {
  homeRows,
  platformIdValue,
  caizhongType,
  keyValuesObj,
  batchStatesArray,
  caizhongObjQuery,
  onPlayObj,
  lotteryListQuery,
  chaseOrderObjQuery,
  orderObjQuery,
  allBettingValues,
  lotteryObjQuery,
  bettingValueObj,
  uiStyleObj
} from './home'
const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,
  homeRows,
  uiStyleObj,
  keyValuesObj,
  platformIdValue,
  caizhongType,
  batchStatesArray,
  caizhongObjQuery,
  lotteryListQuery,
  lotteryObjQuery,
  allBettingValues,
  chaseOrderObjQuery,
  orderObjQuery,
  onPlayObj,
  bettingValueObj,
  loginResponse,
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult
});

export default rootReducer;
