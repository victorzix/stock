import { Sequelize } from 'sequelize';

const db_name = String(process.env.DB_NAME);
const db_user = String(process.env.DB_USER);
const db_password = String(process.env.DB_PASSWORD);

const sequelize = new Sequelize(db_name, db_user, db_password, {
	host: process.env.DB_HOST,
	dialect: 'mysql',
});

export async function connection(): Promise<void> {
	try {
		await sequelize.authenticate();
		console.log('Connection established successfully.');
	} catch (err: any) {
		console.log('Unable to connect to database' + err.message);
	}
};
