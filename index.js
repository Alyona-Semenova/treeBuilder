// получаем данные с апи 
function getDataFromAPI() {
    return {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100.0,
                "sorthead": 20
            },
            {
                "id": 2,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 25,
                "head": 1,
                "name": "ТЕСТ",
                "node": 0,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 26,
                "head": 1,
                "name": "ТЕСТ",
                "node": 0,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 3,
                "head": 2,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 10
            },
            {
                "id": 4,
                "head": 3,
                "name": "Удаление зуба",
                "node": 0,
                "price": 800.0,
                "sorthead": 10
            },
            {
                "id": 5,
                "head": 3,
                "name": "Удаление 8ого зуба",
                "node": 0,
                "price": 1000.0,
                "sorthead": 30
            },
            {
                "id": 6,
                "head": 3,
                "name": "Удаление осколка зуба",
                "node": 0,
                "price": 2000.0,
                "sorthead": 20
            },
            {
                "id": 7,
                "head": 2,
                "name": "Хирургические вмешательство",
                "node": 0,
                "price": 200.0,
                "sorthead": 10
            },
            {
                "id": 8,
                "head": 2,
                "name": "Имплантация зубов",
                "node": 1,
                "price": 0.0,
                "sorthead": 20
            },
            {
                "id": 9,
                "head": 8,
                "name": "Коронка",
                "node": 0,
                "price": 3000.0,
                "sorthead": 10
            },
            {
                "id": 10,
                "head": 8,
                "name": "Слепок челюсти",
                "node": 0,
                "price": 500.0,
                "sorthead": 20
            },
        ]
    }
    ;
}

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
        
            listItem.innerHTML =  service.name + " " + (service.price === 0 ? " " : service.price + "р.");
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
            listItem.innerHTML =  service.name + " " + (service.price === 0 ? " " : service.price + "р.");
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




const data = getDataFromAPI(); // получаем данные с апи

const tree = buildTree(data);    // строим дерево
document.body.appendChild(tree); // добавляем на страницу

let list = document.querySelector('.list'); // получаем список 

/**
 * Обрабатываем клик по списку
 * @param {*} event 
 * @returns 
 */
list.onclick = function(event) {
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


