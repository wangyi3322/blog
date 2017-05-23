function toast(msg,time){
	this.msg = msg;
	this.showTime = time || 1500;
	this.createCoast();	
	this.showCoast();
}
toast.prototype = {
	createCoast:function(){
		var html = '<div class="coast">' + this.msg + '</div>';
		this.$html= $(html);		
		$('body').append(this.$html);		
	},
	showCoast:function(){
		var self = this;
		self.$html.fadeIn('300',function(){
			setTimeout(function(){			
				self.$html.remove();
			},self.showTime);
		});		
	}
}
function Toast(msg,time){
	return new toast(msg,time);
};