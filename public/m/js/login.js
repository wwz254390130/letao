$(function(){
  
$('.btn-login').on('tap',function(){
    var user =$('.username').val().trim();
    var passwd = $('.passwd').val().trim();
    if(!user){
        mui.alert('请输入用户名','温馨提示');
        return false;
    }
    if(!passwd){
        mui.alert('请输入密码','温馨提示');
        return false;
    }
    $.ajax({
        url:'/user/login',
        type:'post',
        data:{username:user,password:passwd},
        success:function(data){

            console.log(data);
            
            if(data.success){
                var href = getQueryString('returnURL');
                console.log(href);
            
                if(href ==null ){
                    location= 'user.html';
                }else{
                    location= href;
                }
               
            }else{
                mui.alert(data.message,'温馨提示');
                return false;
            }
        }
    })
})

$('.btn-register').on('tap',function(){
    
    location ='register.html';
})


    // function verify(){
  
    //     mui(".mui-input-group input").each(function() {
    //         //若当前input为空，则alert提醒 
    //         if(!this.value || this.value.trim() == "") {
    //             var label = this.previousElementSibling;
    //             mui.alert(label.innerText + "不允许为空");
    //             check = false;
    //             return false;
    //         }
    //         }); //校验通过，继续执行业务逻辑 
    //         if(check){
    //             mui.alert('验证通过!')
    //         }
    // }
        //获取地址url的函数
        function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            // console.log(r); 
            if (r != null) return decodeURI(r[2]);
            return null;
        }
        
})