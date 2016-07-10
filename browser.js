$(function(){
	install();
	onchange();
})

function install(){
	var treeViewButtonTemplate = browserDoc.querySelector('#tree-view-button');	 
	if($('#tree-view-button').length) return
	var treeViewButton = document.importNode(treeViewButtonTemplate, true);
	document.querySelector('#menubar-container').appendChild(treeViewButton);
	
	var browserTemplate = browserDoc.querySelector('#browser');	 	
	if($('#browser').length) return	
	var browser = document.importNode(browserTemplate, true);	
	document.querySelector('#left-area').appendChild(browser);
}	

function onchange(){
	$('#tree-view-button').on('change', function(){
		var selected = $(this).find("option:selected").val();		
		load_tree_from(ADDR+"api/tree/"+selected)		
	});  
}

/** install node double-click listener */
$('#jstree').bind("dblclick.jstree", function (event){
   var node = $(event.target).closest("li");
   var data = node.data("jstree");
   var elemId = node.attr('id');
   var elemName = node[0].innerText;
   opendetails(elemName, elemId);
});

/** load tree from server via ajax */
function load_tree(){
	var selected = $('#tree-view-button').find("option:selected").val();		
	var url = ADDR+"api/tree/"+selected;
	load_tree_from(url);
}

/** load tree from server via ajax */
function load_tree_from(url){	
	$('#jstree').jstree("destroy");
    $('#jstree').jstree({
		'core' : { 
		  "multiple" : false,
		  'data' : {			
			"url" : url,
			"dataType" : "json",
		  }
		},
		"types": tree_icontypes(),
		"plugins" : [ "types" ]
	})
}

/** get json for jstree icon-types */
function tree_icontypes(){
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
