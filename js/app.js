let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function register() {
    const name = regName.value;
    const email = regEmail.value;
    const pass = regPass.value;

    localStorage.setItem("user", JSON.stringify({name,email,pass}));
    alert("Registered!");
    window.location.href="login.html";
}

function login() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.email===logEmail.value && user.pass===logPass.value){
        localStorage.setItem("loggedIn","true");
        window.location.href="dashboard.html";
    } else alert("Invalid login");
}

function logout(){
    localStorage.removeItem("loggedIn");
    window.location.href="index.html";
}

function loadDashboard(){
    if(!localStorage.getItem("loggedIn")) window.location.href="login.html";
    updateUI();
}

function addTransaction(){
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    transactions.push({desc,amount});
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateUI();
}

function updateUI(){
    let income=0,expense=0;
    transactions.forEach(t=>{
        if(t.amount>0) income+=t.amount;
        else expense+=t.amount;
    });

    if(document.getElementById("income")){
        income.textContent=income;
        document.getElementById("expense").textContent=expense;
        document.getElementById("balance").textContent=income+expense;
    }

    if(document.getElementById("chart")){
        new Chart(document.getElementById("chart"),{
            type:"bar",
            data:{
                labels:["Income","Expense"],
                datasets:[{data:[income,Math.abs(expense)]}]
            }
        });
    }

    generateAIAdvice(income,expense);
}

function generateAIAdvice(income,expense){
    let advice="";
    if(income===0) advice="Add income to start tracking.";
    else if(Math.abs(expense)>income) advice="⚠ Overspending!";
    else advice="🔥 Good financial balance!";
    if(document.getElementById("aiAdvice"))
        document.getElementById("aiAdvice").textContent=advice;
}

function loadProfile(){
    const user=JSON.parse(localStorage.getItem("user"));
    if(user){
        pName.textContent=user.name;
        pEmail.textContent=user.email;
    }
}
