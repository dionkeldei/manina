class Migrations{
  constructor() {
    this.database = require('../database');
  }

  migrate(){
    var migrations = this.get();
    var initQuery = ''
    for(var x in migrations){
      console.log(migrations[x])
      var table = new migrations[x].class
      table = table.table()
      initQuery += "CREATE TABLE "+table.name+" ("
      for(var key in table.table){
        initQuery += key+' '+table.table[key]+', ';
      }
      initQuery = initQuery.slice(0, -2)
      initQuery += ');\n'
    }
    console.log(initQuery)
  }

  get () {
    const path = require('path');
    const fs = require('fs');
    var classArr = []
    //joining path of directory
    const directoryPath = './database/migrations';
    //passsing directoryPath and callback function
    var files = fs.readdirSync(directoryPath);
    for(var i in files){
      var clas = require('../../../../database/migrations/'+files[i]);
      var obj = {name: clas.name, class: clas}
      classArr.push(obj)
    }
    return classArr;
  }

  table_types() {
    return {
      integer: function (num=255){
        return "int"
      },
      string: function (num=255){
        return "varchar("+num+")"
      },
      timeStamp: function (num=255){
        return "date"
      }
    }
  }
}

module.exports = Migrations
