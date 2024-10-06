// Select all checkboxes and labels
var checkboxes = document.querySelectorAll('.check-styles input[type="checkbox"]');
var labels = document.querySelectorAll('.check-styles .checkbox-text');
// Function to toggle the label text and style
var toggleCheckboxLabel = function (checkbox, label) {
    if (checkbox.checked) {
        label.textContent = 'Try me out';
        label.style.textDecoration = 'line-through'; // Add line-through style
    }
    else {
        label.textContent = 'Empty task';
        label.style.textDecoration = 'none'; // Remove line-through style
    }
};
// Add event listeners to all checkboxes
checkboxes.forEach(function (checkbox, index) {
    var correspondingLabel = labels[index];
    checkbox.addEventListener('change', function () {
        toggleCheckboxLabel(checkbox, correspondingLabel);
    });
});
