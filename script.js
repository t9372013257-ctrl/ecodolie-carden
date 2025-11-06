// Базовые данные растений
const plants = [
    { name: "Гортензии", planted: "2020-2022", care: "Полив 2 раза в неделю, подкормка весной" },
    { name: "Туи", planted: "2020-2022", care: "Обрезка 2 раза в год, умеренный полив" },
    { name: "Ель", planted: "2020-2022", care: "Не требует особого ухода" },
    { name: "Хосты", planted: "2020-2022", care: "Полив по мере высыхания, деление каждые 3-4 года" },
    { name: "Акация", planted: "2020-2022", care: "Засухоустойчива, обрезка весной" },
    { name: "Куст ивы", planted: "2020-2022", care: "Обильный полив, формирующая обрезка" },
    { name: "Розы", planted: "2020-2022", care: "Регулярный полив, подкормка, укрытие на зиму" },
    { name: "Лаванда", planted: "2020-2022", care: "Минимальный полив, солнечное место" },
    { name: "Пузыреплодник", planted: "2020-2022", care: "Неприхотлив, обрезка весной" },
    { name: "Лапчатка", planted: "2020-2022", care: "Умеренный полив, цветет все лето" },
    { name: "Пион", planted: "2020-2022", care: "Глубокий полив, подкормка весной" }
];

// Календарь ухода для Самарской области
const careCalendar = {
    "Весна": ["Обрезка роз", "Подкормка всех растений", "Посадка новых растений"],
    "Лето": ["Регулярный полив", "Прополка", "Обработка от вредителей"],
    "Осень": ["Уборка листьев", "Укрытие роз на зиму", "Последняя подкормка"],
    "Зима": ["Планирование сада", "Заказ семян", "Ремонт инструментов"]
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadPlants();
    loadCalendar();
    loadDiaryEntries();
    setupDiaryForm();
});

function loadPlants() {
    const grid = document.querySelector('.plants-grid');
    grid.innerHTML = '';
    
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <h3>${plant.name}</h3>
            <p>Посажены: ${plant.planted}</p>
            <p>${plant.care}</p>
        `;
        grid.appendChild(card);
    });
}

function loadCalendar() {
    const container = document.getElementById('calendar-container');
    let html = '';
    
    for (const [season, tasks] of Object.entries(careCalendar)) {
        html += `
            <div class="season-section">
                <h3>${season}</h3>
                <ul>
                    ${tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function setupDiaryForm() {
    const form = document.getElementById('diary-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const textarea = this.querySelector('textarea');
        const dateInput = this.querySelector('input[type="date"]');
        
        addDiaryEntry(textarea.value, dateInput.value);
        textarea.value = '';
        dateInput.value = new Date().toISOString().split('T')[0];
    });
}

function addDiaryEntry(text, date) {
    const entries = getDiaryEntries();
    entries.unshift({ text, date, id: Date.now() });
    localStorage.setItem('gardenDiary', JSON.stringify(entries));
    loadDiaryEntries();
}

function getDiaryEntries() {
    return JSON.parse(localStorage.getItem('gardenDiary') || '[]');
}

function loadDiaryEntries() {
    const container = document.getElementById('diary-entries');
    const entries = getDiaryEntries();
    
    container.innerHTML = entries.map(entry => `
        <div class="diary-entry">
            <small>${entry.date}</small>
            <p>${entry.text}</p>
        </div>
    `).join('');
}
