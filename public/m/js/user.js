$(function () {

    $.ajax({
        url: '/user/queryUserMessage',
        success: function (data) {
            if (data.error) {

                location = 'login.html?returnURL' + location.href;
            } else {
               
                $('.userName').html(data.username);
                $('.mobile').html(data.mobile);
                document.documentElement.style.display = "block";
            }
        }
    })
    $('.logout').on('tap', function () {
        $.ajax({
            url:'/user/logout',
            success:function(data){
                if(data.success){
                location = 'login.html?returnURL'+location.href;
                }
            }
        })

    })
})