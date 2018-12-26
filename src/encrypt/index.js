function split_str(str,num) {
  let arr = new Array();
  let i1 = 0;
  let code_len = str.length;
  let code_step = Math.round(code_len/num);
  for(let i =0;i<num;i++){
    if(i===num-1){
      arr.push(str.substring(i1,str.length));
    }
    else{
      arr.push(str.substring(i1,i1+code_step));
    }
    i1+=code_step;
  }
  return arr;
}
function encryption_code(table,str_arr,index) {
    const keySize = 128;
    const str_arr_index = [7,9,5,3,1,8,6];
    const key_index_arr = [11,0,4,11,2,10,2];
    const key = Array.apply(null, { length: keySize }).map(() => Math.round(Math.random() * 255));
    for (let i = 0; i < str_arr.length; i++) {
        const data = [];
        const key_arr = [];
        for (let j = 0;j< str_arr[i].length;j++) {
            const keyIndex = Math.round(Math.random() * keySize);
            if (table[key_index_arr[i+index]]!=null) {
                //判断表中是否存在掩码
                try {
                    data[j] = str_arr[i].charCodeAt(j) ^ table[key_index_arr[i + index]][j];
                }
                catch (e) {
                    console.log(e);
                    data[j] = str_arr[i].charCodeAt(j) ^ key[keyIndex];
                    key_arr[j] = key[keyIndex];
                    table[key_index_arr[i + index]] = key_arr;
                }
                }
            else {
                data[j] = str_arr[i].charCodeAt(j) ^ key[keyIndex];
                key_arr[j] = key[keyIndex];
                table[key_index_arr[i+index]] = key_arr;
            }
        }
        table[str_arr_index[i+index]] = data;
    }

}

function superXor (arr) {
  const str_arr = split_str(arr[0],3);
  const str_arr1 = split_str(arr[1],2);
  const str_arr2 = split_str(arr[2],2);

  const table = [];
  //反调试放入数组
  encryption_code(table,str_arr1,0);
  //保护脚本放入数组
  encryption_code(table,str_arr,2);
  encryption_code(table,str_arr2,5);
  return table;
}

module.exports = {
  en: superXor
};
