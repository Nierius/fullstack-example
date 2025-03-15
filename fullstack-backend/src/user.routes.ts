import { Express, Request, Response } from 'express';
import { createUser, deleteUser, getAllUsers } from './dao/UserDAO';

const BASE = '/users/';

export function loadUserRoutes(app: Express) {
  app.get(BASE, handleGetUsers);
  app.post(BASE, handleCreateUser);
  app.delete(`${BASE}:id`, handleDeleteUser);
}

async function handleGetUsers(_: Request, res: Response): Promise<void> {
  console.log(`[Users] Start fetching users`);
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (ex) {
    console.error(`[Users] Fetch failed with '${ex}'`);
    res.status(500);
    return;
  }
  console.log(`[Users] Users fetched OK`);
}

async function handleCreateUser(req: Request, res: Response): Promise<any> {
  console.log(`[Users] Start creating user`);
  try {
    const user = req.body as any;
    await createUser(user);
    res.status(201);
  } catch (ex) {
    console.error(`[Users] Failed with '${ex}'`);
    res.status(500);
    return;
  }
  console.log(`[Users] User created OK`);
}

async function handleDeleteUser(req: Request, res: Response): Promise<any> {
  const userId = req.params.id;
  console.log(`[Users] Start deleting user '${userId}'`);
  try {
    const deleted = await deleteUser(userId);
    res.status(deleted ? 200 : 404);
  } catch (ex) {
    console.error(`[Users] Delete failed with '${ex}'`);
    res.status(500);
    return;
  }
  console.log(`[Users] User deleted OK`);
}
