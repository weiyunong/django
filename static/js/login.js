$(function(){
	//登录方法
	$('.method_txt').bind('click',function(){
		var index=$(this).index();
		$(this).removeClass('method_txton').addClass('method_txton').siblings().removeClass('method_txton');
		$(this).children('span').show().parent().siblings().children('span').hide();
		$('.login_style').find('form').eq(index).show().siblings().hide();
	})

	//四位验证码
    //parseInt(Math.random()*100)%10 +48;    0-9      48 -57
    //parseInt(Math.random()*100)%26 +65;    A-Z      65-90
    //parseInt(Math.random()*100)%26 +97;    a-z      97-122
	var strSum = "";
	var testPwd=$('.login_style_txt3_test');
	var testPwd1=$('.login_stylebox2_test');
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

	$('.login_style_txt3_r').bind('click',function(event){
		    event.preventDefault();
		    strSum = "";
		    testP();
		    testPwd.val(strSum);
		    //输入验证码
	        $('.login_style_txt3_teston').focus().blur(function(){
	        	str_postcode = $('.login_style_txt3_teston').val();
	        	if(str_postcode==testPwd.val()){
	        		console.log($(this));
	        		$(this).css('border','1px solid #e50065');
	        	}else{
	        		$(this).css('border','1px solid #999');
	        	}
	        })
	}).triggerHandler('click');

	$('.login_style_txt3_r1').bind('click',function(event){
		    event.preventDefault();
		    strSum = "";
		    testP();
	        testPwd1.val(strSum);
	        //输入验证码
	        $('.login_stylebox2_teston').focus().blur(function(){
	        	str_postcode = $('.login_stylebox2_teston').val();
	        	if(str_postcode==testPwd1.val()){
	        		console.log($(this));
	        		$(this).css('border','1px solid #e50065');
	        	}else{
	        		$(this).css('border','1px solid #999');
	        	}
	        })
	}).triggerHandler('click');


	//用户名匹配
	var isTurel1;
	var isTurel2;
	$('input.login_style_txt1_name').blur(function(){
		 var lreg1 = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\.\-]+\.[a-zA-Z]+$/;
		 var lreg2 = /^1[3578]\d{9}$/;
		 var loginName= $('.login_style_txt1_name').val();
		 isTurel1 = lreg1.test(loginName);
		 isTurel2 = lreg2.test(loginName);
	     if(!loginName){
	     	$('.flase_lable1').show().siblings('.flase_lable11').hide();
	     }else{
	     	$('.flase_lable1').hide();
	     	if(isTurel1 || isTurel2){
	     		$('.true_lable1').show().siblings('.flase_lable11').hide();
	        	$(this).css('border','1px solid #C9C9C9');
	     	}else{
	     		$('.true_lable1').hide().siblings('.flase_lable11').show();
	            $(this).css('border','1px solid #e50065');
	     	}
	     }
	})

	//密码匹配
	$('input.login_style_txt1_pwd').blur(function(){
		var loginPwd= $('.login_style_txt1_pwd').val();
		if(!loginPwd){
			$('.flase_lable2').show();
		}else{
			$('.flase_lable2').hide();
		}
	})

	//判断是否存在该用户(匹配用户名和密码是否都一致)
	$("input#txtLoginSub").click(function(){
		var users = $.cookie("users");
		console.log(users);
		if (users) {
			users = JSON.parse(users); //cookie中的所有注册过的用户
			var isExists = false; //表示是否存在该用户
			for (var i=0; i<users.length; i++) {
				if ( users[i].name == $("#txtLoginID").val() && users[i].pwd == $("#txtLoginPwd").val() && str_postcode==testPwd.val()) {
					$('#login_miss').hide();
					isExists = true;
					window.location.href="index.html";

					var indexlogin=[];
					var loginuser={
					    username: $("#txtLoginID").val(),
					    password: $("#txtLoginPwd").val()
					}
					indexlogin.push(loginuser);
					$.cookie("indexlogin",JSON.stringify(indexlogin), {expires:20, path:"/"});
				}
			}
			if (!isExists) {
				$('#login_miss').show();
			}
		}else{
			$('#login_miss').show();
	    }
	})

})
