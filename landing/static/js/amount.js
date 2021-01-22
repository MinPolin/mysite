

$(document).ready(function(){
	let variable = JSON.parse(get_cookie('variable'));
	
	
			
	if (variable){
		var variable_var =Object.keys(variable);
		if (variable_var.length){
			let prods_cart=document.querySelector('.prods_cart');
		
			let prod_id = JSON.parse(prods_cart.getAttribute('data-item_ids'));
			var cart_keys =Object.keys(prod_id);
			var cart_val = Object.values(prod_id);
			var count = cart_keys.length;

			console.log('variable  '+variable_var);
			console.log('prod_id  '+cart_keys);
			console.log('prod_id  '+cart_val);



			
			


			sumProd(prod_id,variable);
			delItem(variable,prod_id);
			

			for(var i=0; i<count;i++){

				changeAm(cart_keys[i],prod_id[cart_keys[i]]['amount']);
				let a= Number(variable[prod_id[cart_keys[i]]['ind']]['amount']);
		    	let price =Number(prod_id[cart_keys[i]]['price']);
		    	tot_price=a*price;
				$('#cart_item_'+cart_keys[i]+' .total_price').append(' <div class="total_price_item"  >₽'+ tot_price.toFixed(2)+'</div>');
				$('#cart_item_'+cart_keys[i]+' .cart_price').append(' <div class="cart_price_item">₽'+ price+'.00</div>');

					

				// $('#cart_item_'+cart_keys[i]+' .cart_amount .middle').append(' <div class="cart_amount_item" data-amount='+cart_val[i]+'>'+cart_val[i]+'</div>');
			
			}
			
			
			plusMinus(".plus",10,prod_id,variable);
			plusMinus(".minus",1,prod_id,variable);
			order(variable,prod_id);
		}

		
		else{
		$('.container .row').empty();
		$('.container .row').append('<h1>Корзина пока пуста)</h1>');

		}
	}

		
	
	else{
		$('.container .row').empty();
		$('.container .row').append('<h1>Корзина пока пуста)</h1>');

	}


});

function changeAm(id,value){
	$('#cart_item_'+id+' .cart_amount .middle').append(' <div class="cart_amount_item" data-amount='+value+'>'+value+'</div>');

}



// при добав заказа уменьшать количество в базе

function plusMinus(znak,lim,prod_id,variable){
	
	var amount;
	var item = document.querySelectorAll(znak);
		count = item.length;
		for(let i = 0; i<count; i++){
			item[i].onclick = function (){

				$('.cart_sum').empty();	
						
			    let id =this.getAttribute('data-item_id');

			    let middle = document.querySelector('#cart_item_'+id+' .cart_amount_item');
			    var amount =middle.getAttribute('data-amount');
			   
			    if (lim==1){
			    	if(amount>lim){
			    	$('#cart_item_'+id+' .total_price').empty();
			    	amount--;
			    	$(' #cart_item_'+id+' .middle').empty();
			    	changeAm(id,amount);
			    	let price =Number(prod_id[id]['price']);
			    	let tot_price= price*amount;
			    	$('#cart_item_'+id+' .total_price').append(' <div class="total_price_item"  >₽'+ tot_price.toFixed(2)+'</div>');
				    }
				    else{
				    	console.log('cant insrease');
				    }
			    }
			    else{
			    	
			    	
			    	if(amount<lim){
			    	$('#cart_item_'+id+' .total_price').empty();

			    	amount++;
			    	$('#cart_item_'+id+'  .middle').empty();
			    	changeAm(id,amount);
			    	let price =Number(prod_id[id]['price']);
			    	let tot_price= price*amount;
			    	$('#cart_item_'+id+' .total_price').append(' <div class="total_price_item"  >₽'+ tot_price.toFixed(2)+'</div>');
				    }
				    else{
				    	console.log('cant plus');
				    }
			    }
			    var ind = prod_id[id]['ind'];
			    variable[ind]['amount']=amount;
			    let date = new Date(Date.now() + 86400e3*14);
				date = date.toUTCString();
			    document.cookie = "variable="+JSON.stringify(variable)+";path=/; expires=" + date;
			    sumProd(prod_id,variable);
			
			}
		}
	}

function delItem(variable,prod_id){
	var del = document.querySelectorAll(".delete");
	count = del.length;
	for(let i = 0; i<count; i++){
		del[i].onclick = function (){
			checked= {};
			document.cookie = "checked="+JSON.stringify(checked)+";path=/";

			$('.cart_sum').empty();
			var amoun =Object.keys(variable).length;
			if (amoun==1){
				$('.container .row').empty();
				$('.container .row').append('<h1>Корзина пока пуста)</h1>');
			}
			let ind =this.getAttribute('data-item_id');
			let id = prod_id[ind]['ind'];
			delete variable[id];
			let date = new Date(Date.now() + 86400e3*14);
			date = date.toUTCString();
			document.cookie = "variable="+JSON.stringify(variable)+";path=/; expires=" + date;
			$('#cart_item_'+ind+'').remove();
			$('.amount').empty();
			if (amoun>1){
				amoun--;
				$(".cart a .amount").append('<div class="amount_nmb">'+amoun+'</div>');
			}
			delete prod_id[ind];
			sumProd(prod_id,variable);

		}
	}		
}
			    
function sumProd(prod_id,variable){
	var cart_keys =Object.keys(prod_id);
	
	
			  
    var sum=0;
    var sum_amount=0;
    for (var i=0; i<cart_keys.length; i++){
    	let a= Number(variable[prod_id[cart_keys[i]]['ind']]['amount']);
    	let price =Number(prod_id[cart_keys[i]]['price']);
    	tot_price=a*price;
    	sum = sum +a;
    	sum_amount=sum_amount+tot_price;

    };
    console.log(sum);
    $('.cart_sum').append('<div class="cart_sum_item"> Всего товаров: '+' '+sum+'</div>');
    $('.cart_sum').append('<div class="cart_sumamount_item"> На сумму:'+' '+sum_amount.toFixed(2)+'</div>');



}
function order(variable , prod_id){
	
	
	let check={};
	
	let count=1;
	
	
	

	document.getElementById('order_btn').onclick = function(){
		console.log('click');
    	var checked_prod = document.querySelectorAll('.check input');
    	for (var i=0;i<checked_prod.length;i++){

    		if (checked_prod[i].checked){
    			let check_item={};
    			
    			let ind =checked_prod[i].getAttribute('data-item_id');

				let id = prod_id[ind]['ind'];				
				check_item['amount'] =variable[id]['amount'];
				check_item['prod_id'] =ind;
				tot_price=Number(prod_id[ind]['price'])*Number(variable[id]['amount']);
				check_item['tot_price']=tot_price.toFixed(2)

				check[count]=check_item;
				count++;



    		}

    	}
    	let date = new Date(Date.now() + 86400e3*14);
		date = date.toUTCString();
    	document.cookie = "checked="+JSON.stringify(check)+";path=/; expires=" + date;


	}
}


			
