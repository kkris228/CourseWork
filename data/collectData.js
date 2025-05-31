const cvData = {
  personal: {},
  aboutMe: '',
  education: [],
  experience: [],
  techStack: [],
  projects: [],
  languages: [],
  photoBase64: ''
};

// Персональные данные
function savePersonalData() {
  cvData.personal.lastName = document.getElementById('last-name')?.value?.trim() || '';
  cvData.personal.firstName = document.getElementById('first-name')?.value?.trim() || '';
  cvData.personal.position = document.getElementById('position')?.value?.trim() || '';
  cvData.personal.phone = document.getElementById('phone')?.value?.trim() || '';
  cvData.personal.location = document.getElementById('location')?.value?.trim() || '';
  cvData.personal.email = document.getElementById('email')?.value?.trim() || '';
  cvData.personal.links = Array.from(document.querySelectorAll('#link-container input[type="url"]'))
                               .map(input => input?.value?.trim()).filter(link => link !== '');
}

// О себе
function saveAboutMe() {
  cvData.aboutMe = document.getElementById('about-me')?.value?.trim() || '';
}

// Образование
function saveEducationData() {
  const entries = document.querySelectorAll('.education-entry');
  cvData.education = [];

  entries.forEach(entry => {
    if (entry) {
      cvData.education.push({
        startYear: entry.querySelector('.start-year')?.value || '',
        endYear: entry.querySelector('.end-year')?.value || '',
        university: entry.querySelector('.university')?.value?.trim() || '',
        specialty: entry.querySelector('.specialty')?.value?.trim() || ''
      });
    }
  });
}

// Опыт работы
function saveExperienceData() {
  const entries = document.querySelectorAll('.experience-entry');
  cvData.experience = [];

  entries.forEach(entry => {
    if (entry) {
      cvData.experience.push({
        startMonth: entry.querySelector('.start-month')?.value || '',
        startYear: entry.querySelector('.start-year')?.value || '',
        endMonth: entry.querySelector('.end-month')?.value || '',
        endYear: entry.querySelector('.end-year')?.value || '',
        position: entry.querySelector('.position')?.value?.trim() || '',
        company: entry.querySelector('.company')?.value?.trim() || ''
      });
    }
  });
}

// Технологии
function saveTechStackData() {
  const entries = document.querySelectorAll('.tech-entry');
  cvData.techStack = [];

  entries.forEach(entry => {
    if (entry) {
      cvData.techStack.push({
        name: entry.querySelector('.tech-name')?.value?.trim() || '',
        level: entry.querySelector('.tech-level')?.value || '',
        category: entry.querySelector('.tech-category')?.value || '',
        experience: entry.querySelector('.tech-experience')?.value || ''
      });
    }
  });
}

// Проекты
function saveProjectsData() {
  const entries = document.querySelectorAll('.project-entry');
  cvData.projects = [];

  entries.forEach(entry => {
    if (entry) {
      cvData.projects.push({
        name: entry.querySelector('.project-name')?.value?.trim() || '',
        description: entry.querySelector('.project-description')?.value?.trim() || '',
        technologies: entry.querySelector('.project-tech')?.value?.trim() || '',
        url: entry.querySelector('.project-url')?.value?.trim() || ''
      });
    }
  });
}

// Языки
function saveLanguagesData() {
  const entries = document.querySelectorAll('.language-entry');
  cvData.languages = [];

  entries.forEach(entry => {
    if (entry) {
      cvData.languages.push({
        language: entry.querySelector('.language-name')?.value?.trim() || '',
        level: entry.querySelector('.language-level')?.value || ''
      });
    }
  });
}

// Фото
function savePhoto() {
  const img = document.getElementById('photo-image');
  cvData.photoBase64 = img?.src?.startsWith('data:image') ? img.src : '';
}

// Общая функция
function saveAllData() {
  savePersonalData();
  saveAboutMe();
  saveEducationData();
  saveExperienceData();
  saveTechStackData();
  saveProjectsData();
  saveLanguagesData();
  savePhoto();
  console.log('cvData = ', cvData); // для теста
}

document.getElementById('save-aboutme')?.addEventListener('click', event => {
  event.preventDefault();
  saveExperienceData();
});

document.getElementById('save-education')?.addEventListener('click', event => {
  event.preventDefault();
  saveExperienceData();
});

document.getElementById('save-experience')?.addEventListener('click', event => {
  event.preventDefault();
  saveExperienceData();
});

document.getElementById('save-tech')?.addEventListener('click', event => {
  event.preventDefault();
  saveTechStackData();
});

document.getElementById('save-project')?.addEventListener('click', event => {
  event.preventDefault();
  saveProjectsData();
});

document.getElementById('save-languages')?.addEventListener('click', event => {
  event.preventDefault();
  saveLanguagesData();
});

// Функция для сбора всех данных формы
function collectFormData() {
    const data = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        position: document.getElementById('position').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        aboutMe: document.getElementById('about-me').value,
        links: [],
        education: [],
        experience: [],
        skills: [],
        languages: [],
        photo: document.querySelector('#photo-image').src
    };

    // Собираем ссылки
    document.querySelectorAll('.link-entry').forEach(entry => {
        const link = entry.querySelector('.social-link').value;
        const type = entry.querySelector('.link-type').value;
        if (link) {
            data.links.push({ url: link, type: type });
        }
    });

    // Собираем образование
    document.querySelectorAll('.education-entry').forEach(entry => {
        const edu = {
            university: entry.querySelector('.university').value,
            specialty: entry.querySelector('.specialty').value,
            startYear: entry.querySelector('.start-year').value,
            endYear: entry.querySelector('.end-year').value
        };
        if (edu.university) {
            data.education.push(edu);
        }
    });

    // Собираем опыт работы
    document.querySelectorAll('.experience-entry').forEach(entry => {
        const exp = {
            position: entry.querySelector('.position').value,
            company: entry.querySelector('.company').value,
            startDate: `${entry.querySelector('.start-month').value} ${entry.querySelector('.start-year').value}`,
            endDate: entry.querySelector('.end-year').value === 'present' ? 'По настоящее время' : 
                    `${entry.querySelector('.end-month').value} ${entry.querySelector('.end-year').value}`
        };
        if (exp.position && exp.company) {
            data.experience.push(exp);
        }
    });

    // Собираем навыки
    document.querySelectorAll('.tech-entry').forEach(entry => {
        const skill = {
            name: entry.querySelector('.tech-name').value,
            level: entry.querySelector('.tech-level').value,
            category: entry.querySelector('.tech-category').value,
            experience: entry.querySelector('.tech-experience').value
        };
        if (skill.name) {
            data.skills.push(skill);
        }
    });

    // Собираем языки
    document.querySelectorAll('.language-entry').forEach(entry => {
        const lang = {
            name: entry.querySelector('.language-name').value,
            level: entry.querySelector('.language-level').value
        };
        if (lang.name) {
            data.languages.push(lang);
        }
    });

    return data;
}

// Removing the event listener for save-all button as it's now handled in form-handler.js