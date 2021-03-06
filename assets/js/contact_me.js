---
---
$(function() {

	$("input,textarea").jqBootstrapValidation({
		preventSubmit: true,
		submitError: function($form, event, errors) {
			// additional error messages or events
		},
		submitSuccess: function($form, event) {
			event.preventDefault(); // prevent default submit behaviour
			// get values from FORM
			var name = $("input#name").val();
			var email = $("input#email").val();
			var phone = $("input#phone").val();
			var message = $("textarea#message").val();
			var subject = $("input#subject").val();

			var firstName = name; // For Success/Failure Message
			// Check for white space in name for Success/Fail message
			if (firstName.indexOf(' ') >= 0) {
				firstName = name.split(' ').slice(0, -1).join(' ');
			}
			$.ajax({
				url: "//formspree.io/{{site.email}}",
				type: "post",
				data: {
					name: name,
					_replyto: email,
					message: message,
					_subject: subject + (phone ? " - " + phone : '')
				}, 
				dataType: "json"
			}
			).success(function() {
				$('#success').html("<div class='alert alert-success'>");
				$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
					.append("</button>");
				$('#success > .alert-success')
					.append("<strong>Wiadomość została wysłana!</strong>");
				$('#success > .alert-success')
					.append('</div>');

				//clear all fields
				$('#contactForm').trigger("reset");
			}).error(function() {
				// Fail message
				$('#success').html("<div class='alert alert-danger'>");
				$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
					.append("</button>");
				$('#success > .alert-danger').append("<strong>Błąd przy wysyłaniu wiadomości!");
				$('#success > .alert-danger').append('</div>');
				//clear all fields
				$('#contactForm').trigger("reset");
			});
		},
		filter: function() {
			return $(this).is(":visible");
		},
	});

	$("a[data-toggle=\"tab\"]").click(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
});
