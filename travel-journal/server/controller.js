require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;

            create table countries (
                country_id serial primary key, 
                name varchar
            );

            CREATE TABLE cities(
                city_id SERIAL PRIMARY KEY, 
                name VARCHAR(255),
                rating INTEGER, 
                country_id INTEGER REFERENCES countries(country_id)
            ); 

            insert into countries (name)
            *
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }, 

    getCountries: (req, res) => {
        sequelize.query(`
            SELECT * FROM countries; 
        `) 
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    createCity: (req, res) => {
        let {name, rating, countryId} = req.body
        console.log(req.body)

        sequelize.query(`
            INSERT INTO cities (name, rating, country_id)
            VALUES ('${name}', ${rating}, ${countryId})
            RETURNING *;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }, 

    getCities: (req, res) => {
        sequelize.query(`
            SELECT city_id, cities.name AS city, rating,
            countries.country_id, countries.name AS country
            FROM cities
            JOIN countries
            ON cities.country_id = countries.country_id
            ORDER BY rating DESC;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }, 

    deleteCity: (req, res) => {
        let {id} = req.params; 
        
        sequelize.query(`
            DELETE 
            FROM cities
            WHERE city_id = ${id};
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}