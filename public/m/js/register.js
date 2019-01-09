$(function () {

    var vcode;

    //点击获取验证码,把验证码存储起来
    $('.btn-vcode').on('tap', function () {
        $.ajax({
            url: '/user/vCode',
            success: function (data) {
                vcode = data.vCode;
                console.log(vcode);

            }
        })
    })
    $('.btn-register').on('tap', function () {

        mui(".mui-input-group input").each(function () {
            //若当前input为空，则alert提醒 
            var check =true;
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
            // if (check) {
            //     mui.alert('验证通过!')
            // }
           
        }); //校验通过，继续执行业务逻辑 
      
    
        // 获取表单数据
        var mobile = $('.mobile').val();
        var user = $('.user').val();
        var passwd1 = $('.passwd1').val();
        var passwd2 = $('.passwd2').val();
        var vcodeVal = $('.vcode').val()
        if (!(/^1[345678]\d{9}$/.test(mobile))) {
            mui.alert('手机号码有误,请重填!', '温馨提示!');
            return false;
        }

        if (passwd1 !== passwd2) {
            mui.alert('两次密码不一致,请重新输入!', '温馨提示!');
            return false;
        }
        if (vcode !== vcodeVal) {
            mui.alert('验证码不准确,请重新输入', '温馨提示!');
            return false;
        }

        $.ajax({
            url: '/user/register',
            type: 'post',
            data:{username:user,password:passwd1,mobile:mobile,vCode:vcode},
            success: function (data) {
                console.log(data);
                if(data.success){
                    location = 'login.html';
                }else{
                    mui.alert(data.message,'温馨提示')
                }

            }
        })

    })






})