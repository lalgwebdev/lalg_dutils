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
	$('.form-radios.lalg-user-wf-senddocs').each(function() {
		// Hide 'None' if membership mandatory, Else change label and default to None 
//		console.log('Found Send Docs field');
		if ($('.form-radios.lalg-wf-membership-type').is(':visible')){
//			console.log('Membership type is visible');
			$(this).find('div.form-item:nth-child(3)').hide();
		}
		else {
			$(this).parent().find('> label').text('Replacement Membership Document');	
			$(this).find('div.form-item:nth-child(3) input').click();
		}	
	});

// Default Membership Type Type Required to None on first load
//	console.log(document.referrer);
	if (!document.referrer.includes('admindetails')) { 
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
	
	// Set Email Delivery if this Contact has Email address, else set By Post - User Form
		// First set all to be by email
		$('input.lalg-user-wf-senddocs[value="1"]').click();
		
		// Contact 1 is a special case - in 'wrong' place on form.  But Email mandatory, so that's OK.	
		// Additional Members - if no email addresses set By Post
		$('fieldset.lalg-wf-fs-additional-member input.lalg-user-wf-senddocs[value="2"]').each(function() {
			email = $(this).parents('.lalg-wf-fs-additional-member').find('input.lalg-wf-email');
			if (!email.val()) { $(this).click(); }
		});	
		
	// Set Email Delivery to By Post if membership selected - Admin Form
		if ($(this).val()) {
			$('input.lalg-admin-wf-senddocs[value="2"]').click();
		}
		else {
			$('input.lalg-admin-wf-senddocs[value="3"]').click();
		}
	});
	
//****************************************************************
// If Email added to Additional Member then set Delivery by Email (on User Form)
	$('fieldset.lalg-wf-fs-additional-member input.lalg-wf-email').blur( function() {
//		console.log($(this).val());
		if ($(this).val()) {
			$(this).parents('.lalg-wf-fs-additional-member').find('input.lalg-user-wf-senddocs[value="1"]').click();
		} else {
			$(this).parents('.lalg-wf-fs-additional-member').find('input.lalg-user-wf-senddocs[value="2"]').click();
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
	
//****************************************************************
// Copy Postcode into clone fields on Contact when Next Page clicked
// ************** Commented out - Not needed.  Pending deletion  *************
	// $(".form-actions input.webform-next").click(function(){
		// var pc = $("input.lalg-wf-postcode").val();
// //		console.log(pc);
		// // Always do Member 1
		// $("fieldset.lalg-wf-fs-member1 input.lalg-wf-postcode-clone").val(pc);
		// // Check each Additional Member to see if it exists
		// $("fieldset.lalg-wf-fs-additional-member input.form-text").each(function(index, el) {
			// if ($(this).val()) {
				// $(this).parent().parent().find("input.lalg-wf-postcode-clone").val(pc);
			// };	
		// });	
	// }); 
	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	

