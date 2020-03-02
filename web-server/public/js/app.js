console.log("This is app.js")//This is client side JS which is gng to run in the browser.



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg = document.querySelector('#msg-1');
msg.textContent="From JS";

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();//This method will prevent browser from refreshing if we submit button.
    //Its going to prevent default behaviour which is to refresh the browser allowing the server to render a new page.
    const location = search.value;
    fetch("/weather?address=!"+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data);
            console.log(data.location);
        }
        
    })//This is going to run when json data has arrived.
})
    console.log(location);

})//function is gng to call every single time form is submitted.

