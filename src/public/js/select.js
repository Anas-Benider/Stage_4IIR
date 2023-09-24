const menuEntries = document.querySelectorAll('.menuEntry');
const parentElement = document.querySelector('.text');

function getChosenEntries() {
    const childrenArray = Array.from(parentElement.children);
    childrenArray.forEach((child) => {
        console.log(child.children[2].value);
    })
}
// Get the parent element by class name

//explain: this is the code that adds the selected menu entry to the list of selected entries
menuEntries.forEach((entry)=>{
    entry.addEventListener('click', (e) => {
        // Create a new div element
        const newDiv = document.createElement('div');
        newDiv.className = 'choice';

        // Create a new paragraph element
        const newParagraph = document.createElement('p');
        newParagraph.className = 'font-semibold';
        newParagraph.textContent = entry.children[0].textContent;

        // Create a new button element
        const newButton = document.createElement('button');
        newButton.className = 'removeEntry';
        newButton.textContent = 'X';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'chosenEntries';
        input.value = entry.children[1].value;
        

        // Append the paragraph and button elements to the div element
        newDiv.appendChild(newParagraph);
        newDiv.appendChild(newButton);
        newDiv.appendChild(input);
        // Append the new div element to the parent element
        parentElement.appendChild(newDiv);
    });
})


//explain: this is the code that removes the selected menu entry from the list of selected entries
// Get the parent element
const textDiv = document.querySelector('.text');

// Create a MutationObserver to listen for changes in the DOM
const observer = new MutationObserver((mutationsList) => {
    // Loop through the mutations
    for (const mutation of mutationsList) {
        // Check if new nodes were added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Loop through the added nodes
            for (const node of mutation.addedNodes) {
                // Check if the new child element has a button
                const button = node.querySelector('button');
                if (button) {
                    // Add a click event listener to the button
                    button.addEventListener('click', () => {
                        // Remove the parent element from the DOM
                        node.parentNode.removeChild(node);
                    });
                }
            }
        }
    }
});

// Start observing changes in the DOM
observer.observe(textDiv, { childList: true });
