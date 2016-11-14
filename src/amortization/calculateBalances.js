import getBalance from './getBalance';
export default (data)=>{
    // const balances = data.balances;
    // const n = data.months;
    //
    // while (balances.length > n && n > 0) {
    //     balances.pop();
    // }
    //
    // for (let j = 0; j < n; j++) {
    //     balances[j] = getBalance(data,j);
    // }

    data.balances = getBalance(data,data.months,true);
}