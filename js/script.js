'use strict'
class Student {
    constructor(id, name, secondName, course, pay){
        this.id = id,
        this.name = name,
        this.secondName = secondName,
        this.course = course,
        this.pay = pay,
        this.debt = this.course.price - this.pay
        console.log
    }
};
let students = [
    new Student(1,  'John','Smith',{ name: 'Marketing', price: 300 },237),
    new Student(2,  'Alice','Johnson',{ name: 'Programming', price: 400 }, 280),
    new Student(3,  'Bob','Brown',{ name: 'Design', price: 350 }, 250),
    new Student(4,  'Eva','Davis',{ name: 'Marketing', price: 300 }, 150),
    new Student(5,  'Frank','Lee',{ name: 'Programming', price: 400 }, 300),
    new Student(6,  'Grace','Garcia',{ name: 'Design', price: 350 }, 200),
    new Student(7,  'Hannah','Hall',{ name: 'Marketing', price: 300 }, 250),
    new Student(8,  'Ivy','Clark',{ name: 'Programming', price: 400 }, 300),
    new Student(9,  'Jack','Lopez',{ name: 'Design', price: 350 }, 100),
    new Student(10, 'Oliver','Green',{ name: 'Marketing', price: 300 }, 200),
    new Student(11, 'Sophia','Evans',{ name: 'Programming', price: 400 }, 380 ),
    new Student(12, 'Emma','Martinez',{ name: 'Design', price: 350 }, 300 ),
    new Student(13, 'Michael','Morales',{ name: 'Marketing', price: 300 }, 250 ),
    new Student(14, 'Lucas','Allen',{ name: 'Programming', price: 400 }, 380 ),
    new Student(15, 'Isabella','Wright',{ name: 'Design', price: 350 }, 320 ),
    new Student(16, 'Ava','White',{ name: 'Marketing', price: 300 }, 290 ),
    new Student(17, 'Mia','King',{ name: 'Programming', price: 400 }, 370 ),
    new Student(18, 'Noah','Baker',{ name: 'Design', price: 350 }, 310 ),
    new Student(19, 'Liam','Parker',{ name: 'Marketing', price: 300 }, 280 ),
    new Student(20, 'Sophia','Young',{ name: 'Programming', price: 400 }, 380 ),
];
const pages = {
    main: document.querySelector('#main'),
    students: document.querySelector('#students'),
}

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
            const cell = document.createElement('td');
            row.appendChild(cell);
            cell.dataset.key = keys[i];
            cell.innerHTML = student[keys[i]];
            if (student[keys[i]] instanceof Object) cell.innerHTML = student[keys[i]].name
        }
    })

}
updateTable();
toggleMainContainer("#students")