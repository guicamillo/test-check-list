const expListConst = [
  {
    title: 'pp_cool_exp'
  },
  {
    title: 'pp_other_cool_exp'
  }
];

class ExpList {
  fetch () {
    return expListConst
  }
}

let expList = new ExpList();

export default expList;