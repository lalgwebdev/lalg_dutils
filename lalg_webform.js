// **********************************************************************
// Various jQuery functions to improve the display of Webforms
//
// *******************  Revert to using $ for jQuery
(function( $ ) {

$(document).ready(function(){
//	console.log("Webform Loaded");
	
//*******************************************************************	
//  Open Additional Household Member filesets on Webforms if they have content.

//	Check whether filesets have content when each page loaded
//	First Page of Webform (Input Fields)
	$("fieldset.lalg-wf-fs-additional-member input.form-text").each(function(index, el) {
//	console.log('Input field found');
		if ($(this).val()) {
			$(this).parent().parent().css("display", "block");
			$(this).parent().parent().parent().removeClass("collapsed");
		};	
	});

//	Confirmation Page of Webform (Text Fields)
	$("fieldset.lalg-wf-fs-additional-member .webform-component-display " ).each(function(index, el) {
//	console.log('Input field found');
		var text = $(this).contents().not($(this).children()).text().trim() ;
//	console.log(text);		
		if (text) {
			$(this).parent().css("display", "block");
			$(this).parent().parent().removeClass("collapsed");
		};	
	});
	
//***************************************************************
// Default Printed Card Required Flag when Membership Type changed
	$("select.lalg-wf-membership-type").change(function(){
//		console.log($(this).val());
		if($(this).val()) {
			$("input#edit-submitted-membership-details-civicrm-2-contact-1-cg8-custom-18-1").click();
		} else {
			$("input#edit-submitted-membership-details-civicrm-2-contact-1-cg8-custom-18-2").click();
		}
	});

//***************************************************************
// Default Membership Type Type Required to None on first load
//	console.log(document.referrer);
	if (!document.referrer.includes('admindetails')) { 
		$("select.lalg-wf-membership-type :nth-child(1)").prop('selected', true);
	}

//****************************************************************
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
	
//****************************************************************
// Copy Postcode into clone fields on Contact when Next Page clicked
	$(".form-actions input.webform-next").click(function(){
		var pc = $("input.lalg-wf-postcode").val();
//		console.log(pc);
		// Always do Member 1
		$("fieldset.lalg-wf-fs-member1 input.lalg-wf-postcode-clone").val(pc);
		// Check each Additional Member to see if it exists
		$("fieldset.lalg-wf-fs-additional-member input.form-text").each(function(index, el) {
			if ($(this).val()) {
				$(this).parent().parent().find("input.lalg-wf-postcode-clone").val(pc);
			};	
		});	
	});
	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	

