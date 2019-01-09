$(function () {
    // var obj={
    //     proName:obj.proName,
    //     page:1,
    //     pageSize:4,
    // }

    var key = getUrl('key');
    //    console.log(obj);

    selectList(key);



    // 给搜索按钮添加点击事件 获取文本框的内容
    $('.btn-search').on('tap', function () {
        var key = $('.search-input').val().trim();
        if (!key) {
            mui.alert('请输入要搜索的商品', '温习提示!')
            return;
        }

        console.log(key);
        getUrl(key);
        selectList(key);

    })
    //给商品排序的添加点击事件
    $('.mui-card .mui-card-header a').on('tap', function () {
        var sortType = $(this).data('sort-type');
        console.log(sortType);
        var sort = $(this).data('sort');
        console.log(sort);
        $(this).addClass('active').siblings().removeClass('active');
        // sort = sort == 1 ? 2 : 1;

        if (sort == 1) {

            $(this).children().removeClass().addClass('fa fa-angle-up');
            $(this).data('sort',2);
            // console.log(this);
        } else {
            $(this).children().removeClass().addClass('fa fa-angle-down');
            $(this).data('sort',1);
            // console.log(this);
        }
      

        $(this).data('stor', sort)
        var obj = {
            proName: key,
            page: 1,
            pageSize: 4,
        }

        obj[sortType] = sort;
        selectList(obj)

        function selectList(obj) {

            $.ajax({
                url: '/product/queryProduct',
                data: obj,
                success: function (res) {
                    // console.log(res);

                    var html = template('listTpl', res);

                    $('.mui-card-content .mui-row').html(html);
                }
            })
        }
   
        mui('#refreshContainer').pullRefresh().refresh(true);

        page = 1;

    })
$('.mui-card-content .mui-row').on('tap','.btn-buy',function(){

   var id= $(this).data('id').trim();
   console.log(id);
   
    location = 'detail.html?id='+id;
})

    function getUrl(name) {
        var key = location.search;
        key = key.substr(1);
        //用decodeUrl 解析url 的中文
        key = decodeURI(key)
        arr = key.split('&');

        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            // console.log(arr2);/
            if (arr2[0] == name) {
                return arr2[1];
            }
        }

    }



    function selectList(key) {

        $.ajax({
            url: '/product/queryProduct',
            data: {
                proName: key,
                page: 1,
                pageSize: 2,
            },
            success: function (res) {
                // console.log(res);

                var html = template('listTpl', res);

                $('.mui-card-content .mui-row').html(html);
            }
        })
    }


    var page = 1;
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                  
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function(){

                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    mui('#refreshContainer').pullRefresh().refresh(true);

                    page = 1;
                    
                },2000)
                }
            },
            up: {

                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    // mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    setTimeout(function () {
                        page++;
                        $.ajax({
                            url: '/product/queryProduct',
                            data: {
                                proName: key,
                                page: page,
                                pageSize: 2
                            },
                            success: function (res) {
                                console.log(res);

                                if (res.data.length > 0) {
                                    var html = template('listTpl', res);
                                    $('.mui-card-content .mui-row').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    // 7. 没有数据了 结束上拉加载 并且提示没有更多数据了
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }

                            }
                        })

                    }, 2000)
                }
            }

        }
    });

})