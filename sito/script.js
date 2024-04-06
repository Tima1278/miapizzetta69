class Person {
    constructor(firstName, lastName, birthDate, email, address, city, country, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.address = address;
        this.city = city;
        this.country = country;
        this.phone = phone;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getFormattedBirthDate() {
        return this.birthDate.toDateString();
    }
}

async function fetchDataAndDisplayPersons() {
    try {
        const response = await fetch('http://localhost:3000');
        const data = await response.json();
        const peopleContainer = document.getElementById('people');
        peopleContainer.innerHTML = '';

        data.forEach(personData => {
            const person = new Person(
                personData.firstName,
                personData.lastName,
                new Date(personData.birthDate),
                personData.email,
                personData.address,
                personData.city,
                personData.country,
                personData.phone
            );

            const personHTML = createPersonHTML(person);
            const cardElement = document.createElement('div');
            cardElement.classList.add('col-md-4');
            cardElement.innerHTML = personHTML;
            peopleContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const fetchDataBtn = document.getElementById('fetchDataBtn');
fetchDataBtn.addEventListener('click', fetchDataAndDisplayPersons);

function createPersonHTML(person) {
    return `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">${person.getFullName()}</h5>
                <p class="card-text"><strong>Data di nascita:</strong> ${person.getFormattedBirthDate()}</p>
                <p class="card-text"><strong>Email:</strong> ${person.email}</p>
                <p class="card-text"><strong>Indirizzo:</strong> ${person.address}</p>
                <p class="card-text"><strong>Città:</strong> ${person.city}</p>
                <p class="card-text"><strong>Paese:</strong> ${person.country}</p>
                <p class="card-text"><strong>Telefono:</strong> ${person.phone}</p>
            </div>
        </div>
    `;
}
