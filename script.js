const
	colors = [
		'red',
		'green',
		'blue',
	];
	
const
	uri = 'dates.php';
	
const
	renderButton = color => {
		const
			btn = document.createElement('button')
			
		btn.className = 'ui-state-default ui-corner-all';
		btn.style.borderColor = color;
		btn.style.color = color;
		btn.innerText = color;
		
		btn.addEventListener('click', e => updateDatepicker(color));
		
		return btn;
	}
	
const
	updateDatepicker = color => {
	
		const
			form_data = new FormData();
			
		form_data.append('color', color);
	
		fetch(uri, {
			method: 'POST',
			cache: 'no-store',
			headers: {
				'Cache-Control': 'no-store'
			},
			body: form_data
		})
			.then(response => response.json())
			.then(data => {
				$( "#datepicker" )
					.datepicker( "option" , "minDate", data.min )
					.datepicker( "option" , "maxDate", data.max )
					.datepicker( "show" );
					
				$( "#datepicker" )
					.datepicker( "widget" )
					.attr('data-color', color);
			})
	}
	
$( "#datepicker" ).datepicker({
	numberOfMonths: 2,
	showButtonPanel: true,
	dateFormat: "dd.mm.yy",		
	
	// Redraw default template with custom buttons
	beforeShow: function( input ) {
		setTimeout(function() {
			const 
				$widget = $( input ).datepicker( "widget" ),
				$buttonPane = $widget.find( ".ui-datepicker-buttonpane" ); 
					
			$buttonPane.find('button').remove();
					
			colors.forEach(color => {
				$buttonPane.get(0).appendChild(renderButton(color));	
			});	
		});			
	}
});


// Fetch data on first start
updateDatepicker(colors[0]);