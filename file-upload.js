$(".uploadFile").on('click', function() {			
	var ext = "."+$(this).attr('id').replace("upload-","");
	if(ext===".ea") $('#file-chooser').prop("accept", ".xml");
	else $('#file-chooser').prop("accept", ext);	
	$('#file-chooser').trigger('click');
});

$("#file-chooser").change(function(){
	var ext = $('#file-chooser').prop("accept").replace(".","");
	if(ext==="xml") ext = "ea";
	var file = $('#file-chooser')[0].files[0];	
	uploadFile(ADDR+"api/upload/"+ext,file, loadJSTree); /** loadJSTree() is loaded from 'tree.js' */
});				

/** Upload file to the server via ajax. 
  * If file is succesfully uploaded, it calls 'callback' method to execute  */
function uploadFile(apiUrl, blobFile, callback) {
	var fd = new FormData();
	fd.append("file", blobFile);
	$.ajax({
	   url: apiUrl,
	   type: "POST",
	   data: fd,
	   processData: false,
	   contentType: false,	
	   success: function(response) {
          callback(ADDR+"api/tree/package-hierarchy");
		  console.log(response)
	   },
	   error: function(jqXHR, textStatus, errorMessage) {
		  console.log(errorMessage);
	   }
	})
}



