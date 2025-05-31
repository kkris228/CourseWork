document.addEventListener('DOMContentLoaded', function () {
    // Получаем текущий год
    const currentYear = new Date().getFullYear();

    // Получаем элементы для добавления образования
    const addEducationButton = document.getElementById('add-education');
    const educationEntries = document.getElementById('education-entries');

    // Функция для создания списка годов
    function populateYearOptions(selectElement, startYear, endYear) {
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            selectElement.appendChild(option);
        }
    }

    // Функция для добавления нового блока образования
    function addNewEducationEntry() {
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');

        // HTML для нового блока
        newEntry.innerHTML = `
            <div class="form-group">
                <label for="start-year">Начало обучения</label>
                <select class="start-year" name="start-year"></select>
            </div>
            <div class="form-group">
                <label for="end-year">Конец обучения</label>
                <select class="end-year" name="end-year">
                    <option value="present">Настоящее время</option>
                </select>
            </div>
            <div class="form-group">
                <label for="university">Учебное заведение</label>
                <input type="text" class="university" name="university" placeholder="Введите учебное заведение" />
            </div>
            <div class="form-group">
                <label for="specialty">Специальность</label>
                <input type="text" class="specialty" name="specialty" placeholder="Введите специальность" />
            </div>
            <div class="form-group">
                <button type="button" class="remove-education">Удалить образование</button>
            </div>
        `;

        // Добавляем новый блок в контейнер
        educationEntries.appendChild(newEntry);

        // Добавляем годы в новый блок
        const newStartYearSelect = newEntry.querySelector('.start-year');
        const newEndYearSelect = newEntry.querySelector('.end-year');
        populateYearOptions(newStartYearSelect, 1980, currentYear);
        populateYearOptions(newEndYearSelect, 1980, currentYear);

        // Добавляем обработчик события для удаления блока образования
        const removeButton = newEntry.querySelector('.remove-education');
        removeButton.addEventListener('click', function () {
            if (educationEntries.childElementCount > 1) {
                newEntry.remove();
            }
        });
    }

    // Заполняем годы для первого блока образования
    const startYearSelects = document.querySelectorAll('.start-year');
    const endYearSelects = document.querySelectorAll('.end-year');
    startYearSelects.forEach(select => populateYearOptions(select, 1980, currentYear));
    endYearSelects.forEach(select => populateYearOptions(select, 1980, currentYear));

    // Обработчик события для добавления образования
    addEducationButton.addEventListener('click', addNewEducationEntry);
});
