const apiKey = '6f447e0e94adc9a4e8af203c';

let baseCurrency = 'AZN';

let lefts = document.querySelectorAll(".currency-option-left");
let rights = document.querySelectorAll(".currency-option-right");
let fromInput = document.querySelector("#from-input");
let toInput = document.querySelector("#to-input");
let errorMessage = document.querySelector("#error-message");

fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => data["conversion_rates"])
    .then(data => {
        const usdRate = data["USD"];
        document.querySelector("#from-rate").innerHTML = (1 / usdRate).toFixed(4);
        document.querySelector("#to-rate").innerHTML = usdRate.toFixed(4);
    })
    .catch(error => {
        errorMessage.style.display = 'block';
    });

document.querySelectorAll('.first-part .currency-option-left').forEach((option) => {
    option.addEventListener('click', (event) => {
        const selectedCurrency = event.target.textContent;

        document.querySelectorAll('.first-part .currency-option-left').forEach((opt) => {
            opt.classList.remove('bg-purple');
        });

        event.target.classList.add('bg-purple');
    });
});

document.querySelectorAll('.second-part .currency-option-right').forEach((option) => {
    option.addEventListener('click', (event) => {
        const selectedCurrency = event.target.textContent;

        document.querySelectorAll('.second-part .currency-option-right').forEach((opt) => {
            opt.classList.remove('bg-purple');
        });

        event.target.classList.add('bg-purple');
    });
});

lefts.forEach(item => item.addEventListener("click", function () {
    let activeCurrencyRight = document.querySelector(".currency-right>.bg-purple");

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyRight.innerHTML]);
            toInput.value = (data[activeCurrencyRight.innerHTML] * fromInput.value).toFixed(4);
            document.querySelector("#from-rate").innerHTML = data[activeCurrencyRight.innerHTML].toFixed(4);
            document.querySelector("#to-rate").innerHTML = (1 / data[activeCurrencyRight.innerHTML]).toFixed(4);
        })
        .catch(error => {
            errorMessage.style.display = 'block';
        });

    document.querySelector("#from-currency").innerHTML = this.innerHTML;
    document.querySelector("#from-target").innerHTML = activeCurrencyRight.innerHTML;
    document.querySelector("#to-currency").innerHTML = activeCurrencyRight.innerHTML;
    document.querySelector("#to-target").innerHTML = this.innerHTML;
}));

rights.forEach(item => item.addEventListener("click", function () {
    let activeCurrencyLeft = document.querySelector(".currency-left>.bg-purple");

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyLeft.innerHTML]);
            fromInput.value = (data[activeCurrencyLeft.innerHTML] * toInput.value).toFixed(4);
            document.querySelector("#to-rate").innerHTML = data[activeCurrencyLeft.innerHTML].toFixed(4);
            document.querySelector("#from-rate").innerHTML = (1 / data[activeCurrencyLeft.innerHTML]).toFixed(4);
        })
        .catch(error => {
            errorMessage.style.display = 'block';
        });

    document.querySelector("#to-currency").innerHTML = this.innerHTML;
    document.querySelector("#to-target").innerHTML = activeCurrencyLeft.innerHTML;
    document.querySelector("#from-currency").innerHTML = activeCurrencyLeft.innerHTML;
    document.querySelector("#from-target").innerHTML = this.innerHTML;
}));

fromInput.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9.]/g, ''); 

    const dots = this.value.match(/\./g) || [];
    if (dots.length > 1) {
        this.value = this.value.slice(0, -1);
    }

    let activeCurrency = document.querySelector(".currency-left>.bg-purple");
    let activeCurrencyRight = document.querySelector(".currency-right>.bg-purple");

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyRight.innerHTML]);
            toInput.value = (data[activeCurrencyRight.innerHTML] * fromInput.value).toFixed(4);
        })
        .catch(error => {
            errorMessage.style.display = 'block';
        });
});

toInput.addEventListener("input", function () {
    
    this.value = this.value.replace(/[^0-9.]/g, ''); 

    const dots = this.value.match(/\./g) || [];
    if (dots.length > 1) {
        this.value = this.value.slice(0, -1);
    }

    let activeCurrency = document.querySelector(".currency-right>.bg-purple");
    let activeCurrencyLeft = document.querySelector(".currency-left>.bg-purple");

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${activeCurrency.innerHTML}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data["conversion_rates"])
        .then(data => {
            console.log(data[activeCurrencyLeft.innerHTML]);
            fromInput.value = (data[activeCurrencyLeft.innerHTML] * toInput.value).toFixed(4);
        })
        .catch(error => {
            errorMessage.style.display = 'block';
        });
});
