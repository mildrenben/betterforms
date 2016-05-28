var inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"], input[type="number"]');
	  infoTooltip = document.querySelectorAll('.info-tooltip'),
	  body = document.querySelector('body');

//Inputs underline anim
if(inputs) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  console.log(isFirefox);
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].previousElementSibling.classList.add('floating-label');
    inputs[i].addEventListener('focusin', function(){
      this.previousElementSibling.classList.add('label-active');
      console.log(this);
    })
    inputs[i].addEventListener('focusout', function(){
      if(!(this.value == '')) {
        this.classList.add('input-active');
      }
      else if(this.value == '') {
        this.classList.remove('input-active');
        this.previousElementSibling.classList.remove('label-active');
      }
      else {
        this.previousElementSibling.classList.remove('label-active');
      }
    })
    if(isFirefox) {
      inputs[i].addEventListener('focus', function(){
        this.previousElementSibling.classList.add('label-active');
        console.log(this);
      })
      inputs[i].addEventListener('blur', function(){
        if(!(this.value == '')) {
          this.classList.add('input-active');
        }
        else if(this.value == '') {
          this.classList.remove('input-active');
          this.previousElementSibling.classList.remove('label-active');
        }
        else {
          this.previousElementSibling.classList.remove('label-active');
        }
      })
    }
  }
}


//Required inputs
if(inputs) {
  for(var m = 0; m < inputs.length; m++) {
    if(inputs[m].hasAttribute('required')) {
      inputs[m].previousElementSibling.classList.add('label-required');
    }
  }
}

//Clear button
if(inputs) {
  for(var n = 0; n < inputs.length; n++) {
    inputs[n].addEventListener('keyup', function(){

      if(!(this.value == '') && this.nextElementSibling === null) { // No next elem
        var clearButton = document.createElement('p');
        clearButton.innerHTML = 'x';
        clearButton.className = 'clear-button';
        this.parentNode.appendChild(clearButton);
        setTimeout(function(){
          clearButton.style.transform = 'scale(1)';
        }, 0);
        clearButton.addEventListener('click', function(){
          this.previousElementSibling.value = '';
          this.previousElementSibling.focus();
          this.parentNode.removeChild(this);
        })
      }

      else if(!(this.value == '') && !(this.nextElementSibling.className == 'clear-button')) { // A next elem exists
          var clearButton = document.createElement('p');
          clearButton.innerHTML = 'x';
          clearButton.className = 'clear-button';
          this.parentNode.insertBefore(clearButton, this.nextElementSibling);
          setTimeout(function(){
            clearButton.style.transform = 'scale(1)';
          }, 0);
          clearButton.addEventListener('click', function(){
            this.previousElementSibling.value = '';
            this.previousElementSibling.focus();
            this.parentNode.removeChild(this);
          })
        }

      else if((this.value == '') && (this.nextElementSibling.className == 'clear-button')) {
        this.parentNode.removeChild(this.nextElementSibling);
      }
    })
  }
}


//Info tooltip
if(infoTooltip) {
  for(var j = 0; j < infoTooltip.length; j++) {
    infoTooltip[j].addEventListener('click', function(){
      this.classList.toggle('info-tooltip-active');
    })
  }
}

//Email autosuffix
var email = document.querySelectorAll('input[type="email"]'),
    //auto = document.querySelector('.bf-autosuffix'),

    popularEmails = ['gmail.com', 'googlemail.com', 'hotmail.com', 'yahoo.com', 'msn.com', 'aol.com'],

    itemSelected = [],
    
    itemList = [];

if(email) {
  for(var q = 0; q < email.length; q++) {
    var auto = document.createElement('ul');
    auto.className = 'bf-autosuffix';
    itemSelected[q] = 0;
    if(email[q].nextElementSibling === null) { // No next elem
      email[q].parentNode.appendChild(auto);
    }
    else if(!(email[q].nextElementSibling === null)) { // Next elem exists
      email[q].parentNode.insertBefore(auto, email[q].nextElementSibling);
    }
  }
}

