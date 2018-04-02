export const  factorial=(n)=>{
    return n > 1 ? n * factorial(n-1) : 1;
}
export const  combination=(n,m)=>{
	return factorial(m)/(factorial(n)*factorial(m-n))<1?0:factorial(m)/(factorial(n)*factorial(m-n))
}
const yonghujiangjin=(ms,factor)=>{
	return ms*100/factor
}
const lilunjiangjin=(ms,factor)=>{
	return 100000/factor*2
}
export const  fandianQuery=(ms,factor,value)=>{
	return (yonghujiangjin(ms,factor)-value)/lilunjiangjin(ms,factor)
}
export const  zhongjinagjine=(ms,factor,value,mul)=>{
	return yonghujiangjin(ms,factor)*mul
}
export const  yinkuijine=(ms,factor,value,mul,AllAccount)=>{
	return zhongjinagjine(ms,factor,value,mul) - AllAccount
}
export const  toPoint=(point)=>{
    var str=Number(point*100).toFixed(1)
    str+="%"
    return str
}
export const arrayIntersect = ()=> {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            }
            else {
                obj[str]++;
                if (obj[str] == arguments.length)
                {
                    result.push(str);
                }
            }//end else
        }//end for j
    }//end for i
    return result;
}
