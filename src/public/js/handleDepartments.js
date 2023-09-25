function toggleCreateDepsForm() {
    const createDepsForm = document.getElementById('createDepartment');
    createDepsForm.classList.toggle('hidden');
}

const chefSelect = document.getElementById('chef');

chefSelect.addEventListener('change', (e) => {
  const menuEntries = Array.from(document.querySelectorAll('.menuEntry'));;
  const valueToRemove = e.target.value;

  menuEntries.forEach(entry => {
    const input = entry.querySelector('input');
    if (input.value === valueToRemove) {
      entry.style.display = 'none'; // hide selected entry
    } else {
      entry.style.display = ''; // show all other entries
    }
  });
});
