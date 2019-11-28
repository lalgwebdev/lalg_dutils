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

// Default Membership Type Type Required to None on first load (Admin Form - User form has Radios)
//	console.log(document.referrer);
	if (!document.referrer.includes('admindetails')) { 
//		console.log('Setting Type Required = None');
		$("select.lalg-wf-membership-type :nth-child(1)").prop('selected', true);
	}
// Hide 'Membership Requested' & 'Print Card' Tags, and Label of Replacement Request Tag
	$("div.lalg-wf-tag div:nth-of-type(1)").hide();
	$("div.lalg-wf-tag div:nth-of-type(2)").hide();
	$("div.lalg-wf-tag div:nth-of-type(3) label").hide();
	 
// Set Membership Requested Tag on User Form if Membership Type Required is visible (and mandatory)
	if ($("div.lalg-wf-membership-type.lalg-wf-user-form").is(':visible') ) {
		$("div.lalg-wf-tag div:nth-of-type(1) input").prop('checked', true);	
		$("div.lalg-wf-tag-wrapper").hide();
	}
		
//*************************** DOCUMENT TYPE & DELIVERY ************************************
// Actions when Membership Type changed 
	//(Admin Form only - User Form has Radios)
	$("select.lalg-wf-membership-type").change(function(){
//		console.log($(this).val());
	// Set Email Newsletter Option if Plain Membership selected
		if($(this).val() == 7) {
			$("input.lalg-wf-emailoptions[data-civicrm-field-key$='contact_1_cg4_custom_9']" ).prop('checked', true);
		}
	// Set 'Membership Requested' Tag & Hide all Tags if any Membership selected.
		if($(this).val()) {
//			console.log('Set Flag');
			$("div.lalg-wf-tag div:nth-of-type(1) input").prop('checked', true);
			$("div.lalg-wf-tag-wrapper").hide();
		}
		else {
			$("div.lalg-wf-tag div:nth-of-type(1) input").prop('checked', false);	
			$("div.lalg-wf-tag-wrapper").show();
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

