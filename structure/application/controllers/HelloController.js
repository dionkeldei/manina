const Controller = require('../../node_modules/framework/controllers/controller');

class HelloController extends Controller {

     index(){
       return "soy index"
     }

     store(request){
       return request;
     }

     show(id,name){
       return 'id:'+id+' <br>name:'+name;
     }
}

module.exports = HelloController
