import { factorial,combination,arrayIntersect } from './tools'
 Array.intersect = function () {
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
 const combinationt = (n,m)=> {
    m = parseInt(m);
    n = parseInt(n);
    if(m < 0 || n < 0) {
        return false;
    }
    if(m == 0 || n == 0) {
        return 1;
    }
    if(m > n) {
        return 0;
    }
    if(m > n / 2.0) {
        m = n - m;
    }
    var result = 0.0;
    for(let i = n; i >= (n - m + 1); i--) {
        result += Math.log(i);
    }
    for(let i = m; i >= 1; i--) {
        result -= Math.log(i);
    }
    result = Math.exp(result);
    return Math.round(result);
}
const getSuijiDing=(list)=> {
    var list = list;
    var suiji = parseInt(Math.random() * list.length);
    var d = [];
    d[0] = list[suiji];
    return d;
}
export const  bettingTools = [
	{
		id:'963261194281533441',
		getBettingNums:(obj)=>{
			let num =1
			if(obj.length<5){
				num = 0
			}else{
				for(let i =0;i<5;i++){
					num *=obj[i].length
				}
			}
			return num
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<5;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=4){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		},
		getBettingValue:(configno,values)=>{
			let valueStr = ''
			for(let i=0;i<5;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=4){
					valueStr+='|'
				}
			}
			return '['+configno+']['+valueStr+']'
		}
	},
	{
		id:'963261194478665730',
		getBettingNums:(obj)=>{
			let num =1
			for(let i =0;i<5;i++){
				let total =0
				for(let n =0;n<obj.length;n++){
					if(obj[n].key.charAt(2)==i){
						total++
					}
				}
				num *= total
			}
			return num
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<5;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=4){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		},
		getBettingValue:(configno,values)=>{
			let valueStr = ''
			for(let i=0;i<5;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=4){
					valueStr+='|'
				}
			}
			return '['+configno+']['+valueStr+']'
		}
	},
	{
		id:'963261194478665732',
		getBettingNums:function(obj){
			let temNum = 1
			for(let i = 0;i<=obj.length - 1;i++){
				if(obj.length<5){
					temNum = 0
					break
				}
				temNum *= obj[i].length
			}
			console.log(temNum*5)
			return temNum*5
		},
		getAllValue:(obj,values)=>{
			return 'jytityityii'
		},
		getBettingValue:(configno,values)=>{
			return 'jyrtjsrty6758567'
		}
	},
	{
		id:'963261194478665750',
		getBettingNums:function(obj){
			let temNum = 1
			for(let i = 0;i<=obj.length - 1;i++){
				if(obj[i].length<5){
					temNum = 0
					break
				}
				temNum *= obj[i].length
			}
			console.log(5555555)
			console.log(temNum*5)
			return temNum
		},
		getAllValue:(obj,values)=>{
			return 'jytityityii'
		},
		getBettingValue:(configno,values)=>{
			return 'jyrtjsrty6758567'
		}
	},
	{
		id:'963261194478665734',
		getBettingNums:function(obj){
			console.log(obj)
			let num = obj[0].length
			return combination(5,num)<1?0:combination(5,num)
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<5;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
			}
			return obj.method_name + ' ' + valueStr
		},
		getBettingValue:(configno,values)=>{
			let valueStr = ''
				for(let v in values){
					valueStr+=values[v].key.charAt(0)
					
				}
			
			return '['+configno+']['+valueStr+']'
		}
	},
	{
		id:'963261194478665736',
		getBettingNums:function(obj){
			console.log(obj)
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 3) {
                var h = Array.intersect(obj[0], obj[1]).length;
                console.log(h)
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 3);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1) * combinationt(obj[1].length - 1, 2)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665738',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 2 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 2) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 2) * combinationt(2, 1);
                    if(obj[0].length - h > 0) {
                        tmp_nums -= combinationt(h, 1) * combinationt(obj[0].length - h, 1)
                    }
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665740',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 2) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 2);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1) * combinationt(obj[1].length - 1, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665742',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665744',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665746',
		getBettingNums:function(obj){
			console.log(obj)
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 3) {
                var h = Array.intersect(obj[0], obj[1]).length;
                console.log(h)
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 3);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1) * combinationt(obj[1].length - 1, 2)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665750',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 2 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 2) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 2) * combinationt(2, 1);
                    if(obj[0].length - h > 0) {
                        tmp_nums -= combinationt(h, 1) * combinationt(obj[0].length - h, 1)
                    }
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665752',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 2) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 2);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1) * combinationt(obj[1].length - 1, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665754',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665756',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	},
	{
		id:'963261194478665758',
		getBettingNums:function(obj){
			let tmp_nums = 0
			let nums = 0
			if(obj.length==2&&obj[0].length >= 1 && obj[1].length >= 1) {
                var h = Array.intersect(obj[0], obj[1]).length;
                tmp_nums = combinationt(obj[0].length, 1) * combinationt(obj[1].length, 1);
                if(h > 0) {
                    tmp_nums -= combinationt(h, 1)
                }
                nums += tmp_nums
            }
            return nums
		},
		getAllValue:(obj,values)=>{
			let valueStr = ''
			for(let i=0;i<2;i++){
				for(let v in values){
					if(values[v].key.charAt(2) ==i){
						valueStr+=values[v].key.charAt(0)
					}
				}
				if(i!=1){
					valueStr+=','
				}
			}
			return obj.method_name + ' ' + valueStr
		}
	}
]