import { Volume } from './volume.interface';

export interface IOption {
  image: string;
  name?: string;
  ports?: string[];
  environmentVariables?: string[];
  volumes?: Volume[];
  command?: string;
  restart?: 'always' | 'unless-stopped' | 'on-failure' | 'no';
  defaultChecked?: boolean;
}
