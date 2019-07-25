const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config');

const bookmarksDb = knex({
  client: 'pg', /*postgreSQL*/
  connection: DB_URL /*databse url*/
});

app.set('bookmarksDb', bookmarksDb);
//app.set('potatoe', 'tomatoe');

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});