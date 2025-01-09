const phoneArray = [];
const authKeyLogin = localStorage.getItem('authKey');

// Utility function to check authentication and
// Authentication Check
function checkAuthentication() {
    try {
        const authKey = localStorage.getItem('authKey');

        if (!authKey) {
            console.warn('User not authenticated. Redirecting to login page...');
            redirectToLogin();
        } else {
            console.log('Authentication verified.');
        }
    } catch (error) {
        console.error('Error during authentication check:', error);
        redirectToLogin();
    }
}

// Utility Function to Redirect to Login Page
function redirectToLogin() {
    window.location.replace('/login.html'); // Replace ensures no back button bypass
}

// Logout Function with Robust Security
function logout() {
    try {
        // Confirm user intent
        const userConfirmed = confirm('Kya aap waqai logout karna chahte hain?');

        if (userConfirmed) {
            // Clear sensitive data securely
            localStorage.removeItem('authKey');
            console.info('User logged out successfully.');

            // Prevent back navigation to the previous page
            window.location.replace('/login.html');
        } else {
            console.log('Logout canceled by the user.');
        }
    } catch (error) {
        console.error('Error during logout process:', error);
    }
}

// Call the Authentication Check on Page Load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});
// Function to hide span text
function hideSpanText() {
    const spans = document.querySelectorAll('#sideNav span');
    spans.forEach(span => {
        span.style.display = 'none'; // Hide text
    });
}

// Function to show span text
function viewSpanText() {
    const spans = document.querySelectorAll('#sideNav span');
    spans.forEach(span => {
        span.style.display = 'inline'; // Show text
    });
}

document.getElementById("repairing-main").style.display = "none";

// Function to fetch and save data in an array
async function fetchAndSavePhoneData() {
checkAuthentication();
    const url = `http://127.0.0.1:5000/phone/view?auth_key=${authKeyLogin}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear the array and save new data
        phoneArray.splice(0, phoneArray.length, ...data.phones);

        // Populate table with fetched data
        showData();

        console.log("Saved phone data:", phoneArray);
    } catch (error) {
        console.error("Error fetching phone data:", error);
    }
}

// Function to populate the table with phone data
function showData() {
    let phonedetails = "";

    // Loop through the phoneArray
    phoneArray.forEach(function (phone) {
        phonedetails += `
                 <tr>
                <td data-label="ID">${phone.id}</td>
                <td data-label="Company">${phone.company}</td>
                <td data-label="Model Name">${phone.model_name}</td>
                <td data-label="IMEI">${phone.imei}</td>
                <td data-label="Condition">${phone.is_new === "New" ? "New" : "Old"}</td>
                <td data-label="Status">${phone.status}</td>
                <td data-label="Price">${phone.price}</td>
                <td data-label="Date">${phone.date_added}</td>
                <td data-label="Actions">
                    <div class="dropdown">
                        <button class="btn btn-more" data-id="${phone.id}">
                            <i class="ri-more-2-fill"></i>
                        </button>
                        <div id="menu-${phone.id}" class="dropdown-menu">
                            <button class="btn btn-edit" onclick="handleEdit('${phone.id}')">Edit</button>
                            <button class="btn btn-delete" onclick="handleDelete('${phone.id}')">Delete</button>
                            <button class="btn btn-export" onclick="handleExport('${phone.id}')">Export</button>
                        </div>
                    </div>
                </td>
            </tr>`;
    });

    // Insert the details into the HTML table
    document.getElementById("phonedetails").innerHTML = phonedetails;
    // Re-attach event listeners to dynamically added rows
    setupDynamicDropdowns('#phonedetails'); // Initialize for Table 2
}

// Function to handle edit action
function handleEdit(phoneId) {
    alert(`Edit action triggered for Phone ID: ${phoneId}`);
    // Add edit functionality as needed
}

// Function to handle delete action
function handleDelete(phoneId) {
checkAuthentication();
    const server = "127.0.0.1:5000"; // Replace with actual server address
    const authkey = authKeyLogin; // Replace with actual authentication key
    const deleteUrl = `http://${server}/phone/delete?auth_key=${authkey}&id=${phoneId}`;

    // User confirmation
    const confirmation = confirm("Kya aap is phone ko delete karna chahte hain?");
    if (confirmation) {
        // GET request to delete the phone
        fetch(deleteUrl, {
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
                fetchAndSavePhoneData()
                alert("Phone successfully deleted!");
                // Optionally reload or update UI
            } else {
                alert("Phone delete karne mein error aayi.");
            }
        })
        .catch(error => {
            console.error("Error during deletion:", error);
            alert("Delete request failed. Please try again later.");
        });
    } else {
        alert("Delete operation canceled.");
    }
}

// Ensure container is initially hidden
document.getElementById("container").style.display = "none";

// Function to show phone container and hide main content
function togglePhoneContainer() {
    document.getElementById("main-dasb").style.display = "none";
    document.getElementById("container").style.display = "block";
document.getElementById("repairing-main").style.display = "none";
    document.getElementById("selling-main").style.display = "none";
    document.getElementById("repairingaccessorie-main").style.display = "none";
    document.getElementById("billing-main").style.display = "none";
    // Fetch and display phone data
    fetchAndSavePhoneData();
    executeAnimations();
}

// Function to show phone container and hide main content
function toggleMainContainer() {
    document.getElementById("main-dasb").style.display = "block";
    document.getElementById("container").style.display = "none";
    document.getElementById("repairing-main").style.display = "none";
    
document.getElementById("selling-main").style.display = "none";
document.getElementById("repairingaccessorie-main").style.display = "none";
document.getElementById("billing-main").style.display = "none";

    // Fetch and display phone data
    
}


// Function to reset to main content

function toggleNav() {

    const sideNav = document.getElementById("sideNav");
    sideNav.classList.remove("collapsed"); // Remove the collapsed class to open
    const main = document.getElementById("main");
    main.style.marginLeft = "250px";
    const repairingcontainer = document.getElementById("repairing-main");
    const repairingaccessorie = document.getElementById("repairingaccessorie-main");
    repairingcontainer.style.marginLeft = "250px";
    const
    sellingmain=document.getElementById("selling-main");
    sellingmain.style.marginLeft = "250px";
    repairingaccessorie.style.marginLeft = "250px";
    const billingmain=document.getElementById("billing-main");
    billingmain.style.marginLeft = "250px";
    // Select all span elements inside #sideNav
const spans = document.querySelectorAll('#sideNav span');


// Retrieve all text content from the span elements
const spanTexts = Array.from(spans).map(span => span.textContent);

// Log the text of all span elements
console.log(spanTexts);

// If you want to display all text in a single string
const combinedText = spanTexts.join(' ');
console.log(combinedText);
viewSpanText();
    
}


function toggleNavOpen() {
    const sideNav = document.getElementById("sideNav");
    const main = document.getElementById("main");
    const repairingcontainer = document.getElementById("repairing-main");
    const sellingmain = document.getElementById("selling-main");
    const repairingaccessorie = document.getElementById("repairingaccessorie-main");
  const billingmain=document.getElementById("billing-main");
    
    

    if (sideNav.classList.contains("collapsed")) {
        // Remove the "collapsed" class and set margin to 250px
        sideNav.classList.remove("collapsed");
        main.style.marginLeft = "250px";
        billingmain.style.marginLeft = "250px";
        repairingcontainer.style.marginLeft = "250px";
        sellingmain.style.marginLeft = "250px";
        repairingaccessorie.style.marginLeft = "250px";
        // Select all span elements inside #sideNav
        viewSpanText();

        
        
    } else {
        // Add the "collapsed" class and set margin to 75px
        sideNav.classList.add("collapsed");
        main.style.marginLeft = "75px";
        sellingmain.style.marginLeft = "75px";
        repairingcontainer.style.marginLeft = "75px";
        billingmain.style.marginLeft = "75px";
        repairingaccessorie.style.marginLeft = "75px";
        // Sabhi span elements ko select karen jo sideNav ke andar hain
        hideSpanText();// Select all span elements inside #sideNav

        
        
        
    }
}

