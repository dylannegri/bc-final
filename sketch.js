var slideIndex = 1;

function switchSlide(n) {
	showslide(slideIndex += n);
}
function currentSlide(n) {
	showSlide(slideIndex = n);
}
function showslide(n) {
	var slideArray = document.getElementsByClassName('slides');

	if (n > slideArray.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slideArray.length;
	}
	for (var i = 0; i < slideArray.length; i++) {
		slideArray[i].className.replace(' fadeImage', '');
	}
	slideArray[i].className += ' fadeImage';
}

// window.setInterval(
//    function(){
//    switchSlide(1);
// }, 5000);

var myFirepit = document.getElementById('fire-pit');

var isFirepitClickable = true;

myFirepit.addEventListener('click', function(event){
	if (isFirepitClickable == true){
		var myFire = document.getElementsByClassName('fireClass');
		myFire[0].className += " moveFire";

		var slideArray = document.getElementsByClassName('slides');
		
		setTimeout(function(){
			for (var i = 0; i < slideArray.length; i++) {
				slideArray[i].className = slideArray[i].className.replace(' fadeImage', '');
			}
		}, 2000);

		setTimeout(function(){
			slideArray[0].className += ' fadeImage';
		}, 2000);
		
		console.log("CLIKCED");
		
		isFirepitClickable = false;
	}
});