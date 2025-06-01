const TEST_DATA = {
    personal: {
        fullName: "Смирнова Анна",
        position: "Frontend Developer",
        email: "anna.smirnova@example.com",
        phone: "+7 (999) 123-45-67",
        location: "Москва, Россия"
    },
    links: [
        { url: "http://github.com/annasmirnova", type: "GitHub" },
        { url: "http://linkedin.com/in/annasmirnova", type: "LinkedIn" },
        { url: "http://annasmirnova.dev", type: "Portfolio" }
    ],
    about: "Опытный Frontend-разработчик с более чем 5-летним стажем в создании современных веб-приложений. Специализируюсь на React.js и TypeScript. Имею опыт работы с различными UI-библиотеками и фреймворками.",
    projects: [
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
    ],
    experience: [
        {
            company: "Tech Solutions",
            position: "Senior Frontend Developer",
            startDate: "2021-03",
            endDate: "present",
            description: "Разработка и поддержка крупных веб-приложений на React.js. Внедрение TypeScript и оптимизация производительности."
        },
        {
            company: "Digital Agency",
            position: "Frontend Developer",
            startDate: "2018-06",
            endDate: "2021-02",
            description: "Создание адаптивных веб-интерфейсов. Работа с REST API и state management."
        },
        {
            company: "StartUp Inc",
            position: "Junior Developer",
            startDate: "2016-09",
            endDate: "2018-05",
            description: "Разработка пользовательских интерфейсов и поддержка существующих проектов."
        }
    ],
    education: [
        {
            institution: "Московский Технический Университет",
            degree: "Магистр компьютерных наук",
            startDate: "2014",
            endDate: "2016",
            description: "Специализация в области веб-разработки и информационных технологий."
        },
        {
            institution: "Московский Технический Университет",
            degree: "Бакалавр информационных технологий",
            startDate: "2010",
            endDate: "2014",
            description: "Изучение основ программирования, алгоритмов и структур данных."
        }
    ],
    skills: [
        { skill: "React.js" },
        { skill: "TypeScript" },
        { skill: "JavaScript" },
        { skill: "HTML5/CSS3" },
        { skill: "Redux" },
        { skill: "Node.js" },
        { skill: "Git" },
        { skill: "Webpack" }
    ],
    languages: [
        { language: "Русский", level: "Родной" },
        { language: "English", level: "C1 - Advanced" },
        { language: "German", level: "A2 - Basic" }
    ]
}; 