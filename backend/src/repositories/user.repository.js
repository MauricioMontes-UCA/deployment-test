import { User } from '../models/user.model.js';

// Data access layer: the only place that talks to the ORM.
// Emails arrive already normalized (trimmed, lowercased) by the validators.
export const userRepository = {
  findById(id) {
    return User.findByPk(id);
  },

  findByEmail(email) {
    return User.findOne({ where: { email } });
  },

  findByEmailWithPassword(email) {
    return User.scope('withPassword').findOne({ where: { email } });
  },

  create({ name, email, passwordHash }) {
    // Restricting `fields` keeps `id` out of the INSERT so the database
    // default (gen_random_uuid()) applies; the generated row comes back via RETURNING.
    return User.create({ name, email, passwordHash }, { fields: ['name', 'email', 'passwordHash'] });
  },
};
