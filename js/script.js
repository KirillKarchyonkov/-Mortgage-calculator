const rangeNum = document.querySelectorAll('.range__num');
const rangeIn = document.querySelectorAll('.range__in');
const rangeProgress = document.querySelectorAll('.range__progress');

const infoValue = document.querySelectorAll('.info__value');

const infoGreen = document.querySelector('.info__green');
const infoYellow = document.querySelector('.info__yellow')

const rangeIcon = document.querySelectorAll('.range__icon');

const themeButton = document.querySelector('.theme__btn')
const themeCircle = document.querySelector('.theme__circle')

const body = document.querySelector('body') 
const wrapper = document.querySelector('.wrapper') 

const updateValue = (firstElement, secondElement, thirdElement) => {

    firstElement.addEventListener("input", () => {

            if ((firstElement.value === '') && ((firstElement === rangeNum[0]) || (firstElement === rangeNum[1]) || (firstElement === rangeNum[2]) || (firstElement === rangeNum[3]))) {

                secondElement.value = 0;
                firstElement.style.border = "1px solid #d71f1f"; 
        
            }
            else if ((firstElement === rangeNum[3]) || (firstElement === rangeIn[3])) {
                        
                    secondElement.value = parseFloat(firstElement.value);
                    
            }
            else if ((firstElement === rangeNum[0]) || (firstElement === rangeNum[1])) {

                    secondElement.value = parseInt(removeSpace(firstElement.value));
                    firstElement.value = getTriads(parseInt(secondElement.value));
                
            }
            else if ((firstElement === rangeIn[0]) || (firstElement === rangeIn[1])) {

                secondElement.value = getTriads(parseInt(firstElement.value));
                firstElement.value = parseInt(removeSpace(secondElement.value));

            }
            else if (firstElement === rangeNum[2]) {

                if ((parseInt(firstElement.value) >= 4) && (parseInt(firstElement.value) <= 9)) {

                    secondElement.value = 0;

                }
                else if (firstElement.value.length >= 2) {
                    
                    if ((parseInt(firstElement.value[0]) === 3) && (parseInt(firstElement.value[1]) >= 1)) {

                        secondElement.value = parseInt(firstElement.value[0]);

                    }
                    else {
                        secondElement.value = parseInt(firstElement.value[0] + firstElement.value[1]);
                    }

                    
                }

                else {

                    secondElement.value = parseInt(firstElement.value);

                }

                firstElement.value = parseInt(firstElement.value.substr(0, 2).replace(/^0|^[4-9]/, '').replace(/^3[1-9]/, '3 '));
                    

            } 
            else {

                secondElement.value = parseInt(removeSpace(firstElement.value));

            }
            
            if ((firstElement === rangeNum[0]) || (firstElement === rangeIn[0])) {

                rangeNum[1].max = getTriads(Math.round(parseInt(rangeIn[0].value) * 0.9));
                rangeIn[1].max = parseInt(removeSpace(rangeNum[1].max));
                rangeNum[1].value = getTriads(parseInt(rangeIn[1].value));
                rangeIn[1].value = parseInt(removeSpace(rangeNum[1].value));
 
                if (parseInt(rangeIn[0].value) === 0) {

                    rangeProgress[1].style.width = 0  + "%"

                }
                else {

                    rangeProgress[1].style.width = Math.round((parseInt(rangeIn[1].value) - parseInt(rangeIn[1].min)) / (parseInt(rangeIn[1].max) - parseInt(rangeIn[1].min)) * 100)  + "%";
                
                }
            } 


            if ((firstElement.value !== '') && ((firstElement === rangeNum[0]) || (firstElement === rangeNum[1]) || (firstElement === rangeNum[2]) || (firstElement === rangeNum[3]))) {

                firstElement.style.border = "1px solid #cecece";
                
            }

            if ((firstElement.value >= 0) && ((firstElement === rangeIn[0]) || (firstElement === rangeIn[1]) || (firstElement === rangeIn[2]) || (firstElement === rangeIn[3]))) {

                secondElement.style.border = "1px solid #cecece";
                
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

           
          
            thirdElement.style.width = Math.round((parseFloat(removeSpace(secondElement.value)) - parseFloat(removeSpace(secondElement.min))) / (parseFloat(removeSpace(secondElement.max)) - parseFloat(removeSpace(secondElement.min))) * 100)  + "%";
        
            calculation();
  
    });
}

for (let i = 0; i < rangeNum.length; i++) {

    updateValue(rangeNum[i], rangeIn[i], rangeProgress[i]);
    updateValue(rangeIn[i], rangeNum[i], rangeProgress[i]);

}


const calculation = () => {

    let monthlyPayment; // Платеж
    let lounAmount = parseInt(removeSpace(rangeNum[0].value)) - parseInt(removeSpace(rangeNum[1].value)); // кредит
    let interestRate = parseFloat(rangeNum[3].value); // ставка
    let numberOfYears = parseInt(rangeNum[2].value);
    let numberOfMonths = 12 * numberOfYears; // 
    let totalSum; // общая выплата
    let overPayment; // переплата
    let recommendedIncome;

    monthlyPayment = (lounAmount * interestRate / 12 * 0.01 * (1 + interestRate / 12 * 0.01)**numberOfMonths) / ((1 + interestRate / 12 * 0.01)**numberOfMonths - 1);
    
    totalSum = Math.round(numberOfMonths * monthlyPayment);

    overPayment = Math.round(totalSum - lounAmount);

    recommendedIncome = Math.ceil(monthlyPayment * 2);

    const monthlyPaymentArounded = Math.ceil(monthlyPayment);

    if (monthlyPaymentArounded < 0){

        return false
    
    }
    else {

        infoValue[0].innerHTML = isNaN(lounAmount) ? 0 : getTriads(lounAmount);
        infoValue[1].innerHTML = isNaN(monthlyPaymentArounded) ? 0 : getTriads(monthlyPaymentArounded);
        infoValue[2].innerHTML = isNaN(recommendedIncome) ? 0 : getTriads(recommendedIncome);
        infoValue[3].innerHTML = isNaN(overPayment) ? 0 : getTriads(overPayment);
        infoValue[4].innerHTML = isNaN(totalSum) ? 0 : getTriads(totalSum);

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


const removeSpace = (value) => {
    
    let newNumber = ''

    for (let number of value) {
        
        if (number !== ' ') {

            newNumber += number;
        
        }
   
    }
    
    return newNumber
}


rangeNum[3].addEventListener('keypress', function(event) {
  
    const charCode = event.charCode;

    let isValidInput; 

    if (rangeNum[3].value.length === 0) {

        isValidInput = (charCode >= 49 && charCode <= 57);

    }
    else if ((rangeNum[3].value.length >= 1) && (rangeNum[3].value.length < 4)) {

        isValidInput = (charCode >= 48 && charCode <= 57) || charCode === 44;

    }
    else if (rangeNum[3].value.length >= 4) {

        isValidInput = false;

    }
    
    if (!isValidInput) {

        event.preventDefault();
    
    }

});


themeButton.addEventListener("click", () => {
    
    themeCircle.classList.toggle('theme__circle-light')
    themeCircle.classList.toggle('theme__circle-night')
    body.classList.toggle('body-night')
    wrapper.classList.toggle('wrapper-night')
    themeButton.classList.toggle('theme__btn-night')
    rangeNum.forEach((v,i) => {rangeNum[i].classList.toggle('range__num-night')})
    
})



