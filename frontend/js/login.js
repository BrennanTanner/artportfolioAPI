
var el = document.getElementById("checkoutSubmit");
el.addEventListener("click", async function(e) {
   e.preventDefault();
   console.log("hi");

   let headersList = {
      "Accept": "*/*",

     }
     
     let bodyContent = new FormData();
     bodyContent.append("username", document.getElementById("username").value);
     bodyContent.append("password", document.getElementById("password").value);
     
     let response = await fetch("https://artportfolio.onrender.com/api/login/", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.json();
    if (data.success == true){
      sessionStorage.setItem('status','loggedIn')
      
      window.location.replace("/login/index.html");
    } else {

    };
     
     
   });
   
