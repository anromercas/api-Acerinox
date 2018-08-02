module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONDODB || 'mongodb://localhost:27017/acerinox',
    SECRET_TOKEN: 'myckavedetokens'
}