import { body } from 'express-validator'
import { ObjectId } from 'mongodb'

// TODO: Commonize
export type URL = string

export interface User {
  _id: ObjectId
  name: string
  username: string
  address: {
    street: string
    suite?: string
    city: string
    zipcode: string
    geo?: {
      lat?: string
      lng?: string
    }
  }
  phone: string
  website?: URL
  company: {
    name: string
    catchPhrase?: string
    bs?: string
  }
}

export type NewUser = Omit<User, '_id'>

export const USER_VALIDATOR = [
  body('name')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters.'),
  body('username')
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters.'),

  // Address validation
  body('address.street')
    .isString()
    .notEmpty()
    .withMessage('Street is required.'),
  body('address.suite').optional().isString(),
  body('address.city').isString().notEmpty().withMessage('City is required.'),
  body('address.zipcode')
    .isString()
    .notEmpty()
    .withMessage('Zipcode is required.'),
  body('address.geo.lat').optional().isString(), // Could use float check but is strign in example
  body('address.geo.lng').optional().isString(), // Could use float check but is string in example
  // Phone validation
  body('phone').isString().notEmpty().withMessage('Phone number is required.'),

  // Website validation
  body('website').optional().isString(), // Could use .isUrl() but frontend does not at the moment have similar filter

  // Company validation
  body('company.name')
    .isString()
    .notEmpty()
    .withMessage('Company name is required.'),
  body('company.catchPhrase').optional().isString(),
  body('company.bs').optional().isString(),
]
