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
      VALUES ('john_doe', 'John Doe', 'password123', 'john.doe@example.com');
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
      INSERT INTO "meals" ("name", "calories", "protein", "carbs", "fat", "fiber", "sugar", "img", "location", "user_email")
      VALUES
        ('Oatmeal with Blueberries', 300, 10, 50, 5, 8, 15, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Grilled Chicken Salad', 450, 35, 20, 18, 5, 10, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Beef Stir-fry with Rice', 550, 30, 60, 20, 5, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Veggie Omelet', 280, 18, 12, 16, 3, 6, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Grilled Salmon with Asparagus', 400, 35, 15, 18, 6, 3, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Chicken Caesar Wrap', 520, 30, 40, 25, 4, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Work', '${email}'),
        ('Pasta Primavera', 600, 20, 90, 18, 8, 12, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Greek Salad with Feta', 350, 15, 18, 25, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Beef Tacos', 550, 30, 45, 25, 8, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Grilled Chicken Sandwich', 480, 35, 40, 18, 4, 6, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Vegetable Stir-fry with Tofu', 400, 18, 50, 15, 10, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Turkey Burger with Sweet Potato Fries', 550, 30, 45, 25, 8, 10, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Sushi Rolls', 500, 25, 60, 10, 3, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Chicken Fajitas', 550, 35, 45, 20, 8, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Spinach Salad with Grilled Shrimp', 400, 30, 20, 15, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Beef and Broccoli', 500, 35, 40, 20, 6, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Turkey Chili', 400, 30, 40, 12, 10, 8, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Grilled Vegetable Skewers', 250, 10, 30, 10, 8, 15, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}'),
        ('Chicken Caesar Salad', 500, 35, 20, 25, 5, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Restaurant', '${email}'),
        ('Quinoa and Black Bean Burrito Bowl', 450, 20, 60, 15, 12, 5, E'\\\\xFFD8FFE000104A46494600010101006000', 'Home', '${email}');
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