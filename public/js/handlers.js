var battle = battle || {};

battle.handlers = {

	addPage: function(event) {
    // stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		// get the form data
		var formData = {
			'key': $.trim($("#key").val()),
			'encryptedtext': $.trim(simplemde.value()),
			'cleartext': $('#cleartext').val()
		};
		
		battle.models.addPage(formData);
	},
	
	decryptPage: function(event) {
    // stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		
		$("#pagetext").empty();
    var key = $.trim($("#key").val());
		var encryptedText = $('#datafromserver').val();
		var decryptedText = battle.crypto.decrypt(encryptedText,  $.trim(key));
		
		var encryptedToken = $('#encrypted_token').val();
		var decryptedToken = battle.crypto.decrypt(encryptedToken,  $.trim(key));
		
		var html = 'Not decrypted!';
		if("Can you see this?" === $.trim(decryptedToken)) {
			$('#encrypted-text-callout').removeClass('bs-callout-success');
			$('#encrypted-text-callout').removeClass('bs-callout-danger');
			$('#encrypted-text-callout').addClass('bs-callout-success');
			html = markdown.toHTML(decryptedText);
		}
		else {
			$('#encrypted-text-callout').removeClass('bs-callout-success');
			$('#encrypted-text-callout').removeClass('bs-callout-danger');
			$('#encrypted-text-callout').addClass('bs-callout-danger');
		}

		$("#pagetext").html(html);
	},
	
	convertMarkdown: function(event) {
    // stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		var text = $('textarea#encryptedtext').val();
		var html = markdown.toHTML(text);
		$('#prev').html(html);
	}

};