function toggleNavClose() {
    const sideNav = document.getElementById("sideNav");
    sideNav.classList.add("collapsed");
    const main = document.getElementById("main");
    main.style.marginLeft = "75px";
    const repairingcontainer = document.getElementById("repairing-main");
    repairingcontainer.style.marginLeft = "75px";
    hideSpanText();
    const sellingmain=document.getElementById("selling-main");
    sellingmain.style.marginLeft = "75px";
    const repairingaccessorie=document.getElementById("repairingaccessorie-main");
    repairingaccessorie.style.marginLeft = "75px";
    const billingmain=document.getElementById("billing-main");
    billingmain.style.marginLeft = "75px";
    hideSpanText();
    
}

// Function to redirect to dashboard.html with a query parameter

// Function to toggle the visibility of the child navigation
function toggleChildMenu() {
    const childMenu = document.getElementById("childDashboard");
    const toggleIcon = document.querySelector(".toggle-icon");
    
    // Toggle child menu visibility
    if (childMenu.style.display === "block") {
        childMenu.style.display = "none";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
    } else {
        childMenu.style.display = "block";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
    }
}

function toggleChildMenu1() {
    const childMenu = document.getElementById("childDashboard1");
    const toggleIcon = document.querySelector(".toggle-icon-1");
    
    // Toggle child menu visibility
    if (childMenu.style.display === "block") {
        childMenu.style.display = "none";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
    } else {
        childMenu.style.display = "block";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
    }
}

function toggleMenu(id) {
  const menu = document.querySelector(`#menu-${id}`);
  const dropdown = menu.parentNode;

  // Close other open menus
  document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
    if (activeDropdown !== dropdown) {
      activeDropdown.classList.remove('active');
    }
  });

  // Toggle the current menu
  dropdown.classList.toggle('active');

  // Close menu on outside click
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      dropdown.classList.remove('active');
    }
  });
}

// Add event listener to table rows
document.querySelectorAll('tbody tr').forEach(row => {
  row.addEventListener('click', () => {
    // Hide all dropdowns when a row is clicked
    document.querySelectorAll('.dropdown.active').forEach(activeDropdown => {
      activeDropdown.classList.remove('active');
    });
  });
});



function setupDynamicDropdowns(tableSelector) {
  const table = document.querySelector(tableSelector);

  if (!table) return; // If the table doesn't exist, exit the function

  // Add event listeners to all dropdown buttons in the specific table
  table.querySelectorAll('.btn.btn-more').forEach((button) => {
    const id = button.getAttribute('data-id'); // Get the ID from the button attribute
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering the row's click event
      toggleMenu(id, table);
    });
  });

  // Add event listeners to all rows to hide dropdowns on row click
  table.querySelectorAll('tbody tr').forEach((row) => {
    row.addEventListener('click', () => {
      // Hide all dropdowns within this table
      table.querySelectorAll('.dropdown.active').forEach((activeDropdown) => {
        activeDropdown.classList.remove('active');
      });
    });
  });
}

function toggleMenu(id, table) {
  const menu = table.querySelector(`#menu-${id}`);
  const dropdown = menu.parentNode;

  // Hide all other menus within this table
  table.querySelectorAll('.dropdown').forEach((dropdownElement) => {
    if (dropdownElement !== dropdown) {
      dropdownElement.classList.remove('active');
    }
  });

  // Toggle the current menu
  dropdown.classList.toggle('active');

  // Close the menu on outside click
  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(`#menu-${id}`) &&
      !event.target.closest('.btn.btn-more')
    ) {
      dropdown.classList.remove('active');
      document.removeEventListener('click', handleOutsideClick); // Remove the event listener once menu is closed
    }
  };

  if (dropdown.classList.contains('active')) {
    document.addEventListener('click', handleOutsideClick);
  }
}

// Call this function after dynamically populating rows in your table
//setupDynamicDropdowns();

// pdf exporter
async function handleExport(id) {
  // Find the row data based on the ID
  const row = document.querySelector(`#menu-${id}`).closest('tr');
  const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());

  // Initialize jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add title to PDF
  doc.setFontSize(16);
  doc.text("Phone Details", 10, 10);

  // Add row data to PDF
  doc.setFontSize(12);
  const headers = ["ID", "Company", "Model Name", "IMEI", "Condition", "Status", "Stock","Date"];
  let y = 20;

  headers.forEach((header, index) => {
    doc.text(`${header}: ${rowData[index]}`, 10, y);
    y += 10;
  });

  // Save PDF with the file name as the row ID
  doc.save(`Phone_Details_${id}.pdf`);
}
//search animation logic
const searchInput1 = document.querySelector('#search-input');
const searchBar = document.querySelector('.search-bar');

// Add a subtle shake animation if the input is empty on Enter
searchInput1.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && searchInput.value.trim() === '') {
    searchBar.style.animation = 'shake 0.3s';
    setTimeout(() => {
      searchBar.style.animation = ''; // Reset animation
    }, 300);
  }
}); 


// -------------------- Search Logic --------------------

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredPhones = phoneArray.filter(phone =>
        phone.company.toLowerCase().includes(query) || phone.model_name.toLowerCase().includes(query)
    );
    const tableBody = document.getElementById("phonedetails");
    tableBody.innerHTML = filteredPhones.map(phone => `
        <tr>
            <td data-label="ID">${phone.id}</td>
            <td data-label="Company">${phone.company}</td>
            <td data-label="Model Name">${phone.model_name}</td>
            <td data-label="IMEI">${phone.imei}</td>
            <td data-label="Condition">${phone.is_new ? "New" : "Old"}</td>
            <td data-label="Stock">Pass</td>
            <td data-label="Price">Pass</td>
            <td data-label="Date">20.12.2024</td>
        </tr>
    `).join("");
});


//pop-up window

const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupForm = document.getElementById('popupForm');
const productForm = document.getElementById('productForm');

// Open Popup
openPopupBtn.addEventListener('click', () => {
  popupForm.classList.remove('hidden');
});

// Close Popup
closePopupBtn.addEventListener('click', () => {
  popupForm.classList.add('hidden');
});

// Handle Form Submission
productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const queryParams = new URLSearchParams({
    auth_key: authKeyLogin, // Ensure auth key is globally available
    imei: formData.get('imei'),
    model_name: formData.get('modelName'),
    company: formData.get('company'),
    is_new: formData.get('condition') === 'new' ? 1 : 0, // Convert to numeric format
    price: parseFloat(formData.get('price')), // Convert price to float
    is_available: formData.get('isAvailable') === 'yes' ? 1 : 0, // Convert to numeric format
  });

  const url = `http://127.0.0.1:5000/phone/add?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();
      console.log('Success:', result);
      alert('Product Added Successfully!');

      // Optionally update the table dynamically
      fetchAndSavePhoneData(); // Assuming this function is implemented elsewhere
    } else {
      console.error('Error:', response.statusText);
      alert('Failed to add product. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }

  popupForm.classList.add('hidden');
  productForm.reset();
});

// Close Popup on Outside Click
window.addEventListener('click', (event) => {
  if (event.target === popupForm) {
    popupForm.classList.add('hidden');
  }
});

// Close Popup on Back Button
window.addEventListener('popstate', () => {
  popupForm.classList.add('hidden');
});



//pop-up edit
const editPopupForm = document.getElementById('editPopupForm');
const closeEditPopupBtn = document.getElementById('closeEditPopupBtn');
const editProductForm = document.getElementById('editProductForm');

// Open Edit Popup
function handleEdit(phoneId) {
  // Find the phone data in the phoneArray using the ID
  const phoneData = phoneArray.find(phone => phone.id === parseInt(phoneId));

  if (!phoneData) {
    alert('Phone data not found.');
    return;
  }

  // Pre-fill the form fields with existing data
  document.getElementById('editCompany').value = phoneData.company;
  document.getElementById('editModelName').value = phoneData.model_name;
  document.getElementById('editIMEI').value = phoneData.imei;
  document.getElementById('editCondition').value = phoneData.is_new === "New" ? "new" : "old";
  document.getElementById('editStock').value = phoneData.status === "Available" ? "yes" : "no";
  document.getElementById('editPrice').value = phoneData.price;

  // Show the popup
  editPopupForm.classList.remove('hidden');

  // Attach form submission handler with the phone ID
  editProductForm.onsubmit = (event) => handleEditSubmit(event, phoneId);
}

// Close Edit Popup
closeEditPopupBtn.addEventListener('click', () => {
  editPopupForm.classList.add('hidden');
});

// Handle Edit Form Submission
async function handleEditSubmit(event, phoneId) {
  event.preventDefault();

  const formData = new FormData(editProductForm);
  const queryParams = new URLSearchParams({
    auth_key: authKeyLogin, // Ensure auth key is globally available
    id: phoneId, // Include the phone ID for editing
    imei: formData.get('imei'),
    model_name: formData.get('modelName'),
    company: formData.get('company'),
    is_new: formData.get('condition') === 'new' ? 1 : 0, // Convert to numeric format
    price: parseFloat(formData.get('price')), // Convert price to float
    is_available: formData.get('isAvailable') === 'yes' ? 1 : 0, // Convert to numeric format
  });

  const url = `http://127.0.0.1:5000/phone/edit?${queryParams.toString()}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();
      console.log('Edit Success:', result);
      alert('Product Updated Successfully!');

      // Optionally update the table dynamically
      fetchAndSavePhoneData(); // Assuming this function is implemented elsewhere
    } else {
      console.error('Error:', response.statusText);
      alert('Failed to update product. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }

  editPopupForm.classList.add('hidden');
}


// Function to handle the export of all phone data to PDF



 
  function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            
            doc.text('Phones List', 20, 10);
            let y = 20;

            // Add data rows with spacing
            phoneArray.forEach(phone => {
                doc.text(`Company: ${phone.company}`, 10, y);
                doc.text(`Date Added: ${phone.date_added}`, 10, y + 10);
                doc.text(`ID: ${phone.id}`, 10, y + 20);
                doc.text(`IMEI: ${phone.imei}`, 10, y + 30);
                doc.text(`Is New: ${phone.is_new}`, 10, y + 40);
                doc.text(`Model Name: ${phone.model_name}`, 10, y + 50);
                doc.text(`Price: ${phone.price.toFixed(2)}`, 10, y + 60);
                doc.text(`Status: ${phone.status}`, 10, y + 70);

                y += 90; // Add space between rows
            });

            // Save the PDF
            doc.save('phones_list.pdf');
        }
        
        
