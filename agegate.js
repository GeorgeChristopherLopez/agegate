/*REQUIRED AGE*/
const requiredAge = 21;
let verified;


/*todays date*/
const todaysDate = new Date();
const thisYear = todaysDate.getFullYear();


/*INPUT ELEMENTS*/
const month = document.getElementById("month");
const day = document.getElementById("day");
const year = document.getElementById("year");
const enter = document.getElementById("enter");



/*SETTING DEFAULT INPUT VALUES*/
month.defaultValue = "MM";
day.defaultValue = "DD";
year.defaultValue = "YYYY";


/*MAKES INPUT HAVE TO BE NUMERIC */
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
	return true;
}    




/*CHECKS INPUT VALUE VS REQUIRED AGE*/
function isRequiredAge(month, day, year) {
    return new Date(year + requiredAge, month - 1, day) <= new Date();
}





/* CHECK IF AGE INPUT IS VALID INPUT */
function ageVerification() {

    event.preventDefault();
    let monthValue = parseFloat(month.value);
    let dayValue = parseFloat(day.value);
    let yearValue = parseFloat(year.value);
    let query = isRequiredAge(monthValue, dayValue, yearValue);
    if (monthValue <= 12
		&& monthValue > 0
        && dayValue <= 31
        && dayValue > 0
        && yearValue < thisYear
        && yearValue > 1900) {
        successChecker(query);
       
    } else {
        alert('Please Enter Your Date Of Birth To Continue');
    }

}

/* UPDATES MESSAGE UI if age verified */
function successChecker(event) {
    if (event) {
        verified = true;
        rememberMeCheck();
        document.getElementById('title').innerHTML = 'WELCOME TO BROOKLYN';
        document.getElementById('subtitle').innerHTML = "Congrats, you're old enough";
        setTimeout(function () { location.replace("https://brooklynbrewery.com/about/about-the-brewery") }, 3000);

    } else {
        verified = false;
        rememberMeCheck();
        document.getElementById('title').innerHTML = 'SORRRY';
        document.getElementById('subtitle').innerHTML = "TRY AGAIN WHEN YOUR " + requiredAge;
        setTimeout(function () { location.replace("https://www.chuckecheese.com") }, 3000);
    }

}



/*UI EVENT LISTENRS*/
month.addEventListener('keyup', InputUIHandler);
day.addEventListener('keyup', InputUIHandler);
year.addEventListener('keyup', InputUIHandler);





/* UPDATES USER INTERFACE BASE ON VALID OR INCORRECT INPUT */
function InputUIHandler() {
    let monthValue = parseFloat(month.value);
    let dayValue = parseFloat(day.value);
    let yearValue = parseFloat(year.value);

        /*UPDATES MONTH DAY YEAR INPUT UI*/
    if (monthValue > 0 && monthValue <= 12) {
        console.log('GOOD monthValue of ' + monthValue);
        month.classList.remove('Error');
    } else  {
        console.log('BAD monthValue of ' + monthValue);
        month.classList.add('Error');
    }

    if (dayValue <= 31 && dayValue > 0) {
        day.classList.remove('Error');
    } else {
        day.classList.add('Error');
    }

    if (yearValue < thisYear && yearValue > 1900) {
        year.classList.remove('Error');
        console.log('GOOD yearValue of' + yearValue)
    } else {
        console.log('BAD yearValue of ' + yearValue)
        year.classList.add('Error');

    }

    /*UPDATE ENTER BTN UI*/
    if (monthValue <= 12
        && monthValue > 0
        && dayValue <= 31
        && dayValue > 0
        && yearValue < thisYear
        && yearValue > 1900) {
      
        enter.classList.add('Go');
    } else {
        enter.classList.remove('Go');
    }




}

/* CHECKS FOR REMEMBER ME SELECTION */
function rememberMeCheck() {

    let wantsACookie = document.getElementById('rememberMe').checked;
    if (wantsACookie && verified) {
        document.cookie =
            'verified';
        console.log('wants a cookie YUM');
    } else if (wantsACookie && !verified) {
        document.cookie =
            'notVerified';
    }
}




/* CHECKS FOR COOKIES ON SITE LOAD */
function cookieCheck() {
    console.log(document.cookie);
    if (document.cookie === 'verified') {
        successChecker(true);
        console.log('21!!!!!!!!!!!!')
    } else if(document.cookie === 'notVerified'){
        successChecker(false);
        console.log('no cookies found')
    }
}

document.onload = cookieCheck();