module.exports = {
    dbConfig: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'react_project'
    },
    cookieConfig: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60000
   },
   passwordHash: 'my_secret&@#$@!#$',
   sessionSecret: 'my_secret_john_bryce!$@#$'
}