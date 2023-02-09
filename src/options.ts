import { IOption } from './interfaces/option.interface';

export const optionsList: IOption[] = [
  { image: 'alpine:latest', name: 'alpine' },
  { image: 'busybox' },
  {
    image: 'nginx:latest',
    name: 'nginx',
    ports: ['8080:80'],
    volumes: [
      { source: './nginx.conf', target: '/etc/nginx.conf', flags: 'ro' }
    ],
    environmentVariables: ['NGINX_HOST=foobar.com', 'NGINX_PORT=80']
  },
  { image: 'ubuntu' },
  { image: 'python' },
  {
    image: 'redis:latest',
    name: 'redis',
    command: 'redis-server',
    volumes: [
      { source: 'redis-data', target: '/data' },
      { source: 'redis-conf', target: '/usr/local/etc/redis/redis.conf' }
    ],
    ports: ['6379:6379']
  },
  {
    image: 'postgres:latest',
    name: 'postgres',
    ports: ['5432:5432'],
    environmentVariables: [
      'POSTGRES_USER=username',
      'POSTGRES_PASSWORD=password',
      'POSTGRES_DB=my_db'
    ],
    volumes: [{ source: './db-data/', target: '/var/lib/postgresql/data/' }],
    restart: 'unless-stopped'
  },
  {
    image: 'node:latest',
    name: 'node',
    ports: ['8080:8080'],
    volumes: [{ source: '.', target: '/usr/src/app' }]
  },
  {
    image: 'httpd:latest',
    name: 'httpd',
    ports: ['8080:80'],
    volumes: [{ source: './website', target: '/usr/local/apache2/htdocs' }]
  },
  {
    image: 'mongo:latest',
    name: 'mongodb',
    ports: ['27017:27017'],
    environmentVariables: [
      'MONGO_INIT_DB_ROOT_USERNAME=root',
      'MONGO_INIT_DB_ROOT_PASSWORD=password'
    ],
    volumes: [
      {
        source: 'mongo',
        target: '/data/db'
      }
    ]
  },
  { image: 'traefik' },
  { image: 'mariadb' },
  { image: 'docker' },
  {
    image: 'rabbitmq:latest',
    name: 'rabbitmq',
    ports: ['5672:5672', '15672:15672'],
    volumes: [
      {
        source: '~/.docker-conf/rabbitmq/data/',
        target: '/var/lib/rabbitmq/'
      },
      { source: '~/.docker-conf/rabbitmq/log/', target: '/var/log/rabbitmq' }
    ]
  },
  { image: 'hello-world' },
  { image: 'openjdk' },
  { image: 'golang' },
  {
    image: 'registry:latest',
    name: 'registry',
    ports: ['5000:5000'],
    volumes: [
      { source: '/data', target: '/var/lib/registry' },
      { source: '/certs', target: '/certs' },
      { source: '/auth', target: '/auth' }
    ],
    environmentVariables: [
      'REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt',
      'REGISTRY_HTTP_TLS_KEY=/certs/domain.key',
      'REGISTRY_AUTH=htpasswd',
      'REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd',
      'REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm'
    ]
  },
  {
    image: 'wordpress:latest',
    name: 'wordpress',
    volumes: [{ source: 'wordpress', target: '/var/www/html' }],
    restart: 'unless-stopped'
  },
  { image: 'centos' },
  { image: 'debian' },
  {
    image: 'influxdb:latest',
    name: 'influxdb',
    volumes: [
      { source: 'influxdbv2', target: '/var/lib/influxdb2', flags: 'rw' }
    ],
    ports: ['8086:8086']
  },
  {
    image: 'telegraf:latest',
    name: 'telegraf',
    volumes: [
      {
        source: './telegraf/mytelegraf.conf',
        target: '/etc/telegraf/telegraf.conf',
        flags: 'ro'
      }
    ]
  },
  {
    image: 'consul:latest',
    name: 'consul',
    command: "'agent -retry-join consul-server-bootstrap -client 0.0.0.0'"
  },
  {
    image: 'consul:latest',
    name: 'consul-server-bootstrap',
    ports: ['8400:8400', '8600:8600/udp'],
    command: "'agent -server -bootstrap-expect 3 -ui -client 0.0.0.0'"
  },
  {
    image: 'certbot/certbot',
    name: 'certbot',
    volumes: [{ source: 'certbot-etc', target: '/etc/letsencrypt' }],
    command:
      'certonly --webroot --webroot-path=/var/www/html --email example@my_domain --agree-tos --no-eff-email --staging -d my_domain -d www.my_domain'
  },
  {
    image: 'mysql:latest',
    name: 'mysql',
    restart: 'unless-stopped',
    environmentVariables: [
      'MYSQL_DATABASE=default',
      'MYSQL_ROOT_PASSWORD=secret',
      'MYSQL_HOST=mysql'
    ],
    volumes: [
      { source: 'mysql-data', target: '/var/lib/mysql' },
      {
        source: './docker-entrypoint-initdb.d',
        target: 'docker-entrypoint-initdb.d/'
      }
    ],
    ports: ['3308:3306'],
    command: "'--default-authentication-plugin=mysql_native_password'"
  }
];
