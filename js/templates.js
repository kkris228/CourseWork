document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из localStorage
    let resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
    const selectedTemplate = localStorage.getItem('selectedTemplate') || 'modern';
    const photo = localStorage.getItem('resumePhoto');

    // Добавляем фото к данным
    if (photo) {
        resumeData.photo = photo;
    }

    // Проверяем и форматируем данные если нужно
    if (!resumeData.personal) {
        resumeData.personal = {};
    }
    if (!resumeData.about) {
        resumeData.about = '';
    }
    if (!resumeData.projects) {
        resumeData.projects = [];
    }
    if (!resumeData.experience) {
        resumeData.experience = [];
    }
    if (!resumeData.education) {
        resumeData.education = [];
    }
    if (!resumeData.skills) {
        resumeData.skills = [];
    }
    if (!resumeData.languages) {
        resumeData.languages = [];
    }
    if (!resumeData.links) {
        resumeData.links = [];
    }

    // Генерируем HTML для выбранного шаблона
    const resumeHTML = generateResumeHTML(selectedTemplate, resumeData);
    
    // Отображаем резюме
    const previewContainer = document.getElementById('resume-preview');
    if (previewContainer) {
        previewContainer.innerHTML = resumeHTML;
    }

    // Обработчики для кнопок шаблонов
    document.querySelectorAll('.template-card').forEach(card => {
        const previewBtn = card.querySelector('.preview-btn');
        const selectBtn = card.querySelector('.select-btn');
        const template = card.dataset.template;

        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                const resumeHTML = generateResumeHTML(template, resumeData);
                if (previewContainer) {
                    previewContainer.innerHTML = resumeHTML;
                }
                const previewModal = document.getElementById('preview-modal');
                if (previewModal) {
                    previewModal.classList.add('active');
                }
            });
        }

        if (selectBtn) {
            selectBtn.addEventListener('click', () => {
                localStorage.setItem('selectedTemplate', template);
                const resumeHTML = generateResumeHTML(template, resumeData);
                if (previewContainer) {
                    previewContainer.innerHTML = resumeHTML;
                }
                const previewModal = document.getElementById('preview-modal');
                if (previewModal) {
                    previewModal.classList.add('active');
                }
            });
        }
    });

    // Закрытие модального окна
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('preview-modal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Кнопка редактирования
    const editButton = document.getElementById('edit-resume');
    if (editButton) {
        editButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Экспорт в PDF
    const exportPdfButton = document.getElementById('export-pdf');
    if (exportPdfButton && previewContainer) {
        exportPdfButton.addEventListener('click', async () => {
            try {
                const opt = {
                    margin: 0,
                    filename: 'resume.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                await html2pdf().set(opt).from(previewContainer).save();
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        });
    }

    // Экспорт в JPG
    const exportJpgButton = document.getElementById('export-jpg');
    if (exportJpgButton && previewContainer) {
        exportJpgButton.addEventListener('click', async () => {
            try {
                const canvas = await html2canvas(previewContainer, {
                    scale: 2,
                    useCORS: true,
                    logging: false
                });
                const dataUrl = canvas.toDataURL('image/jpeg', 0.98);
                
                const link = document.createElement('a');
                link.download = 'resume.jpg';
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Error generating JPG:', error);
            }
        });
    }

    // Навигация по секциям
    const sections = document.querySelectorAll('.resume-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const saveBtn = document.getElementById('save-btn');
    let currentSectionIndex = 0;

    // Функция для показа определенной секции
    function showSection(index) {
        sections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        sections[index].classList.add('active');
        navButtons[index].classList.add('active');
        
        // Обновляем состояние кнопок навигации
        prevBtn.disabled = index === 0;
        nextBtn.style.display = index === sections.length - 1 ? 'none' : 'block';
        saveBtn.style.display = index === sections.length - 1 ? 'block' : 'none';
        
        currentSectionIndex = index;
    }

    // Обработчики для кнопок навигации
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => showSection(index));
    });

    prevBtn.addEventListener('click', () => {
        if (currentSectionIndex > 0) {
            showSection(currentSectionIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            showSection(currentSectionIndex + 1);
        }
    });

    // Функции для добавления новых элементов
    function createExperienceItem() {
        const template = document.querySelector('.experience-item').cloneNode(true);
        template.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.getElementById('experience-list').appendChild(template);
    }

    function createEducationItem() {
        const template = document.querySelector('.education-item').cloneNode(true);
        template.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.getElementById('education-list').appendChild(template);
    }

    function createSkillItem() {
        const template = document.querySelector('.skill-item').cloneNode(true);
        template.querySelectorAll('input, select').forEach(input => input.value = '');
        document.getElementById('skills-list').appendChild(template);
    }

    function createLanguageItem() {
        const template = document.querySelector('.language-item').cloneNode(true);
        template.querySelectorAll('input, select').forEach(input => input.value = '');
        document.getElementById('languages-list').appendChild(template);
    }

    // Обработчики для кнопок добавления
    document.getElementById('add-experience').addEventListener('click', createExperienceItem);
    document.getElementById('add-education').addEventListener('click', createEducationItem);
    document.getElementById('add-skill').addEventListener('click', createSkillItem);
    document.getElementById('add-language').addEventListener('click', createLanguageItem);

    // Обработка загрузки фото
    const photoInput = document.getElementById('photo');
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('resumePhoto', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Сохранение данных в localStorage
    function saveFormData() {
        const formData = {
            personal: {
                fullName: document.getElementById('fullName').value,
                position: document.getElementById('position').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value
            },
            about: document.getElementById('about').value,
            experience: Array.from(document.querySelectorAll('.experience-item')).map(item => ({
                company: item.querySelector('[name="company"]').value,
                position: item.querySelector('[name="position"]').value,
                startDate: item.querySelector('[name="start-date"]').value,
                endDate: item.querySelector('[name="end-date"]').value,
                description: item.querySelector('[name="description"]').value
            })),
            education: Array.from(document.querySelectorAll('.education-item')).map(item => ({
                institution: item.querySelector('[name="institution"]').value,
                degree: item.querySelector('[name="degree"]').value,
                startDate: item.querySelector('[name="start-date"]').value,
                endDate: item.querySelector('[name="end-date"]').value,
                description: item.querySelector('[name="description"]').value
            })),
            skills: Array.from(document.querySelectorAll('.skill-item')).map(item => ({
                skill: item.querySelector('[name="skill"]').value,
                experience: item.querySelector('[name="experience"]').value
            })),
            languages: Array.from(document.querySelectorAll('.language-item')).map(item => ({
                language: item.querySelector('[name="language"]').value,
                level: item.querySelector('[name="level"]').value
            }))
        };

        localStorage.setItem('resumeData', JSON.stringify(formData));
    }

    // Загрузка данных из localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            // Заполняем личную информацию
            document.getElementById('fullName').value = formData.personal.fullName;
            document.getElementById('position').value = formData.personal.position;
            document.getElementById('email').value = formData.personal.email;
            document.getElementById('phone').value = formData.personal.phone;
            document.getElementById('location').value = formData.personal.location;
            
            // Заполняем "О себе"
            document.getElementById('about').value = formData.about;
            
            // Заполняем опыт работы
            formData.experience.forEach((exp, index) => {
                if (index > 0) createExperienceItem();
                const items = document.querySelectorAll('.experience-item');
                const item = items[index];
                item.querySelector('[name="company"]').value = exp.company;
                item.querySelector('[name="position"]').value = exp.position;
                item.querySelector('[name="start-date"]').value = exp.startDate;
                item.querySelector('[name="end-date"]').value = exp.endDate;
                item.querySelector('[name="description"]').value = exp.description;
            });
            
            // Заполняем образование
            formData.education.forEach((edu, index) => {
                if (index > 0) createEducationItem();
                const items = document.querySelectorAll('.education-item');
                const item = items[index];
                item.querySelector('[name="institution"]').value = edu.institution;
                item.querySelector('[name="degree"]').value = edu.degree;
                item.querySelector('[name="start-date"]').value = edu.startDate;
                item.querySelector('[name="end-date"]').value = edu.endDate;
                item.querySelector('[name="description"]').value = edu.description;
            });
            
            // Заполняем навыки
            formData.skills.forEach((skill, index) => {
                if (index > 0) createSkillItem();
                const items = document.querySelectorAll('.skill-item');
                const item = items[index];
                item.querySelector('[name="skill"]').value = skill.skill;
                item.querySelector('[name="experience"]').value = skill.experience;
            });
            
            // Заполняем языки
            formData.languages.forEach((lang, index) => {
                if (index > 0) createLanguageItem();
                const items = document.querySelectorAll('.language-item');
                const item = items[index];
                item.querySelector('[name="language"]').value = lang.language;
                item.querySelector('[name="level"]').value = lang.level;
            });
        }
    }

    // Автосохранение при изменении полей
    document.addEventListener('input', saveFormData);

    // Загружаем данные при загрузке страницы
    loadFormData();

    // Показываем первую секцию при загрузке
    showSection(0);

    // Обработчик для кнопки "Сохранить резюме"
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveFormData(); // Сохраняем данные перед переходом
            window.location.href = 'templates.html'; // Переходим на страницу с шаблонами
        });
    }

    // Функция для автозаполнения форм тестовыми данными
    function fillWithTestData() {
        // Заполняем личную информацию
        document.getElementById('fullName').value = TEST_DATA.personal.fullName;
        document.getElementById('position').value = TEST_DATA.personal.position;
        document.getElementById('email').value = TEST_DATA.personal.email;
        document.getElementById('phone').value = TEST_DATA.personal.phone;
        document.getElementById('location').value = TEST_DATA.personal.location;
        
        // Заполняем "О себе"
        document.getElementById('about').value = TEST_DATA.about;
        
        // Очищаем существующие элементы опыта работы
        const experienceList = document.getElementById('experience-list');
        while (experienceList.children.length > 1) {
            experienceList.removeChild(experienceList.lastChild);
        }
        
        // Заполняем опыт работы
        TEST_DATA.experience.forEach((exp, index) => {
            if (index > 0) createExperienceItem();
            const items = document.querySelectorAll('.experience-item');
            const item = items[index];
            item.querySelector('[name="company"]').value = exp.company;
            item.querySelector('[name="position"]').value = exp.position;
            item.querySelector('[name="start-date"]').value = exp.startDate;
            item.querySelector('[name="end-date"]').value = exp.endDate;
            item.querySelector('[name="description"]').value = exp.description;
        });
        
        // Очищаем существующие элементы образования
        const educationList = document.getElementById('education-list');
        while (educationList.children.length > 1) {
            educationList.removeChild(educationList.lastChild);
        }
        
        // Заполняем образование
        TEST_DATA.education.forEach((edu, index) => {
            if (index > 0) createEducationItem();
            const items = document.querySelectorAll('.education-item');
            const item = items[index];
            item.querySelector('[name="institution"]').value = edu.institution;
            item.querySelector('[name="degree"]').value = edu.degree;
            item.querySelector('[name="start-date"]').value = edu.startDate;
            item.querySelector('[name="end-date"]').value = edu.endDate;
            item.querySelector('[name="description"]').value = edu.description;
        });
        
        // Очищаем существующие элементы навыков
        const skillsList = document.getElementById('skills-list');
        while (skillsList.children.length > 1) {
            skillsList.removeChild(skillsList.lastChild);
        }
        
        // Заполняем навыки
        TEST_DATA.skills.forEach((skill, index) => {
            if (index > 0) createSkillItem();
            const items = document.querySelectorAll('.skill-item');
            const item = items[index];
            item.querySelector('[name="skill"]').value = skill.skill;
            item.querySelector('[name="experience"]').value = skill.experience;
        });
        
        // Очищаем существующие элементы языков
        const languagesList = document.getElementById('languages-list');
        while (languagesList.children.length > 1) {
            languagesList.removeChild(languagesList.lastChild);
        }
        
        // Заполняем языки
        TEST_DATA.languages.forEach((lang, index) => {
            if (index > 0) createLanguageItem();
            const items = document.querySelectorAll('.language-item');
            const item = items[index];
            item.querySelector('[name="language"]').value = lang.language;
            item.querySelector('[name="level"]').value = lang.level;
        });

        // Сохраняем данные
        saveFormData();
    }

    // Добавляем кнопку для заполнения тестовыми данными
    const fillTestDataButton = document.createElement('button');
    fillTestDataButton.textContent = 'Заполнить тестовыми данными';
    fillTestDataButton.className = 'fill-test-data-btn';
    fillTestDataButton.addEventListener('click', fillWithTestData);
    
    // Добавляем кнопку в начало формы
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(fillTestDataButton, form.firstChild);
    }
});

