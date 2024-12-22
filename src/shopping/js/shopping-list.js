// Add console.log to verify script is loading
console.log('Shopping list script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const addSectionBtn = document.getElementById('add-section-btn');
    console.log('Add section button:', addSectionBtn); // Debug log
    
    // Basic section addition
    const addSection = () => {
        console.log('Adding section'); // Debug log
        const template = document.getElementById('section-template');
        const clone = template.content.cloneNode(true);
        const sectionsList = document.getElementById('shopping-list');
        sectionsList.appendChild(clone);
        
        // Add item functionality for the new section
        const newSection = sectionsList.lastElementChild;
        const addItemBtn = newSection.querySelector('.add-item');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => addItem(newSection));
        }
    };

    // Basic item addition
    const addItem = (section) => {
        console.log('Adding item to section:', section); // Debug log
        const template = document.getElementById('item-template');
        const clone = template.content.cloneNode(true);
        const itemsContainer = section.querySelector('.items-container');
        itemsContainer.appendChild(clone);
    };

    // Add click handler for the add section button
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', addSection);
    }
});