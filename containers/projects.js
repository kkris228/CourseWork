document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('project-entries');
    const addProjectButton = document.getElementById('add-project');

    if (addProjectButton) {
        addProjectButton.addEventListener('click', function() {
            const projectEntry = document.createElement('div');
            projectEntry.className = 'project-entry';
            projectEntry.innerHTML = `
                <div class="form-group">
                    <label for="project-name">Название проекта</label>
                    <input type="text" class="project-name" placeholder="Название проекта">
                </div>
                <div class="form-group">
                    <label for="project-description">Описание</label>
                    <textarea class="project-description" placeholder="Опишите ваш проект"></textarea>
                </div>
                <div class="form-group">
                    <label for="project-tech">Технологии</label>
                    <input type="text" class="project-tech" placeholder="Использованные технологии">
                </div>
                <div class="form-group">
                    <label for="project-url">URL проекта</label>
                    <input type="text" class="project-url" placeholder="http://...">
                </div>
                <button type="button" class="remove-btn">Удалить проект</button>
            `;

            // Добавляем обработчик для кнопки удаления
            const removeButton = projectEntry.querySelector('.remove-btn');
            removeButton.addEventListener('click', function() {
                projectEntry.remove();
            });

            projectsContainer.appendChild(projectEntry);
        });
    }
});
