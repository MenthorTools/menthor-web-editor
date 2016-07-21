/** On click at the menuitem, open dialog */
$(".uploadFile").on('click', function() {

	//dialog name & file type
	var dialogName = "Upload "+$(this).children().html();
	var fileType = $(this).attr('id').replace("upload-","");
	
	//dialog's HTML options
	var htmlOptions = html_options(fileType)	
	
	//open dialog
	open_dialog(dialogName, htmlOptions);
});

/** Get HTML options according to a fileType {json,ea,refontouml} */
function html_options(fileType)
{	
	//clone template
	var htmlFileChooser = document.importNode(fileChooserTemplate, true); 
	
	//accept file type
	var htmlFileInput = htmlFileChooser.querySelector('#file-input');
	if(fileType==="ea") htmlFileInput.accept = "."+"xml";
	else htmlFileInput.accept = "."+fileType;
	htmlFileInput.addEventListener('change', function(event){		
		if($(this)[0].files[0]===null) return
		htmlFileChooser.querySelector('#file-path').innerHTML = "  "+$(this)[0].files[0].name+"";
	});
	
	//button click event
	var htmlButton = htmlFileChooser.querySelector('#browse-button');
	htmlButton.addEventListener('click', function(event){		
		if(event.target.id != 'browse-button'){ 
			this.querySelector('#file-input').click(); 
		}	
	});
			
	//HTML result
	var htmlResult = document.createElement("div");
	htmlResult.appendChild(htmlFileChooser);
	if(fileType==="refontouml") htmlResult.appendChild(document.importNode(refOptionsTemplate, true));
	if(fileType==="ea") htmlResult.appendChild(document.importNode(eaOptionsTemplate, true));	
	return htmlResult
}

/** Open upload dialog */
function open_dialog(dialogName, htmlContent)
{	
	var dialog = new BootstrapDialog({
		type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		title: dialogName,
		animate:false,
		autospin: true,
		message: htmlContent,
		hotkey:13,//enter
		buttons: [{label: 'Upload', autospin: true, cssClass: 'btn-primary', 
			action: function(dialog){ upload(dialog); dialog.close();}
		}]
	});
	dialog.open();		
	dialog.getModal().css('background-color','rgba(255,255,255,0.3)');
}

/** Upload file with options to the server via ajax */
function upload(dialog)
{
	//set url
	var fileExtension = $("#file-input").prop('accept').replace(".","")	
	if(fileExtension==="xml") fileExtension = "ea";
	var url = ADDR+"api/upload/"+fileExtension
	
	//get file
	var file = $("#file-input")[0].files[0];
	if(file===null) return;
	
	//create form
	var form = new FormData();
	form.append("file", file);
	
	//upload form
	if(fileExtension==='json') ajax_post(url,form,load_tree); 
	else {
		append_options_to_form(fileExtension, form);
		ajax_post(url,form,load_tree);
	}
}

function append_options_to_form(ext, form)
{
	if(ext==='refontouml'){
		var ignorePackages = $("#refontouml-ignore-package").is(':checked');					
		var classesAsEvents = $("#refontouml-classes-as-events").is(':checked');	
		form.append("ignore-package",ignorePackages);
		form.append("classes-as-events",classesAsEvents);	
	}
	if(ext==='ea'){
		var unnamed = $("#ignore-unnamed-eatypes").is(':checked');					
		var mult = $("#set-1-eamultiplicities").is(':checked');	
		form.append("unnamed-types",unnamed);
		form.append("default-multiplicities",mult);	
	}
}

function ajax_post(url, formData, callback) 
{	
	$.ajax({url: url, type: "POST", data: formData, processData: false, contentType: false,	
		success: function(response) { 
			callback(); 
			console_append(response); 
			//show_success("File has been successfully uploaded.");
		},
		error: function(jqXHR, textStatus, errorMessage) { 
			console_append(errorMessage); 
			show_error("File could not be uploaded.");
		}
	});
}
