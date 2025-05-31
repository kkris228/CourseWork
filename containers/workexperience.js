document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущий год
    const currentYear = new Date().getFullYear();

    // Получаем элементы для добавления опыта
    const addExperienceButton = document.getElementById('add-experience');
    const experienceEntries = document.getElementById('experience-entries');

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    function createOption(value, text) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = text;
        return opt;
    }

    function populateMonth(select) {
        select.innerHTML = ''; // Очищаем перед добавлением
        months.forEach((month, i) => {
            select.appendChild(createOption(i + 1, month));
        });
    }

    function populateYear(select, start = 1980, end = currentYear) {
        select.innerHTML = ''; // Очищаем перед добавлением
        for (let y = start; y <= end; y++) {
            select.appendChild(createOption(y, y));
        }
    }

    function setupDateFields(entry) {
        const startMonth = entry.querySelector('.start-month');
        const startYear = entry.querySelector('.start-year');
        const endMonth = entry.querySelector('.end-month');
        const endYear = entry.querySelector('.end-year');

        // Заполняем только поле "Начало работы" (без "Настоящее время")
        populateMonth(startMonth);
        populateYear(startYear);

        // Заполняем поле "Конец работы" (с опцией "Настоящее время")
        populateMonth(endMonth);
        populateYear(endYear);
        endYear.appendChild(createOption('present', 'Настоящее время')); // Добавляем "Настоящее время" только в конец
    }

    function addExperienceEntry() {
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');

        newEntry.innerHTML = `
            <div class="form-group">
                <label>Устроился</label>
                <div class="date-selects">
                    <select class="start-month"></select>
                    <select class="start-year"></select>
                </div>
            </div>

            <div class="form-group">
                <label>Уволился</label>
                <div class="date-selects">
                    <select class="end-month"></select>
                    <select class="end-year">
                        <option value="present">Настоящее время</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Должность</label>
                <input type="text" class="position" placeholder="Введите должность" />
            </div>

            <div class="form-group">
                <label>Организация</label>
                <input type="text" class="company" placeholder="Введите название организации" />
            </div>

            <button type="button" class="remove-experience">Удалить опыт</button>
        `;

        experienceEntries.appendChild(newEntry);
        setupDateFields(newEntry);

        newEntry.querySelector('.remove-experience').addEventListener('click', () => {
            newEntry.remove();
        });
    }

    // Инициализируем поля в первом блоке
    setupDateFields(document.querySelector('.experience-entry'));

    // Добавление новых блоков
    addExperienceButton.addEventListener('click', addExperienceEntry);
});
