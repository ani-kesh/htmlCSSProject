window.onload = function loadOperations(){
    let url = window.location.search;
    const params = new URLSearchParams(url);
    let parameters = {};
    for(var pair of params.entries()) {
        parameters[pair[0]] = pair[1];
    }
    if(parameters.hasOwnProperty("id")){
        document.getElementById("item-container").innerText = parameters["id"];
    }
}