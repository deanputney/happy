$(document).ready(function(){
	app.getHappies();

	$('#save-happy').click(function(){
		var text = $('#happy-text').val();
		if(text == app.prompt){
			$('#happy-text').val('');
			$('#happy-text').focus();
			return;
		}
		app.newHappy(text);
	});

	$('#get-happy').click(function(){
		var happy = app.getHappy();
		app.displayHappy(happy);
	});

	$('#happy-text').focus(function(){
		$('#happy-text').val('');
	});

	$('#happy-text').blur(function(){
		if($('#happy-text').val() == ''){
			$('#happy-text').val(app.prompt);
			app.resizeTextarea($('#happy-text')[0]);
		}
	});

	$("textarea").on("keydown keyup", function(){ app.resizeTextarea(this) });

});

var app = {
	happies: [],
	prompt: "What makes you happy?",
	more_prompts: [
		"What food makes you happy?",
		"Do you know a person who makes you happy?",
		"What movie makes you happy?"
	],
	getHappies: function(){
		var storedHappies = JSON.parse( localStorage.getItem( "happies" ) );
		if(storedHappies != null){
			$('#description').hide();
			this.happies = storedHappies;
		}
	},
	saveHappies: function(){
		localStorage.setItem( "happies", JSON.stringify(this.happies) );
	},
	newHappy: function(text, category){
		console.log("new happy: "+text);
		var happy = {
			text: text,
			category: category,
		}
		this.happies[this.happies.length] = happy;
		console.log(this.happies);
		this.saveHappies();
		$('#description').slideUp();
	},
	getHappy: function(category){
		if(category != null){

		}
		var index = parseInt(Math.random()*this.happies.length);
		return this.happies[index];
	},
	displayHappy: function(happy){
		$('#happy-text').val(happy.text);
	},
	resizeTextarea: function(textarea){
		console.log(textarea);
		textarea.style.height = "1px";
		textarea.style.height = (textarea.scrollHeight) + "px";
	}
}
