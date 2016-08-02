var battle = battle || {};

battle.models = {


	addPage2: function(formData) {

	//	if (formData.text !== "") {

			if (formData.key !== "") {
				var encryptedData = battle.crypto.encrypt(formData.encryptedtext, $.trim(formData.key));
				formData.encryptedtext = encryptedData;
				$("#encryptedtext").val(encryptedData);
			}

			$('#addpageform').ajaxSubmit({
				error: function(xhr) {
					status('Error: ' + xhr.status);
				},
				beforeSubmit: function(contentArray, $form, options){ 

				},
				success: function(response) {
					if(response.status === 0) {
						window.location.href = '/page/' + response.redirect;
					}
					else
						window.location.href = '/pages/add';
				},
				fail: function(err) {
					alert("ssss");
				}
			});
	//	}
		//Very important line, it disable the page refresh.
		return false;
	},


	addPage: function(formData) {

		if (formData.encryptedtext !== "") {

			if (formData.key !== "") {
				var encryptedData = battle.crypto.encrypt(formData.encryptedtext, $.trim(formData.key));
				formData.encryptedtext = encryptedData;
			}

			// process the form
			$.ajax({
					type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
					url: '/pages/add', // the url where we want to POST
					data: formData, // our data object
					dataType: 'json', // what type of data do we expect back from the server
					encode: true
				})
				.success(function(response) {
					window.location.href = '/page/' + response.redirect;
				})
		}

	},


};