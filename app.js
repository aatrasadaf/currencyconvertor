const currencyFrom = document.querySelector('#currencyFrom');
const currencyTo = document.querySelector('#currencyTo');
const amountInput = document.querySelector('.amount');
const convertBtn = document.querySelector('#convert');
const resultDiv = document.querySelector('.result');
const canvasChart = document.querySelector('#canvas');
const placeholderImage = document.querySelector('.placeholderimage');
const selects = document.querySelectorAll('select');

let currencyChart;

resultDiv.style.display='none';

convertBtn.addEventListener("click",(e) => {

    e.preventDefault();
    const rawAmount = amountInput.value;
    const from = currencyFrom.value;
    const to = currencyTo.value;

     if(from===''||to===''){
        alert('Please select both currencies');
       
        if(currencyChart){
           currencyChart.destroy();
           currencyChart=null;
        }
    }
    
    if(rawAmount.trim()===''){
        alert('Enter an amount');
        return;
    }
    const amount = Number(rawAmount);

    if(amount<=0 || isNaN(amount) ){
        alert('Enter a valid number');
        return;
    }
     if(from===to){
        alert('From and To cannot be same');
        if(currencyChart){
           currencyChart.destroy();
           currencyChart=null;
        }
        return;
    }

   

    const apiKey = '2c696ab790c068e88e9188c0';
    const apiUrl =  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`

    fetch(apiUrl)
      .then(response=>(response.json()))
      .then(data => {
        const rate = data.conversion_rates[to];
        const convertedAmount = amount*rate;
        resultDiv.innerText = `${amount}${from} = ${convertedAmount.toFixed(2)}${to}`;
        resultDiv.style.display= 'flex';
        placeholderImage.style.display= 'none';

        // destroy currency Chart
        if(currencyChart){
            currencyChart.destroy();
        }

        console.log(canvasChart);

        // create new currency chart
        const ctx = canvasChart.getContext('2d');
        const gradient = ctx.createLinearGradient(0,0,0,400);
        gradient.addColorStop(0,'rgba(79,172,254,0.8)');
        gradient.addColorStop(1, 'rgba(0,242,254,0.2)')

        currencyChart = new Chart(canvasChart, {
            type: 'bar',
            data: {
                labels: [`${from} → ${to}`],
                datasets: [{
                    label: 'Converted Amount',
                    data: [convertedAmount],
                    backgroundColor: gradient
                }]
            }
        });
        });

});  
function clearResultAndChart(){
    resultDiv.innerText='';
    resultDiv.style.display='none';
    if(currencyChart){
        currencyChart.destroy();
        currencyChart=null;
    }
    placeholderImage.style.display='block';
}

amountInput.addEventListener('input', clearResultAndChart);
currencyFrom.addEventListener('change',clearResultAndChart);
currencyTo.addEventListener('change',clearResultAndChart);
    

