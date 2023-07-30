'use strict'
/*
TODO FROM HOMEWORK:
    Створити CRUD-додаток (Create, Read, Update, Delete):

    Виводиться список користувачів із кнопками “Edit”, “Remove”, “View” біля кожного користувача (use data-id attributes або event delegation)
    список користувачів отримувати з js-файлу (масив об'єктів / використовувати функції-конструктори – за бажанням)

    При натисканні на кнопку “View” відкриваються дані користувача у блоці під списком
    При натисканні на кнопку “Edit” з'являється можливість редагувати дані в блоці під списком. Дані зберігаються при натисканні на кнопку “Save” та оновлюють дані у списку

    При натисканні на кнопку “Remove” користувач видаляється зі списку
    Обов'язково підтвердження видалення (для уникнення видалення помилково)
    Реалізувати можливість додавання нових користувачів
    Бажано перевикористовувати форму редагування
    При додаванні користувач з'являється у списку
    Після перезавантаження сторінки всі зміни повинні зберігатись (використовувати localStorage)

MY OWN TODO:
    2. Courses array
    3. editing course field in student card — dropdown menu
    4. Automatically recounting of debt
*/
window.onload = () => {
    updateTable();
    toggleMainContainer("#home");
    updateStats(); 
}

let maxStudentID = 0;
class Student {
    constructor(id, name, secondName, age, avGrade, course, pay){
        this.id = id,
        this.photo = `https://picsum.photos/id/${this.id}/200`,
        this.name = name,
        this.secondName = secondName,
        this.age = age,
        this.avGrade = avGrade,
        this.tel = `+38(063)${this.id}${this.id*2}${this.id+3}2356`,
        this.mail = `${this.name}_${this.secondName}@college.ua`,
        this.course = course,
        this.pay = pay,
        this.debt = this.countDebt(),
        this.card = this.makeStudentCard();

        if (this.id > maxStudentID) maxStudentID = this.id;
    }
    makeStudentCard(){
        this.card = `
        <div class="card" style="width: 18rem;">
            <img src="${this.photo}" class="card-img-top" alt="Student avatar">
            <div class="card-body">
                <h5 class="card-title">${this.name} ${this.secondName}</h5>
                    <div class="container">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${this.id}</li>
                            <li class="list-group-item">Age: <span data-edit="age">${this.age}</span></li>
                            <li class="list-group-item">Average grade: <span data-edit="avGrade">${this.avGrade}</span></li>
                            <li class="list-group-item">Phone: <span data-edit="tel">${this.tel}</span></li>
                            <li class="list-group-item">Mail: <span data-edit="mail">${this.mail}</span></li>
                            <li class="list-group-item">Course: <span data-edit="course">${this.course.name}</span></li>
                            <li class="list-group-item">Pay: <span data-edit="pay">${this.pay}</span></li>
                            <li class="list-group-item">Debt: <span data-edit="debt">${this.debt}</span></li>
                        </ul>
                    </div>
            </div>
        </div>
        `;
        return this.card;
    }
    countDebt(){
        this.debt = this.course.price - this.pay;
        return this.debt;
    }
};

let students = getStudentsFromLS();
const courses = [
    { name: "Marketing", price: 300 },
    { name: 'Programming', price: 400 },
    { name: 'Design', price: 350 }
]
const pages = {
    main: document.querySelector('#main'),
    students: document.querySelector('#students'),
}
const controls = [
    {
        name: 'view',
        description: 'View object data',
        icon: './img/icon/table-icon_view.svg',
    },
    {
        name: 'edit',
        description: 'Edit object data',
        icon: './img/icon/table-icon_edit.svg',
    },
    {
        name: 'delete',
        description: 'Delete object data',
        icon: './img/icon/table-icon_delete.svg',
    }
]


const studentsTable = document.querySelector('#students table');
const main = document.querySelector('#main');
const details = document.querySelector('#details');
const navigation = document.querySelector('#navigation');
const addStudentBtn = document.querySelector('#addStudentBtn');
const stats = document.querySelector('#stats');
studentsTable.addEventListener('click', enableControl);
navigation.addEventListener('click', e => toggleMainContainer(e.target.dataset.toggle));
addStudentBtn.addEventListener('click', initForm);

