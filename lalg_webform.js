// **********************************************************************
// Various jQuery functions to improve the display of Webforms
//
// *******************  Revert to using $ for jQuery
(function( $ ) {

$(document).ready(function(){
//	console.log("Webform Loaded");
	
//************************* ACCORDIONS ******************************************	
//  Open Additional Household Member filesets on Webforms if they have content.
//  Runs once on page load.

//  ****************  All pages of the Webform  ************
//	Hide all Filesets except the first. (I.e any one that follows another one)
	$("fieldset.lalg-wf-fs-additional-member + fieldset.lalg-wf-fs-additional-member").hide();
	
	// When fileset is expanded manually show the next one
	$("fieldset.lalg-wf-fs-additional-member a.fieldset-title").click(function(){
//		console.log('Fileset Changed');
		if (!($(this).parent().parent().parent().hasClass("collapsed"))) {
			$(this).parent().parent().parent().next("fieldset.lalg-wf-fs-additional-member").show();
		}
	});	
	
//	*************  First Page of Webform (Input Fields)  ************
//	Check whether filesets have content
	$("fieldset.lalg-wf-fs-additional-member input.lalg-wf-lastname").each(function(index, el) {
//	console.log('Input field found');
		if ($(this).val()) {
			// Be sure to unhide it
			$(this).parent().parent().parent().show();
			// Expand it
			$(this).parent().parent().css("display", "block");
			$(this).parent().parent().parent().removeClass("collapsed");
			// Show the next one
			$(this).parent().parent().parent().next("fieldset.lalg-wf-fs-additional-member").show();
		};	
	});

//	*************  Confirmation Page of Webform (Text Fields)  *******************
//	Check whether filesets have content
	$("fieldset.lalg-wf-fs-additional-member .webform-component-display.lalg-wf-lastname").each(function(index, el) {
//	console.log('Input field found');
		var text = $(this).contents().not($(this).children()).text().trim() ;
//	console.log(text);		
		if (text) {
			// Be sure to unhide it
			$(this).parent().parent().show();
			// Expand it
			$(this).parent().css("display", "block");
			$(this).parent().parent().removeClass("collapsed");
			// Show the next one
			$(this).parent().parent().next("fieldset.lalg-wf-fs-additional-member").show();
		};	
	});
	
// *********************** FUNCTIONS TO SET FLAGS ETC. DEPENDING ON STATE OF FORM  *************************
// *********************************************************************************************************

// *****************  First Time only on Page Load  *********************************
	// Default Membership Type Required to None on first load (Admin Form - User form has Radios)
	if (!document.referrer.includes('admindetails')) { 
		$("select.lalg-wf-membership-type :nth-child(1)").prop('selected', true);
	}
	
	// Unset and Hide Membership Type Required on User Details form, if Current Member.  (User Form only)
	//console.log(window.location.pathname);
	if ( window.location.pathname.indexOf('userdetails') >= 0) {
		$status = $('input.lalg-wf-membership-status').val();
		if ( $status.indexOf("Pending") >= 0 || $status.indexOf("New") >= 0 || $status.indexOf("Current") >= 0 ) { 
			$("input.lalg-wf-membership-type").prop('checked', false);
			$("div.lalg-wf-membership-type-wrapper").hide();
		}
	}
	
	// Hide Label of Replacement Request Tag
	$("div.lalg-wf-replace-tag label").hide();

// ******************  Call Set State function on first load, and change of Membership Type Required  ********
	lalg_set_flags();
	$("select.lalg-wf-membership-type").change(function(){ lalg_set_flags(); });
	$("input.lalg-wf-membership-type").change(function(){ lalg_set_flags(); });	
	$('input.lalg-wf-replace-tag').change(function(){ lalg_set_flags(); });

// *****************  Function called on page load and on changing Membership Type Requested
	function lalg_set_flags() {
		
// ***************************  Get information to work on  ************************
		$existingType = $('input.lalg-wf-existing-mship').val();		//console.log($existingType);
		$status = $('input.lalg-wf-membership-status').val();			//console.log($status);
		$userReq = false;
		$("input.lalg-wf-membership-type").each(function() {
			if ($(this).prop('checked')) {$userReq = true;}
		});																//console.log($userReq);
		$adminReq = $("select.lalg-wf-membership-type").val();			//console.log($adminReq);
		$membReq = Boolean( $userReq || $adminReq );					//console.log($membReq);
		$replace = false;
		$('input.lalg-wf-replace-tag').each(function() {
			if ($(this).prop('checked')) {$replace = true}				// Set if any Replacement Request set
		});
		
// ***************************  Set Membership Requested  *******************
		// Set Membership Requested flag if any Membership Type set.  Else clear flag.
		if( $membReq ) {
			$("div.lalg-wf-process-tag div:nth-of-type(1) input").prop('checked', true);
		}
		else {
			$("div.lalg-wf-process-tag div:nth-of-type(1) input").prop('checked', false);	
		}
		
// ***************************  Set Replacement Card visibility  *******************
		// Hide Replacement Card flag, and uncheck it, if:
		//   Any Membership Type selected, OR 
		//   Existing Type is Empty, or OTM OR
		//   Status is Pending, or Lapsed, or Cancelled
		if ( $membReq || !$existingType || $existingType.indexOf("Online") >= 0 ||
		   $status.indexOf("Pending") >= 0 || $status.indexOf("Lapsed") >= 0 || $status.indexOf("Cancelled") >= 0 ) { 
			$("div.lalg-wf-replace-tag-wrapper").hide();
			$("div.lalg-wf-replace-tag input").prop('checked', false);
		   }
		// Else show flag
		else { $("div.lalg-wf-replace-tag-wrapper").show(); }
		
// ***************************  Set Email Preferences  *******************
		// Set Newsletter flag, and disable it (to force the state), if Membership Type is Plain Membership
		if ($userReq == 7 || $adminReq == 7) {
			$("input.lalg-wf-emailoptions[data-civicrm-field-key$='contact_1_cg4_custom_9'][value=2]" ).prop('checked', true).prop('disabled', true);
		}
		// Else just Enable Newsletter flag
		else {
			$("input.lalg-wf-emailoptions[data-civicrm-field-key$='contact_1_cg4_custom_9'][value=2]" ).prop('disabled', false);
		}

// ***************************  Set Latest Membership Action  ******************
		$('input.lalg-wf-memact').val(0);							 
		
		// If any Replace Tag set then Action => Replace.  Can't be set at same time as Membership Requested
		// Override later if required.
		$('input.lalg-wf-replace-tag').each(function() {
			if ($(this).prop('checked')) {$('input.lalg-wf-memact').val(3);}
		});
		
		// Do nothing unless a Membership Type has been selected.
		if ( $membReq == true) {
			// If no existing membership then Action => Join
			if (!$existingType) {
				$('input.lalg-wf-memact').val(1);
			}
			else {
				// If Membership State Current or Renewable then Action => Renew
				if ($status.indexOf("New") >= 0 || $status.indexOf("Current") >= 0 || $status.indexOf("Renew") >= 0 || 
						$status.indexOf("Overdue") >= 0 || $status.indexOf("Pending") >= 0) {
					$('input.lalg-wf-memact').val(2);
				}
				// Other Membership status Action => Rejoin
				else {
					$('input.lalg-wf-memact').val(4);
				}
			}	
		}
//		console.log("Membership Action = " + $('input.lalg-wf-memact').val());	
	}
	

	
	
//*********************** VARIOUS OTHERS *****************************************
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
	
//**********************  Free Membership Only  *************************
// Hide Payment Method for Zero Total on Payment page
	$("tr#wf-crm-billing-total td:nth-child(2)").each(function() {
		if ($(this).text() == '£ 0.00') {
			$("div.webform-component--civicrm-1-contribution-1-contribution-payment-processor-id input[value=0]").prop("checked", true);
			$("div.webform-component--civicrm-1-contribution-1-contribution-payment-processor-id").hide();
		}
	});

	
});				// End Document Ready
})(jQuery);		// ******************* Close the $ reversion	

