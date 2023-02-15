import { Option } from './interfaces/option.interface';

export const optionsList: Option[] = [
  { image: 'alpine:latest', name: 'alpine', tag: 'CLI' },
  { image: 'busybox', tag: 'CLI' },
  {
    image: 'nginx:latest',
    name: 'nginx',
    ports: ['8080:80'],
    volumes: [{ source: './nginx.conf', target: '/etc/nginx.conf', flags: 'ro' }],
    environmentVariables: ['NGINX_HOST=foobar.com', 'NGINX_PORT=80'],
    tag: 'Proxy',
  },
  { image: 'ubuntu', tag: 'CLI' },
  { image: 'python', tag: 'Lang' },
  {
    image: 'redis:alpine',
    name: 'redis',
    command: 'redis-server',
    volumes: [
      { source: 'redis-data', target: '/data' },
      { source: 'redis-conf', target: '/usr/local/etc/redis/redis.conf' },
    ],
    ports: ['6379:6379'],
    tag: 'Cache',
  },
  {
    image: 'postgres:latest',
    name: 'postgres',
    ports: ['5432:5432'],
    environmentVariables: ['POSTGRES_USER=username', 'POSTGRES_PASSWORD=password', 'POSTGRES_DB=my_db'],
    volumes: [{ source: './db-data/', target: '/var/lib/postgresql/data/' }],
    restart: 'unless-stopped',
    tag: 'DB',
  },
  {
    name: 'node',
    volumes: [{ source: './node', target: '/usr/src/app' }],
    tag: 'Web',
    build: './node',
    dockerfile:
      '# node.dockerfile\n# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/\n\nFROM node:latest\n\n# Create app directory\nWORKDIR /usr/src/app\n\n# Install app dependencies\n# A wildcard is used to ensure both package.json AND package-lock.json are copied\n# where available (npm@5+)\nCOPY package*.json ./\n\nRUN npm install\n# If you are building your code for production\n# RUN npm ci --only=production\n\n# Bundle app source\nCOPY . .\n\nEXPOSE 8080\nCMD [ "node", "server.js" ]\n',
  },
  {
    image: 'httpd:latest',
    name: 'httpd',
    ports: ['8080:80'],
    volumes: [{ source: './website', target: '/usr/local/apache2/htdocs' }],
    tag: 'Proxy',
  },
  {
    image: 'grafana/grafana',
    name: 'grafana',
    ports: ['3000:3000'],
    tag: 'Monitor',
  },
  {
    image: 'mongo:latest',
    name: 'mongodb',
    ports: ['27017:27017'],
    environmentVariables: ['MONGO_INIT_DB_ROOT_USERNAME=root', 'MONGO_INIT_DB_ROOT_PASSWORD=password'],
    volumes: [
      {
        source: 'mongo',
        target: '/data/db',
      },
    ],
    tag: 'DB',
  },
  { image: 'traefik', tag: 'Proxy' },
  {
    image: 'mariadb:latest',
    name: 'mariadb',
    command: '--transaction-isolation=READ-COMMITTED --binlog-format=ROW',
    restart: 'always',
    volumes: [{ source: 'mysql_data', target: '/var/lib/mysql' }],
    environmentVariables: [
      'MYSQL_DATABASE=default',
      'MYSQL_USER=root',
      'MYSQL_ROOT_PASSWORD=secret',
      'MYSQL_PASSWORD=secret',
    ],
    ports: ['3306:3306', '33060:33060'],
    tag: 'DB',
  },
  { image: 'docker', tag: 'Docker' },
  {
    image: 'rabbitmq:latest',
    name: 'rabbitmq',
    ports: ['5672:5672', '15672:15672'],
    volumes: [
      {
        source: '~/.docker-conf/rabbitmq/data/',
        target: '/var/lib/rabbitmq/',
      },
      { source: '~/.docker-conf/rabbitmq/log/', target: '/var/log/rabbitmq' },
    ],
    tag: 'Web',
  },
  { image: 'hello-world', tag: 'CLI' },
  { image: 'openjdk', tag: 'Lang' },
  { image: 'golang', tag: 'Lang' },
  {
    image: 'registry:latest',
    name: 'registry',
    ports: ['5000:5000'],
    volumes: [
      { source: '/data', target: '/var/lib/registry' },
      { source: '/certs', target: '/certs' },
      { source: '/auth', target: '/auth' },
    ],
    environmentVariables: [
      'REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt',
      'REGISTRY_HTTP_TLS_KEY=/certs/domain.key',
      'REGISTRY_AUTH=htpasswd',
      'REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd',
      'REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm',
    ],
    tag: 'Docker',
  },
  {
    image: 'wordpress:latest',
    name: 'wordpress',
    volumes: [{ source: 'wordpress', target: '/var/www/html' }],
    restart: 'unless-stopped',
    environmentVariables: [
      'WORDPRESS_DB_HOST=db',
      'WORDPRESS_DB_USER=wordpress',
      'WORDPRESS_DB_PASSWORD=wordpress',
      'WORDPRESS_DB_NAME=wordpress',
    ],
    tag: 'Web',
  },
  { image: 'centos', tag: 'CLI' },
  { image: 'debian', tag: 'CLI' },
  {
    image: 'influxdb:latest',
    name: 'influxdb',
    volumes: [{ source: 'influxdbv2', target: '/var/lib/influxdb2', flags: 'rw' }],
    ports: ['8086:8086'],
    tag: 'DB',
  },
  {
    image: 'telegraf:latest',
    name: 'telegraf',
    volumes: [
      {
        source: './telegraf/mytelegraf.conf',
        target: '/etc/telegraf/telegraf.conf',
        flags: 'ro',
      },
    ],
    tag: 'Monitor',
  },
  {
    image: 'consul:latest',
    name: 'consul',
    command: "'agent -retry-join consul-server-bootstrap -client 0.0.0.0'",
    tag: 'Web',
  },
  {
    image: 'consul:latest',
    name: 'consul-server-bootstrap',
    alias: 'consul-server',
    ports: ['8400:8400', '8600:8600/udp'],
    command: "'agent -server -bootstrap-expect 3 -ui -client 0.0.0.0'",
    tag: 'Web',
  },
  {
    image: 'certbot/certbot',
    name: 'certbot',
    volumes: [{ source: 'certbot-etc', target: '/etc/letsencrypt' }],
    command:
      'certonly --webroot --webroot-path=/var/www/html --email example@my_domain --agree-tos --no-eff-email --staging -d my_domain -d www.my_domain',
    tag: 'Web',
  },
  {
    image: 'mysql:latest',
    name: 'mysql',
    restart: 'unless-stopped',
    environmentVariables: ['MYSQL_DATABASE=default', 'MYSQL_ROOT_PASSWORD=secret', 'MYSQL_HOST=mysql'],
    volumes: [
      { source: 'mysql-data', target: '/var/lib/mysql' },
      {
        source: './docker-entrypoint-initdb.d',
        target: 'docker-entrypoint-initdb.d/',
      },
    ],
    ports: ['3308:3306'],
    command: "'--default-authentication-plugin=mysql_native_password'",
    tag: 'DB',
  },
  {
    image: 'nextcloud:apache',
    name: 'nextcloud',
    restart: 'always',
    ports: ['80:80'],
    volumes: [{ source: 'nc_data', target: '/var/www/html' }],
    environmentVariables: [
      'REDIS_HOST=redis',
      'MYSQL_HOST=db',
      'MYSQL_DATABASE=default',
      'MYSQL_USER=nextcloud',
      'MYSQL_PASSWORD=secret',
    ],
    tag: 'Web',
  },
  {
    name: 'pocketbase',
    build: './pocketbase',
    dockerfile: `# pocketbase.dockerfile\n# https://pocketbase.io/docs/going-to-production#using-docker\n\nFROM alpine:latest\n\nARG PB_VERSION=0.12.2\n\nRUN apk add --no-cache \\\n\tunzip \\\n\tca-certificates\n\n# download and unzip pocketbase\nADD https://github.com/pocketbase/pocketbase/releases/download/v\${PB_VERSION}\n/pocketbase_\${PB_VERSION}_linux_amd64.zip /tmp/pb.zip\nRUN unzip /tmp/pb.zip -d /pb/\n\nEXPOSE 8090\n\n#start pocketbase\nCMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]`,
    tag: 'DB',
  },
  {
    name: 'edgedb',
    image: 'edgedb/edgedb',
    environmentVariables: ['EDGEDB_SERVER_SECURITY=insecure_dev_mode'],
    volumes: [{ source: './dbschema', target: 'dbschema' }],
    ports: ['5656:5656'],
    tag: 'DB',
  },
];
