var battle = battle || {};

battle.handlers = {

	addPage: function(event) {
    // stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
		// get the form data
		var formData = {
			'key': $.trim($("#key").val()),
			'encryptedtext': $.trim($("#encryptedtext").val()),
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
		if("Can you see this?" === $.trim(decryptedToken))
			html = markdown.toHTML(decryptedText);

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