if(email) {
  var autoArray = document.querySelectorAll('.bf-autosuffix');
  window.addEventListener('keyup', function(event){
    for(var s = 0; s < email.length; s++) {

      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      if(!(isFirefox)) {
        if(window.event.keyCode === 40 || event.keyCode === 40) { // Down
          if(itemSelected[s] === (itemList.length - 1)) {
            itemSelected[s] = itemList.length - 1;
          }
          else {
            itemSelected[s] += 1;
          }
        }

        if(window.event.keyCode === 38 || event.keyCode === 38) { // Up
          if(itemSelected[s] === 0) {
            return;
          }
          else {
            itemSelected[s] -= 1;
          }
        }
        
        if(window.event.keyCode === 13 || event.keyCode === 13) { // Enter
          if(email[s] === document.activeElement) {
            email[s].value = itemList[itemSelected[s]].textContent;
          }
          autoArray[s].innerHTML = '';
        }
      }

      if(isFirefox) {
        if(event.keyCode === 40) { // Down
          if(itemSelected[s] === (itemList.length - 1)) {
            itemSelected[s] = itemList.length - 1;
          }
          else {
            itemSelected[s] += 1;
          }
        }

        if(event.keyCode === 38) { // Up
          if(itemSelected[s] === 0) {
            return;
          }
          else {
            itemSelected[s] -= 1;
          }
        }
        
        if(event.keyCode === 13) { // Enter
          if(email[s] === document.activeElement) {
            email[s].value = itemList[itemSelected[s]].textContent;
          }
          autoArray[s].innerHTML = '';
        }
      }
      
      for(var i = 0; i < itemList.length; i++) { // For loop through all items and add selected class if needed
        if(itemList[i].style.background = '#ededed') {
          itemList[i].style.background = '';
        }
        if(itemSelected[s] === i) {
          itemList[i].style.background = '#ededed';
        }
      }
    }
  });
}

if(email) {
  for(var r = 0; r < email.length; r++) {
    email[r].addEventListener('keyup', function(event) {
      console.log(itemList, itemSelected);
      this.nextElementSibling.nextElementSibling.innerHTML = '';
      
      if(this.value.match('@')) { // If the input has a @ in it
        var afterAt = this.value.substring(this.value.indexOf('@') + 1, this.value.length);
        var popularEmailsSub = [];
        
        for(var l = 0; l < popularEmails.length; l++) {
          popularEmailsSub.push(popularEmails[l].substring(0, afterAt.length))
        }
        
        if(afterAt == '') {
          for(var i = 0; i < popularEmails.length; i++) {
            this.nextElementSibling.nextElementSibling.innerHTML += '<li>' + this.value + popularEmails[i] + '</li>';
          }
          itemList = document.querySelectorAll('.bf-autosuffix li');
          itemList[0].style.background = '#ededed';
        }
        
        else if(!(afterAt == '')) {
          var matchedEmails = [];
          
          for(var k = 0; k < popularEmails.length; k++) {
            if(popularEmailsSub[k].match(afterAt)) {
              matchedEmails.push(popularEmails[k]);                   
            }
          }
          
          for(var i = 0; i < matchedEmails.length; i++) {
            this.nextElementSibling.nextElementSibling.innerHTML += '<li>' + this.value.substring(0, this.value.indexOf('@')) + '@' + matchedEmails[i] + '</li>';
          }
        }
        
        var itemsList = document.querySelectorAll('.bf-autosuffix li');
        
        for(var j = 0; j < itemsList.length; j++) {
          itemsList[j].addEventListener('click', function() {
            this.parentNode.previousElementSibling.previousElementSibling.value = this.textContent;
            this.parentNode.innerHTML = '';
          });
        }
      }
    });
  }
  
}


//Password view
var passEye = document.querySelector('.bf-password-view'),
    passwordInputs = document.querySelectorAll('input[type="password"]');

if(passEye) {
  passEye.addEventListener('click', function(){
    if(passwordInputs[0].getAttribute('type') == 'password') {
      for(var k = 0; k < passwordInputs.length; k++) {
        passwordInputs[k].setAttribute('type', 'text');
      }
    }
    else {
      for(var l = 0; l < passwordInputs.length; l++) {
        passwordInputs[l].setAttribute('type', 'password');
      }
    }
  })
}

//Range
var range = document.querySelectorAll('input[type="range"]');
console.log(range);

if(range) { 
  for(var p = 0; p < range.length; p++) {
    var rangeVal = document.createElement('p');
    rangeVal.innerHTML = range[p].value;
    range[p].parentNode.insertBefore(rangeVal, range[p]);
    range[p].addEventListener('mousemove', function(){
      rangeVal.innerHTML = this.value;
    })
  }
}