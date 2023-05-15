import type { InferModel } from 'drizzle-orm';
import {
  int,
  serial,
  varchar,
  mysqlTable,
  foreignKey
} from 'drizzle-orm/mysql-core';
import { accounts } from './accounts';

export const admins = mysqlTable(
  'admins',
  {
    id: serial('id').primaryKey(),
    accountId: int('account_id').notNull(),
    password: varchar('password', { length: 256 }).notNull()
  },
  (admins) => ({
    accountIdFK: foreignKey(({
      columns: [admins.accountId],
      foreignColumns: [accounts.id]
    })),
  }),
);

export type Admin = InferModel<typeof admins>;
export type NewAdmin = InferModel<typeof admins, "insert">;

