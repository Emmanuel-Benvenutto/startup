window.onload = function() {
    const saveButtonLs = document.getElementById("save-ls");
    const textContentLs = document.getElementById("content-ls");
    const clearButtonLs = document.getElementById("clear-ls");
    const saveButtonIndex = document.getElementById("save-index");
    const textContentIndex = document.getElementById("content-index");
    const clearButtonIndex = document.getElementById("clear-index");

    saveButtonLs.onclick = function () {
        localStorage.setItem("TextBox-Content", textContentLs.value);       //Local Storage
        console.log(localStorage.getItem("TextBox-Content"));
    }

    clearButtonLs.onclick = function () {
        localStorage.removeItem("TextBox-Content");
    }

//-------------------------------------------------------------------

    saveButtonIndex.onclick = function () {                             //IndexDB
        startIndexDB();
    }

    clearButtonIndex.onclick = function () {
        deleteIndexDB();
    }

    function deleteIndexDB () {        
        let textDelete = db.transaction(["TextArea"], "readwrite").objectStore("TextArea");

        textDelete.delete("TextArea");
        console.log("Text deleted")
    }

    function startIndexDB() {
        let db;

        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        if (!window.indexedDB) {
            window.alert("Su navegador no soporta una versión estable de indexedDB.");
        }
        else {
            createIndexDB();
        }
    }

    function createIndexDB() {
        let request = window.indexedDB.open("database", 6);

        request.onerror = function(event) {
            console.log(`Error: ${event.data}`);
        };

        request.onupgradeneeded = function(event) {
            let thisDB = event.target.result;

            if (!thisDB.objectStoreNames.contains("TextArea")) {
                thisDB.createObjectStore("TextArea");
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            startTransactionAdd();    
        };

        function startTransactionAdd() {
            let text = textContentIndex.value;
            let transaction = db.transaction(["TextArea"], "readwrite").objectStore("TextArea");
            let textAdd = transaction.put(text, "TextArea");

            textAdd.onerror = function(event) {
                console.log("Error", event.target.error.name);
            }
         
            textAdd.onsuccess = function(event) {
                console.log("Text saved");
            }
        }
    }
}