// Добавляем функцию для генерации HTML проектов
function generateProjectsHTML(projects) {
    if (!projects || !projects.length) return '<p>Проекты не указаны</p>';
    
    return projects.map(project => `
        <div class="project-item">
            <h4>${project.name || ''}</h4>
            <p class="project-description">${project.description || ''}</p>
            <p class="project-tech"><strong>Технологии:</strong> ${project.technologies || ''}</p>
            <p class="project-link">${project.url || ''}</p>
        </div>
    `).join('');
}

// Обновляем шаблон Modern
function generateModernTemplate(data) {
    return `
        <div class="resume-modern">
            <div class="sidebar">
                ${data.photo ? `<div class="profile-photo"><img src="${data.photo}" alt="Фото"></div>` : ''}
                <div class="contact-info">
                    <h3>КОНТАКТЫ</h3>
                    <div class="contact-item">${data.personal.phone || ''}</div>
                    <div class="contact-item">${data.personal.email || ''}</div>
                    <div class="contact-item">${data.personal.location || ''}</div>
                    ${data.links ? data.links.map(link => `
                        <div class="contact-item">
                            ${link.url}
                        </div>
                    `).join('') : ''}
                </div>
                
                <div class="skills-section">
                    <h3>НАВЫКИ</h3>
                    ${generateSkillsHTML(data.skills)}
                </div>
                
                <div class="languages-section">
                    <h3>ЯЗЫКИ</h3>
                    ${generateLanguagesHTML(data.languages)}
                </div>
            </div>

            <div class="main-content">
                <h1>${data.personal.fullName || ''}</h1>
                <h2>${data.personal.position || ''}</h2>

                <div class="section">
                    <h3>ПРОФИЛЬ</h3>
                    <p>${data.about || ''}</p>
                </div>

                <div class="section">
                    <h3>ПРОЕКТЫ</h3>
                    ${generateProjectsHTML(data.projects)}
                </div>

                <div class="section">
                    <h3>ОПЫТ РАБОТЫ</h3>
                    ${generateExperienceHTML(data.experience)}
                </div>

                <div class="section">
                    <h3>ОБРАЗОВАНИЕ</h3>
                    ${generateEducationHTML(data.education)}
                </div>
            </div>
        </div>
    `;
}

