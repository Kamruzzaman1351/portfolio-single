// PM2 Ecosystem Config — used by: pm2 start ecosystem.config.js
// Docs: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/personal-website',
      instances: 1,          // increase to 'max' if you have multiple CPUs and heavy traffic
      exec_mode: 'fork',     // use 'cluster' if instances > 1
      autorestart: true,
      watch: false,          // never watch in production — use pm2 reload after deploy
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Log files
      out_file: '/var/www/personal-website/logs/out.log',
      error_file: '/var/www/personal-website/logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
