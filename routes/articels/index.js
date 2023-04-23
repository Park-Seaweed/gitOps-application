const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'mysql-service',
    user: 'admin',
    password: 'root',
    database: 'mydb'
  });


module.exports = async function (fastify, opts){
    fastify.post('/', async (request, reply) => {
        const { title, content } = request.body;
      

        const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
        const [result] = await connection.execute(sql, [title, content]);
        console.log('New post added to the database!');
        reply.send('New post added to the database!');
      });

    fastify.get('/', async (request, reply) => {

      const sql = 'SELECT * FROM posts';
      const [rows] = await connection.execute(sql);
      reply.send(rows);
    });
    

    fastify.get('/:id', async (request, reply) => {
      const { id } = request.params;
    
      const sql = 'SELECT * FROM posts WHERE id = ?';
      const [rows] = await connection.execute(sql, [id]);
      reply.send(rows[0]);
    });
}



