$(function () {

    // window.addEventListener('load',function(e){
       
    // })
    // 判断用户是否有登录
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
    queryCart();
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {

                callback: pullfreshDown //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                callback: pullfreshUp
            }
        }
    });


    // 定义一个全局变量
    var page = 1
    // 下拉菜单的函数
    function pullfreshDown() {
        setTimeout(function () {
            queryCart();
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            mui('#refreshContainer').pullRefresh().refresh(true);
            page = 1
        }, 1500)
    }

    function pullfreshUp() {
        setTimeout(function () {
            page++;
            $.ajax({
                url: '/cart/queryCartPaging',
                data: {
                    page: page,
                    pageSize: 2
                },
                success: function (data) {
                    console.log(data);
                    if (data instanceof Array) {
                        data = {
                            data: data
                        }
                    }

                    if (data.data.length > 0) {
                        var html = template('listTpl', data);
                        $('.cartlist').append(html);
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    } else {
                        // 7. 没有数据了 结束上拉加载 并且提示没有更多数据了
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    }

                }
            })

        }, 1500)
    }
   

    

    // 给删除按钮添加点击事件,因为是动态生成的要添加事件委托
    $('#main .mui-table-view').on('tap', '.btn-del', function () {
        var id = $(this).data('id');
        console.log(id);
        var elem = this; //要用dow元素 
        var li = elem.parentNode.parentNode; //获取a 的父元素的父元素节点
        mui.confirm('你确定要删除吗？', '温馨提示', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                li.parentNode.removeChild(li); //让父元素自己移除自己
                $.ajax({
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.success){
                            queryCart();
                            getnum();
                        }
                    }
                })

            } else {
                setTimeout(function () {
                    mui.swipeoutClose(li);
                }, 0);
            }
        });
    })

    // 给编辑按钮添加点击事件 
    $('#main .cartlist').on('tap', '.btn-edit', function () {
        var li = this.parentNode.parentNode; //获取编辑按钮 父元素的父元素
        var data = $(this).data('value'); //获取存储的数值
        var size = data.productSize; //拿到需要处理的数据
        console.log(size);
        var min = +size.split('-')[0]; //从-符号截取 取小标0的数用变量存储起来
        var max = +size.split('-')[1]; //从-符号截取 取下标1的数量用变量存储起来
        var arr = []; //声明一个空数组
        for (var i = min; i <= max; i++) {
            arr.push(i); //遍历从小到大的的数组用数组存储起来
        }

        data.productSize = arr; //把数组赋值给对象
        console.log(data);

        var html = template('editlistTpl', data);
        html = html.replace(/[\r\n]/g, "");

        mui.confirm(html, '商品编辑', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                var size = $('.btn-Size.mui-btn-primary').data('size');

                console.log(size);
                var num = mui('.mui-numbox').numbox().getValue();
                console.log(num);
                console.log(data.id);
                
                $.ajax({
                    url: '/cart/updateCart',
                    type:'post',
                    data: {
                        id:data.id,
                        size: size,
                        num: num
                    },
                    success:function (res) {
                        console.log(res);
                        
                        if (res.success) {
                            queryCart();
                            getnum();
                        }
                    }
                })
            } else {
                setTimeout(function () {
                    mui.swipeoutClose(li);
                }, 0);
            }

           
        })
        mui('.mui-numbox').numbox(); //初始化数组框
        console.log(data);
        $('.btn-Size').on('tap',function(){
            $(this).addClass('mui-btn-primary').siblings().removeClass('mui-btn-primary');
        })
   
    })

    // 计数金额的
    $('.cartlist').on('change','.choos',getnum)

    function getnum(){
       var checks = $('.choos:checked');
       console.log(checks);
       
       var sum = 0;
       checks.each(function(index,value){
           var price =$(value).data('price');
           var num  = $(value).data('num');
           console.log(price,num);
           sum +=(price * num);
          
           console.log(sum);
           
       });
       sum = sum.toFixed(2);
       $('.spannum').html(sum);
    }

    getnum();

    function queryCart() {
        $.ajax({
            url: '/cart/queryCartPaging',
            data: {
                page: 1,
                pageSize: 5
            },
            success: function (data) {
                console.log(data);
                if(data instanceof Array){
                    data ={
                        data:data
                    }
                }
                var html = template('listTpl', data);
                $('.cartlist').html(html);
                getnum();
            }
        })
    }
})
// mui('.mui-scroll-wrapper').scroll({
//     indicators: false,
//     deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

// })