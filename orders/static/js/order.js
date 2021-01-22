$(document).ready(function(){
	
	let checked = JSON.parse(get_cookie('checked'));
	let ch_keys=Object.keys(checked);
	let ord_prod = document.querySelectorAll('.ord_tot_price');
	
	for (var i=0;i<ord_prod.length;i++){
		tot_price=checked[ch_keys[i]]['tot_price'];
		prod_id=checked[ch_keys[i]]['prod_id'];

		
		$('#ord_item_'+prod_id+' .ord_tot_price').append('<div class="ord_tot_price_item">₽'+ tot_price+'</div>');
	};
	
	

	document.getElementById('addord').onclick = function(e){

		e.preventDefault();
		
		
		let values =[];
		
		$('.attention').empty();
		var data={};
		var flag = true;
		var i=1;
		var our_keys={0:'sername',1:'name',2:'fathname',3:'phone',4:'email',5:'adress',6:'comm'};
		console.log(our_keys[1]);
		$("#form_to_cart").each(function(){
		    let arr =$(this).find(':input') //<-- Should return all input elements in that specific form.
		    
		   
		    data['csrfmiddlewaretoken'] =$(arr[0]).val();
		    
		    while ((flag==true) && (i<arr.length-1)){
		    	
		    	let v = $(arr[i]).val();
		    	console.log($(arr[i]).val());
		    	
				if( v ){
					if (i==4){
						phone = v.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
						console.log("that  "+phone);
						var l= phone.length;
						console.log(l);
					}
						
					values.push(v);
					console.log("v is"+i);
				}
				else{
					if(i!=3 && i!=7){
						console.log("v isnot "+i);
						flag = false;
						$('.attention').append('<div class="at_inner"> Заполните обязательные поля!</div>');

					}
					else{
						values.push(v);
						console.log("v is"+i);
					}

				}
				i++;

		    }

		});
		if (flag){
			let t = document.getElementById('in_index').getAttribute('data-value');
			console.log(t);
			url2 = 'https://tariff.pochta.ru/tariff/v1/calculate?json&object=27030&from=602209&to='+t+'&weight=1000&pack=10&date=20200309';
			$.ajax({
				url:url2,
				type:'GET',
				data: data,
				cache:true,
				success:function(data){
					console.log('OKK');
					console.log(data);
					del_price=parseFloat(data['paynds'])/100;
					$('.deliverys').empty();
					$('.deliverys').append('<div class="text_delivery">Cтоимость доставки: </div>'
						+'<div class="delivery price">'+del_price+'.0</div>');
					let t = document.getElementById('itog').getAttribute('data-value');
					console.log(t);
					tot = del_price+parseFloat(t);
					console.log(tot);
					$('.total_prices').empty();
					$('.total_prices').append('<div class="text_price">Итог: </div>'
					+'<div class="price" id ="itog" data-value= "'+t+'">'+tot+'.0</div>');


					


				},
				error:function(){
					console.log('errorr');
				}




			});
			
			for (var i=0;i<Object.keys(our_keys).length;i++){

				data[our_keys[i]]=values[i];
				console.log(data[our_keys[i]]);
			}


			let form = document.getElementById('form_to_cart');
			var url=form.getAttribute('action');
			
			

			
			$.ajax({
				url:url,
				type:'POST',
				data: data,
				cache:true,
				success:function(data){
					console.log('OK');
				},
				error:function(){
					console.log('error');
				}




			})

				}

	}

		
		

	
	

}); 