// Popup Toggle Functionality


//Phone Repairing Container

function toggleRepairingContainer() {
     document.getElementById("main-dasb").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("repairing-main").style.display = "block";
    document.getElementById("selling-main").style.display = "none";
    
     document.getElementById("repairingaccessorie-main").style.display = "none";
     document.getElementById("billing-main").style.display = "none";
    
    fetchRepairingDevices();
    executeAnimations();
    
}

    // Initialize the intl-tel-input plugin for phone number input
    const phoneInput = document.querySelector("#repairing-phoneNumber");
    const iti = intlTelInput(phoneInput, {
      initialCountry: "in", // Set default country to India
      onlyCountries: ["in"], // Restrict the selection to only India
      separateDialCode: true, // Display dial code separately
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // Needed for formatting and validation
    });
    
    
 
//pop-up window

const OpenPopupwindow = document.getElementById('OpenPopupwindow');
const closePopupWindowBtn = document.getElementById('closePopupWindowBtn');
const popupFormRepairing = document.getElementById('repairing-items-container');

// Open Popup
OpenPopupwindow.addEventListener('click', () => {
  popupFormRepairing.classList.remove('hidden');
});

// Close Popup


// Function to open the popup
function showPopup() {
  const popup = document.querySelector('.repairing-popup');
  popup.style.display = 'flex'; // Show popup
}

// Function to close the popup
function hidePopup() {
  const popup = document.querySelector('.repairing-popup');
  popup.style.display = 'none'; // Hide popup
  document.getElementById('repairingForm').reset();
}

// Event listener to close the popup when clicking on the overlay (background)
document.querySelector('.repairing-popup').addEventListener('click', function(event) {
  // If the clicked target is the overlay (not the popup content), hide the popup
  const popupContent = document.querySelector('.repairing-popup-content');
  if (event.target === this) {
    hidePopup();  // Close the popup
  }
});

// Example: Open the popup on button click
document.querySelector('#OpenPopupwindow').addEventListener('click', showPopup);

// Example: Close the popup when the close button is clicked



// Function to fetch data from the API and populate the table using async/await

let repairingDevices= [];

async function fetchRepairingDevices() {
    try {
      checkAuthentication();
        const response = await fetch(`http://127.0.0.1:5000/repairingdevice/view?auth_key=${authKeyLogin}`)
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();

        // Assuming your API response has the repairing_devices array
        repairingDevices = data.repairing_devices;

        // Now, populate the table with this data
        populateTable(repairingDevices);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function populateTable(devices) {
    const phoneDetails2 = document.getElementById('phonedetails2');
    
    // Clear any existing rows before populating new data
    phoneDetails2.innerHTML = '';
    

    // Loop through the array and create table rows
    devices.forEach(device => {
        const row = document.createElement('tr');
        
        // Add table cells for each device's data
        row.innerHTML = `
                <tr>
            <td data-label="ID">${device.id}</td>
            <td data-label="Customer Name">${device.customer_name}</td>
            <td data-label="Phone Number">${device.phone_number}</td>
            <td data-label="Company">${device.company}</td>
            <td data-label="Model">${device.model}</td>
            <td data-label="Device Condition">${device.device_condition}</td>
            <td data-label="Repairing Status">${device.repairing_status}</td>
            <td data-label="Repairing Cost">${device.repairing_cost}</td>
            <td data-label="Parts Replaced">${device.parts_replaced}</td>
            <td data-label="Payment Method">${device.payment_method}</td>
            <td data-label="Advance Payment">${device.advance_payment}</td>
            <td data-label="Due Price">${device.due_price}</td>
            <td data-label="Bill Status">${device.bill_status}</td>
            <td data-label="Delivery Status">${device.delivery_status}</td>
            <td data-label="Estimated Delivery Date">${device.estimated_delivery_date}</td>
            <td data-label="Received By">${device.received_by}</td>
            <td data-label="Technician Name">${device.technician_name}</td>
            <td data-label="Date Added">${device.date_added}</td>
              <td data-label="Actions">
                    <div class="dropdown">
                        <button class="btn btn-more" data-id="${device.id}">
                            <i class="ri-more-2-fill"></i>
                        </button>
                        <div id="menu-${device.id}" class="dropdown-menu">
                            <button class="btn btn-edit" onclick="repairingEdit('${device.id}')">Edit</button>
                            <button class="btn btn-delete" onclick="deleteDevice('${device.id}')">Delete</button>
                            <button class="btn btn-export" onclick="exportSpecificDeviceToPDF('${device.id}')">Export</button>
                        </div>
                    </div>
                </td></tr>
        `;
        
        // Append the new row to the table
        phoneDetails2.appendChild(row);
       // setupDynamicDropdowns()
       
    });
    
    setupDynamicDropdowns('#phonedetails2'); // Initialize for Table 2
}

// Call the function to fetch data on page load


// Function to handle repairing device delete action
function deleteDevice(deviceId) {
    const server = "127.0.0.1:5000"; // Replace with actual server address
    const authkey = authKeyLogin    ; // Replace with actual authentication key
    const deleteUrl = `http://${server}/repairingdevice/delete?auth_key=${authkey}&id=${deviceId}`;

    // User confirmation
    const confirmation = confirm("Kya aap is phone ko delete karna chahte hain?");
    if (confirmation) {
        // GET request to delete the phone
        fetch(deleteUrl, {
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
                alert("Phone successfully deleted!");
                // Reload data to reflect changes
                fetchRepairingDevices();
          document.getElementById('repairingForm').reset();
            } else {
                alert("Phone delete karne mein error aayi.");
            }
        })
        .catch(error => {
            console.error("Error during deletion:", error);
            alert("Delete request failed. Please try again later.");
        });
    } else {
        alert("Delete operation canceled.");
    }
}

// add repairing device pupup window data get api
// add repairing device pupup window data get api
// Global variable for auth key


function submitRepairingForm(event) {
  // Prevent the form from submitting in the default way
  event.preventDefault();

  // Get values from the form, if no value is provided, set it as an empty string
  const customerName = document.getElementById('repairing-customerName').value.trim() || '';
  const phoneNumber = document.getElementById('repairing-phoneNumber').value.trim() || '';
  const receivedBy = document.getElementById('repairing-receivedBy').value.trim() || '';
  const company = document.getElementById('repairing-company').value.trim() || '';
  const model = document.getElementById('repairing-model').value.trim() || '';
  const deviceCondition = document.getElementById('repairing-condition').value.trim() || '';
  const repairingCost = document.getElementById('repairing-cost').value.trim() || '';
  const deliveryDate = document.getElementById('repairing-deliveryDate').value.trim() || '';
  const advancePayment = document.getElementById('repairing-advance').value.trim() || '';
  const paymentMethod = document.getElementById('repairing-paymentMethod').value.trim() || '';

  // Check if any of the required fields are empty
  if (!customerName || !phoneNumber || !receivedBy || !company || !model || !deviceCondition || !repairingCost || !deliveryDate || !paymentMethod) {
      // Display a message or alert indicating the missing fields
      alert("Please fill out all required fields.");
      return; // Stop the form submission
  }

  // Base API URL with global authKey
  let apiUrl = `http://127.0.0.1:5000/repairingdevice/add?auth_key=${authKeyLogin}`;

// Dynamically append all parameters, including empty fields (set to 'N/A' if missing)
apiUrl += `&customer_name=${encodeURIComponent(customerName || 'N/A')}`;
apiUrl += `&phone_number=${encodeURIComponent(phoneNumber || 'N/A')}`;
apiUrl += `&received_by=${encodeURIComponent(receivedBy || 'N/A')}`;
apiUrl += `&company=${encodeURIComponent(company || 'N/A')}`;
apiUrl += `&model=${encodeURIComponent(model || 'N/A')}`;
apiUrl += `&device_condition=${encodeURIComponent(deviceCondition || 'N/A')}`;
apiUrl += `&repairing_cost=${encodeURIComponent(repairingCost || 0.0)}`;
apiUrl += `&estimated_delivery_date=${encodeURIComponent(deliveryDate || 'N/A')}`;
apiUrl += `&advance_payment=${encodeURIComponent(advancePayment || 0.0)}`;
apiUrl += `&payment_method=${encodeURIComponent(paymentMethod || 'N/A')}`;

// Adding default 'N/A' values for other fields that are not provided
apiUrl += `&repairing_status=${encodeURIComponent('N/A')}`;
apiUrl += `&bill_status=${encodeURIComponent('N/A')}`;
apiUrl += `&due_price=${encodeURIComponent('N/A')}`;
apiUrl += `&delivery_status=${encodeURIComponent('N/A')}`;
apiUrl += `&technician_name=${encodeURIComponent('N/A')}`;



  // Send the data using fetch API (GET method)
  fetch(apiUrl, {
      method: 'GET',
  })
  .then(response => response.json())
  .then(data => {// Handle the response data
      console.log('Success:', data);
      hidePopup();
      fetchRepairingDevices();
      document.getElementById('repairingForm').reset();
      // You can handle the response here (e.g., show a success message)
  })
  .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
  });
}

