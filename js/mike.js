function button(){
	
	const form = document.getElementById("form");
	const email = document.getElementById("email").value;
	const comment = document.getElementById("comment").value;
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	if(!emailPattern.test(email)){
		alert("Please enter a valid email");
		return;
	}
	if(comment.length === 0){
		alert("Please enter a comment");
		return;
	}
	else{
		event.preventDefault();
		console.log("Captured email:", email);
		console.log("Captured comment:", comment);
		form.style.display="none";
		const completedMessage=document.getElementById("form-submission-complete");
		completedMessage.style.display="block";
	}
}