// Обновляем шаблон Creative
function generateCreativeTemplate(data) {
    return `
        <div class="resume-creative">
            <div class="header">
                ${data.photo ? `<div class="profile-photo"><img src="${data.photo}" alt="Фото"></div>` : ''}
                <h1>${data.personal.fullName || ''}</h1>
                <h2>${data.personal.position || ''}</h2>
            </div>

            <div class="content-grid">
                <div class="section-card">
                    <h3>ПРОФИЛЬ</h3>
                    <p>${data.about || ''}</p>
                </div>

                <div class="section-card">
                    <h3>КОНТАКТЫ</h3>
                    <div class="contact-info">
                        <p>${data.personal.phone || ''}</p>
                        <p>${data.personal.email || ''}</p>
                        <p>${data.personal.location || ''}</p>
                        ${data.links ? data.links.map(link => `
                            <p>${link.url}</p>
                        `).join('') : ''}
                    </div>
                </div>

                <div class="section-card projects">
                    <h3>ПРОЕКТЫ</h3>
                    ${generateProjectsHTML(data.projects)}
                </div>

                <div class="section-card experience">
                    <h3>ОПЫТ РАБОТЫ</h3>
                    ${generateExperienceHTML(data.experience)}
                </div>

                <div class="section-card education">
                    <h3>ОБРАЗОВАНИЕ</h3>
                    ${generateEducationHTML(data.education)}
                </div>

                <div class="section-card">
                    <h3>НАВЫКИ</h3>
                    ${generateSkillsHTML(data.skills)}
                </div>

                <div class="section-card">
                    <h3>ЯЗЫКИ</h3>
                    ${generateLanguagesHTML(data.languages)}
                </div>
            </div>
        </div>
    `;
}