// Add event listener to the form submit button
document.getElementById('repairingForm').addEventListener('submit', submitRepairingForm);
// Global variable for auth key

const closePopupBtn1 = document.getElementById('closePopupBtn1');
const popUpOpen = document.getElementById('popupForm1');
closePopupBtn1.addEventListener('click', () => {
    popUpOpen.classList.add('hidden');
});

const closePopupBtn2 = document.getElementById('closePopupBtn2');
const popUpopen = document.getElementById('repairing-items-container');
closePopupBtn2.addEventListener('click', () => {
    popUpopen.classList.add('hidden');
});

function repairingEdit(deviceId) {
  const popUpOpen = document.getElementById('popupForm1');
  const phoneData = repairingDevices.find(device => device.id === parseInt(deviceId));

  if (!phoneData) {
      alert("Phone not found");
      return;
  }

  // Open the popup
  popUpOpen.classList.remove('hidden');
 
  // Fill input fields with phoneData values
  document.getElementById('repairing-customerName1').value = phoneData.customer_name;
  document.getElementById('repairing-phoneNumber1').value = phoneData.phone_number;
  document.getElementById('repairing-receivedBy1').value = phoneData.received_by;
  document.getElementById('repairing-company1').value = phoneData.company; // If company is a dropdown
  document.getElementById('repairing-model1').value = phoneData.model;
  document.getElementById('repairing-condition1').value = phoneData.device_condition; // If condition is a dropdown
  document.getElementById('repairing-status1').value = phoneData.repairing_status; // If status is a dropdown
  document.getElementById('repairing-cost1').value = phoneData.repairing_cost;
  document.getElementById('repairing-deliveryDate1').value = new Date(phoneData.estimated_delivery_date).toISOString().split('T')[0];
  document.getElementById('repairing-parts1').value = phoneData.parts_replaced;
  document.getElementById('repairing-billStatus1').value = phoneData.bill_status; // If bill status is a dropdown
  document.getElementById('repairing-duePrice1').value = phoneData.due_price;
  document.getElementById('repairing-advance1').value = phoneData.advance_payment;
  document.getElementById('repairing-paymentMethod1').value = phoneData.payment_method; // If payment method is a dropdown
  document.getElementById('repairing-deliveryStatus1').value = phoneData.delivery_status; // If delivery status is a dropdown
  document.getElementById('repairing-technician1').value = phoneData.technician_name;
  
  
  document.getElementById('popupForm1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    updateRepairingDeviceGet(deviceId); // Call the update function
});


}

async function updateRepairingDeviceGet(deviceId) {
    const url = `http://127.0.0.1:5000/repairingdevice/edit`;

    const params = new URLSearchParams({
        auth_key: authKeyLogin,
        id: deviceId,
        customer_name: document.getElementById('repairing-customerName1').value,
        phone_number: document.getElementById('repairing-phoneNumber1').value,
        received_by: document.getElementById('repairing-receivedBy1').value,
        company: document.getElementById('repairing-company1').value,
        model: document.getElementById('repairing-model1').value,
        device_condition: document.getElementById('repairing-condition1').value,
        repairing_status: document.getElementById('repairing-status1').value,
        repairing_cost: document.getElementById('repairing-cost1').value,
        estimated_delivery_date: document.getElementById('repairing-deliveryDate1').value,
        parts_replaced: document.getElementById('repairing-parts1').value,
        bill_status: document.getElementById('repairing-billStatus1').value,
        due_price: document.getElementById('repairing-duePrice1').value,
        advance_payment: document.getElementById('repairing-advance1').value,
        payment_method: document.getElementById('repairing-paymentMethod1').value,
        delivery_status: document.getElementById('repairing-deliveryStatus1').value,
        technician_name: document.getElementById('repairing-technician1').value
    });

    try {
        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();

        // Display the message from the API response
        if (result.message) {
            fetchRepairingDevices();
            alert(result.message); // Show success message
        } else {
            fetchRepairingDevices();
            alert('Device updated successfully!'); // Fallback success message
        }

        // Optionally close the popup and reload the data
        document.getElementById('popupForm1').classList.add('hidden');
        location.reload(); // Reload to fetch updated data
    } catch (error) {
        console.error('Error updating device:', error);
        alert('An error occurred while updating the device.');
    }
}


// Sabhi span elements ko select karen jo sideNav ke andar hain


// -------------------- Search Logic --------------------

