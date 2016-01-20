import expList from '../models/exp_list.js'


function indexHandler() {
  let exps = expList.fetch();
  console.log(exps);
}

export default indexHandler;