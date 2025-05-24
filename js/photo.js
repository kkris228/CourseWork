document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photo-input');
    const photoImage = document.getElementById('photo-image');
    const photoError = document.getElementById('photo-error');
    const previewLabel = document.getElementById('photo-preview-label');

    photoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) {
            photoImage.style.display = 'none';
            previewLabel.textContent = 'Фото не загружено';
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            photoError.textContent = 'Неверный формат. Только .jpg и .png';
            photoError.style.display = 'block';
            photoImage.style.display = 'none';
            previewLabel.textContent = 'Фото не загружено';
            return;
        }

        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            photoError.textContent = 'Размер файла превышает 2 МБ.';
            photoError.style.display = 'block';
            photoImage.style.display = 'none';
            previewLabel.textContent = 'Фото не загружено';
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            photoImage.src = e.target.result;
            photoImage.style.display = 'block';
            photoError.style.display = 'none';
            previewLabel.textContent = 'Предпросмотр:';

            const cvPhoto = document.getElementById('cv-photo');
            if (cvPhoto) {
                cvPhoto.src = e.target.result;
                cvPhoto.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    });
});
