window.onload = function(){
    createTable([["1", "2","3"], ["4", "5","6"], ["7", "8","9"], ["10", "11","12"]]); 
}

function createTable(matrix) {
    var table = document.createElement('table');
    table.className = "matrixTable";
    var body = document.createElement('tbody');

    matrix.forEach(function(rowData) { 
        var row = document.createElement('tr');
        row.className = "matrixTable--row";

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.className = "matrixTable--row2";

            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });
        body.appendChild(row);
    });
table.appendChild(body);
document.body.appendChild(table);
}


