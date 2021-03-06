var methods = {
  isFunction: function (f){
    if (typeof f === 'function') {
      return true
    }
    return false
  },
  getControllerFunction: function (string, controllers){
    var arr = string.split("@");
    var desired = {function: arr[0], controller: arr[1]}
    var controllerObj = controllers.filter(obj => {
       return obj.name == desired.controller
    });
    if(controllerObj[0] == undefined){
      console.log("Controller '"+desired.controller+"' not found in routes file")
      process.exit()
    }
    var controller = new controllerObj[0].class
    var func = controller[desired.function]
    if(func == undefined){
      console.log('Function "'+desired.function+'" not found in "'+desired.controller+'"');
      process.exit();
    }
    return func;

  },
  getVariablePositions: function (route){
    var variables = this.getVariableValues(route)
    var varNum = [];
    for(var i in variables){//GET VARIABLE POSITION IN URL
      if(variables[i].includes(":")){
        varNum.push(i)
      }
    }
    if(varNum.length == 0){
      varNum = undefined
    }
    return varNum;
  },
  getVariableValues: function (route){
    var variables = route.split('/');
    for(var i in variables){ //DELETE EMPTY SPACES
      if(variables[i] == ''){
        var index = i;
        if (index > -1) {
          variables.splice(index, 1);
        }
      }
    }
    return variables;
  },
  constructFunctionWithParams: function (req,action,route,post=false){
    var valuePositions = this.getVariablePositions(route);
    var values = []
    if(valuePositions){
       var routeArray = this.getVariableValues(route);
       for(var i in valuePositions){
         var value = routeArray[valuePositions[i]].split(':')[1]
         values.push(req.params[value])
       }
    }else{
      if(post){
        return action(req.body)
      }
      return action()
    }
    switch(values.length){
      case 1:
        if(post){
          return action(req.body,values[0])
        }
        return action(values[0])
      break;
      case 2:
        if(post){
          return action(req.body,values[0],values[1])
        }
        return action(values[0],values[1])
      break;
      case 3:
        if(post){
          return action(req.body,values[0],values[1],values[2])
        }
        return action(values[0],values[1],values[2])
      break;
      case 4:
        if(post){
          return action(req.body,values[0],values[1],values[2],values[3])
        }
        return action(values[0],values[1],values[2],values[3])
      break;
      case 5:
        if(post){
          return action(req.body,values[0],values[1],values[2],values[3],values[4])
        }
        return action(values[0],values[1],values[2],values[3],values[4])
      break;
      case 6:
        if(post){
          return action(req.body,values[0],values[1],values[2],values[3],values[4],values[5])
        }
        return action(values[0],values[1],values[2],values[3],values[4],values[5])
      break;
      case 7:
        if(post){
        return action(req.body,values[0],values[1],values[2],values[3],values[4],values[5],values[6])
        }
        return action(values[0],values[1],values[2],values[3],values[4],values[5],values[6])
      break;
      case 8:
        if(post){
          return action(req.body,values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7])
        }
        return action(values[0],values[1],values[2],values[3],values[4],values[5],values[6],values[7])
      break;
      default:
        console.log("More than 8 parameters not allowed in route");
    }
  }
}

module.exports = methods
