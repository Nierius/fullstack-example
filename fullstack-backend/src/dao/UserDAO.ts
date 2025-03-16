import { ObjectId } from "mongodb";
import { USERS_COLLECTION } from "../db/collection";
import { getCollectionClient } from "../db/mongo";
import { NewUser, User } from "../model/api";

export async function getAllUsers(): Promise<User[]> {
  const client = getCollectionClient<User>(USERS_COLLECTION);
  return await client.find().toArray();
}

export async function createUser(user: User | NewUser): Promise<ObjectId | undefined> {
  const client = getCollectionClient(USERS_COLLECTION);
  return (await client.insertOne(user)).insertedId ?? undefined;
}

export async function deleteUser(userId: string): Promise<boolean> {
  const client = getCollectionClient<User>(USERS_COLLECTION);
  return (await client.deleteOne({ _id: new ObjectId(userId) })).deletedCount > 0;
}
