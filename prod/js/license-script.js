var radioButtons = document.querySelectorAll('.choose-license input'),

	toChange1 = document.querySelector('.change-1'),
	toChange2 = document.querySelector('.change-2'),
	toChange3 = document.querySelector('.change-3'),
	toChange4 = document.querySelector('.change-4');

console.log('hello');

for(var i = 0; i < radioButtons.length; i++) {
	radioButtons[i].addEventListener('click', function(){
		console.log(this, this.hasAttribute);
		if(this.className == 'license-developer') {
			toChange1.textContent = 'Developer';
			toChange2.textContent = 'Developer';
			toChange3.textContent = 'one (1) Licensed Developer';
			toChange4.textContent = 'one individual Developer';
		}
		if(this.className == 'license-team') {
			toChange1.textContent = 'Team';
			toChange2.textContent = 'Team';
			toChange3.textContent = 'up to eight (8) Licensed Developer(s)';
			toChange4.textContent = 'up to 8 Developers';
		}
		if(this.className == 'license-organization') {
			toChange1.textContent = 'Organization';
			toChange2.textContent = 'Organization';
			toChange3.textContent = 'an unlimited number of Licensed Developer(s)';
			toChange4.textContent = 'an unlimited number of Developers';
		}
	})
}