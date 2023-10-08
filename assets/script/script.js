$(document).ready(function() {
    // Handle form submission
    $('#userForm').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get form data
        var formData = {
            id: new Date().getTime(), // Generate a unique ID (you can use a more robust method)
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            birthDate: $('#birthDate').val(),
            email: $('#email').val(),
            gender: $('input[name="gender"]:checked').val(),
            phoneNumber: $('#phoneNumber').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            pincode: $('#pincode').val(),
            address: $('#address').val(),
            languages: getSelectedLanguages()

            // Add other form fields here
        };

        // Add the new user data to the table
        addUserToTable(formData);

        // Reset the form
        $('#userForm')[0].reset();

        // Close the modal
        $('#addUserModal').modal('hide');
    alert("Data successfully added!");
    });

    // Function to add a new user row to the table
    function addUserToTable(userData) {
        var tableRow = '<tr>' +
            '<td>' + userData.id + '</td>' +
            '<td>' + userData.firstName + '</td>' +
            '<td>' + userData.lastName + '</td>' +
            '<td>' + userData.birthDate + '</td>' +
            '<td>' + userData.email + '</td>' +
            '<td>' + userData.gender + '</td>' +
            '<td>' + userData.phoneNumber + '</td>' +
            '<td>' + userData.city + '</td>' +
            '<td>' + userData.state + '</td>' +
            '<td>' + userData.pincode + '</td>' +
            '<td>' + userData.address + '</td>' +
            '<td>' + userData.languages.join(', ') + '</td>' +

            // Add other table columns here
            '<td><button class="btn btn-outline-warning" onclick="editUser(this)">Edit</button></td>' +
            '<td><button class="btn btn-outline-danger" onclick="deleteUser(this)">Delete</button></td>' +
            '</tr>';

        // Append the new row to the table body
        $('#userTable tbody').append(tableRow);
    }
     // Function to get selected languages
        function getSelectedLanguages() {
        var selectedLanguages = [];
        $('input[name="languages[]"]:checked').each(function() {
            selectedLanguages.push($(this).val());
        });
        return selectedLanguages;
        }
});

function editUser(button) {
    // Get the selected row's ID
    var userId = $(button).closest('tr').data('id');

    // Find the user data for the selected row (you can use your own data source)
    var userData = findUserDataById(userId);

    // Populate the form fields with the user data
    $('#id').val(userData.id); // Assuming you have an ID field in your form
    $('#firstName').val(userData.firstName);
    $('#lastName').val(userData.lastName);
    $('#birthDate').val(userData.birthDate);
    $('#email').val(userData.email);
    // Populate other form fields as needed
    $('input[name="gender"][value="' + userData.gender + '"]').prop('checked', true);
    $('#phoneNumber').val(userData.phoneNumber);
    $('#city').val(userData.city);
    $('#state').val(userData.state);
    $('#pincode').val(userData.pincode);
    $('#address').val(userData.address);

    // Handle the selected languages (checkboxes)
    var languages = userData.languages;
    $('input[name="languages[]"]').each(function() {
        if (languages.includes($(this).val())) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    });

    // Show the modal
    $('#addUserModal').modal('show');
}

function findUserDataById(userId) {
    // Replace this with your own logic to fetch user data by ID
    // For example, you can store user data in an array or fetch it from a server

    // Sample user data for testing
    var userData = {
        id: userId,
        firstName: firstName,
        lastName: 'Doe',
        birthDate: '1990-01-01',
        email: 'john@example.com',
        gender: 'Male', // Assuming 'Male' or 'Female'
        phoneNumber: '123-456-7890',
        city: 'Sample City',
        state: 'Sample State',
        pincode: '12345',
        address: '123 Sample Street',
        languages: ['English', 'Gujarati'], // Assuming an array of selected languages
    };

    return userData;
}
// Function to delete a user row from the table
function deleteUser(button) {
    $(button).closest('tr').remove();
    alert("Data successfully deleted!");
}
