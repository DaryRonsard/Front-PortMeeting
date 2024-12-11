
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_formation_livewire',
});

export default db;
