window.onload = function() {
    const dropZone = document.getElementById("drop-zone");

    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }

    function handleFileSelect(event) {
        let files = event.dataTransfer.files;
        let reader = new FileReader();

        event.stopPropagation();
        event.preventDefault();
        reader.onload = function(event) {            
            dropZone.textContent = event.target.result;
        }        
        reader.readAsText(files[0], "UTF-8");
    }  
}