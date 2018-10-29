$(function(){
	//右侧楼梯效果
	var boxTop=$('.contentbox').offset().top;
	$(window).scroll(function(){
		var _scrollTop = $(document).scrollTop();
		if (_scrollTop >= boxTop) {
			$(".sideNav").show(); //显示
		}
		else {
			$(".sideNav").hide(); //隐藏
		}
	})
				
	var isMoving = false;  
	$('.sideNavWrap li').click(function(){
		//改变菜单点击样式
		$(this).find('span').removeClass().addClass('sideactive')
		       .parent().siblings().find('span').removeClass();
		
		//获得菜单栏li下标得到相应div的offsetTop  用来设置html的scrollTop位置
		var index=$(this).index();
				console.log( $('.stair').length)
        var top=$('.stair').eq(index).offset().top;

		isMoving = true; 
		$('body,html').stop().animate({scrollTop:top},500,function(){
			   isMoving = false;  
		}); 
	})
	
	$(window).scroll(function(){
		if(!isMoving){
			var _scrollTop = $(document).scrollTop();
		    //遍历每一个div的offsetTop  与 document.scrollTop作比较
		    var m=0;
		    $('.stair').each(function(i,element){
			    var _top = $(this).offset().top;
                var _d = _scrollTop > _top-100;
                if(_d){
             	    m = i;
                }
		    })
		    $('.sideNavWrap li').eq(m).find('span').removeClass().addClass('sideactive')
		                        .parent().siblings().find('span').removeClass('sideactive');
		}
	})	
})
