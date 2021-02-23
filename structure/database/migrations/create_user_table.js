const Migrations = require('../../node_modules/framework/database/migrations/migrations');

class UsersTable extends Migrations {
    table () {
      var table = this.table_types();
      return {
        name: 'users',
        table: {
          id: table.integer(255).autoincrement().do(),
          name: table.string(255).do(),
          email: table.string(255).null().do(),
          password: table.string(255).do(),
          created_at: table.timeStamp().do(),
          updated_at: table.timeStamp().do()
        }
      }
    }
}

module.exports = UsersTable
