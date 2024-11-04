function validateForm() {
    const namePattern = /^[А-ЯІЇЄҐ][а-яіїєґ]{1,20} [А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    const facultyPattern = /.+/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const name = document.getElementById('name').value.trim();
    const faculty = document.getElementById('faculty').value.trim();
    const birthDate = document.getElementById('birthDate').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();

    document.querySelectorAll('.input-field').forEach(input => input.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(span => span.style.display = 'none');

    let valid = true;

    if (!namePattern.test(name)) {
        document.getElementById('name').classList.add('error');
        document.getElementById('nameError').style.display = 'block';
        valid = false;
    }
    if (!facultyPattern.test(faculty)) {
        document.getElementById('faculty').classList.add('error');
        document.getElementById('facultyError').style.display = 'block';
        valid = false;
    }
    if (!birthDate) {
        document.getElementById('birthDate').classList.add('error');
        document.getElementById('birthDateError').style.display = 'block';
        valid = false;
    }
    if (!address) {
        document.getElementById('address').classList.add('error');
        document.getElementById('addressError').style.display = 'block';
        valid = false;
    }
    if (!emailPattern.test(email)) {
        document.getElementById('email').classList.add('error');
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        document.getElementById('outputName').innerText = `ПІБ: ${name}`;
        document.getElementById('outputFaculty').innerText = `Факультет: ${faculty}`;
        document.getElementById('outputBirthDate').innerText = `Дата народження: ${birthDate}`;
        document.getElementById('outputAddress').innerText = `Адреса: ${address}`;
        document.getElementById('outputEmail').innerText = `E-mail: ${email}`;
    } else {
        alert('Будь ласка, виправте помилки у вашій формі');
    }
}

let lastSelectedColor = '#000000';

function createTable() {
    const table = document.getElementById('colorTable');
    let counter = 1;

    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();

        for (let j = 0; j < 6; j++) {
            const cell = row.insertCell();
            cell.innerText = counter;
            cell.dataset.number = counter;
            counter++;
            
            cell.addEventListener('mouseover', function () {
                const variantNumber = 3;
                if (parseInt(cell.dataset.number) === variantNumber) {
                    const randomColor = getRandomColor();
                    cell.style.backgroundColor = randomColor;
                    cell.style.color = getRandomColor();
                }
            });

            cell.addEventListener('click', function () {
                const variantNumber = 3;
                if (parseInt(cell.dataset.number) === variantNumber) {
                    const colorPicker = document.getElementById('colorPicker');
                    colorPicker.click();
                    colorPicker.onchange = function() {
                        lastSelectedColor = colorPicker.value;
                        cell.style.backgroundColor = lastSelectedColor;
                        cell.style.color = '#FFFFFF';
                    };
                }
            });

            cell.addEventListener('dblclick', function () {
                const variantNumber = 3;
                if (parseInt(cell.dataset.number) === variantNumber) {
                    changeDiagonalColors(lastSelectedColor);
                }
            });
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeDiagonalColors(color) {
    const table = document.getElementById('colorTable');
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[i].style.backgroundColor = color;
        rows[i].cells[i].style.color = '#FFFFFF';
    }
}

window.onload = function() {
    createTable();
};
