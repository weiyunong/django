$(function(){
	var strSum = "";
	var rtestPwd=$('.txt5_botr');
	function testP(){
	    for(var i=0;i<4;i++){   
	        var isTure = parseInt(Math.random()*100)%3; //0 1  0是数字   1是字母 
	        var num = 0;
	        if(isTure == 0){num = parseInt(Math.random()*100)%10 +48;}
	        else if(isTure == 1){num = parseInt(Math.random()*100)%26 +65;}
	        else {num = parseInt(Math.random()*100)%26 +97;}
	        var str = String.fromCharCode(num);
	        strSum = strSum.concat(str);
        }
	} 
	//生成随机验证码
	var str_postcode;
	$('.txt5_botr_r').bind('click',function(event){
		    event.preventDefault();
		    strSum = "";
		    testP();
		    rtestPwd.val(strSum);
		    //输入验证码
	        $('.txt5_botl').focus().blur(function(){
	        	str_postcode = $('.txt5_botl').val();
	        	if(str_postcode==rtestPwd.val()){
	        		console.log($(this));
	        		$(this).css('border','1px solid #e50065');
	        	}else{
	        		$(this).css('border','1px solid #999');
	        	}
	        })	
	}).triggerHandler('click');
	
	
	//邮箱验证
	var isTure1;
	var isTure2;
	$('.txt1_in').focus().blur(function(){
		var reg1 = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\.[a-zA-Z]+$/;
	    var str_email = $('.txt1_in').val();
	    isTure1 = reg1.test(str_email);
	    if(!str_email){
	    	$('.true_rlable1').hide().siblings('.flase_rlable1').hide();
	    	$(this).css('border','1px solid #C9C9C9');
	    }else{
	    	if(isTure1){
	    	    $('.true_rlable1').show().siblings('.flase_rlable1').hide();
	    	    $(this).css('border','1px solid #C9C9C9');
	        }else{
	            $('.true_rlable1').hide().siblings('.flase_rlable1').show();
	            $(this).css('border','1px solid #e50065');
	        }
	    }
	    //验证手机
	    $('.txt2_in').blur(function(){
	        var reg2 = /^1[3578]\d{9}$/;
	        var str_phone = $('.txt2_in').val();
	        isTure2 = reg2.test(str_phone);
	        if(!str_email&&!str_phone){
	        	$('.flase_rlable2').show(); 
	        	$('.flase_rlable22').hide();
	        }else{
	        	$('.flase_rlable2').hide(); 
	        	if(isTure2){
	        		$('.true_rlable2').show().siblings('.flase_rlable22').hide();
	        		$(this).css('border','1px solid #C9C9C9');
	        	}else{
	        		$('.true_rlable2').hide().siblings('.flase_rlable22').show();
	                $(this).css('border','1px solid #e50065');
	        	}
	        }
	    })
	}) 
	
	//验证密码
	var isTure3;
	$('.txt3_in').blur(function(){
	    var reg3 =/^[a-zA-Z1-9]\w{7,19}$/g;
	    var str_pwd = $('.txt3_in').val();
	    isTure3 = reg3.test(str_pwd);
	    var isTure=false;
	    if(!str_pwd){
	    	$('.flase_rlable3').show(); 
	    	$('.flase_rlable33').hide(); 
	    	isTure=false;
	    }else{
	    	$('.flase_rlable3').hide(); 
	    	if(isTure3){
	    	    $('.true_rlable3').show().siblings('.flase_rlable33').hide();
	        	$(this).css('border','1px solid #C9C9C9');
	        	isTure=true;	        		       	
	    	}else{
	        	$('.true_rlable3').hide().siblings('.flase_rlable33').show();
	            $(this).css('border','1px solid #e50065');
	            $('.flase_rlable333').hide();
	            isTure=false;
	    	}
	    }
	    
	    var reg31 =/^[a-z]{8,20}$/g;
	    var reg32 =/^[A-Z]{8,20}$/g;
	    var reg33 =/^[1-9][0-9]{7,19}$/g;
	    var reg34 =/^[a-zA-Z1-9][a-zA-Z0-9]{7,19}$/g;
	    var reg35 =/^[a-zA-Z1-9][a-zA-Z0-9_+]{7,19}$/g;
	    if(isTure){
	    	$('.flase_rlable333').show();
	    	if(reg31.test(str_pwd)||reg32.test(str_pwd)||reg33.test(str_pwd)){
	    	    $('.flase_rlable333').css('backgroundPosition','0 -14px');
	    	}else if(reg34.test(str_pwd)){
	    		$('.flase_rlable333').css('backgroundPosition','0 -28px');
	    	}else if(reg35.test(str_pwd)){
	    		$('.flase_rlable333').css('backgroundPosition','0 -42px');
	    	}
	    }
	})	
	
	//确认密码
	var str_confirmpwd;
	var str_pwd;
	$('.txt4_in').blur(function(){
	    str_confirmpwd = $('.txt4_in').val();
	    str_pwd = $('.txt3_in').val();
	    if(!str_confirmpwd){
	    	$('.flase_rlable4').show();
	    	$('.flase_rlable44').hide(); 
	    }else{
	    	$('.flase_rlable4').hide(); 
	   		if(str_pwd==str_confirmpwd ){
	   	        $('.true_rlable4').show().siblings('.flase_rlable44').hide();
	   	        $(this).css('border','1px solid #C9C9C9');
	        }else{
	   	        $('.true_rlable4').hide().siblings('.flase_rlable44').show();
	            $(this).css('border','1px solid #e50065');
	        }
	    }
	})	
	

    		
	//如果已经存在该用户, 不能注册
	//不存在则注册, 保存到cookie	
	$("input.txt6_in").click(function(){							
		//注册(cookie存储)
		var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
		//先判断是否存在该用户
		for (var i=0; i<users.length; i++) {
			if ( users[i].name == $('.txt1_in').val()|| users[i].name == $('.txt2_in').val()) {
				console.log( $.cookie("users") );
				alert("用户名已存在! 不能注册相同的用户");
				return;
			}else if(users[i].name != $('.txt1_in').val()|| users[i].name != $('.txt2_in').val()){
				if(confirm("注册成功，点击确定回到登录页面")){
					window.location.href="login.html";
				}else{
					window.close();
				}
			}
		}
		
		if($('input.txt7_in').is(':checked') && str_pwd==str_confirmpwd && isTure3 && (isTure2 || isTure1||(isTure1 && isTure2)) && str_postcode==rtestPwd.val()){
			//注册用户
		    var user = {
		    	name: $('.txt1_in').val(),
		    	pwd: $('.txt3_in').val()
		    }
		    var user1 = {
		    	name: $('.txt2_in').val(),
		    	pwd: $('.txt3_in').val()
		    }
		    users.push(user); 	
		    users.push(user1); 
		    $.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
//		    console.log( $.cookie("users") );
		}
	})

})
