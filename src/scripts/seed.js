const { db } = require('@vercel/postgres');

async function createTables(client) {
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS "user" (
            "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            "createdAt" DATE NOT NULL,
            "username" VARCHAR(255) NOT NULL,
            "name" VARCHAR(255) NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL
        );
      `);
      
      console.log(`Created "users" table`);
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS "meal" (
            "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL,
            "calories" INTEGER NOT NULL,
            "protein" BIGINT NOT NULL,
            "carbs" BIGINT NOT NULL,
            "fat" BIGINT NOT NULL,
            "fiber" BIGINT NOT NULL,
            "sugar" BIGINT NOT NULL,
            "img" bytea NOT NULL,
            "dateCreated" DATE NOT NULL,
            "location" VARCHAR(255),
            "userId" UUID REFERENCES "user"("id")
        );
      `);
  
      console.log(`Created "meals" table`);
    } catch (err) {
      console.error(err);
    }
  }

async function main() {
    const client = await db.connect();
    
    await createTables(client);
    
    await client.end();
    }
    
    main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});