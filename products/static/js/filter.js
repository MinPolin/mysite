$(document).ready(function(){
	let filt = JSON.parse(get_cookie('filter'));
	if (filt){
		keys = Object.keys(filt);
		if (keys.length){
			let select  = document.querySelectorAll('select');
		    for (var i=0; i<select.length;i++){

		    	let option = select[i].querySelectorAll('option');
		    	for (var j=0;j<option.length;j++){
		    		if($(option[j]).val() == filt[keys[i+1]]){

		    			option[j].selected = true;
		    		}
		    	}
		    }
		}

	    
	}


	document.getElementById('filter_btn').onclick = function(e){

		filter();
		
		
}
	document.getElementById('drop_btn').onclick = function(e){

		let select  = document.querySelectorAll('select');
		for (var i=0; i<select.length;i++){

			let option = select[i].querySelectorAll('option');
			option[0].selected=true;
		}

		filter();

}


	
})
 
function filter(){
	var data={};

		$("#filter_form").each(function(){
		    let arr =$(this).find(':input')


		    data['csrfmiddlewaretoken'] = $(arr[0]).val();
		    data['color'] = $(arr[1]).val();
		    data['size'] = $(arr[2]).val();
		    data['category'] = $(arr[3]).val();


		})

		let form = document.getElementById('filter_form');
		var url=form.getAttribute('action');
		console.log(url);
		console.log(data['csrfmiddlewaretoken'] );
		$.ajax({
			url:url,
			type:'POST',
			data: data,
			cache:true,
			success:function(answ){
				$('.main').empty();
				if (answ['amount']){
					for (var i=0;i<answ['amount'];i++){
						// console.log(answ[i]);
						$('.main').append('<div class="col-lg-4 items">'+
							'<div class="image row">'+
								'<img src="'+answ[i]['image']+'"  >'+
							'</div>'+
							'<div class="name">'+
								'<h3>'+answ[i]['name']+'</h3>'+
							'</div>'+
							'<p class="descript">'+
								answ[i]['description']+
							'</p>'+
							'<div class="but row ">'+
								'<a href="http://127.0.0.1:8000/prods/'+answ[i]['id']+'" class="btn btn-success">Подробнее</a>'+
							'</div>'+
						'</div>')

					}
					location.reload();
					data['nothing'] = false;
				}
				else{
					$('.main').append('<div class="nothing">По вашему запросу ничего не найдено</div>');
					data['nothing'] = true;
				}
				let date = new Date(Date.now() + 86400e3*14);
				date = date.toUTCString();
				document.cookie = "filter="+JSON.stringify(data)+";path=/; expires=" + date;
				


			},

			error:function(){
				console.log('error');
			}




		})


}
