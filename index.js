var response = {
	"success": '{"status":"success"}',
	"error": '{"status":"error","reason":"*string*"}',
	"process": '{"status":"progress","timeout":"*number"}'
};

var MyForm = {};

MyForm.validate = function() {
    // errors from templates
	var resError = response.error;
	var resSuccess = response.success;
	var resProgress = response.progress;
	
	var result = validationErrors();
	if(result.length >0){
		resError = resError.replace('*string*',result.toString())
		document.getElementById('resultContainer').textContent = resError;
		document.getElementById('resultContainer').className = 'error';
		return {isValid: false, errorFields: result};
	}
	else{
		document.getElementById('submitButton').disabled = true;
		document.getElementById('resultContainer').textContent = resSuccess;
		document.getElementById('resultContainer').className = 'normal';
		return {isValid: true, errorFields: result};
	}
}
MyForm.getData = function() {
    return getData();
}
MyForm.setData = function(obj) {
    setData(obj);
}
MyForm.submit = function() {
    return submit();
}

function validationErrors(){
	var pattern;
	var errors = [];
	
	// taking form values
	var name = document.getElementById('fio');
	var email = document.getElementById('email');
	var phone = document.getElementById('phone');
	
	// checking name
	pattern = /^[\u0400-\u04FFa-zA-Z]+\s+[\u0400-\u04FFa-zA-Z]+\s+[\u0400-\u04FFa-zA-Z]+/;
	if(!pattern.test(name.value)){
		errors.push('wrong name');
		name.className = "error";
	}
	else{
		name.className = "normal";
	}
		
	// checking email
	pattern = /^([a-z0-9_])+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)/;
	if(!pattern.test(email.value)){
		errors.push('wrong email');
		email.className = "error";
	}
	else{
		email.className = "normal";
	}
	
	// checking phone
	pattern = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
	if(pattern.test(phone.value) && sumDigits(phone.value) <=30){
		phone.className = "normal";
	}
	else{
		errors.push('wrong phone');
		phone.className = "error";
	}
	return errors;
}

function getData(){
	var obj = {};
	var len=document.forms.myForm.elements.length-1;
    var mas=[];
    for(var i=0;i<len;i++){
        var val=document.forms.myForm.elements[i].value;
		var name = document.forms.myForm.elements[i].name;
		obj[name] = val; 
    }
    return obj;
}

function setData(obj){
	document.getElementById('fio').value = obj.name;
	document.getElementById('email').value = obj.email;
	document.getElementById('phone').value = obj.phone;
}

function sumDigits(phone) {
	var total = 0;
	phone = phone.replace(/\D/g,'');
	var digits = phone.split("")
	digits.forEach(function(item, i, arr){
		total += parseInt(item);
	});
	return total;
}

function submit(){
	result = MyForm.validate();
	if(result.isValid){
		console.log('+');
	}
	else{
		console.log('-');
	}
}

function checkObj(){
	obj = {name: "Dd", email: "dd", phone: "dd"};
	console.log(MyForm.getData());
	console.log(MyForm.validate());
	//MyForm.setData(obj);
}