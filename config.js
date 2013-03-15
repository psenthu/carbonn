//Set the current environment to true in the env object
var currentEnv = process.env.NODE_ENV || 'development';

exports.appName = 'Carbonn';

exports.env = {
  production: false,
  staging: false,
  test: false,
  development: false
};

exports.env[currentEnv] = true;

exports.db = { dbname: this.appName.toLowerCase() + '_' + currentEnv};
console.log("Executing in:", currentEnv);