function toggleMainContainer(classOrID){
    const childrens = pages.main.children;
    for(let i = 0; i < childrens.length; i++){
        childrens[i].classList.add('d-none');
    }
    try{
        document.querySelector(classOrID).classList.remove('d-none');
    }
    catch(err){
        console.dir(err);
    }

}
function enableControl(e){
    const button = e.target;
    const buttonType = button.dataset.buttonType;
    const id = button.dataset.buttonId;
        switch(buttonType){
            case 'view':
                viewMoreInfo(id);
                break;
            case 'edit':
                editStudent(id);
                break;
            case 'delete':
                deleteStudent(id);
                break;
        }
    
}
function editStudent(rowID){
    const card = viewMoreInfo(rowID);
    const cardFields = card.querySelectorAll('[data-edit]');
    const cardFieldsCopy = [];
    //creating and adding buttons
    const buttonContainer = document.createElement('div');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const student = students.filter(student => {return student.id == rowID})[0];

    buttonContainer.classList.add('d-grid', 'gap-2', 'd-md-block', 'mx-auto', 'mb-3');
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    saveButton.classList.add('btn', 'btn-primary', 'text-white');
    saveButton.innerHTML = "SAVE";

    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.innerHTML = "CANCEL";

    card.appendChild(buttonContainer);

    //adding functions to buttons
    saveButton.addEventListener('click', () => {
        cardFields.forEach(field => {
            student[field.dataset.edit] = field.innerHTML;
        });
        let tempSt = new Student(20,'Not set','Not set', 'Not set', 'Not set','Not set', 'Not set' );
        console.dir(student)
        tempSt.makeStudentCard.call(student);
        tempSt.countDebt.call(student);
        updateTable();
        updateLS('students', students);
        updateStats();

    });
    cancelButton.addEventListener('click', () => {
        cardFields.forEach((field, index) => field.innerHTML = cardFieldsCopy[index].innerHTML);
    });
    
    //making fields editable;
    cardFields.forEach(field => {
        cardFieldsCopy.push(field.cloneNode(true));
        field.contentEditable = "true";
        field.classList.add('border', 'border-success', 'rounded', 'p-1', 'd-block');
    })


    
}
function initForm(){
     toggleMainContainer("#addStudent");
     const studentForm = document.querySelector("#addStudent form")
     studentForm.addEventListener('submit', addStudent);      
}
function addStudent(e){
    e.preventDefault();
    const student = new Student(20,'Not set','Not set', 'Not set', 'Not set','Not set', 'Not set' );
    const form = e.target;

    for(let i = 0; i < form.length; i++){
        student[form[i].id] = form[i].value
        if(form[i].id == 'course') student[form[i].id] = courses[form[i].value];
    }
    maxStudentID++;
    student.id =  maxStudentID;
    student.countDebt();
    student.makeStudentCard();
    students.push(student);
    updateTable();
    updateLS('students', students);
    updateStats();
    toggleMainContainer('#students');
    alert("Student added successfully!")

}
function deleteStudent(id){
    const confirmed = confirm("Are you sure you want to delete student from the base?");
    if(confirmed){
        students = students.filter(student => student.id != id);
        updateTable();
        updateLS('students', students);
        updateStats();
    }
}

function viewMoreInfo(id){
    details.innerHTML = '';
    details.style.display = 'block';
    main.classList.remove('col-10');
    main.classList.add('col-7');
    const student = students.filter(student => {return student.id == id})[0];
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = student.card;
    const card = tempDiv.firstElementChild;
    const close = document.createElement('button');
    close.classList.add('btn-close', 'mb-3', 'bg-primary');
    close.addEventListener('click', () => {
        details.style.display = 'none';
        main.classList.add('col-10');
        main.classList.remove('col-7');
    })
    details.style.left = "0px";
    details.appendChild(close);
    details.appendChild(card);
    return card;
}

