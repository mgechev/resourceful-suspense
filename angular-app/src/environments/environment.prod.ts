import { Environment } from './env-types';
import { Common } from './common';

export const environment: Environment = {
  ...Common,
  apiUrl: 'http://localhost:4200/api',
  imageCdnUrl: '',
};
