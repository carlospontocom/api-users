// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//     port: 4000, // padrão do TiDB
//     host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
//     user: 'HMzW9A9LdZtQp9s.root',
//     password: 'LeliAv4QfhYagaTZ',
//     database: 'test',
//     ssl: {
//         minVersion: 'TLSv1.2',
//         rejectUnauthorized: false
//     }
// });

// console.log('Pool de conexão criada');

// export default pool;

import mysql from 'mysql2/promise';

const db = await mysql.createPool({
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'HMzW9A9LdZtQp9s.root',
    password: 'LeliAv4QfhYagaTZ',
    database: 'test',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

export default db;