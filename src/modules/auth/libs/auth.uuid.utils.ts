import * as uuid from 'uuid';

export const generateUuidV4 = (): string => {
  return uuid.v4();
};
