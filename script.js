// Load customers from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadCustomers);

// Function to load customers from localStorage
function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerTable = document.getElementById('customerTable').querySelector('tbody');
    customerTable.innerHTML = ''; // Clear existing rows

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

// Function to add a new customer to localStorage
document.getElementById('customerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('customerName').value;
    const balance = parseInt(document.getElementById('customerBalance').value);

    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers.push({ name, balance });
    localStorage.setItem('customers', JSON.stringify(customers));

    // Clear input fields
    document.getElementById('customerName').value = '';
    document.getElementById('customerBalance').value = '';

    // Reload customer data
    loadCustomers();
});

// Function to update customer balance
function updateBalance(index, change) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers[index].balance += change;
    localStorage.setItem('customers', JSON.stringify(customers));
    
    // Reload customer data
    loadCustomers();
}
