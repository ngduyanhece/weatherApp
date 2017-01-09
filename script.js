'use strict';
$(document).ready(function(){
		//perform the api request to get the current weather from the open weather api
		navigator.geolocation.getCurrentPosition(function(position) {
			var lon = position.coords.longitude;
			var lat = position.coords.latitude;
			var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=83c0d87e0687a0e926300a4242390d05";
			$.getJSON(weatherApi, function( data ) {
					console.log(data);
					var cityName = data.name;
					$("#city").html(cityName);
					var temp = data.main.temp;
					var tempInC = kToC(temp);
					var tempInfor = tempInC + " &#8451";
					$(".temp").html(tempInfor);
					var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon +".png";
					$("#ticon").attr("src", iconUrl);
					var desciption = data.weather[0].description;
					$("#description").html(desciption);
			});
			//retrieve the background image for the app 
			var bgApi = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c864ca4637988bf5231b051415b37dfa&lat="+lat+"&lon="+lon+"&radius=1&format=json&nojsoncallback=1";
			$.getJSON(bgApi, function( data ) {
					//console.log(data);
					var bg = data.photos.photo[10];
					var imgUrl = "url(https://farm"+bg.farm+".staticflickr.com/"+bg.server+"/"+bg.id+"_"+bg.secret+".jpg)";
					console.log(imgUrl);
					$("body").css('background-image', imgUrl);
			});
		});
});
function fToC(temp){
		return Math.round((temp-32)/1.8);
}
function kToC(temp){
		return Math.round(temp - 273.15);
}