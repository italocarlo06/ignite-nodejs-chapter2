import { app } from "./app";
import createConnection from "@shared/infra/typeorm";

createConnection();

app.listen(3333, () => console.log("Server is running"));