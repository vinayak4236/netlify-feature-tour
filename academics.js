document.addEventListener('DOMContentLoaded', function() {
    // Department filter for courses
    const departmentFilter = document.getElementById('departmentFilter');
    if (departmentFilter) {
        departmentFilter.addEventListener('change', function() {
            const selectedDepartment = this.value;
            const courseRows = document.querySelectorAll('#courses tbody tr');
            
            courseRows.forEach(row => {
                if (selectedDepartment === 'all' || row.getAttribute('data-department') === selectedDepartment) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // View Results button functionality
    const viewResultsBtn = document.querySelector('#results .btn-accent');
    if (viewResultsBtn) {
        viewResultsBtn.addEventListener('click', function() {
            const studentId = document.getElementById('studentId').value;
            const semester = document.getElementById('semester').value;
            
            if (studentId.trim() === '') {
                alert('Please enter your Student ID');
                return;
            }
            
            // In a real application, this would make an AJAX request to fetch results
            // For demo purposes, we're just showing the sample results that are already in the HTML
            
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i> Results loaded for Student ID: ${studentId}, Semester: ${semester}`;
            
            // Insert the alert before the results table
            const resultsCard = document.querySelector('#results .card:last-child');
            resultsCard.parentNode.insertBefore(alertDiv, resultsCard);
            
            // Auto-dismiss the alert after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        });
    }
    
    // Apply buttons for placement drives
    const applyButtons = document.querySelectorAll('#placements .btn-accent');
    applyButtons.forEach(button => {
        if (button.textContent === 'Apply') {
            button.addEventListener('click', function() {
                const company = this.closest('tr').querySelector('span').textContent;
                
                // Show application modal (in a real app)
                alert(`Application process started for ${company}. Please complete your profile to proceed.`);
                
                // Change button text and disable it
                this.textContent = 'Applied';
                this.classList.remove('btn-accent');
                this.classList.add('btn-success');
                this.disabled = true;
            });
        }
    });
    
    // Download buttons functionality
    const downloadButtons = document.querySelectorAll('a.btn-accent');
    downloadButtons.forEach(button => {
        if (button.innerHTML.includes('Download')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const downloadType = this.innerHTML.includes('Exam Schedule') ? 'exam schedule' : 
                                    this.innerHTML.includes('Result PDF') ? 'result PDF' :
                                    this.innerHTML.includes('Calendar') ? 'academic calendar' : 'document';
                
                alert(`Download started for ${downloadType}. Your file will be ready shortly.`);
            });
        }
    });
    
    // Placement Registration Form Submission
    const submitPlacementRegistration = document.getElementById('submitPlacementRegistration');
    if (submitPlacementRegistration) {
        submitPlacementRegistration.addEventListener('click', function() {
            const form = document.getElementById('placementRegistrationForm');
            
            // Check if all required fields are filled
            const requiredFields = form.querySelectorAll('[required]');
            let allFieldsFilled = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    allFieldsFilled = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Check if terms are accepted
            const termsCheck = document.getElementById('termsCheck');
            if (!termsCheck.checked) {
                allFieldsFilled = false;
                termsCheck.classList.add('is-invalid');
            } else {
                termsCheck.classList.remove('is-invalid');
            }
            
            if (!allFieldsFilled) {
                alert('Please fill in all required fields and accept the terms and conditions.');
                return;
            }
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                studentId: document.getElementById('studentId').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                department: document.getElementById('department').value,
                program: document.getElementById('program').value,
                graduationYear: document.getElementById('graduationYear').value,
                cgpa: document.getElementById('cgpa').value,
                skills: document.getElementById('skills').value,
                interests: document.getElementById('interests').value,
                // Get selected sectors
                sectors: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                    .filter(checkbox => checkbox.id.startsWith('sector'))
                    .map(checkbox => checkbox.value)
            };
            
            // In a real application, this would send the data to a server
            console.log('Registration data:', formData);
            
            // Show success message
            const placementRegistrationModal = bootstrap.Modal.getInstance(document.getElementById('placementRegistrationModal'));
            placementRegistrationModal.hide();
            
            // Create success alert
            const alertContainer = document.createElement('div');
            alertContainer.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertContainer.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                <strong>Registration Successful!</strong> Thank you, ${formData.fullName}! Your placement registration has been submitted successfully.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Add the alert to the page
            const placementsTab = document.getElementById('placements');
            placementsTab.insertBefore(alertContainer, placementsTab.firstChild);
            
            // Reset the form
            form.reset();
            
            // Auto-dismiss the alert after 8 seconds
            setTimeout(() => {
                alertContainer.remove();
            }, 8000);
        });
    }
    
    // Handle tab navigation from URL hash
    function handleTabNavigation() {
        // Check if URL has a hash
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            
            // Try to find the tab
            const tab = document.getElementById(`${hash}-tab`);
            if (tab) {
                // Activate the tab
                const tabInstance = new bootstrap.Tab(tab);
                tabInstance.show();
                
                // Scroll to the tab
                setTimeout(() => {
                    window.scrollTo({
                        top: document.getElementById(hash).offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }
    
    // Call the function on page load
    handleTabNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleTabNavigation);
});