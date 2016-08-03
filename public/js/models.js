var battle = battle || {};

battle.models = {

	addPage: function(formData) {

		if (formData.key !== "") {
			var encryptedData = battle.crypto.encrypt(formData.encryptedtext, $.trim(formData.key));
			formData.encryptedtext = encryptedData;
			// Encrypt and swap out the text prior to form submission
			$("#encryptedtext").val(encryptedData);
			
			var encryptedToken = battle.crypto.encrypt("Can you see this?", $.trim(formData.key));
			formData.encryptedToken = encryptedToken;
			// Encrypt and swap out the text prior to form submission
			$("#encrypted_token").val(encryptedToken);
		}

		$('#addpageform').ajaxSubmit({
			error: function(xhr) {
				status('Error: ' + xhr.status);
			},
			beforeSubmit: function(contentArray, $form, options) {

			},
			success: function(response) {
				if (response.status === 0) {
					window.location.href = '/page/' + response.redirect;
				} else
					window.location.href = '/pages/add';
			},
			fail: function(err) {
				alert("ssss");
			}
		});

		//Very important line, it disable the page refresh.
		return false;
	}


};