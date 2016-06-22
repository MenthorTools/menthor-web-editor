$(function() {
	$('#tree-view').on('change', function(){
		var selected = $(this).find("option:selected").val();		
		loadJSTree(ADDR+"api/tree/"+selected)		
	});  
});

$('#jstree').bind("dblclick.jstree", function (event){
   var node = $(event.target).closest("li");
   var data = node.data("jstree");
   alert(node.attr('id'));
   
   //load details here
   //.....
   //.....
});

/** Load JS tree. Default view is set to package hierarchy */
function loadJSTree(url){
	$('#jstree').jstree("destroy");
    $('#jstree').jstree({
		'core' : { 
		  "multiple" : false,
		  'data' : {			
			"url" : url,
			"dataType" : "json",
		  }
		},
		"types": typeTreeConfig(),
		"plugins" : [ "types" ]
	})
}

/** type jstree config */
function typeTreeConfig(){
	return {
		"default" : {"icon" : ""},
		"class" : {"icon" : "/icon/type.png" },
		"package" : {"icon" : "/icon/package.png" },
		"datatype" : {"icon" : "/icon/type.png" },
		"type" : {"icon" : "/icon/type.png" },
		"meronymic" : {"icon" : "/icon/componentof.png" },
		"generalization" : {"icon" : "/icon/generalization.png" },
	}
}