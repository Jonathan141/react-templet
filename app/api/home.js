import { ajax } from 'utils'
import fetch from 'isomorphic-fetch'
import * as api from "api/url";
export const homeList = ajax.fetchJSONStringByGet(api.LOTTERY_LIST)
