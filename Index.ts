
const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.check-styles input[type="checkbox"]');
const labels: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.check-styles .checkbox-text');

const toggleCheckboxLabel = (checkbox: HTMLInputElement, label: HTMLLabelElement) => {
  if (checkbox.checked) {
    label.textContent = 'Try me out';
    label.style.textDecoration = 'line-through';  
  } else {
    label.textContent = 'Empty task';
    label.style.textDecoration = 'none';    }
};


checkboxes.forEach((checkbox, index) => {
  const correspondingLabel = labels[index];
  checkbox.addEventListener('change', () => {
    toggleCheckboxLabel(checkbox, correspondingLabel);
  });
});
