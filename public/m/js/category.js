$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    /*1.实现分类左侧的动态渲染
        1.发送请求 请求左侧分类的数据
        2.拿到数据进行动态渲染
        3.使用模板引擎来渲染左侧分类菜单*/
        // 使用zepto的$.ajax 发送请求
    $.ajax({
        // type:'get', 默认就是get 可以省略
        url:'/category/queryTopCategory',
    //    dataType:'json', 默认数据返回就是json转出的js对象 可以省略
        success:function(data){
            var html = template('categoryLeftTpl',data);
        
            $('.category-left ul').html(html);
        }
    });
    /*2. 实现分类左侧的点击渲染右侧分类
        1.给所以左侧分类的li的 a添加点击事件 不能直接添加 左侧异步动态渲染 使用事件委托的方式添加事件
        2.拿到当前点击的li的a分类id
        3.拿到分类id在请求二级分类的数据 并且把当前拿到id作为 请求参数传递
        4.拿到二级分类的数据 渲染右侧分类
        5.为了一开始就显示默认id为1的右侧分类数据 所以定义一个函数 默认调用传入1 在事件里面调用传入点击的id
        6.给当前点击a的元素添加active 其他兄弟删除active */
        // 1.使用事件委托方式给左侧分类的ul 里li的a 添加事件 移动端使用tap 解决延迟的click事件

    $('.category-left ul').on('tap','li > a',function(){
    
        
        var id = $(this).data('id');
        categoryData(id);

        $(this).parent().addClass('active').siblings().removeClass('active');    
    })
    $('.inp-search').on('focus',function(){
        location = 'search.html';
    })

    categoryData(1);
    function categoryData(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(data){
            // console.log(data);
            var html = template('categoryRightTpl',data);
            $('.category-right .mui-row').html(html);

            }
        });
    }


})