// Обновляем шаблон Classic
function generateClassicTemplate(data) {
    return `
        <div class="resume-classic">
            <div class="sidebar">
                ${data.photo ? `<div class="profile-photo"><img src="${data.photo}" alt="Фото"></div>` : ''}
                <div class="section-title">КОНТАКТЫ</div>
                <div class="divider"></div>
                <div class="contact-info">
                    <p>${data.personal.phone || ''}</p>
                    <p>${data.personal.email || ''}</p>
                    <p>${data.personal.location || ''}</p>
                    ${data.links ? data.links.map(link => `
                        <p>${link.url}</p>
                    `).join('') : ''}
                </div>

                <div class="section-title">НАВЫКИ</div>
                <div class="divider"></div>
                ${generateSkillsHTML(data.skills)}

                <div class="section-title">ЯЗЫКИ</div>
                <div class="divider"></div>
                ${generateLanguagesHTML(data.languages)}
            </div>

            <div class="main-content">
                <h1>${data.personal.fullName || ''}</h1>
                <h2>${data.personal.position || ''}</h2>

                <div class="content-section">
                    <div class="content-title">ПРОФИЛЬ</div>
                    <div class="content-divider"></div>
                    <p>${data.about || ''}</p>
                </div>

                <div class="content-section">
                    <div class="content-title">ПРОЕКТЫ</div>
                    <div class="content-divider"></div>
                    ${generateProjectsHTML(data.projects)}
                </div>

                <div class="content-section">
                    <div class="content-title">ОПЫТ РАБОТЫ</div>
                    <div class="content-divider"></div>
                    ${generateExperienceHTML(data.experience)}
                </div>

                <div class="content-section">
                    <div class="content-title">ОБРАЗОВАНИЕ</div>
                    <div class="content-divider"></div>
                    ${generateEducationHTML(data.education)}
                </div>
            </div>
        </div>
    `;
}