// Assuming the repairingDevices array is populated with data
const searchInput2 = document.querySelector("#search-input-container");
searchInput2.addEventListener("input", () => {
    const query = searchInput2.value.toLowerCase();

    // Filter phones based on company, model, date_added, or customer_name
    const filteredPhones = repairingDevices.filter(phone =>
        phone.company.toLowerCase().includes(query) || 
        phone.model.toLowerCase().includes(query) ||
        phone.date_added.toLowerCase().includes(query) ||
        phone.customer_name.toLowerCase().includes(query) // Added customer_name to search
    );

    const tableBody = document.getElementById("phonedetails2");

    // Map filtered data to table rows
    tableBody.innerHTML = filteredPhones.map(device => `
        <tr>
            <td data-label="ID">${device.id}</td>
            <td data-label="Customer Name">${device.customer_name}</td>
            <td data-label="Phone Number">${device.phone_number}</td>
            <td data-label="Company">${device.company}</td>
            <td data-label="Model">${device.model}</td>
            <td data-label="Device Condition">${device.device_condition}</td>
            <td data-label="Repairing Status">${device.repairing_status}</td>
            <td data-label="Repairing Cost">${device.repairing_cost}</td>
            <td data-label="Parts Replaced">${device.parts_replaced}</td>
            <td data-label="Payment Method">${device.payment_method}</td>
            <td data-label="Advance Payment">${device.advance_payment}</td>
            <td data-label="Due Price">${device.due_price}</td>
            <td data-label="Bill Status">${device.bill_status}</td>
            <td data-label="Delivery Status">${device.delivery_status}</td>
            <td data-label="Estimated Delivery Date">${device.estimated_delivery_date}</td>
            <td data-label="Received By">${device.received_by}</td>
            <td data-label="Technician Name">${device.technician_name}</td>
            <td data-label="Date Added">${device.date_added}</td>
            <td data-label="Actions">
                <div class="dropdown">
                    <button class="btn btn-more" data-id="${device.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${device.id}" class="dropdown-menu">
                        <button class="btn btn-edit" onclick="repairingEdit('${device.id}')">Edit</button>
                        <button class="btn btn-delete" onclick="deleteDevice('${device.id}')">Delete</button>
                        <button class="btn btn-export" onclick="exportSpecificDeviceToPDF('${device.id}')">Export</button>
                    </div>
                </div>
            </td>
        </tr>
    `).join("");
    setupDynamicDropdowns('#phonedetails2');
});



//selling products view 
function toggleSellingContainer() {
    document.getElementById("main-dasb").style.display = "none";
    document.getElementById("container").style.display = "none";
document.getElementById("repairing-main").style.display = "none";
document.getElementById("selling-main").style.display = "block";
 document.getElementById("repairingaccessorie-main").style.display = "none";
    
fetchAccessoryData();
    executeAnimations();
    // Fetch and display phone data
    document.getElementById("billing-main").style.display = "none";
}

let accessoryList = []; // Updated variable name

async function fetchAccessoryData() {
    try {
        // Fetching the API response
        const response = await fetch(`http://localhost:5000/accessory?action=view&auth_key=${authKeyLogin}`);
        
        // Checking if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsing the JSON response
        const data = await response.json();
        console.log('Full API Response:', data); // Debugging full response

        // Check and assign accessories to accessoryList
        if (data.accessories && Array.isArray(data.accessories)) {
            accessoryList = data.accessories;
            accessoryListTable(accessoryList);

            // Print the updated variable
            console.log('Accessory List:', accessoryList);
        } else {
            console.warn('No accessories data found.');
        }

    } catch (error) {
        console.error('Error fetching the API:', error);
    }
}

// Function to render the accessories list table
function accessoryListTable(accessories) {
    const accessoryDetails = document.getElementById('selling-details');
    
    // Clear any existing rows before populating new data
    accessoryDetails.innerHTML = '';

    // Loop through the array and create table rows
    accessories.forEach(accessory => {
        const row = document.createElement('tr');
        
        // Add table cells for each accessory's data
        row.innerHTML = `
        <tr>
            <td data-label="ID">${accessory.id}</td>
            <td data-label="Accessory Name">${accessory.accessory_name}</td>
            <td data-label="Category">${accessory.category}</td>
            <td data-label="Company">${accessory.company}</td>
            <td data-label="Type">${accessory.type}</td>
            <td data-label="Unit Price">${accessory.unit_price}</td>
            <td data-label="Current Stock">${accessory.current_stock}</td>
            <td data-label="Initial Stock">${accessory.initial_stock}</td>
            <td data-label="Minimum Stock">${accessory.minimum_stock}</td>
            <td data-label="Times Sold">${accessory.times_sold}</td>
            <td data-label="Last Purchase Date">${accessory.last_purchase_date}</td>
            <td data-label="Last Purchase Quantity">${accessory.last_purchase_quantity}</td>
            <td data-label="Stock Out">${accessory.stock_out}</td>
            <td data-label="Add Date">${accessory.add_date}</td>
            <td data-label="Alert">${accessory.alert ? 'Yes' : 'No'}</td>
            <td data-label="Actions">
                <div class="dropdown">
                    <button class="btn btn-more" data-id="${accessory.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${accessory.id}" class="dropdown-menu">
                        <button class="btn btn-edit" onclick='openPopup3(${accessory.id})'>Edit</button>

                        <button class="btn btn-delete" onclick="deleteAccessory(${accessory.id})">Delete</button>
                        <button class="btn btn-export" onclick="accessoriesDataExportpdfId(${accessory.id})">Export</button>
                    </div>
                </div>
            </td></tr>
        `;
        
        
        // Append the new row to the table
        accessoryDetails.appendChild(row);
    });
    setupDynamicDropdowns('#selling-details');
}

// Example functions for actions
function editAccessory(id) {
    console.log(`Edit accessory with ID: ${id}`);
    // Add your edit logic here
}

function deleteAccessory(id) {
    console.log(`Delete accessory with ID: ${id}`);
    // Add your delete logic here
}

function exportAccessory(id) {
    console.log(`Export accessory with ID: ${id}`);
    // Add your export logic here
}

// Call the function to fetch and display accessories

// Get the popup and close button elements
const accessoryPopup = document.querySelector('.accessory-popup');
const closeButton2 = document.querySelector('.accessory-material-close-btn');

// Function to open the popup
function openPopup2() {
  accessoryPopup.classList.remove('hidden');  // Remove the 'hidden' class to show the popup
}

// Function to close the popup
function closePopup2() {
  accessoryPopup.classList.add('hidden');  // Add the 'hidden' class to hide the popup
}

// Example: Open the popup when the user clicks a button
const openButton2 = document.querySelector('#openPopupButton2');  // Make sure to have an element with this ID in your HTML
openButton2.addEventListener('click', openPopup2);

// Close the popup when the close button is clicked
closeButton2.addEventListener('click', closePopup2);

