// Function to save customers to localStorage
function saveCustomers() {
    localStorage.setItem('customers', JSON.stringify(customers));
}

// Function to load customers from localStorage
function loadCustomersFromStorage() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
    }
}

// Initialize Customers on page load
function loadCustomers() {
    loadCustomersFromStorage(); // Load customers from localStorage first

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
    saveCustomers(); // Save to localStorage after balance update
    loadCustomers(); // Reload customers to reflect changes
}

// Add Customer
document.getElementById('addCustomer')?.addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value;
    const amount = parseInt(document.getElementById('amount').value);

    if (customerName && !isNaN(amount)) {
        customers.push({ name: customerName, balance: amount });
        saveCustomers(); // Save to localStorage after adding new customer
        loadCustomers(); // Reload to display new customer
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
        saveCustomers(); // Save to localStorage after creating new customer
        alert('Customer added successfully!');
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert('Please enter a valid customer name.');
    }
});

// Load customer data when the home page is loaded
if (document.querySelector('#customerTable')) {
    loadCustomers();
}
