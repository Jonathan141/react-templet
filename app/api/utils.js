import pathToRegexp from "path-to-regexp";

export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({ ...item }))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[ data[ index ][ id ] ] = data[ index ]
  })

  data.forEach((item) => {
    let hashVP = hash[ item[ pid ] ]
    if (hashVP) {
      !hashVP[ children ] && (hashVP[ children ] = [])
      hashVP[ children ].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu (location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[ i ];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({ ...e, children: null });
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({ ...e, children: null });
        return current;
      }
    }
    return current;
  }
  return null;
}
export function formateMenueData (menues) {
  var index = 0;
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      var menue = {};
      menue.id = values.id;
      menue.parentId = values.parent_id;
      menue.sort = values.menu_sort;
      menue.name = values.menu_name;
      menue.href = values.menu_url;
      menue.icon = values.menu_icon;
      menue.permissionId = values.permission_id;
      menue.children = setValue(values.childNodes)
      return [menue]
    }
    else{
      var datas = [];
      for(let i in values){
        var menue = {};
        menue.id = values[i].id;
        menue.parentId = values[i].parent_id;
        menue.sort = values[i].menu_sort;
        menue.name = values[i].menu_name;
        menue.permissionId = values.permission_id
        menue.href = values[i].menu_url;
        menue.icon = values[i].menu_icon;
        menue.children = setValue(values[i].childNodes)
        datas.push(menue)
      }
      return datas
    }
  }
  return setValue(menues)
}
export function formateRoleData (roles) {
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      console.log(values)
      var role = {};
      role.id = values.id;
      role.parentId = values.parent_id;
      role.name = values.role_name;
      role.expanded = true
      role.children = setValue(values.childNodes)
      return [role]
    }
    else{
      var datas = [];
      for(let i in values){
        var role = {};
        role.id = values[i].id;
        role.parentId = values[i].parent_id;
        role.name = values[i].role_name;
        role.expanded = true
        role.children = setValue(values[i].childNodes)
        datas.push(role)
      }
      return datas
    }
  }
  return setValue(roles)
}
export function formatePermissionsData (permissions) {
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      var permissions = {};
      permissions.id = values.id;
      permissions.parentId = values.parent_id;
      permissions.name = values.permission_name;
      permissions.code = values.permission_code;
      permissions.remarks= values.remarks;
      permissions.children = setValue(values.childNodes)
      return [permissions]
    }
    else{
      var datas = [];
      for(let i in values){
        var permissions = {};
          permissions.id = values[i].id;
          permissions.parentId = values[i].parent_id;
          permissions.name = values[i].permission_name;
          permissions.code = values[i].permission_code;
          permissions.remarks= values[i].remarks;
          permissions.children = setValue(values[i].childNodes)
        datas.push(permissions)
      }
      return datas
    }
  }
  return setValue(permissions)
}
export function formateDepartmentData (department) {
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      var department = {};
      department.id = values.id;
      department.parentId = values.parent_id;
      department.name = values.depart_name;
      department.remarks= values.remarks;
      department.children = setValue(values.childNodes)
      return [department]
    }
    else{
      var datas = [];
      for(let i in values){
        var department = {};
          department.id = values[i].id;
          department.parentId = values[i].parent_id;
          department.name = values[i].depart_name;
          department.remarks= values[i].remarks;
          department.children = setValue(values[i].childNodes)
        datas.push(department)
      }
      return datas
    }
  }
  return setValue(department)
}

export function formatePermissionResourceData (prt) {
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      var pr = {};
      pr.id = values.id;
      pr.isChecked = values.isChecked;
      pr.name = values.name;
      pr.parentId= values.parentId;
      pr.children = setValue(values.childNodes)
      return [pr]
    }
    else{
      var datas = [];
      for(let i in values){
        var pr = {};
        pr.id = values[i].id;
        pr.isChecked = values[i].isChecked;
        pr.parentId = values[i].parentId;
        pr.name = values[i].name;
        pr.remarks= values[i].remarks;
        pr.children = setValue(values[i].childNodes)
        datas.push(pr)
      }
      return datas
    }
  }
  return setValue(prt)
}
export function formatePermissionArray (prt) {
  var strArray=[]
  function setValue(values){
    if(values == null||values.length == 0)return null;
    else if(!Array.isArray(values)){
      strArray.push(id)
      if(values.childNodes.length!=0){
        setValue(values.childNodes)
      }
    }
    else{
      for(let i in values){
        strArray.push(id)
        if(values.childNodes.length!=0){
          setValue(values.childNodes)
        }
      }
    }
  }
  return strArray
}