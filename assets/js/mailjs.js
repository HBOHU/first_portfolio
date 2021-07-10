function sendMail() {
    var tempParams = {
        from_name: document.getElementById("name").value,
        from_mail: document.getElementById("mail").value,
        message: document.getElementById("message").value,
    };
    emailjs.send('service_icap7vg', 'template_siyx4gr', tempParams)
        .then(function (res) {
            $(':input', '#mail_form')
                .not(':button, :submit, :reset, :hidden')
                .val('');
            if (res.status == 200) {
                console.log("succesfull send via mailjs.");
            } else {
                // not succes
            }
        });
};