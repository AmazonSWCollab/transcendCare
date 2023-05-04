import type { InferModel } from 'drizzle-orm';
import {
  text,
  integer,
  sqliteTable,
  foreignKey
} from 'drizzle-orm/sqlite-core';
import { accounts } from './accounts';
export const admins = sqliteTable(
  'admins',
  {
    id: integer('id').primaryKey(),
    accountId: integer('account_id').notNull(),
    password: text('password').notNull()
  },
  (admins) => ({
    accountIdFK: foreignKey(() => ({
      columns: [admins.accountId],
      foreignColumns: [accounts.id]
    }))
  }),
);

export type Admin = InferModel<typeof admins>;
export type NewAdmin = InferModel<typeof admins, "insert">;

