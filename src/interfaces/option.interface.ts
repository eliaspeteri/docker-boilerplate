import { Volume } from './volume.interface';

export interface Option {
  image?: string;
  name?: string;
  ports?: string[];
  environmentVariables?: string[];
  volumes?: Volume[];
  command?: string;
  restart?: 'always' | 'unless-stopped' | 'on-failure' | 'no';
  defaultChecked?: boolean;
  tag?: string;
  dockerfile?: string;
  alias?: string;
  build?: string;
}
