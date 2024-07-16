type GetKeysFromObjectType = <T extends object>(obj: T) => (keyof T)[];

export type { GetKeysFromObjectType };
