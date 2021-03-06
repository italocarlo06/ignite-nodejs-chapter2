import request from "supertest";
import { Connection } from "typeorm";

import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";


import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => { 

  beforeAll( async () => {
    connection= await createConnection("locahost");
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


  
  
  it("should be able to create a new category", async() => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const { refresh_token } = responseToken.body;


    const response = await request(app).post("/categories").send({
      name: "Category SuperTest",
      description: "Description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });

    expect(response.status).toBe(201);
      
  });
  
  it("should not be able to create a new category with same name", async() => {

    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const { refresh_token } = responseToken.body;


    const response = await request(app).post("/categories").send({
      name: "Category SuperTest",
      description: "Description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });

    expect(response.status).toBe(400);     
  });

});