// Вспомогательные функции для генерации HTML
function generateExperienceHTML(experience) {
    if (!experience || !experience.length) return '<p>Нет опыта работы</p>';
    
    return experience.map(exp => `
        <div class="experience-item">
            <h4>${exp.position || ''}</h4>
            <h5>${exp.company || ''}</h5>
            <p class="date">${exp.startDate || ''} - ${exp.endDate || ''}</p>
            <p class="description">${exp.description || ''}</p>
        </div>
    `).join('');
}

function generateEducationHTML(education) {
    if (!education || !education.length) return '<p>Нет данных об образовании</p>';
    
    return education.map(edu => `
        <div class="education-item">
            <h4>${edu.institution || ''}</h4>
            <h5>${edu.degree || ''}</h5>
            <p class="date">${edu.startYear || ''} - ${edu.endYear || ''}</p>
            <p class="description">${edu.description || ''}</p>
        </div>
    `).join('');
}

function generateSkillsHTML(skills) {
    if (!skills || !skills.length) return '<p>Навыки не указаны</p>';
    
    return `<ul class="skills-list">
        ${skills.map(skill => `
            <li>
                <span class="skill-name">${skill.skill || ''}</span>
                <span class="skill-level">${skill.experience ? `${skill.experience} ч.` : ''}</span>
            </li>
        `).join('')}
    </ul>`;
}

function generateLanguagesHTML(languages) {
    if (!languages || !languages.length) return '<p>Языки не указаны</p>';
    
    return `<ul class="languages-list">
        ${languages.map(lang => `
            <li>
                <span class="language-name">${lang.language || ''}</span>
                <span class="language-level">${lang.level || ''}</span>
            </li>
        `).join('')}
    </ul>`;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    if (dateStr === 'present') return 'По настоящее время';
    
    const [year, month] = dateStr.split('-');
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    return `${months[parseInt(month) - 1] || ''} ${year}`;
}

// Функция для генерации HTML резюме
function generateResumeHTML(template, data) {
    switch (template) {
        case 'modern':
            return generateModernTemplate(data);
        case 'creative':
            return generateCreativeTemplate(data);
        case 'classic':
            return generateClassicTemplate(data);
        default:
            return '<p>Шаблон не найден</p>';
    }
} 