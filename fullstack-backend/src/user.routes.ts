import { Express, Request, Response } from 'express';
import { createUser, deleteUser, getAllUsers } from './dao/UserDAO';
import { NewUser, USER_VALIDATOR } from './model/api';
import { validationResult } from 'express-validator';

const BASE = '/users/';

export function loadUserRoutes(app: Express) {
  console.log("USER_VALIDATOR:", USER_VALIDATOR);
  app.get(BASE, handleGetUsers);
  app.post(BASE, USER_VALIDATOR, handleCreateUser);
  app.delete(BASE, handleDeleteUser);
}

async function handleGetUsers(_: Request, res: Response): Promise<void> {
  console.log(`[Users] Start fetching users`);
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (ex) {
    console.error(`[Users] Fetch failed with '${ex}'`);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  console.log(`[Users] Users fetched OK`);
}

async function handleCreateUser(req: Request, res: Response): Promise<void> {
  console.log(`[Users] Start creating user`);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Mapped by hand to ensure no extra fields are saved and type safety for future (could also use mongoose for schema validation)
    const user: NewUser = {
      name: req.body.name,
      username: req.body.username,
      address: {
        city: req.body.address.city,
        street: req.body.address.street,
        zipcode: req.body.address.zipcode,
        geo: {
          lat: req.body.address.geo.lat,
          lng: req.body.address.geo.lng,
        },
        suite: req.body.address.suite
      },
      phone: req.body.phone,
      company: {
        name: req.body.company.name,
        bs: req.body.company.bs,
        catchPhrase: req.body.company.catchPhrase
      },
      website: req.body.website
    };
    await createUser(user);
    res.status(201).json({ message: "Created" });
  } catch (ex) {
    console.error(`[Users] Failed with '${ex}'`);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  console.log(`[Users] User created OK`);
}

async function handleDeleteUser(req: Request, res: Response): Promise<void> {
  const userId = req.query.id as string;
  console.log(`[Users] Start deleting user '${userId}'`);
  try {
    const deleted = await deleteUser(userId);
    res.status(deleted ? 200 : 404).json({ deleted });
  } catch (ex) {
    console.error(`[Users] Delete failed with '${ex}'`);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
  console.log(`[Users] User deleted OK`);
}
