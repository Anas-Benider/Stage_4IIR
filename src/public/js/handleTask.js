function showEmployeeConsultDiv(){
    const divElement = document.getElementById('consultation_employee');
    divElement.classList.toggle('hidden')
}

function clearTable(tableId) {
    let table = document.getElementById(tableId);
    let rowCount = table.rows.length;
    
    for (var i = rowCount - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}

function makeRow(lastName, firstName, departement, btn)
{
    return `<tr><td>${lastName}</td><td>${firstName}</td><td>${departement}</td><td>${btn}</td></tr>`
}
  

function setEmployeesData(task, tableId)
{
    clearTable(tableId)
    let table = document.getElementById(tableId);
    const taskId = task.id;
    task.employees.map((emp)=>{
        table.insertAdjacentHTML('beforeend', makeRow(emp.user.lastName,emp.user.firstName,'-------',
            '<form method="post" action="/task/removeEmployee"><input class="hidden" type="text" name="taskId" value="'+taskId+'"/><input class="hidden" type="text" name="employeeMatricule" value="'+emp.matricule+'"/><button type="submit" class="btn btn-error btn-outline hover:!text-white btn-xs">Retirer</button></form>'
        ));

    })

    showEmployeeConsultDiv();
}
