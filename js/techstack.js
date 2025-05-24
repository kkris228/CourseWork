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

            <div class="form-group">
                <label>Уровень владения</label>
                <select class="tech-level">
                    <option>Новичок</option>
                    <option>Средний</option>
                    <option>Уверенный</option>
                    <option>Эксперт</option>
                </select>
            </div>

            <div class="form-group">
                <label>Категория</label>
                <select class="tech-category">
                    <option>Язык программирования</option>
                    <option>Фреймворк</option>
                    <option>База данных</option>
                    <option>DevOps / Инструмент</option>
                    <option>UI-библиотека</option>
                    <option>Другое</option>
                </select>
            </div>

            <div class="form-group">
                <label>Опыт (в годах)</label>
                <input type="number" class="tech-experience" min="0" step="0.1" placeholder="например: 2.5" />
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
