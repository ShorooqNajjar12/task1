const readlineSync = require('readline-sync');

// User model
function createUser(username, firstName, lastName, balance = 0) {
  return {
    username,
    firstName,
    lastName,
    balance,
  };
}

//for Application
const users = [];

function createUserAccount() {
  const username = readlineSync.question('Enter username: ');
  const firstName = readlineSync.question('Enter first name: ');
  const lastName = readlineSync.question('Enter last name: ');

  const newUser = createUser(username, firstName, lastName);
  users.push(newUser);
  console.log(`User ${username} created successfully.`);
}

function depositMoney() {
  const username = readlineSync.question('Enter username to deposit money: ');
  const user = users.find(u => u.username === username);

  if (user) {
    const amount = parseFloat(readlineSync.question('Enter amount to deposit: '));
    if (!isNaN(amount) && amount > 0) {
      user.balance += amount;
      console.log(`${username} deposited ${amount} money. New balance: ${user.balance}`);
    } else {
      console.log('Invalid amount.');
    }
  } else {
    console.log('User not found.');
  }
}

function transferMoney() {
  const senderUsername = readlineSync.question('Enter sender username: ');
  const sender = users.find(u => u.username === senderUsername);

  const receiverUsername = readlineSync.question('Enter receiver username: ');
  const receiver = users.find(u => u.username === receiverUsername);

  if (sender && receiver) {
    const amount = parseFloat(readlineSync.question('Enter amount to transfer: '));
    if (!isNaN(amount) && amount > 0) {
      if (sender.balance >= amount) {
        sender.balance -= amount;
        receiver.balance += amount;
        console.log(`${sender.username} sent ${amount} to ${receiver.username}`);
      } else {
        console.log(`${sender.username} does not have sufficient funds.`);
      }
    } else {
      console.log('Invalid amount.');
    }
  } else {
    console.log('Sender or receiver not found.');
  }
}

function listTopUsers() {
  const topUsers = getTopUsers();
  console.log('Top 3 users with highest balance:');
  topUsers.forEach(user => {
    console.log(`${user.username} - Balance: ${user.balance}`);
  });
}

function getTopUsers() {
  const sortedUsers = users.slice().sort((a, b) => b.balance - a.balance);
  return sortedUsers.slice(0, 3);
}

// Main loop
while (true) {
  console.log('\n1. Create User\n2. Deposit Money\n3. Transfer Money\n4. List Top Users\n5. Exit');
  const choice = readlineSync.question('Enter your choice: ');

  switch (choice) {
    case '1':
      createUserAccount();
      break;
    case '2':
      depositMoney();
      break;
    case '3':
      transferMoney();
      break;
    case '4':
      listTopUsers();
      break;
    case '5':
      console.log('Exiting the application. Goodbye!');
      process.exit();
    default:
      console.log('Invalid choice. Please enter a number between 1 and 5.');
  }
}
