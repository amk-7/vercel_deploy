import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb () {
  return open({
    filename: '/home/malik-kondi/ifnti/2025-2026/cours_api/api_rest/gestion_note/src/db.sqlite',
    driver: sqlite3.Database
  })
}

const db = await openDb();

const ddl = `
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY autoincrement,
    firstname TEXT,
    lastname TEXT,
    sexe TEXT,
    birth_day DATE,
    check(sexe in ('M', 'F'))
);
`;

const dml = `
INSERT INTO students(firstname, lastname, sexe, birth_day) 
VALUES ('Abdoul Malik', 'KONDI', 'M', '1992/01/01'),
       ('Nabila', 'GOUTANDI', 'F', '2020/01/01'),
       ('Abdoul', 'SHAKUR', 'M', '1993/01/01'),
       ('Youssif', 'NAZEGA', 'M', '1995/01/01'),
       ('patrik', 'MAYOU', 'M', '1998/01/01');
`;

await db.exec(ddl);
await db.exec(dml);


