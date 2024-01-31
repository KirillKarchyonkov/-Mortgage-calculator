const rangeNum = document.querySelectorAll('.range__num');
const rangeIn = document.querySelectorAll('.range__in');
const rangeProgress = document.querySelectorAll('.range__progress');

const infoValue = document.querySelectorAll('.info__value');

const infoGreen = document.querySelector('.info__green');
const infoYellow = document.querySelector('.info__yellow')

const rangeIcon = document.querySelectorAll('.range__icon')


const updateValue = (firstElement, secondElement, thirdElement) => {
    firstElement.addEventListener("input", () => {
        if ((firstElement === rangeNum[3]) || (firstElement === rangeIn[3])) {
            secondElement.value = parseFloat(firstElement.value);
        }
        else {
            secondElement.value = parseInt(firstElement.value);
        }
        thirdElement.style.width = Math.round((parseInt(secondElement.value) - parseInt(secondElement.min)) / (parseInt(secondElement.max) - parseInt(secondElement.min)) * 100)  + "%";
        if ((firstElement === rangeNum[0]) || (firstElement === rangeIn[0])) {
            rangeNum[1].min = Math.round(parseInt(rangeIn[0].value) * 0.1);
            rangeNum[1].max = Math.round(parseInt(rangeIn[0].value) * 0.9);
            rangeIn[1].min = rangeNum[1].min
            rangeIn[1].max = rangeNum[1].max
            rangeNum[1].value = rangeIn[1].value
            rangeIn[1].value = rangeNum[1].value
            rangeProgress[1].style.width = Math.round((parseInt(rangeIn[1].value) - parseInt(rangeIn[1].min)) / (parseInt(rangeIn[1].max) - parseInt(rangeIn[1].min)) * 100)  + "%";
        } 
        if ((parseInt(rangeNum[2].value) === 1) || (parseInt(rangeNum[2].value) === 21)) {
            rangeIcon[2].innerHTML = "год";
        } 
        else if ((parseInt(rangeNum[2].value) % 10 > 1) && (parseInt(rangeNum[2].value) % 10 < 5)  && (Math.floor(parseInt(rangeNum[2].value) / 10) !== 1)) {
            rangeIcon[2].innerHTML = "года";
        } 
        else {
            rangeIcon[2].innerHTML = "лет";
        }
        calculation();
    });
}

for (let i = 0; i < rangeNum.length; i++) {
    updateValue(rangeNum[i], rangeIn[i], rangeProgress[i]);
    updateValue(rangeIn[i], rangeNum[i], rangeProgress[i]);
}


const calculation = () => {
    let monthlyPayment; // Платеж
    let lounAmount = parseInt(rangeNum[0].value) - parseInt(rangeNum[1].value) // кредит
    let interestRate = parseFloat(rangeNum[3].value); // ставка
    let numberOfYears = parseInt(rangeNum[2].value);
    let numberOfMonths = 12 * numberOfYears; // 
    let totalSum; // общая выплата
    let overPayment; // переплата
    let recommendedIncome;

    monthlyPayment = (lounAmount * interestRate / 12 * 0.01 * (1 + interestRate / 12 * 0.01)**numberOfMonths) / ((1 + interestRate / 12 * 0.01)**numberOfMonths - 1);
    
    totalSum = Math.round(numberOfMonths * monthlyPayment);

    overPayment = Math.round(totalSum - lounAmount);

    recommendedIncome = Math.ceil(monthlyPayment * 1.35);

    const monthlyPaymentArounded = Math.ceil(monthlyPayment);
    if (monthlyPaymentArounded < 0){
        return false
    }
    else {
        infoValue[0].innerHTML = getTriads(lounAmount);
        infoValue[1].innerHTML = getTriads(monthlyPaymentArounded);
        infoValue[2].innerHTML = getTriads(recommendedIncome);
        infoValue[3].innerHTML = getTriads(overPayment);
        infoValue[4].innerHTML = getTriads(totalSum);

        infoGreen.style.width = (lounAmount / totalSum) * 100 + "%";
        infoYellow.style.width = 100 - (lounAmount / totalSum) * 100 + "%";
    }
    }

    const getTriads = (value) => {
     
        let stringValue = value.toString();
        let newValue = '';
    
        if (stringValue.length < 4) {
            return value
        }
        else {
            while (stringValue.length > 3){
                
                newValue = ' ' + stringValue.slice(stringValue.length - 3, stringValue.length) + newValue
                stringValue = stringValue.slice(0, stringValue.length - 3)
            }
             return stringValue + newValue;
        }
    }
