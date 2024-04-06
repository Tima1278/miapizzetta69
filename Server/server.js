const express = require('express');
const cors = require('cors');
const {faker} = require('@faker-js/faker')

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    const people = [];
    for (let i = 0; i < 10; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const birthDate = faker.date.past(50, new Date(1970, 0, 1));
        const email = faker.internet.email();
        const address = faker.address.streetAddress();
        const city = faker.address.city();
        const country = faker.address.country();
        const phone = faker.phone.number();

        const person = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            email: email,
            address: address,
            city: city,
            country: country,
            phone: phone
        };

        people.push(person);
    }

    res.json(people);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
