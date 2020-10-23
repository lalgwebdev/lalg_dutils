// **********************************************************************
// jQuery functions to provide validation functions on Registration form
//

// *******************  Revert to using $ for jQuery
(function( $ ) {

$(document).ready(function(){
//console.log("Register form Loaded");

// **********************  One-off functions on Page load  **************
	$('div#helprow-first_name div.description').css({'font-weight':'bold'});


// *********************  Capitalise Postcode field  ********************
// *********************  and check valid format     ********************
	$("input#postal_code-Primary").change(function(){
		$(this).val($(this).val().toUpperCase());
		$(this).val($(this).val().trim());
		$(this).val($(this).val().replace("   ", " "));
		$(this).val($(this).val().replace("  ", " "));
		
		valid = $(this).val().match(/^[A-Z]\d \d[A-Z]{2}$|^[A-Z]\d\d \d[A-Z]{2}$|^[A-Z]{2}\d \d[A-Z]{2}$|^[A-Z]{2}\d\d \d[A-Z]{2}$|^[A-Z]\d[A-Z] \d[A-Z]{2}$|^[A-Z]{2}\d[A-Z] \d[A-Z]{2}$/);
//		console.log(valid);
		if (valid) {
			$('div#helprow-postal_code-Primary div.description').text('');
			$('div#edit-actions input#edit-submit').prop('disabled', false);
		}
		else {
			$('div#helprow-postal_code-Primary div.description').text('The Postcode format is incorrect, please correct it.').css({'font-weight':'bold', 'color':'red'});
			$('div#edit-actions input#edit-submit').prop('disabled', true);
		}
	});
	
// **********************  Check Names have Upper and Lower Case  **************************
	$("input#first_name").change(function(){
		uc = $(this).val().match(/[A-Z]/);
		lc = $(this).val().match(/[a-z]/);
//		console.log(uc);
//		console.log(uc != null && lc != null);
		if (uc != null && lc != null) {
			$('div#helprow-postal_code-Primary div.description').text('');
			$('div#edit-actions input#edit-submit').prop('disabled', false);
		}
		else {
			$('div#helprow-postal_code-Primary div.description').text('Names should contain both upper and lower case letters.').css({'font-weight':'bold', 'color':'red'});
			$('div#edit-actions input#edit-submit').prop('disabled', true);
		}		
	});
	
	$("input#last_name").change(function(){
		uc = $(this).val().match(/[A-Z]/);
		lc = $(this).val().match(/[a-z]/);
		if (uc != null && lc != null) {
			$('div#helprow-postal_code-Primary div.description').text('');
			$('div#edit-actions input#edit-submit').prop('disabled', false);
		}
		else {
			$('div#helprow-postal_code-Primary div.description').text('Names should contain both upper and lower case letters.').css({'font-weight':'bold', 'color':'red'});
			$('div#edit-actions input#edit-submit').prop('disabled', true);
		}		
	});
	

	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	