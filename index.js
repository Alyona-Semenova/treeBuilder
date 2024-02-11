function getDataFromAPI() {

    const url = 'http://localhost:3010/api/services';

    return new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", function () {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();

            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                resolve(data.data);
                console.log("получил данные: ", data);
            } else {
                reject('Ошибка при загрузке данных из файла api.json');
            }

        });
    });
}


const data = getDataFromAPI().then(data => {
    const tree = buildTree(data);
    /**
     * Функция для построения дерева
     * @param {*} data 
     * @returns 
     */
    function buildTree(data) {
        let tree = document.createElement('ul');
        tree.classList.add('list')

        data.services
            .filter(service => service.head === null) // Выбираем корневые узлы
            .sort((a, b) => a.sorthead - b.sorthead) // Сортируем
            .forEach(service => {
                const listItem = document.createElement('li');

                listItem.innerHTML = service.name + " " + (service.price === 0 ? " " : service.price + "р.");
                listItem.classList.add('list-item');

                const toggleIcon = document.createElement('i');
                listItem.prepend(toggleIcon);

                if (service.node === 1) { // если это узел
                    listItem.style.cursor = 'pointer';
                    toggleIcon.classList.add("arrow-right");
                    const subtree = buildSubtree(data.services, service.id); // строим вложенное дерево
                    subtree.hidden = "hidden"; // Скрываем поддерево по умолчанию
                    listItem.appendChild(subtree); // добавляем в DOM
                }

                tree.appendChild(listItem); // добавляем в DOM
            });

        return tree;
    }

    document.body.appendChild(tree); // добавляем на страницу

    /**
     * Функция для построения поддерева
     * @param {*} services 
     * @param {*} parentId 
     * @returns 
     */
    function buildSubtree(services, parentId) {
        const subtree = document.createElement('ul');
        subtree.classList.add('list');

        services
            .filter(service => service.head === parentId)
            .sort((a, b) => a.sorthead - b.sorthead)
            .forEach(service => {
                const listItem = document.createElement('li');
                listItem.innerHTML = service.name + " " + (service.price === 0 ? " " : service.price + "р.");
                listItem.classList.add('list-item');
                const toggleIcon = document.createElement('i');
                listItem.prepend(toggleIcon);

                if (service.node === 1) {
                    toggleIcon.classList.add("arrow-right");
                    const nestedSubtree = buildSubtree(services, service.id);
                    nestedSubtree.hidden = "hidden";             // скрываем поддерево по умолчанию
                    listItem.appendChild(nestedSubtree);
                }

                subtree.appendChild(listItem);
            });

        return subtree;
    }

    let list = document.querySelector('.list'); // получаем список 

    /**
     * Обрабатываем клик по списку
     * @param {*} event 
     * @returns 
     */
    list.onclick = function (event) {
        let childrenList = event.target.querySelector('ul');

        if (!childrenList) return;

        childrenList.hidden = !childrenList.hidden;

        let icon = event.target.querySelector("i");

        if (childrenList.hidden) {
            event.target.classList.add('hide');
            event.target.classList.remove('show');

            icon.classList.remove("arrow-down");
            icon.classList.add("arrow-right");

        } else {
            event.target.classList.add('show');
            event.target.classList.remove('hide');

            icon.classList.remove("arrow-right");
            icon.classList.add("arrow-down");
        }
    }

}).catch(error => {
    console.error(error);
});



