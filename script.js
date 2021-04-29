var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var itemTable = document.getElementById("itemtable");
var submitBtn = document.getElementById("submitBtn");
var alert1 = document.getElementById("alert1");
var alert2 = document.getElementById("alert2");
var currentIndex;


var itemsContainer;


// helper functions
function updateLocalStorage(){
    return localStorage.setItem("BookmarkList", JSON.stringify(itemsContainer));
}

function clearInput(){
    siteName.value = "";
    siteUrl.value = "";
}

function validateName(){

    var regex = /^[A-Z][a-z]+$/;
    if(regex.test(siteName.value) == true){
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
        removeAlert();
        return true;
    }else{
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');
       nameAlert();
        return false;
    }
}
siteName.addEventListener('keyup',validateName);

function validateUrl(){
    var regex = /^https?:\/\/w{3}\.[a-zA-Z0-9]+\.[a-zA-Z]{3}(\.[a-zA-Z]{2,3})?(\/[a-zA-Z]+)?$/;
    if(regex.test(siteUrl.value) == true){
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
        removeAlert();
        return true;
    }else{
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove('is-valid');
        urlAlert();
        return false;
    }
}
siteUrl.addEventListener('keyup',validateUrl)

function voidInputAlerts(){
    if(siteName.value == "" && siteUrl.value == ""){
        nameAlert(); 
        urlAlert();
    }
    else if(siteName.value == ""){
        nameAlert(); 
    }
    else if(siteUrl.value == ""){
        urlAlert();
    }
}

function nameAlert(){
    alert1.classList.replace('d-none','d-block');
}

function urlAlert(){
    alert2.classList.replace('d-none','d-block');
}

function removeAlert(){
    alert1.classList.replace('d-block','d-none');
    alert2.classList.replace('d-block','d-none');
}
// end helper functions

if(localStorage.getItem("BookmarkList") == null){
    itemsContainer = [];
}else{
    itemsContainer = JSON.parse(localStorage.getItem("BookmarkList"));
    displayItem();
}

function addItems(){
    if(submitBtn.innerHTML == "Submit"){
        if(validateName() && validateUrl()){
                removeAlert();
                var item = {
                    name: siteName.value,
                    url: siteUrl.value
                }
                itemsContainer.push(item);
            
                displayItem();
                updateLocalStorage();
                clearInput();
                siteUrl.classList.remove('is-valid');
                siteName.classList.remove('is-valid');
        
            }else{
                return voidInputAlerts();
            }
       

    }else if(submitBtn.innerHTML == "update"){
        if(validateName() && validateUrl()){
            removeAlert();
            changeItemAfterUpdate(currentIndex);
            siteUrl.classList.remove('is-valid');
            siteName.classList.remove('is-valid');
        }else{
            voidInputAlerts();
        }
    }
    
}

submitBtn.addEventListener('click', addItems);


function displayItem(){
    
        var container = ``;
        for(var i = 0; i < itemsContainer.length ; i++){
            container += `
            <div class="py-5 w-25 bg-row">
                <h3 class="pl-3">${itemsContainer[i].name}</h3>
            </div>
            <div class="py-5 w-75 bg-row">
                <a href="${itemsContainer[i].url}" class="btn btn-primary" target="_blank">Visit</a>
                <button class="btn btn-warning" onclick="updateItem(${i})">update</button>
                <button class="btn btn-danger" onclick="deleteItem(${i})">delete</button>
            </div>`
        }
        itemTable.innerHTML = container;
    
   
}

function deleteItem(index){
    itemsContainer.splice(index,1);
    updateLocalStorage();
    displayItem();
}

function updateItem(index){
    currentIndex = index;
    siteName.value = itemsContainer[index].name;
    siteUrl.value = itemsContainer[index].url;
    
    submitBtn.innerHTML = "update";
}

function changeItemAfterUpdate(currentIndex){
    var newitem = {
        name: siteName.value,
        url: siteUrl.value
    }
    itemsContainer.splice(currentIndex,1,newitem);
    updateLocalStorage();
    displayItem();
    clearInput();
    submitBtn.innerHTML = "Submit";
}

