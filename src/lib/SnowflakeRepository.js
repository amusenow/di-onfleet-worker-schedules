const snowflakeRepository = require('snowflake-sdk')

class SnowflakeRepository {

    constructor() {
        this.connection = snowflakeRepository.createConnection({
            account: process.env.SNOWFLAKE_ACCOUNT,
            username: process.env.SNOWFLAKE_USER,
            password: process.env.SNOWFLAKE_PASSWORD,
            database: process.env.SNOWFLAKE_DATABASE,
            schema: process.env.SNOWFLAKE_SCHEMA,
            warehouse: process.env.SNOWFLAKE_WAREHOUSE,
            role: process.env.SNOWFLAKE_ROLE
        })
        //Connect to snowflakeRepository when the object is created
        this.connectToSnowflake();
    }

    connectToSnowflake() {
        this.connection.connect(
            (err, conn) => err ? console.log('Snowflake Error: ', err)
                : console.log('Snowflake Connection Success: ', conn.getId()))
    }

    async executeQuery(query) {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.connection.execute({
                sqlText: query,
                complete: (err, stmt, rows) => err ? reject(err) : resolve(rows)
            })
        })
    }
}

module.exports = new SnowflakeRepository();
