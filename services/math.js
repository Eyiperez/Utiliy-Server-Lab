
  
  function add(parametersArr) {
    return parametersArr.reduce((previous, current) => {
      return previous + current;
    },0);
  }

  
  function multiply(parametersArr) {
    return parametersArr.reduce((previous, current) => {
      return previous * current;
    },1);
  }

module.exports = {
      add,
     multiply
   
}
