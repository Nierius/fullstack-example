import { MongoClient, Document as MongoDoc, ObjectId } from 'mongodb';
import { USERS_COLLECTION } from './collection';

const DB_NAME = process.env["DB_NAME"] ?? "fullstack-db"
const CONNECTION_STRING = process.env["MONGO_URI"]
if (!CONNECTION_STRING) throw 'Connection string not defined'

const CLIENT = new MongoClient(CONNECTION_STRING);

export async function connectToDB() {
  await CLIENT.connect();
  console.debug("Connected to MongoDB");
}

export function getCollectionClient<T extends MongoDoc>(collection: string) {
  return CLIENT.db(DB_NAME).collection<T>(collection);
}

export async function createAndPrimeDbIfNotExists() {
  const databasesList = await CLIENT.db().admin().listDatabases();
  if (databasesList.databases.find(db => db.name === DB_NAME) !== undefined) {
    console.debug("Database already exists. No priming done.");
    return
  }

  const db = CLIENT.db(DB_NAME);
  const users = db.collection(USERS_COLLECTION);

  const usersToInsertRes = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!usersToInsertRes.ok) throw "Failed to get users prime data";

  let usersToInsert = await usersToInsertRes.json();
  if (Array.isArray(usersToInsert)) {
    usersToInsert = usersToInsert.map((usr) => ({
      _id: new ObjectId(usr.id as string),
      ...usr
    }));
    for (const usr of usersToInsert) {
      delete usr.id;
    }
  }

  users.insertMany(usersToInsert);
  console.debug("Primed DB with data");
}
