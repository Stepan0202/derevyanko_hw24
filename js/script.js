'use strict'
/*
TODO:
1. Saving to the localStorage
*/
class Student {
    constructor(id, photo, name, secondName, age, avGrade, tel, mail, course, pay){
        this.id = id,
        this.photo = photo,
        this.name = name,
        this.secondName = secondName,
        this.age = age,
        this.avGrade = avGrade,
        this.tel = tel,
        this.mail = mail,
        this.course = course,
        this.pay = pay,
        this.debt = this.course.price - this.pay
    }
};
let students = [
    new Student(1, 'https://picsum.photos/200','John','Smith', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 },237),
    new Student(2, 'https://picsum.photos/200','Alice','Johnson', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 280),
    new Student(3, 'https://picsum.photos/200','Bob','Brown', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 250),
    new Student(4, 'https://picsum.photos/200','Eva','Davis', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 150),
    new Student(5, 'https://picsum.photos/200','Frank','Lee', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 300),
    new Student(6, 'https://picsum.photos/200','Grace','Garcia', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 200),
    new Student(7, 'https://picsum.photos/200','Hannah','Hall', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 250),
    new Student(8, 'https://picsum.photos/200','Ivy','Clark', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 300),
    new Student(9, 'https://picsum.photos/200','Jack','Lopez', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 100),
    new Student(10, 'https://picsum.photos/200','Oliver','Green', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 200),
    new Student(11, 'https://picsum.photos/200','Sophia','Evans', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 380 ),
    new Student(12, 'https://picsum.photos/200','Emma','Martinez', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 300 ),
    new Student(13, 'https://picsum.photos/200','Michael','Morales', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 250 ),
    new Student(14, 'https://picsum.photos/200','Lucas','Allen', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 380 ),
    new Student(15, 'https://picsum.photos/200','Isabella','Wright', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 320 ),
    new Student(16, 'https://picsum.photos/200','Ava','White', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 290 ),
    new Student(17, 'https://picsum.photos/200','Mia','King', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 370 ),
    new Student(18, 'https://picsum.photos/200','Noah','Baker', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Design', price: 350 }, 310 ),
    new Student(19, 'https://picsum.photos/200','Liam','Parker', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Marketing', price: 300 }, 280 ),
    new Student(20, 'https://picsum.photos/200','Sophia','Young', 20, 97.6, '+380661236549', 'studentMail@mail.com',{ name: 'Programming', price: 400 }, 380 ),
];
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
studentsTable.addEventListener('click')


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

                    setAttributes(img, ['src', 'alt', 'title'], [controlEl.icon, controlEl.description, controlEl.name]);
                    
                })
            }
        }

    })
    
}
function makeStudentCard(){

}
function setAttributes(element, attributes, values){
    attributes.forEach((attr, index) => {
        element.setAttribute(attr, values[index]);
    })
}
updateTable();
toggleMainContainer("#students")