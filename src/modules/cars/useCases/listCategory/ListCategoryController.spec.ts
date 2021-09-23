import request from "supertest";
import { Connection } from "typeorm";

import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";


import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories Controller", () => { 

  beforeAll( async () => {
    connection= await createConnection();
    await connection.runMigrations();

    const password = await hash('admin',8);
    const id = uuidV4();
    const sql = `
      INSERT INTO USERS(id, name, email , password , "isAdmin", driver_license,created_at)
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, '123456','now()')
    `;
  
    await connection.query(sql);    
  });

  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async() => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const { token } = responseToken.body;


    await request(app).post("/categories").send({
      name: "Category SuperTest",
      description: "Description"
    }).set({
      Authorization: `Bearer ${token}`
    });    

    const listResponse = await request(app).get("/categories");
    
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBe(1);
    expect(listResponse.body[0]).toHaveProperty("id");  
  });

});