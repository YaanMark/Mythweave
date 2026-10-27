// Shared types and utilities for Mythweave

export interface Entity {
  id: string;
  // logical data fields
  position?: { x: number; y: number; z?: number };
  // other attributes
  [key: string]: unknown;
}

export interface Command {
  type: string;
  payload: unknown;
}

export interface Event {
  type: string;
  payload: unknown;
}