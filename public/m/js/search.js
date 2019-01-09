$(function () {
    /*1.添加搜索记录
    1.获取当前输入的搜索内容
    2.不能直接添加这个内容到数组中 把内容储存到一个数组里面去 把数组添加到本地存储中
    3.判断 去除 重复的 如果之前数组中存在这个值 要先删除 再往前添加
    4.把数组存储到存储到本地的时候 要把数组转出一个 json字符串 再存进去
    5.调用设置本地存储的函数 把json字符串到本地存储中*/
 
    // 1.给搜索按钮添加点击事件
    $('.btn-search').on('tap', function () {
        // console.log(this);

        var search = $('.search-input').val().trim();
        console.log(search);
 
        if (search == "") {
            return mui.alert('请输入要搜索的内容', '温馨提示!');


        }

        /*先获取之前的数组,获取之前的键historyData1里面的数组*/
        var arr = localStorage.getItem('historyData1');
        // 对数组字符串进行一个转换传承js数组 但是有可能是 第一次加之前数组不存在 没有数组转不了 就使用空数组
        arr = JSON.parse(arr || '[]' );

        //  判断当前值是否存在数组里, 存在数组中
        if (arr.indexOf(search) != -1) {

            // 当前的值在数组中存在 去数组索引 删除掉当前的值
            arr.splice(arr.indexOf(search), 1);

        }
        // 把值添加到数组的第一位
        arr.unshift(search);

        // 数组加完之后 把数组存储到本地存储中 先转出字符串再存储到本地存储中
        arr = JSON.stringify(arr);
        localStorage.setItem('historyData1', arr);

        //    输入文本之后清空文本框
        $('.search-input').val('');
        queryHistory();
        location = 'productlist.html?key='+ search +'&time='+ new Date().getTime() ;

    });
    queryHistory();
    function queryHistory() {
        var arr = localStorage.getItem('historyData1');

        arr = JSON.parse(arr) || [];

        var html = template('listTpl', { rows: arr });
        console.log(arr);
        
        $('.search-content ul').html(html);

    }


    $('.ul').on('tap', '.x', function () {
        console.log(this);

        var id = $(this).data('id');
        console.log(id);
        // 获取数据
    var arr =localStorage.getItem('historyData1');
    // 转换json 数据成js数据
        arr = JSON.parse(arr || '[]');
        // 数组截取删除一个元素
        arr.splice(id,1);
        // 把js数组转出json
        arr =JSON.stringify(arr);
        // 设置数据存储
        localStorage.setItem('historyData1',arr);
        // 重新查询
        queryHistory();
    });

    $('.clear').on('tap', function () {
        console.log(this);

        localStorage.removeItem('historyData1');
        queryHistory();
    })

    //点击搜索记录调转到相应的页面
    $('.search-list ul ').on('tap','li',function(){
     var search = $(this).text().trim();
     console.log(search);
     location = 'productlist.html?key='+search+'&time='+ new Date().getTime();
     
    })

    $('.search-input').bind('keypress',function(e){
       var keycode = e.charCode;
    //    var searchName =$(this).val();
       if(keycode =='13')
       {
           // console.log(this);

        var search = $('.search-input').val().trim();
        console.log(search);

        if (search == "") {
            return mui.alert('请输入要搜索的内容', '温馨提示!');


        }

        /*先获取之前的数组,获取之前的键historyData1里面的数组*/
        var arr = localStorage.getItem('historyData1');
        // 对数组字符串进行一个转换传承js数组 但是有可能是 第一次加之前数组不存在 没有数组转不了 就使用空数组
        arr = JSON.parse(arr || '[]' );

        //  判断当前值是否存在数组里, 存在数组中
        if (arr.indexOf(search) != -1) {

            // 当前的值在数组中存在 去数组索引 删除掉当前的值
            arr.splice(arr.indexOf(search), 1);

        }
        // 把值添加到数组的第一位
        arr.unshift(search);

        // 数组加完之后 把数组存储到本地存储中 先转出字符串再存储到本地存储中
        arr = JSON.stringify(arr);
        localStorage.setItem('historyData1', arr);

        //    输入文本之后清空文本框
        $('.search-input').val('');
        queryHistory();
        location = 'productlist.html?key='+ search +'&time='+ new Date().getTime() ;

        e.preventDefault();
        return false;
       }
    })
})