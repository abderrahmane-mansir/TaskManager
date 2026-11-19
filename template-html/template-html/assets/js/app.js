document.addEventListener('DOMContentLoaded', () => {
    // Mise à jour de l’année dans le pied de page.
    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();

    const list = document.querySelector('#task-list');
    if (!list) return;

    const tasks = [...list.querySelectorAll('.task')];
    const search = document.querySelector('#search');
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const result = document.querySelector('#result-count');
    const empty = document.querySelector('#empty-message');
    let activeFilter = 'all';

    function applyFilters() {
        const query = search.value.trim().toLocaleLowerCase('fr');
        let visible = 0;
        tasks.forEach((task) => {
            const matchesText = task.dataset.title.toLocaleLowerCase('fr').includes(query);
            const matchesStatus = activeFilter === 'all' || task.dataset.status === activeFilter;
            task.hidden = !(matchesText && matchesStatus);
            if (!task.hidden) visible++;
        });
        result.textContent = `${visible} tâche(s) affichée(s)`;
        empty.hidden = visible !== 0;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter;
            buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
            applyFilters();
        });
    });
    search.addEventListener('input', applyFilters);
    applyFilters();
});