// Optional: Close the popup if the user clicks anywhere outside the popup content
accessoryPopup.addEventListener('click', (e) => {
  if (e.target === accessoryPopup) {
    closePopup2();
  }
});

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    function collectFormData() {
        return {
            accessoryName: document.getElementById('accessory-accessoryName').value,
            type: document.getElementById('accessory-type').value,
            company: document.getElementById('accessory-company').value,
            category: document.getElementById('accessory-category').value,
            initialStock: document.getElementById('accessory-initialStock').value,
            addedStock: document.getElementById('accessory-addedStock').value,
            unitPrice: document.getElementById('accessory-unitPrice').value,
            minimumStock: document.getElementById('accessory-minimumStock').value
        };
    }

    function validateFormData(formData) {
        for (const key in formData) {
            if (!formData[key]) {
                alert(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
                return false;
            }
        }
        return true;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = collectFormData();

        if (!validateFormData(formData)) {
            return; // Stop if validation fails
        }

        submitAccessoryData(formData);
    }

    function submitAccessoryData(formData) {
        const apiUrl = `http://127.0.0.1:5000/accessory?action=add&auth_key=${authKeyLogin}&accessory_name=${encodeURIComponent(formData.accessoryName)}&type=${encodeURIComponent(formData.type)}&company=${encodeURIComponent(formData.company)}&category=${encodeURIComponent(formData.category)}&initial_stock=${encodeURIComponent(formData.initialStock)}&added_stock=${encodeURIComponent(formData.addedStock)}&unit_price=${encodeURIComponent(formData.unitPrice)}&minimum_stock=${encodeURIComponent(formData.minimumStock)}`;

        // Send a GET request with the data
        fetch(apiUrl, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Accessory added successfully!\nAdded on: ${data.add_date}`);
                    console.log('Success:', data);
                    clearForm(); // Clear the form after successful submission
                    closePopup2(); // Close the popup window
                } else {
                   // alert(`Error adding accessory: ${data.message || 'Unknown error'}`);
                   // console.error('Error:', data);
                    alert(`Accessory added successfully!\nAdded on: ${data.add_date}`);
                    console.log('Success:', data);
                    clearForm(); // Clear the form after successful submission
                    closePopup2(); // Close the popup window
                    fetchAccessoryData();
                }
            })
            .catch(error => {
                alert('Error adding accessory');
                console.error('Error:', error);
            });
    }

    function clearForm() {
        document.getElementById('accessory-accessoryName').value = '';
        document.getElementById('accessory-type').value = '';
        document .getElementById('accessory-company').value = '';
        document.getElementById('accessory-category').value = '';
        document.getElementById('accessory-initialStock').value = '';
        document.getElementById('accessory-addedStock').value = '';
        document.getElementById('accessory-unitPrice').value = '';
        document.getElementById('accessory-minimumStock').value = '';
    }

    function closePopup2() {
        // Logic to close the popup window
        const popup = document.getElementById('popupForm2');
        if (popup) {
            popup.classList.add('hidden'); // Assuming 'hidden' class hides the popup
        }
    }
    


    const formElement = document.getElementById('accessoryForm');
    if (formElement) {
        formElement.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Form element not found');
    }
});

// Function to hide the popup
function closePopup3() {
  const popup = document.getElementById('popupForm1');
  popup.classList.add('hidden');
}
function closePopupEditAccessories() {
  const popup = document.getElementById('popupForm3');
  if (popup) {
    popup.classList.add('hidden');
    
    if (popup.tagName === 'FORM') {
      popup.reset();
    }
  }
}

function openPopup3(accessoryId) {
  // Fetch the accessory data based on the id (this could be done through an API request)
  fetch(`http://localhost:5000/accessory?action=view&auth_key=${authKeyLogin}&id=${accessoryId}`)
    .then(response => response.json())
    .then(data => {
      // Populate the form fields with the fetched accessory data
      document.getElementById("accessory-addedStock1").value = data.addedStock;
      document.getElementById("accessory-lastPurchaseQuantity1").value = data.lastPurchaseQuantity;
      document.getElementById("accessory-unitPrice1").value = data.unit_price;
      document.getElementById("accessory-minimumStock1").value = data.minimum_stock;
      document.getElementById("accessory-timesSold1").value = data.times_sold;
      
      // Show the popup
      document.getElementById("popupForm3").classList.remove("hidden");

      // Attach the form submission handler after loading the data
      document.getElementById("accessoryForm1").addEventListener("submit", (event) => {
        submitAccessoryForm(accessoryId, event); // Pass accessoryId and event to submitAccessoryForm
      });
    })
    .catch(error => {
      console.error("Error fetching accessory data:", error);
      alert("Failed to load accessory details. Please try again.");
    });
}

// Function to close the popup window
function closePopup3() {
  document.getElementById("popupForm3").classList.add("hidden");
}

// Submit the accessory form data to update
function submitAccessoryForm(accessoryId, event) {
  event.preventDefault(); // Prevent form default submission behavior

  // Get form data
  const addedStock = document.getElementById("accessory-addedStock1").value;
  const lastPurchaseQuantity = document.getElementById("accessory-lastPurchaseQuantity1").value;
  const unitPrice = document.getElementById("accessory-unitPrice1").value;
  const minimumStock = document.getElementById("accessory-minimumStock1").value;
  const timesSold = document.getElementById("accessory-timesSold1").value;

  // Construct API URL for update (using GET method with query parameters)
  const apiUrl = `http://localhost:5000/accessory?action=update&auth_key=${authKeyLogin}&id=${accessoryId}` +
    `&added_stock=${encodeURIComponent(addedStock)}` +
    `&last_purchase_quantity=${encodeURIComponent(lastPurchaseQuantity)}` +
    `&unit_price=${encodeURIComponent(unitPrice)}` +
    `&minimum_stock=${encodeURIComponent(minimumStock)}` +
    `&times_sold=${encodeURIComponent(timesSold)}`;

  // Send GET request to the API
  fetch(apiUrl, {
    method: 'GET' // Explicitly defining the method as GET
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response:", data);
      fetchAccessoryData();
      alert("Accessory details updated successfully!");
      closePopup3(); // Close the popup after successful submission
    })
    .catch(error => {
      console.error("Error:", error);
      fetchAccessoryData();
      alert("Failed to update accessory details. Please try again.");
    });
}


// Function to handle delete action
function deleteAccessory(accessoryId) {
  const confirmation = confirm("Are you sure you want to delete this accessory?");
  if (confirmation) {
    // Construct the API URL for delete
    const apiUrl = `http://localhost:5000/accessory?action=delete&auth_key=${authKeyLogin}&id=${accessoryId}`;

    // Send the DELETE request to the server
    fetch(apiUrl, {
      method: 'GET' // Since you're using GET to delete
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data);
        alert("Accessory deleted successfully!");
        fetchAccessoryData();
        // Optionally, refresh the page or update the UI after deletion
      })
      .catch(error => {
        console.error("Error:", error);
        fetchAccessoryData();
        alert("Failed to delete accessory. Please try again.");
      });
  }
}
function accessoriesDataExportpdf() {
    exportCompleteDataToPDF(accessoryList);
}

function exportCompleteDataToPDF(dataArray) {
  // Include jsPDF library
  const { jsPDF } = window.jspdf;

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define table columns based on array object keys
  const columns = Object.keys(dataArray[0]); // Automatically get all keys as columns

  // Prepare table rows dynamically
  const rows = dataArray.map(item => columns.map(col => item[col]));

  // Add title to PDF
  doc.text("Accessory List", 14, 10); // Title at (x=14, y=10)

  // Use autoTable to create a dynamic table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20, // Table starts below title
    theme: "striped" // Striped table design
  });

  // Save PDF
  doc.save("Accessory_List.pdf");
}

// Example usage:
function exportSpecificIDToPDF(dataArray,id) {
  const { jsPDF } = window.jspdf;

  // Find the data for the specific ID
  const filteredData = dataArray.filter(item => item.id === id);

  if (filteredData.length === 0) {
    console.error(`No data found for the given ID: ${id}`);
    return; // Exit if no matching data
  }

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define columns from the object keys
  const columns = Object.keys(filteredData[0]); // Automatically get keys as columns

  // Prepare row data for the specific ID
  const rows = filteredData.map(item => columns.map(col => item[col]));

  // Add title to PDF
  doc.text(`Accessory Data for ID: ${id}`, 14, 10); // Title with specific ID

  // Use autoTable to generate the table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20, // Start below the title
    theme: "striped"
  });

  // Save PDF
  doc.save(`Accessory_Data_ID_${id}.pdf`);
}

// Example Usage:


function accessoriesDataExportpdfId(accessoryId) {
    const id =accessoryId;
    exportSpecificIDToPDF(accessoryList, id);
}

// repairing data kaa pdf


function exportRepairingDevicesToPDF() {
  const { jsPDF } = window.jspdf;

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define table columns
  const columns = [
    "ID", "Customer Name", "Phone", "Model", "Company",
    "Condition", "Status", "Repairing Cost", "Advance Payment",
    "Payment Method", "Bill Status", "Delivery Status", "Date Added"
  ];

  // Prepare table rows dynamically
  const rows = repairingDevices.map(device => [
    device.id,
    device.customer_name,
    device.phone_number,
    device.model,
    device.company,
    device.device_condition,
    device.repairing_status,
    device.repairing_cost,
    device.advance_payment,
    device.payment_method,
    device.bill_status,
    device.delivery_status,
    device.date_added
  ]);

  // Add title
  doc.text("Repairing Devices Report", 14, 10);

  // Generate table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20,
    theme: "striped"
  });

  // Save PDF
  doc.save("Repairing_Devices.pdf");
}

// Example usage: Call the function to generate the PDF


