var Dialog = (function(){

	var $dialog;

	createHtml(); 
	bind();		  

	function open(opts){			
		$dialog.find('.dialog-content').html(opts);
		showDialog();
	}

	function createHtml(){
		var html = '<div class="dialog">'
					+	'<div class="dialog-overlay"></div>'
					+	'<div class="dialog-box">'
					+		'<div class="dialog-header"></div>'
					+		'<div class="dialog-content">'
					+			''
					+		'</div>'
					+		'<div class="dialog-footer">'
					+			'<a href="#" class="btn clone-btn">确定</a>'
					+		'</div>'
					+	'</div>'
					+'</div>';
		$dialog = $(html);
		$('body').append($dialog);
	}

	function bind(){
		$dialog.find('.clone-btn').on('click',function(){
			hideDialog();
		});
	}

	function showDialog(){
		$dialog.show();
	}

	function hideDialog(){
		$dialog.find('.dialog-box').animate({
			top : '-30%'
		},300,function(){
			$dialog.fadeOut();
		});		
	}

	function showDialog(){
		$dialog.fadeIn();
		$dialog.find('.dialog-box').animate({
			top: '30%'
		},300);
	}

	return {
		open: open
	}

})()
