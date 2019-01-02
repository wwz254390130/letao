function resizse(){
    // 获取根元素,和屏幕大小
    var demWidth =document.documentElement.offsetWidth;
    
    
    //假设设计稿的大小为750
    var designSizse =750;
    //根元素大小为200
    var design =200;

    //计算根元素的大小
    var nowFontSize= demWidth /(designSizse /design) ;
    //把计算好的根元素大小赋值给页面的 html元素
        if( nowFontSize >200){
            nowFontSize = 200;
        }
        document.documentElement.style.fontSize = nowFontSize + 'px';
    console.log( nowFontSize);
    
}
resizse();
window.addEventListener('resize',resizse);
// setHtmlFontSize();
// function setHtmlFontSize() {
//     // 假设设计稿大小
//     var designWidth = 750;
//     // 假设设计稿根元素大小 200
//     var designFontSize = 200;
//     // 获取当前屏幕宽度
//     var windowWidth = document.documentElement.offsetWidth;
//     // 计算当前屏幕根元素大小
//     var nowFontSize = windowWidth / (750 / 200);
//     if(nowFontSize > 200){
//         nowFontSize = 200;
//     }
//     // 设置到当前html元素的font-size上
//     document.documentElement.style.fontSize = nowFontSize + 'px';
// }
// // 添加一个屏幕宽度变化的事件  变化后执行根元素计算设置
// window.addEventListener('resize',setHtmlFontSize);