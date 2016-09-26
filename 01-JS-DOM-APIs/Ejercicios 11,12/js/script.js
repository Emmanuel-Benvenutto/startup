window.onload = function() {
    createTable([["1", "2","3"], ["4", "5","6"], ["7", "8","9"], ["10", "11","12"]]); 
}

function createTable(matrix) {
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');

    table.className = "matrix-Table";

    matrix.forEach(function(rowData) { 
        const row = document.createElement('tr');

        row.className = "matrix-Table--row";

        rowData.forEach(function(cellData) {
            const cell = document.createElement('td');

            cell.className = "matrix-Table--row2";

            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
    document.body.appendChild(table);
}