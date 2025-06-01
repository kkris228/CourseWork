document.addEventListener('DOMContentLoaded', () => {
    const techEntries = document.getElementById('techstack-entries');
    const addTechBtn = document.getElementById('add-tech');

    function createTechEntry() {
        const entry = document.createElement('div');
        entry.classList.add('tech-entry');

        entry.innerHTML = `
            <div class="form-group">
                <label>Название технологии</label>
                <input type="text" class="tech-name" placeholder="Например: React, Docker..." />
            </div>
            
            <button type="button" class="remove-tech">Удалить</button>
        `;

        entry.querySelector('.remove-tech').addEventListener('click', () => {
            entry.remove();
        });

        techEntries.appendChild(entry);
    }

    addTechBtn.addEventListener('click', createTechEntry);
});
