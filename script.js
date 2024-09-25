// Customer Data Storage (in-memory for now)
let customers = [
    { name: 'John Doe', balance: 100 },
    { name: 'Jane Smith', balance: 200 }
];

// Load Customers into Table
function loadCustomers() {
    const customerTable = document.querySelector('#customerTable tbody');
    customerTable.innerHTML = '';

    customers.forEach((customer, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.balance}</td>
            <td>
                <button onclick="updateBalance(${index}, 1)">+</button>
                <button onclick="updateBalance(${index}, -1)">-</button>
            </td>
        `;
        customerTable.appendChild(row);
    });
}

// Update Customer Balance
function updateBalance(index, change) {
    customers[index].balance += change;
    loadCustomers();
}

// Add Customer
document.getElementById('addCustomer').addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value;
    const amount = parseInt(document.getElementById('amount').value);

    if (customerName && !isNaN(amount)) {
        customers.push({ name: customerName, balance: amount });
        loadCustomers();
    } else {
        alert('Please enter valid customer name and amount.');
    }
});

// Create New Customer on Page 2
document.getElementById('createCustomerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const newCustomerName = document.getElementById('newCustomerName').value;

    if (newCustomerName) {
        customers.push({ name: newCustomerName, balance: 0 });
        alert('Customer added successfully!');
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert('Please enter a valid customer name.');
    }
});

// Load customer data when home page is loaded
if (document.querySelector('#customerTable')) {
    loadCustomers();
}
