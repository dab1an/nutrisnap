const { db } = require('@vercel/postgres');

async function createTables(client) {
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      //drop tables
        await client.query(`
            DROP TABLE "meals";
        `);
        console.log(`Dropped "meals" table`);
        await client.query(`
            DROP TABLE "users";
        `);
        console.log(`Dropped "users" table`);
      
      await client.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "email" VARCHAR(255) PRIMARY KEY,
        "id" UUID DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "username" VARCHAR(255) NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL
      );
      `);
      
      console.log(`Created "users" table`);
      
      await client.query(`
    CREATE TABLE IF NOT EXISTS "meals" (
        "id" UUID DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL,
        "calories" INTEGER NOT NULL,
        "protein" BIGINT NOT NULL,
        "carbs" BIGINT NOT NULL,
        "fat" BIGINT NOT NULL,
        "fiber" BIGINT NOT NULL,
        "sugar" BIGINT NOT NULL,
        "img" bytea NOT NULL,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "location" VARCHAR(255),
        "user_email" VARCHAR(255) REFERENCES "users"("email"),
        PRIMARY KEY ("id")
      );
`);

  
      console.log(`Created "meals" table`);
    } catch (err) {
      console.error(err);
    }
  }

  async function insertMockData(client) {
    await client.query(`
      INSERT INTO "users" ("username", "name", "password", "email")
      VALUES ('john_doe', 'John Doe', 'password123', 'jschuster8765@gmail.com');
    `);
  
    // Get user ID
    const { rows: [user] } = await client.query(`
      SELECT email FROM "users" WHERE username = 'john_doe';
    `);
  
    // Get the user ID
    const email = user.email;
    console.log('User Email:', email);
  
    // Insert meal data
    await client.query(`
      INSERT INTO "meals" ("name", "calories", "protein", "carbs", "fat", "fiber", "sugar", "img", "location", "user_email", "created_at")
      VALUES
      ('Oatmeal with Blueberries', 300, 10, 50, 5, 8, 15, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-10 12:00:00'),
      ('Grilled Chicken Salad', 450, 35, 20, 18, 5, 10, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}', '2024-03-11 12:00:00'),
      ('Beef Stir-fry with Rice', 550, 30, 60, 20, 5, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-12 12:00:00'),
      ('Veggie Omelet', 280, 18, 12, 16, 3, 6, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-13 12:00:00'),
      ('Grilled Salmon with Asparagus', 400, 35, 15, 18, 6, 3, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-14 12:00:00'),
      ('Chicken Caesar Wrap', 520, 30, 40, 25, 4, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Work', '${email}', '2024-03-14 12:00:00'),
      ('Pasta Primavera', 600, 20, 90, 18, 8, 12, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-14 12:00:00'),
      ('Greek Salad with Feta', 350, 15, 18, 25, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}', '2024-03-17 12:00:00'),
      ('Beef Tacos', 550, 30, 45, 25, 8, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-18 12:00:00'),
      ('Grilled Chicken Sandwich', 480, 35, 40, 18, 4, 6, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}', '2024-03-19 12:00:00'),
      ('Vegetable Stir-fry with Tofu', 400, 18, 50, 15, 10, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-19 12:00:00'),
      ('Turkey Burger with Sweet Potato Fries', 550, 30, 45, 25, 8, 10, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-21 12:00:00'),
      ('Sushi Rolls', 500, 25, 60, 10, 3, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}', '2024-03-22 12:00:00'),
      ('Chicken Fajitas', 550, 35, 45, 20, 8, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-23 12:00:00'),
      ('Spinach Salad with Grilled Shrimp', 400, 30, 20, 15, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}', '2024-03-24 12:00:00'),
      ('Beef and Broccoli', 500, 35, 40, 20, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}', '2024-03-24 12:00:00')
    `);
  }

async function main() {
    const client = await db.connect();
    
    await createTables(client);
    await insertMockData(client);
    
    await client.end();
    }
    
    main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});