function getStudentsFromLS(){
    if(localStorage.students){
        return JSON.parse(localStorage.students)
    }
    return [
        new Student(1, 'John','Smith', 20, 97.6,{ name: 'Marketing', price: 300 },237),
        new Student(2, 'Alice','Johnson', 20, 97.6,{ name: 'Programming', price: 400 }, 280),
        new Student(3, 'Bob','Brown', 20, 97.6,{ name: 'Design', price: 350 }, 250),
        new Student(4, 'Eva','Davis', 20, 97.6,{ name: 'Marketing', price: 300 }, 150),
        new Student(5, 'Frank','Lee', 20, 97.6,{ name: 'Programming', price: 400 }, 300),
        new Student(6, 'Grace','Garcia', 20, 97.6,{ name: 'Design', price: 350 }, 200),
        new Student(7, 'Hannah','Hall', 20, 97.6,{ name: 'Marketing', price: 300 }, 250),
        new Student(8, 'Ivy','Clark', 20, 97.6,{ name: 'Programming', price: 400 }, 300),
        new Student(9, 'Jack','Lopez', 20, 97.6,{ name: 'Design', price: 350 }, 100),
        new Student(10,'Oliver','Green', 20, 97.6,{ name: 'Marketing', price: 300 }, 200),
        new Student(11,'Sophia','Evans', 20, 97.6,{ name: 'Programming', price: 400 }, 380 ),
        new Student(12,'Emma','Martinez', 20, 97.6,{ name: 'Design', price: 350 }, 300 ),
        new Student(13,'Michael','Morales', 20, 97.6,{ name: 'Marketing', price: 300 }, 250 ),
        new Student(14,'Lucas','Allen', 20, 97.6,{ name: 'Programming', price: 400 }, 380 ),
        new Student(15,'Isabella','Wright', 20, 97.6,{ name: 'Design', price: 350 }, 320 ),
        new Student(16,'Ava','White', 20, 97.6,{ name: 'Marketing', price: 300 }, 290 ),
        new Student(17,'Mia','King', 20, 97.6,{ name: 'Programming', price: 400 }, 370 ),
        new Student(18,'Noah','Baker', 20, 97.6,{ name: 'Design', price: 350 }, 310 ),
        new Student(19,'Liam','Parker', 20, 97.6,{ name: 'Marketing', price: 300 }, 280 ),
        new Student(20,'Sophia','Young', 20, 97.6,{ name: 'Programming', price: 400 }, 380 ),
    ];
    
}

//updating
function updateLS(key, value){
    const JSONvalue = JSON.stringify(value);
    localStorage.setItem(key, JSONvalue);
}
function updateTable(){
    const table = pages.students.querySelector('table');
    let tBody = table.querySelector('tbody');
    if (tBody) tBody.innerHTML = '';
    else {
        tBody = document.createElement('tBody');
        table.appendChild(tBody);
    }
    const keys = [...table.querySelectorAll('th')].map(header => {
        return header.dataset.key;
    }); 
    students.forEach(student => {
        const row = document.createElement('tr');
        tBody.appendChild(row);
        for (let i = 0; i < Object.keys(student).length; i++) {
            if(keys[i] && student[keys[i]]){
                const cell = document.createElement('td');
                row.appendChild(cell);
                cell.dataset.key = keys[i];
                cell.innerHTML = student[keys[i]];
                if (student[keys[i]] instanceof Object) cell.innerHTML = student[keys[i]].name
            }
            else if(keys[i] === 'controls'){
                const containerCell = document.createElement('td');
                row.appendChild(containerCell);
                controls.forEach(controlEl => {
                    const cell = document.createElement('div');
                    const button = document.createElement('button');
                    const img = document.createElement('img');
                    
                    button.appendChild(img);
                    button.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
                    setAttributes(button, ['data-button-type', 'data-button-id'], [controlEl.name, student.id]);

                    cell.append(button);
                    cell.style.display = "inline-block";
                    containerCell.appendChild(cell);

                    setAttributes(img, ['src', 'alt', 'title', 'data-button-type', 'data-button-id'], [controlEl.icon, controlEl.description, controlEl.name, controlEl.name, student.id]);
                    
                })
            }
        }

    })
    
}
function updateStats(){
    const studentsCount = stats.querySelector('[data-cardName="students"] .statisticCard_data');
    const income = stats.querySelector('[data-cardName="income"] .statisticCard_data');
    const studentsDebt = stats.querySelector('[data-cardName="debt"] .statisticCard_data');

    studentsCount.innerHTML = students.length;
    
    let incomeSum = 0;
    let debtSum = 0;
    students.forEach(student => {
        incomeSum += parseInt(student.pay);
        debtSum += parseInt(student.debt);
    })
    income.innerHTML = incomeSum;
    studentsDebt.innerHTML = debtSum;
}

//helpfull
function getRowByID(id){
    const cells = document.querySelectorAll('[data-key="id"]');
    let cell;
    cells.forEach(el => {if(el.innerHTML == id) cell = el})
    console.log(cell.parentNode);
}
function setAttributes(element, attributes, values){
    attributes.forEach((attr, index) => {
        element.setAttribute(attr, values[index]);
    })
}