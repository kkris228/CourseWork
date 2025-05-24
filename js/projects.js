document.addEventListener('DOMContentLoaded', () => {
    const projectEntries = document.getElementById('project-entries');
    const addProjectBtn = document.getElementById('add-project');

    function createProjectEntry() {
        const entry = document.createElement('div');
        entry.classList.add('project-entry');

        entry.innerHTML = `
            <div class="form-group">
                <label>Название проекта</label>
                <input type="text" class="project-name" placeholder="Например: CV Builder" />
            </div>

            <div class="form-group">
                <label>Краткое описание</label>
                <textarea class="project-description" rows="4" placeholder="Опишите суть проекта, цель, вашу роль..."></textarea>
            </div>

            <div class="form-group">
                <label>Использованные технологии</label>
                <input type="text" class="project-tech" placeholder="React, Node.js, PostgreSQL..." />
            </div>

            <div class="form-group">
                <label>Ссылка на проект</label>
                <input type="url" class="project-link" placeholder="https://github.com/..." />
            </div>

            <button type="button" class="remove-project">Удалить проект</button>
        `;

        entry.querySelector('.remove-project').addEventListener('click', () => {
            entry.remove();
        });

        projectEntries.appendChild(entry);
    }

    addProjectBtn.addEventListener('click', createProjectEntry);
});
