// **********************************************************************
// jQuery functions to provide validation functions on Registration form
//

// *******************  Revert to using $ for jQuery
(function( $ ) {

$(document).ready(function(){
//console.log("Register form Loaded");

// *********************  Capitalise Postcode field  ********************
// *********************  and check valid format     ********************
	$("input#postal_code-Primary").change(function(){
		$(this).val($(this).val().toUpperCase());
		
		valid = $(this).val().match(/^[A-Z]\d \d[A-Z]{2}$|^[A-Z]\d\d \d[A-Z]{2}$|^[A-Z]{2}\d \d[A-Z]{2}$|^[A-Z]{2}\d\d \d[A-Z]{2}$|^[A-Z]\d[A-Z] \d[A-Z]{2}$|^[A-Z]{2}\d[A-Z] \d[A-Z]{2}$/);
//		console.log(valid);
		if (valid) {
			$('div#helprow-postal_code-Primary div.description').text('');
			$('div#edit-actions input#edit-submit').prop('disabled', false);
		}
		else {
			$('div#helprow-postal_code-Primary div.description').text('The Postcode format is incorrect, please correct it');
			$('div#edit-actions input#edit-submit').prop('disabled', true);
		}
	});


	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	