function exportSpecificDeviceToPDF(deviceId) {
  const { jsPDF } = window.jspdf;

  // Debugging logs
  console.log("Repairing Devices:", repairingDevices);
  console.log("Passed ID:", deviceId);
  const id = +deviceId; // Another way to convert to an integer

  // Filter the data for the specific ID
  const filteredData = repairingDevices.filter(item => item.id === id);

  // Log the filtered result
  console.log("Filtered Data:", filteredData);

  if (filteredData.length === 0) {
    alert(`No data found for the given ID: ${deviceId}`);
    return;
  }

  const specificDevice = filteredData[0];

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define table columns
  const columns = [
    "ID", "Customer Name", "Phone", "Model", "Company",
    "Condition", "Status", "Repairing Cost", "Advance Payment",
    "Payment Method", "Bill Status", "Delivery Status", "Date Added"
  ];

  // Prepare row data
  const rows = [
    [
      specificDevice.id,
      specificDevice.customer_name,
      specificDevice.phone_number,
      specificDevice.model,
      specificDevice.company,
      specificDevice.device_condition,
      specificDevice.repairing_status,
      specificDevice.repairing_cost,
      specificDevice.advance_payment,
      specificDevice.payment_method,
      specificDevice.bill_status,
      specificDevice.delivery_status,
      new Date(specificDevice.date_added).toLocaleDateString()
    ]
  ];

  // Add title
  doc.setFontSize(14);
  doc.text(`Repairing Device Report for ID: ${deviceId}`, 14, 10);

  // Generate table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20,
    theme: "striped",
    styles: { fontSize: 10 }
  });

  // Save PDF
  doc.save(`Repairing_Device_ID_${deviceId}.pdf`);
}



const searchInput3 = document.querySelector("#search-input-selling");
searchInput3.addEventListener("input", () => {
    const query = searchInput3.value.toLowerCase();

    // Filter accessories based on company, accessory_name, add_date, or type
    const filteredAccessories = accessoryList.filter(accessory =>
        accessory.company.toLowerCase().includes(query) || 
        accessory.accessory_name.toLowerCase().includes(query) ||
        accessory.add_date.toLowerCase().includes(query) ||
        accessory.type.toLowerCase().includes(query)
    );

    const tableBody = document.getElementById("selling-details");

    // Map filtered data to table rows
    tableBody.innerHTML = filteredAccessories.map(accessory => `
        <tr>
            <td data-label="ID">${accessory.id}</td>
            <td data-label="Accessory Name">${accessory.accessory_name}</td>
            <td data-label="Category">${accessory.category}</td>
            <td data-label="Company">${accessory.company}</td>
            <td data-label="Type">${accessory.type}</td>
            <td data-label="Unit Price">${accessory.unit_price}</td>
            <td data-label="Current Stock">${accessory.current_stock}</td>
            <td data-label="Initial Stock">${accessory.initial_stock}</td>
            <td data-label="Minimum Stock">${accessory.minimum_stock}</td>
            <td data-label="Times Sold">${accessory.times_sold}</td>
            <td data-label="Last Purchase Date">${accessory.last_purchase_date}</td>
            <td data-label="Last Purchase Quantity">${accessory.last_purchase_quantity}</td>
            <td data-label="Stock Out">${accessory.stock_out}</td>
            <td data-label="Add Date">${accessory.add_date}</td>
            <td data-label="Alert">${accessory.alert ? 'Yes' : 'No'}</td>
            <td data-label="Actions">
                <div class="dropdown">
                    <button class="btn btn-more" data-id="${accessory.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${accessory.id}" class="dropdown-menu">
                        <button class="btn btn-edit" onclick='openPopup3(${accessory.id})'>Edit</button>
                        <button class="btn btn-delete" onclick="deleteAccessory(${accessory.id})">Delete</button>
                        <button class="btn btn-export" onclick="accessoriesDataExportpdfId(${accessory.id})">Export</button>
                    </div>
                </div>
            </td>
        </tr>
    `).join("");

    // Reinitialize dropdown functionality
    setupDynamicDropdowns("#table-3");
});

function repairingaccessorie() {
    document.getElementById("main-dasb").style.display = "none";
    document.getElementById("container").style.display = "none";
document.getElementById("repairing-main").style.display = "none";
document.getElementById("selling-main").style.display = "none";
 document.getElementById("repairingaccessorie-main").style.display = "block";
    
fetchRepairingAccessoryData();
    executeAnimations();
    // Fetch and display phone data
    
}


let repairingAccessorie = []; // Updated variable name

async function fetchRepairingAccessoryData() {
    try {
        // Fetching the API response
        const response = await fetch(`http://127.0.0.1:5000/repairing_accessory?action=view&auth_key=${authKeyLogin}`);
        
        // Checking if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsing the JSON response
        const data = await response.json();
        console.log('Full API Response:', data); // Debugging full response

        // Check and assign accessories to accessoryList
        if (data.repairing_accessories && Array.isArray(data.repairing_accessories)) {
            repairingAccessorie = data.repairing_accessories;
            repairingaccessoryListTable(repairingAccessorie);

            // Print the updated variable
            console.log('Accessory List:', repairingAccessorie);
        } else {
            console.warn('No accessories data found.');
        }

    } catch (error) {
        console.error('Error fetching the API:', error);
    }
}

// Function to render the accessories list table
function repairingaccessoryListTable(repairing_accessories) {
    const accessoryDetails = document.getElementById('repairing-accessorie');
    
    // Clear any existing rows before populating new data
    accessoryDetails.innerHTML = '';

    // Loop through the array and create table rows
    repairing_accessories.forEach(accessory => {
        const row = document.createElement('tr');
        
        // Add table cells for each accessory's data based on the new structure
        row.innerHTML = `
         <td data-label="ID">${accessory.id}</td>
            <td data-label="Name">${accessory.name}</td>
            <td data-label="Company">${accessory.company}</td>
            <td data-label="Model">${accessory.model}</td>
            <td data-label="Repairing cost">${accessory.repairing_cost}</td>
            <td data-label="Selling cost">${accessory.selling_cost}</td>
            <td data-label="Current stock">${accessory.current_stock}</td>
            <td data-label="Minimum stock">${accessory.minimum_stock}</td>
            <td data-label="Total stock out">${accessory.total_out_stock}</td>
            <td data-label="Last purchase quantity">${accessory.last_purchase_quantity}</td>
            <td data-label="Last repairing quantity">${accessory.last_repairing_quantity}</td>
            <td data-label="Last purchase date">${accessory.last_purchase_date || 'N/A'}</td>
            <td data-label="Last repairing date">${accessory.last_repairing_date || 'N/A'}</td>
            <td data-label="Alert">${accessory.alert ? 'Yes' : 'No'}</td>
            <td data-label="Action">
               <div class="dropdown">
                    <button class="btn btn-more" data-id="${accessory.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${accessory.id}" class="dropdown-menu">
                        <button class="btn btn-edit"  onclick='openPopupEdit(${accessory.id})'>Edit</button>
                        <button class="btn btn-delete" onclick="deleterepairingAccessory(${accessory.id})">Delete</button>
                        <button class="btn btn-export" onclick="repairingaccessoriesDataExportpdfId(${accessory.id})">Export</button>
                    </div>
                </div>
            </td> 
        `;
        
        // Append the new row to the table
        accessoryDetails.appendChild(row);
    });
    setupDynamicDropdowns("#table-4");
}


//repairing accessories popup open close control

// Function to open the popup
function openPopup4() {
  const popup = document.getElementById("popupForm4");
  popup.classList.remove("hidden"); // Removes the "hidden" class to show the popup
}

