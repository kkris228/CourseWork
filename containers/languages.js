document.addEventListener('DOMContentLoaded', () => {
    const languageEntries = document.getElementById('language-entries');
    const addLanguageBtn = document.getElementById('add-language');

    function createLanguageEntry() {
        const entry = document.createElement('div');
        entry.classList.add('language-entry');

        entry.innerHTML = `
            <div class="form-group">
                <label>Язык</label>
                <input type="text" class="language-name" placeholder="Например: Английский" />
            </div>

            <div class="form-group">
                <label>Уровень владения</label>
                <select class="language-level">
                    <option value="A1">A1 — Начальный</option>
                    <option value="A2">A2 — Элементарный</option>
                    <option value="B1">B1 — Средний</option>
                    <option value="B2">B2 — Выше среднего</option>
                    <option value="C1">C1 — Продвинутый</option>
                    <option value="C2">C2 — Свободное владение</option>
                    <option value="native">Носитель языка</option>
                </select>
            </div>

            <button type="button" class="remove-language">Удалить язык</button>
        `;

        entry.querySelector('.remove-language').addEventListener('click', () => {
            entry.remove();
        });

        languageEntries.appendChild(entry);
    }

    addLanguageBtn.addEventListener('click', createLanguageEntry);
});
