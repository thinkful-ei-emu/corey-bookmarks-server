const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');

// describe.only('Articles Endpoints', function()  {
//   let db;

//   before('make knex instance', () => {
//     dbHotdog = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     });
//     app.set('bookmarksDb', dbHotdog);
//   });

//   after('disconnect from db' , () => db.destroy());

//   before('clean the table', () => db('blogful_articles').truncate());

//   afterEach('cleanup', () => db('blogful_articles').truncate());