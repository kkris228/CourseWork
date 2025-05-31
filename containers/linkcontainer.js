// Функция для создания новой группы полей для ссылки
function createLinkEntry() {
    const linkEntry = document.createElement('div');
    linkEntry.className = 'link-entry';

    // Создаем поле для ввода ссылки
    const linkInput = document.createElement('input');
    linkInput.type = 'url';
    linkInput.className = 'social-link';
    linkInput.placeholder = 'Например: https://github.com/username';

    // Создаем селект для типа ссылки
    const linkType = document.createElement('select');
    linkType.className = 'link-type';
    
    // Добавляем опции
    const options = [
        { value: 'github', text: 'GitHub' },
        { value: 'linkedin', text: 'LinkedIn' },
        { value: 'portfolio', text: 'Портфолио' },
        { value: 'other', text: 'Другое' }
    ];

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        linkType.appendChild(optionElement);
    });

    // Добавляем элементы в группу
    linkEntry.appendChild(linkInput);
    linkEntry.appendChild(linkType);

    return linkEntry;
}

// При загрузке страницы создаем первую группу полей
document.addEventListener('DOMContentLoaded', function() {
    const linkContainer = document.getElementById('link-container');
    linkContainer.appendChild(createLinkEntry());
});

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку добавления ссылки
    const addLinkButton = document.getElementById('add-link');
    
    if (addLinkButton) {
        addLinkButton.addEventListener('click', function() {
            // Создаем новые элементы
            const newInput = document.createElement('input');
            newInput.type = 'url';
            newInput.className = 'social-link';
            newInput.placeholder = 'Например: https://github.com/username';
            
            const newSelect = document.createElement('select');
            newSelect.className = 'link-type';
            
            // Добавляем опции в select
            const options = [
                { value: 'github', text: 'GitHub' },
                { value: 'linkedin', text: 'LinkedIn' },
                { value: 'portfolio', text: 'Портфолио' },
                { value: 'other', text: 'Другое' }
            ];
            
            options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.text;
                newSelect.appendChild(option);
            });

            // Создаем кнопку удаления
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'remove-link';
            deleteButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 6l12 12m-12 0l12-12" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
            
            // Добавляем обработчик для удаления
            deleteButton.addEventListener('click', function() {
                // Проверяем, что это не последняя группа полей
                const allEntries = document.querySelectorAll('.link-entry');
                if (allEntries.length > 1) {
                    newLinkEntry.remove();
                } else {
                    // Если это последняя группа, просто очищаем поля
                    newInput.value = '';
                    newSelect.selectedIndex = 0;
                }
            });
            
            // Создаем div для новой группы полей
            const newLinkEntry = document.createElement('div');
            newLinkEntry.className = 'link-entry';
            newLinkEntry.appendChild(newInput);
            newLinkEntry.appendChild(newSelect);
            newLinkEntry.appendChild(deleteButton);
            
            // Находим контейнер и добавляем новую группу
            const linkContainer = document.getElementById('link-container');
            if (linkContainer) {
                linkContainer.appendChild(newLinkEntry);
            } else {
                console.error('Container not found');
            }
        });
    } else {
        console.error('Add link button not found');
    }

    // Добавляем кнопку удаления к существующей первой группе полей
    const firstEntry = document.querySelector('.link-entry');
    if (firstEntry && !firstEntry.querySelector('.remove-link')) {
        const initialDeleteButton = document.createElement('button');
        initialDeleteButton.type = 'button';
        initialDeleteButton.className = 'remove-link';
        initialDeleteButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6l12 12m-12 0l12-12" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        
        initialDeleteButton.addEventListener('click', function() {
            const allEntries = document.querySelectorAll('.link-entry');
            if (allEntries.length > 1) {
                firstEntry.remove();
            } else {
                // Если это последняя группа, просто очищаем поля
                firstEntry.querySelector('.social-link').value = '';
                firstEntry.querySelector('.link-type').selectedIndex = 0;
            }
        });
        
        firstEntry.appendChild(initialDeleteButton);
    }
});