// Function to close the popup
function closePopup3() {
  const popup = document.getElementById("popupForm4");
  popup.classList.add("hidden"); // Adds the "hidden"class to hide the popup
    const form = document.getElementById("popupForm4");
  form.reset(); // Clear all inputs in the form
}



 // Function to handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(document.getElementById('accessoryrepairingForm1'));
    const queryParams = new URLSearchParams();

    // Add form data to query params
    formData.forEach((value, key) => {
      queryParams.append(key, value);
    });

    // Add fixed parameters (action and auth_key)
    queryParams.append("action", "add");
    queryParams.append("auth_key",authKeyLogin);

    // API URL
    const apiUrl = `http://127.0.0.1:5000/repairing_accessory?${queryParams.toString()}`;

    try {
      // Send data to the API
      const response = await fetch(apiUrl, { method: "GET" });

      if (response.ok) {
        const result = await response.json();
        fetchRepairingAccessoryData();
        alert("Accessory updated successfully!");
        closePopup3();
        console.log(result);
      } else {
        alert("Failed to update accessory. Please try again.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      alert("An error occurred while connecting to the server.");
      console.error("Error:", error);
    }
  }

  // Function to open the popup
 // Function to open the popup with GSAP animation
function openPopup4() {
  const popup = document.getElementById("popupForm4");
  popup.classList.remove("hidden"); // Show the popup by removing 'hidden' class
  
  // Animate the popup content
  
}

// Function to close the popup with GSAP animation
function closePopup3() {
  const popup = document.getElementById("popupForm4");
  
  // Animate the popup content before hiding
  
}

// Function to delete an accessory
async function deleterepairingAccessory(id) {
  // Confirm before proceeding with deletion
  const confirmDelete = confirm("Are you sure you want to delete this accessory?");
  if (!confirmDelete) return;

  // API URL with the provided ID
  const apiUrl = `http://127.0.0.1:5000/repairing_accessory?action=delete&auth_key=${authKeyLogin}&id=${id}`;

  try {
    // Send the DELETE request to the API
    const response = await fetch(apiUrl, { method: "GET" });

    if (response.ok) {
      const result = await response.json();
      fetchRepairingAccessoryData();
      alert("Accessory deleted successfully!");
      console.log("Response:", result);
      // Optionally, refresh the accessories list or remove the deleted item from the DOM
    } else {
      alert("Failed to delete the accessory. Please try again.");
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    alert("An error occurred while connecting to the server.");
    console.error("Error:", error);
  }
}

// Function to open the popup and set the accessory ID
function openPopupEdit(accessoryId) {
  const popup = document.getElementById('popupForm5');
  popup.classList.remove('hidden'); // Show the popup

  const form = document.getElementById("accessoryStockForm-edit");

  // Remove existing event listeners to avoid duplicates
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  // Add event listener for form submission
  newForm.addEventListener("submit", (event) => {
    UpdateAccessoryRepairing(accessoryId, event); // Call the correct function
  });
}

// Function to close the popup
function closePopupEdit() {
  const popup = document.getElementById('popupForm5');
  popup.classList.add('hidden'); // Hide the popup

  // Reset input fields
  const form = document.getElementById("accessoryStockForm-edit");
  form.reset(); // Clear all inputs in the form
}

// Submit the accessory form data to update
function UpdateAccessoryRepairing(accessoryId, event) {
  event.preventDefault(); // Prevent form default submission behavior

  // Get form input values
  const addStock = document.getElementById("accessory-addStock").value.trim();
  const lastPurchaseQuantity = document.getElementById("accessory-lastPurchaseQuantity").value.trim();
  const lastRepairingQuantity = document.getElementById("accessory-lastRepairingQuantity").value.trim();

  // Validate that at least one input is provided
  if (!addStock && !lastPurchaseQuantity && !lastRepairingQuantity) {
    alert("Please fill at least one field before submitting.");
    return; // Stop further execution if no input is provided
  }

  // Prepare API URL with query parameters
  const apiUrl = `http://127.0.0.1:5000/repairing_accessory?action=update&auth_key=${authKeyLogin}&id=${accessoryId}` +
    (addStock ? `&add_stock=${addStock}` : "") +
    (lastPurchaseQuantity ? `&last_purchase_quantity=${lastPurchaseQuantity}` : "") +
    (lastRepairingQuantity ? `&last_repairing_quantity=${lastRepairingQuantity}` : "");

  // Send GET request to the API
  fetch(apiUrl, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response:", data);
      fetchRepairingAccessoryData();
      alert("Accessory details updated successfully!");
      closePopupEdit(); // Close the popup after successful submission
    })
    .catch(error => {
      console.error("Error:", error);
      fetchRepairingAccessoryData();
      alert("Failed to update accessory details. Please try again.");
    });
}
//search logic repairing accessories

const searchInput4 = document.querySelector("#repairingaccessorie-search-input-container");
searchInput4.addEventListener("input", () => {
    const query = searchInput4.value.toLowerCase();

    // Filter accessories based on company, accessory_name, add_date, or type
    const filteredAccessories = repairingAccessorie.filter(accessory =>
        accessory.company.toLowerCase().includes(query) || 
        accessory.name.toLowerCase().includes(query) ||
        accessory.model.toLowerCase().includes(query) ||
        accessory.last_repairing_date.toLowerCase().includes(query)
    );

    const tableBody = document.getElementById("repairing-accessorie");

    // Map filtered data to table rows
    tableBody.innerHTML = filteredAccessories.map(accessory => `
        <td data-label="ID">${accessory.id}</td>
            <td data-label="Name">${accessory.name}</td>
            <td data-label="Company">${accessory.company}</td>
            <td data-label="Model">${accessory.model}</td>
            <td data-label="Repairing cost">${accessory.repairing_cost}</td>
            <td data-label="Selling cost">${accessory.selling_cost}</td>
            <td data-label="Current stock">${accessory.current_stock}</td>
            <td data-label="Minimum stock">${accessory.minimum_stock}</td>
            <td data-label="Total stock out">${accessory.total_out_stock}</td>
            <td data-label="Last purchase quantity">${accessory.last_purchase_quantity}</td>
            <td data-label="Last repairing quantity">${accessory.last_repairing_quantity}</td>
            <td data-label="Last purchase date">${accessory.last_purchase_date || 'N/A'}</td>
            <td data-label="Last repairing date">${accessory.last_repairing_date || 'N/A'}</td>
            <td data-label="Alert">${accessory.alert ? 'Yes' : 'No'}</td>
            <td data-label="Action">
               <div class="dropdown">
                    <button class="btn btn-more" data-id="${accessory.id}">
                        <i class="ri-more-2-fill"></i>
                    </button>
                    <div id="menu-${accessory.id}" class="dropdown-menu">
                        <button class="btn btn-edit"  onclick='openPopupEdit(${accessory.id})'>Edit</button>
                        <button class="btn btn-delete" onclick="deleterepairingAccessory(${accessory.id})">Delete</button>
                        <button class="btn btn-export" onclick="accessoriesDataExportpdfId(${accessory.id})">Export</button>
                    </div>
                </div>
            </td> 
    `).join("");

    // Reinitialize dropdown functionality
    setupDynamicDropdowns("#table-4");
});


//pdf export logic repairing accessories specific I'd

function repairingaccessoriesDataExportpdfId(accessoryId) {
    const id =accessoryId;
    repairingaccessoriesexportSpecificIDToPDF(repairingAccessorie, id);
}


function repairingaccessoriesexportSpecificIDToPDF(dataArray,id) {
  const { jsPDF } = window.jspdf;

  // Find the data for the specific ID
  const filteredData = dataArray.filter(item => item.id === id);

  if (filteredData.length === 0) {
    console.error(`No data found for the given ID: ${id}`);
    return; // Exit if no matching data
  }

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define columns from the object keys
  const columns = Object.keys(filteredData[0]); // Automatically get keys as columns

  // Prepare row data for the specific ID
  const rows = filteredData.map(item => columns.map(col => item[col]));

  // Add title to PDF
  doc.text(`Accessory Data for ID: ${id}`, 14, 10); // Title with specific ID

  // Use autoTable to generate the table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20, // Start below the title
    theme: "striped"
  });

  // Save PDF
  doc.save(` repairing_Accessory_Data_ID_${id}.pdf`);
}

function  repairingaccessoriesDataExportpdf() {
    repairingaccessorieExportCompleteDataToPDF(repairingAccessorie);
}

function repairingaccessorieExportCompleteDataToPDF(dataArray) {
  // Include jsPDF library
  const { jsPDF } = window.jspdf;

  // Create a new PDF instance
  const doc = new jsPDF();

  // Define table columns based on array object keys
  const columns = Object.keys(dataArray[0]); // Automatically get all keys as columns

  // Prepare table rows dynamically
  const rows = dataArray.map(item => columns.map(col => item[col]));

  // Add title to PDF
  doc.text("RepairingAccessory List", 14, 10); // Title at (x=14, y=10)

  // Use autoTable to create a dynamic table
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20, // Table starts below title
    theme: "striped" // Striped table design
  });

  // Save PDF
  doc.save("Repairing_Accessory_List.pdf");
}



function togglebillingContainer() {
    document.getElementById("main-dasb").style.display = "none";
    document.getElementById("container").style.display = "none";
document.getElementById("repairing-main").style.display = "none";
document.getElementById("selling-main").style.display = "none";
 document.getElementById("repairingaccessorie-main").style.display = "none";
 document.getElementById("billing-main").style.display = "block";
    

    
}