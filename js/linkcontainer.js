document.querySelector('.add-link').addEventListener('click', function() {
    const linkContainer = document.getElementById('link-container');
    
    const newLinkField = document.createElement('input');
    newLinkField.type = 'url';
    newLinkField.name = 'links';
    newLinkField.placeholder = 'Введите еще одну ссылку на профиль';

    linkContainer.appendChild(newLinkField);
});