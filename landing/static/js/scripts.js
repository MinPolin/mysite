function ShowSize(elem,size){
	$('.empty').empty();
	
	var color_id=elem.getAttribute('data-color_id');
	var img=elem.getAttribute('data-img');
	
	
    $('.variable .error').removeClass('error');
	$('.colors .click_border').removeClass('click_border');
	document.getElementById(elem.id).classList.add('click_border');
	$('.images img').attr('src', img);

	var color_sizes = JSON.parse(size);
	var sizes=color_sizes[color_id];
	
	var count = Object.keys(sizes).length;


	console.log('work');
	
	document.getElementById('formby').style.display = 'inline-block';
	document.getElementById('formby2').style.display = 'none';

	$('.sizes').empty();

	for (var i=0; i<count;i++){
		var s=sizes[i];
		$('.sizes').append(' <div class="size_item" name='+s+'  id = size'+i+'  onclick="Choose(id)" >'+s+'</div>');
		document.getElementById('opac').style.opacity = 1;
		
	}
	var arr=document.getElementsByClassName('size_item');
	for(var i = 0; i < arr.length; i++){
            arr[i].style.cursor= 'pointer';
        }

	
}
function Choose(id){
	let variable = JSON.parse(get_cookie('variable'));
	$('.empty').empty();

	$('.variable .error').removeClass('error');
	$('.sizes .click_border').removeClass('click_border');
	document.getElementById(id).classList.add('click_border');
	if (variable){
		var variable_keys =Object.keys(variable);
		count=variable_keys.length;
		if (count){
			isChecked(variable,count);
		}

		
	}
	


}

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;


}

function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function AddToCart(){
	// document.cookie = "variable=yes";

	

	$('.empty').empty();
	
	
	let itcolor = document.querySelector('.colors .click_border');
	let itsize=document.querySelector('.sizes .click_border');
	let itid =document.querySelector('.colors');


	
	if (!itcolor || !itsize){
		delete_cookie('variable');
		var choosecolor = "выберите цвет и размер"

		$('.empty').append(' <span id=error class="error" >'+choosecolor+'</span>');
		$('.headers').addClass('error');

	} 
	else{
		

		let variable_item={};
		$('.variable .error').removeClass('error');
		var color_id=itcolor.getAttribute('data-color_id');

		var size=itsize.getAttribute('name');
		var prod_id = itid.getAttribute('data-prodid');
		let cook = document.cookie;
		
		variable_item['color_id']=color_id;
		variable_item['size']=size;
		variable_item['amount']=1;
		variable_item['prod_id']=prod_id;

		let variable_put={};
		let variable = JSON.parse(get_cookie('variable'));


		var sw=1
		if(!variable){
			sw=0
		}
		else{
			var variable_var =Object.keys(variable);
			if(!variable_var.length){
				sw=0
			}
		}
		if (!sw) {
			variable_put[1]=variable_item;
			let day = new Date(Date.now() + 86400e3*14);
			day = day.toUTCString();
			
			document.cookie = "variable="+JSON.stringify(variable_put)+";path=/; expires=" + day;
			cartAmount(1);
		}
		else{
			var count =Object.keys(variable);
			
			var l=count.length;
			var flag=0;
			var i=0;
			while(flag==0){
				i++;
				flag=1;
				for (var j=0;j<l;j++){
					if (i==count[j]){
						flag=0;
					}
				}
			}
			variable_put=variable;
			variable_put[i]=variable_item;
			let day = new Date(Date.now() + 86400e3*14);
			day = day.toUTCString();
			document.cookie = "variable="+JSON.stringify(variable_put)+";path=/; expires=" + day;
			
			cartAmount(l+1);
		}
		document.getElementById('formby').style.display = 'none';
		document.getElementById('formby2').style.display = 'inline-block';

	}
}
function cartAmount(amount){
	$('.amount').empty();

	if (amount){
		$(".cart a .amount").append('<div class="amount_nmb">'+amount+'</div>')
	}

}
function isChecked(variable,count){

	let itcolor = document.querySelector('.colors .click_border');
	let itsize=document.querySelector('.sizes .click_border');
	let itid =document.querySelector('.colors');


	var color_id=itcolor.getAttribute('data-color_id');
	var size=itsize.getAttribute('name');
	var prod_id = itid.getAttribute('data-prodid');
	console.log(color_id);


	var variable_keys =Object.keys(variable);
	
	var sw=0;
	var i=0;
	while(sw==0 && i<count ){

		if(variable[variable_keys[i]]['color_id']==color_id && variable[variable_keys[i]]['size']==size && variable[variable_keys[i]]['prod_id']==prod_id ){
			sw=1;
			console.log("yos")
		}
		i++;
	}
	if (sw){
		document.getElementById('formby').style.display = 'none';
		document.getElementById('formby2').style.display = 'inline-block';

	}
	else{
		
		document.getElementById('formby').style.display = 'inline-block';
		document.getElementById('formby2').style.display = 'none';
	}




}
$(document).ready(function(){
	
	let variable = JSON.parse(get_cookie('variable'));
		
	
	
	if (variable) {
		var count =Object.keys(variable).length;
		
		cartAmount(count);
		
	}

}); 