export const notes = pgTable(
  'notes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    ownerId: text('owner_id')
      .notNull()
      .default(sql`auth.user_id()`),
    title: text('title').notNull().default('untitled note'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    shared: boolean('shared').default(false),
  }
  // ... RLS policies defined here
).enableRLS();

export const paragraphs = pgTable(
  'paragraphs',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    noteId: uuid('note_id').references(() => notes.id),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  }
  // ... RLS policies defined here
).enableRLS();