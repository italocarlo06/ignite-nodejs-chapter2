import { hash } from "bcryptjs";
import { v4 as uuidV4} from "uuid";

import createConnection from "@shared/infra/typeorm";

async function create(){
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash('admin',8);
  const sql = `
    INSERT INTO USERS(id, name, email , password , "isAdmin", driver_license,created_at)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, '123456','now()')
  `;

  await connection.query(sql);

  await connection.close();
}

create().then( ()=> console.log("User Admin created"));