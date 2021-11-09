const bcrypt = require('bcryptjs');

async function generatePass(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
}

// generatePass('hunter12');
const hash = '$2a$10$47RDdkwVejtfaoglgQPvVusQRY3wyN8yglo1ilawzp1NMlZXIBpJ6'

async function checkPass(password, hash) {
    const isPass = await bcrypt.compare(password, hash)

    console.log(isPass);
}

checkPass('hunter12', hash)