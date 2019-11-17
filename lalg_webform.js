// **********************************************************************
// Various jQuery functions to improve the display of Webforms
//
// *******************  Revert to using $ for jQuery
(function( $ ) {

$(document).ready(function(){
//	console.log("Webform Loaded");
	
//************************* ACCORDIONS ******************************************	
//  Open Additional Household Member filesets on Webforms if they have content.

//	Check whether filesets have content when each page loaded
//	First Page of Webform (Input Fields)
	$("fieldset.lalg-wf-fs-additional-member input.lalg-wf-lastname").each(function(index, el) {
//	console.log('Input field found');
		if ($(this).val()) {
			$(this).parent().parent().css("display", "block");
			$(this).parent().parent().parent().removeClass("collapsed");
		};	
	});

//	Confirmation Page of Webform (Text Fields)
	$("fieldset.lalg-wf-fs-additional-member .webform-component-display.lalg-wf-lastname").each(function(index, el) {
//	console.log('Input field found');
		var text = $(this).contents().not($(this).children()).text().trim() ;
//	console.log(text);		
		if (text) {
			$(this).parent().css("display", "block");
			$(this).parent().parent().removeClass("collapsed");
		};	
	});

//*********************** DEFAULTS ****************************************
// Actions required on first load of first page

// Actions for End-User Form
// For the Send Membership Documents field
	$('div.form-radios.lalg-wf-user-card-reqd').each(function() {
		if ($('div.form-radios.lalg-wf-membership-type').is(':visible')){
			// If Membership Renewal is shown, and mandatory, set the Printed Card Flags and hide them
			$('div.lalg-wf-email-mship-receipt.form-radios div:nth-of-type(1) input').click();
			$('div.lalg-wf-user-card-reqd.form-radios div:nth-of-type(1) input').click();
			$('div.lalg-wf-user-card-reqd-wrapper').hide();
		}
		else {
			// If no Membership renewal option shown then change label.
			$(this).parent().find('> label').text('Replacement Membership Card');	
		}	
	});

// Default Membership Type Type Required to None on first load
//	console.log(document.referrer);
	if (!document.referrer.includes('admindetails')) { 
//		console.log('Setting Type Required = None');
		$("select.lalg-wf-membership-type :nth-child(1)").prop('selected', true);
	}
		
//*************************** DOCUMENT TYPE & DELIVERY ************************************
// Actions when Membership Type changed
	$(".lalg-wf-membership-type").change(function(){
//		console.log($(this).val());
	// Set Email Newsletter Option if Plain Membership selected
		if($(this).val() == 7) {
			$("input.lalg-wf-emailoptions[data-civicrm-field-key$='contact_1_cg4_custom_9']" ).prop('checked', true);
		}
		
		// Set Membership Card Flags when Membership selected or deselected
		if ($(this).val()) {
			// Some Membership selected - Set flags 
			$('div.lalg-wf-email-mship-receipt.form-radios div:nth-of-type(1) input').click();
			$('div.lalg-wf-card-reqd.form-radios div:nth-of-type(1) input').click();	// Admin Form
		}
		else {
			// No Membership selected - Clear flags
			$('div.lalg-wf-email-mship-receipt.form-radios div:nth-of-type(2) input').click();
			$('div.lalg-wf-card-reqd.form-radios div:nth-of-type(2) input').click();	// Admin Form
		}
	});
	
// Replacement Card Actions
	// Printed card request changed
	$('div.lalg-wf-user-card-reqd.form-radios input').change(function(){
//		console.log($(this).val());
		// Check Replacement Card state
		if (!$('div.form-radios.lalg-wf-membership-type').is(':visible')){
			// Card requested - set email flag
			if($(this).val() == 1) {
				$('div.lalg-wf-email-mship-receipt.form-radios div:nth-of-type(1) input').click();
			}
			// Clear email flag
			else {
				$('div.lalg-wf-email-mship-receipt.form-radios div:nth-of-type(2) input').click();
			}
		}
	});		
	

//*********************** OTHERS *****************************************
// Default Household Name for new Contact	
	$("input.lalg-wf-lastname").blur(function(){
		if(!$("input.lalg-wf-hhname").val()) {
			$("input.lalg-wf-hhname").val($(this).val() + ' Household');
		}
	});	
	
//****************************************************************
// Capitalise Postcode fields
	$("input.lalg-wf-postcode").blur(function(){
//	   console.log('Postcode blur');
	  $(this).val( $(this).val().toUpperCase() );
	});	

	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	

