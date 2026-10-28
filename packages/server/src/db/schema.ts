import { pgTable, uuid, text, varchar, timestamp, boolean, jsonb, integer } from 'drizzle-orm/pg-core';

export const assets = pgTable('assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').notNull().references(() => campaigns.id),
  uploaderId: uuid('uploader_id').notNull().references(() => users.id),
  filename: varchar('filename', { length: 255 }).notNull(),
  mime: varchar('mime', { length: 100 }).notNull(),
  size: integer('size').notNull(),
  width: integer('width'), // in pixels, optional after validation
  height: integer('height'),
  sha256: varchar('sha256', { length: 64 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'), // optional for temporary assets
  deletedAt: timestamp('deleted_at'),
});

export const scenes = pgTable('scenes', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').notNull().references(() => campaigns.id),
  name: varchar('name', { length: 150 }).notNull(),
  mapAssetId: uuid('map_asset_id').references(() => assets.id),
  gridType: varchar('grid_type', { length: 20 }).default('square'), // square | hex | none
  cellSize: integer('cell_size').default(50).notNull(), // in world units (pixels per cell)
  unit: varchar('unit', { length: 20 }).default('meters'),
  scale: integer('scale').default(1).notNull(), // world‑to‑pixel scale factor
  version: integer('version').default(1).notNull(), // optimistic‑locking version
  archivedAt: timestamp('archived_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sceneLayers = pgTable('scene_layers', {
  id: uuid('id').primaryKey().defaultRandom(),
  sceneId: uuid('scene_id').notNull().references(() => scenes.id),
  name: varchar('name', { length: 100 }).notNull(),
  order: integer('order').default(0).notNull(),
  type: varchar('type', { length: 20 }).default('generic'), // background, terrain, token, drawing, etc.
  visibleToGm: boolean('visible_to_gm').default(true).notNull(),
  visibleToPlayers: boolean('visible_to_players').default(true).notNull(),
  locked: boolean('locked').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const entityLogic = pgTable('entity_logic', {
  id: uuid('id').primaryKey().defaultRandom(),
  data: jsonb('data').default({}), // generic logical data, visible to all
  confidential: jsonb('confidential').default({}), // GM‑only data, never sent to players
  version: integer('version').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tokens = pgTable('tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  sceneId: uuid('scene_id').notNull().references(() => scenes.id),
  layerId: uuid('layer_id').notNull().references(() => sceneLayers.id),
  entityId: uuid('entity_id').references(() => entityLogic.id), // optional linking
  name: varchar('name', { length: 150 }).notNull(),
  assetId: uuid('asset_id').references(() => assets.id), // optional image for token
  x: integer('x').default(0).notNull(), // world coordinates (grid units)
  y: integer('y').default(0).notNull(),
  rotation: integer('rotation').default(0), // degrees
  size: integer('size').default(1).notNull(), // multiplicador de células
  locked: boolean('locked').default(false).notNull(),
  hidden: boolean('hidden').default(false).notNull(), // visibility flag (GM‑only if hidden)
  ownerId: uuid('owner_id').notNull().references(() => users.id),
  allowedUserIds: jsonb('allowed_user_ids').default([]), // array of user UUIDs allowed to move
  hpCurrent: integer('hp_current'),
  hpMax: integer('hp_max'),
  conditions: jsonb('conditions').default({}), // arbitrary key/value
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').notNull().references(() => campaigns.id),
  authorId: uuid('author_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  visibility: varchar('visibility', { length: 20 }).default('public'), // public | gm | private
  targetUserId: uuid('target_user_id'), // for private messages
  createdAt: timestamp('created_at').defaultNow().notNull(),
  editedAt: timestamp('edited_at'),
  deletedAt: timestamp('deleted_at'),
});

export const diceRolls = pgTable('dice_rolls', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').notNull().references(() => campaigns.id),
  authorId: uuid('author_id').notNull().references(() => users.id),
  formula: varchar('formula', { length: 100 }).notNull(),
  result: integer('result').notNull(),
  details: jsonb('details').default({}), // e.g., individual dice results
  visibility: varchar('visibility', { length: 20 }).default('public'), // public | gm | private
  targetUserId: uuid('target_user_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
