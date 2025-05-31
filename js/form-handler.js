document.addEventListener('DOMContentLoaded', function() {
    // Функция для сохранения всех данных формы
    function saveAllFormData() {
        console.log('Начинаем сохранение данных...');
        
        const formData = {
            personal: {
                fullName: `${document.getElementById('last-name')?.value || ''} ${document.getElementById('first-name')?.value || ''}`,
                position: document.getElementById('position')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                location: document.getElementById('location')?.value || ''
            },
            about: document.getElementById('about-me')?.value || '',
            projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
                name: entry?.querySelector('.project-name')?.value || '',
                description: entry?.querySelector('.project-description')?.value || '',
                technologies: entry?.querySelector('.project-tech')?.value || '',
                url: entry?.querySelector('.project-url')?.value || ''
            })),
            experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
                company: entry?.querySelector('.company')?.value || '',
                position: entry?.querySelector('.position')?.value || '',
                startDate: `${entry?.querySelector('.start-month')?.value || ''} ${entry?.querySelector('.start-year')?.value || ''}`,
                endDate: entry?.querySelector('.end-year')?.value === 'present' ? 'По настоящее время' : 
                        `${entry?.querySelector('.end-month')?.value || ''} ${entry?.querySelector('.end-year')?.value || ''}`,
                description: entry?.querySelector('textarea')?.value || ''
            })),
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                institution: entry?.querySelector('.university')?.value || '',
                degree: entry?.querySelector('.specialty')?.value || '',
                startYear: entry?.querySelector('.start-year')?.value || '',
                endYear: entry?.querySelector('.end-year')?.value || '',
                description: entry?.querySelector('textarea')?.value || ''
            })),
            skills: Array.from(document.querySelectorAll('.tech-entry')).map(entry => ({
                skill: entry?.querySelector('.tech-name')?.value || '',
                level: entry?.querySelector('.tech-level')?.value || '',
                category: entry?.querySelector('.tech-category')?.value || '',
                experience: entry?.querySelector('.tech-experience')?.value || ''
            })),
            languages: Array.from(document.querySelectorAll('.language-entry')).map(entry => ({
                language: entry?.querySelector('.language-name')?.value || '',
                level: entry?.querySelector('.language-level')?.value || ''
            })),
            links: Array.from(document.querySelectorAll('.link-entry')).map(entry => ({
                url: entry?.querySelector('.social-link')?.value || '',
                type: entry?.querySelector('.link-type')?.value || ''
            }))
        };

        console.log('Собранные данные:', formData);

        try {
            // Сохраняем данные в localStorage
            localStorage.setItem('resumeData', JSON.stringify(formData));
            console.log('Данные успешно сохранены в localStorage');

            // Сохраняем фото, если оно есть
            const photoImage = document.getElementById('photo-image');
            if (photoImage?.src && photoImage.src !== 'data:,') {
                localStorage.setItem('resumePhoto', photoImage.src);
                console.log('Фото успешно сохранено');
            }

            return true;
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            return false;
        }
    }

    // Обработка загрузки фотографии
    const photoInput = document.getElementById('photo-input');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const photoPreview = document.getElementById('photo-preview');
                    const photoImage = document.getElementById('photo-image');
                    const photoLabel = document.getElementById('photo-preview-label');
                    
                    // Сохраняем фото в localStorage
                    localStorage.setItem('resumePhoto', e.target.result);
                    
                    // Обновляем предпросмотр
                    if (photoImage && photoLabel) {
                        photoImage.src = e.target.result;
                        photoImage.style.display = 'block';
                        photoLabel.style.display = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Функция для автозаполнения форм тестовыми данными
    function fillWithTestData() {
        // Заполняем личную информацию
        const [lastName, firstName] = TEST_DATA.personal.fullName.split(' ');
        document.getElementById('last-name').value = lastName;
        document.getElementById('first-name').value = firstName;
        document.getElementById('position').value = TEST_DATA.personal.position;
        document.getElementById('email').value = TEST_DATA.personal.email;
        document.getElementById('phone').value = TEST_DATA.personal.phone;
        document.getElementById('location').value = TEST_DATA.personal.location;

        // Добавляем профессиональные ссылки
        const links = [
            { url: 'https://github.com/annasmirnova', type: 'github' },
            { url: 'https://linkedin.com/in/annasmirnova', type: 'linkedin' },
            { url: 'https://annasmirnova.dev', type: 'portfolio' }
        ];

        // Удаляем существующие ссылки кроме первой
        const linkContainer = document.getElementById('link-container');
        const linkEntries = linkContainer.querySelectorAll('.link-entry');
        for (let i = linkEntries.length - 1; i > 0; i--) {
            linkEntries[i].remove();
        }

        // Заполняем ссылки
        links.forEach((link, index) => {
            if (index > 0) {
                const addLinkBtn = document.getElementById('add-link');
                if (addLinkBtn) addLinkBtn.click();
            }
            
            const entries = linkContainer.querySelectorAll('.link-entry');
            const entry = entries[index];
            if (entry) {
                entry.querySelector('.social-link').value = link.url;
                entry.querySelector('.link-type').value = link.type;
            }
        });
        
        // Заполняем "О себе"
        document.getElementById('about-me').value = TEST_DATA.about;
        
        // Заполняем опыт работы
        const experienceList = document.getElementById('experience-entries');
        // Очищаем существующие записи кроме первой
        while (experienceList.children.length > 1) {
            experienceList.removeChild(experienceList.lastChild);
        }

        TEST_DATA.experience.forEach((exp, index) => {
            if (index > 0) {
                const addExpBtn = document.getElementById('add-experience');
                if (addExpBtn) addExpBtn.click();
            }
            
            const entries = document.querySelectorAll('.experience-entry');
            const entry = entries[index];
            if (entry) {
                const [startYear, startMonth] = exp.startDate.split('-');
                const [endYear, endMonth] = exp.endDate.split('-');
                
                entry.querySelector('.position').value = exp.position;
                entry.querySelector('.company').value = exp.company;
                
                const startMonthSelect = entry.querySelector('.start-month');
                const startYearSelect = entry.querySelector('.start-year');
                const endMonthSelect = entry.querySelector('.end-month');
                const endYearSelect = entry.querySelector('.end-year');
                
                if (startMonthSelect) startMonthSelect.value = startMonth;
                if (startYearSelect) startYearSelect.value = startYear;
                if (endMonthSelect) endMonthSelect.value = endMonth;
                if (endYearSelect) endYearSelect.value = endYear;

                // Добавляем описание опыта работы
                const descriptionField = entry.querySelector('textarea');
                if (descriptionField) {
                    descriptionField.value = exp.description;
                }
            }
        });
        
        // Заполняем образование
        const educationList = document.getElementById('education-entries');
        // Очищаем существующие записи кроме первой
        while (educationList.children.length > 1) {
            educationList.removeChild(educationList.lastChild);
        }

        TEST_DATA.education.forEach((edu, index) => {
            if (index > 0) {
                const addEduBtn = document.getElementById('add-education');
                if (addEduBtn) addEduBtn.click();
            }
            
            const entries = document.querySelectorAll('.education-entry');
            const entry = entries[index];
            if (entry) {
                const [startYear] = edu.startDate.split('-');
                const [endYear] = edu.endDate.split('-');
                
                entry.querySelector('.university').value = edu.institution;
                entry.querySelector('.specialty').value = edu.degree;
                
                const startYearSelect = entry.querySelector('.start-year');
                const endYearSelect = entry.querySelector('.end-year');
                
                if (startYearSelect) startYearSelect.value = startYear;
                if (endYearSelect) endYearSelect.value = endYear;

                // Добавляем описание образования
                const descriptionField = entry.querySelector('textarea');
                if (descriptionField) {
                    descriptionField.value = edu.description;
                }
            }
        });
        
        // Заполняем навыки
        const skillsList = document.getElementById('techstack-entries');
        // Очищаем существующие записи кроме первой
        while (skillsList.children.length > 1) {
            skillsList.removeChild(skillsList.lastChild);
        }

        TEST_DATA.skills.forEach((skill, index) => {
            if (index > 0) {
                const addTechBtn = document.getElementById('add-tech');
                if (addTechBtn) addTechBtn.click();
            }
            
            const entries = document.querySelectorAll('.tech-entry');
            const entry = entries[index];
            if (entry) {
                entry.querySelector('.tech-name').value = skill.skill;
                
                // Устанавливаем уровень навыка
                const levelSelect = entry.querySelector('.tech-level');
                if (levelSelect) {
                    const levelMap = {
                        'expert': 'Эксперт',
                        'advanced': 'Уверенный',
                        'intermediate': 'Средний',
                        'beginner': 'Новичок'
                    };
                    levelSelect.value = levelMap[skill.level] || 'Средний';
                }

                // Устанавливаем категорию
                const categorySelect = entry.querySelector('.tech-category');
                if (categorySelect) {
                    // Определяем категорию на основе навыка
                    const categoryMap = {
                        'React.js': 'Фреймворк',
                        'TypeScript': 'Язык программирования',
                        'JavaScript': 'Язык программирования',
                        'HTML5/CSS3': 'UI-библиотека',
                        'Redux': 'Фреймворк',
                        'Node.js': 'Фреймворк',
                        'Git': 'DevOps / Инструмент',
                        'Webpack': 'DevOps / Инструмент'
                    };
                    categorySelect.value = categoryMap[skill.skill] || 'Другое';
                }

                // Устанавливаем опыт работы с технологией
                const experienceInput = entry.querySelector('.tech-experience');
                if (experienceInput) {
                    const experienceMap = {
                        'expert': '5',
                        'advanced': '3',
                        'intermediate': '2',
                        'beginner': '1'
                    };
                    experienceInput.value = experienceMap[skill.level] || '1';
                }
            }
        });
        
        // Заполняем языки
        const languagesList = document.getElementById('language-entries');
        // Очищаем существующие записи кроме первой
        while (languagesList.children.length > 1) {
            languagesList.removeChild(languagesList.lastChild);
        }

        TEST_DATA.languages.forEach((lang, index) => {
            if (index > 0) {
                const addLangBtn = document.getElementById('add-language');
                if (addLangBtn) addLangBtn.click();
            }
            
            const entries = document.querySelectorAll('.language-entry');
            const entry = entries[index];
            if (entry) {
                entry.querySelector('.language-name').value = lang.language;
                const levelSelect = entry.querySelector('.language-level');
                if (levelSelect) {
                    levelSelect.value = lang.level;
                }
            }
        });

        // Добавляем тестовое фото
        const testPhotoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U5ZWNlZiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI1MCIgZmlsbD0iI2FkYjViZCIvPjxwYXRoIGQ9Ik0zMCwxOTAgQzMwLDE1MCAxNzAsMTUwIDE3MCwxOTAiIGZpbGw9IiNhZGI1YmQiLz48L3N2Zz4=';
        localStorage.setItem('resumePhoto', testPhotoUrl);

        // Обновляем предпросмотр фото
        const photoPreview = document.getElementById('photo-preview');
        const photoImage = document.getElementById('photo-image');
        const photoLabel = document.getElementById('photo-preview-label');
        if (photoImage && photoLabel) {
            photoImage.src = testPhotoUrl;
            photoImage.style.display = 'block';
            photoLabel.style.display = 'none';
        }

        // Заполняем проекты
        const projectsList = document.getElementById('project-entries');
        // Очищаем существующие записи кроме первой
        while (projectsList && projectsList.children.length > 1) {
            projectsList.removeChild(projectsList.lastChild);
        }

        const projects = [
            {
                name: "E-commerce Platform",
                description: "Разработка масштабируемой платформы электронной коммерции с использованием React.js и Redux. Реализация корзины покупок, системы оплаты и личного кабинета пользователя.",
                technologies: "React.js, Redux, TypeScript, Material-UI",
                url: "http://github.com/annasmirnova/ecommerce-platform"
            },
            {
                name: "Task Management System",
                description: "Создание системы управления задачами с drag-and-drop интерфейсом, фильтрацией и поиском задач. Интеграция с REST API и реализация real-time обновлений.",
                technologies: "React.js, TypeScript, Socket.io, Styled Components",
                url: "http://github.com/annasmirnova/task-manager"
            },
            {
                name: "Weather Dashboard",
                description: "Разработка интерактивного дашборда погоды с визуализацией данных и прогнозами. Интеграция с несколькими API погоды и геолокацией.",
                technologies: "JavaScript, Chart.js, REST API, CSS Grid",
                url: "http://github.com/annasmirnova/weather-dashboard"
            }
        ];

        projects.forEach((project, index) => {
            if (index > 0) {
                const addProjectBtn = document.getElementById('add-project');
                if (addProjectBtn) addProjectBtn.click();
            }
            
            const entries = document.querySelectorAll('.project-entry');
            const entry = entries[index];
            if (entry) {
                entry.querySelector('.project-name').value = project.name;
                entry.querySelector('.project-description').value = project.description;
                entry.querySelector('.project-tech').value = project.technologies;
                entry.querySelector('.project-url').value = project.url;
            }
        });

        // Сохраняем все данные
        saveAllFormData();
    }

    // Добавляем кнопку для заполнения тестовыми данными
    const fillTestDataButton = document.createElement('button');
    fillTestDataButton.textContent = 'Заполнить тестовыми данными';
    fillTestDataButton.className = 'fill-test-data-btn';
    fillTestDataButton.type = 'button'; // Важно указать тип кнопки
    fillTestDataButton.addEventListener('click', fillWithTestData);
    
    // Добавляем кнопку перед первой формой
    const firstForm = document.querySelector('.info-form');
    if (firstForm) {
        firstForm.insertBefore(fillTestDataButton, firstForm.firstChild);
    }

    // Обработчик для кнопки "Собрать и скачать резюме"
    const saveAllButton = document.getElementById('save-all');
    console.log('Кнопка save-all найдена:', saveAllButton);
    
    if (saveAllButton) {
        saveAllButton.addEventListener('click', function(e) {
            console.log('Кнопка save-all нажата');
            e.preventDefault();
            
            // Сохраняем все данные
            if (saveAllFormData()) {
                console.log('Переходим на страницу templates.html');
                window.location.href = 'templates.html';
            }
        });
    }
}); 