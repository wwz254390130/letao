$(function () {
    var id = getQueryString('id');
    console.log(id);

    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);

            var min = +data.size.split('-')[0];
            var max = +data.size.split('-')[1];
            var size = [];
            // console.log(size1, size2);
            for (var i = min; i <= max; i++) {
                size.push(i);

            }

            data.size = size;
            //   console.log(data);

            var html = template('detailTpl', data);
            $('#main').html(html);
            //初始化数字框
            mui('.mui-numbox').numbox()


            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui('.mui-scroll-wrapper').scroll({
                indicators: false,
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

            })

            $('.btn-size').on('tap', function () {
                $(this).addClass('mui-btn-primary').siblings().removeClass('mui-btn-primary');
            })


        }
    })

    $('.btn-cart').on('tap', function () {
        var num = mui('.mui-numbox').numbox().getValue();

        //需要判断同时拥有2个类名的按钮
        var size = $('.btn-size.mui-btn-primary').data('size');
        console.log(size);


        if (!num) {
            mui.toast('请选择数量', {
                duration: 1000,//显示的时间
                type: 'div'
            })
        }
        if (!size) {
            mui.toast('请选择尺寸', {
                duration: 1000,
                type: 'div'
            })
            // console.log(size);

        }

        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (data) {
                console.log(data);
                if (data.success) {
                    // location = "index.html";
                    //修改弹出框默认input类型为password 
                 
                    mui.confirm('加入购物车是否去购物车查看','温馨提示',['确认','取消'],function(e){
                     if(e.index == 0 ){
                         location = 'cart.html';
                     }else{
                         
                         return;
                     }
                    })
                 

                } else {
                    location = 'login.html?returnURL=' + location.href;


                    // mui.toast(data.message,{ duration:1000, type:'div' })
                }
            }

        })

    })

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }


})