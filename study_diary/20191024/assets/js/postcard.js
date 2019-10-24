function doFirst(){

    //跳窗的黑屏
    var postblackBgc = document.querySelector('#postblackBgc');
    
    //返回按鈕註冊
    document.querySelector('.goback').addEventListener('click',gobacktopost);
    //addBtn註冊和事件
    var addBtn = document.querySelector('#addBtn').addEventListener('click',pop);
    function pop(){  
        // if (storage['memNo']==true) {
                var containerTab = document.querySelector('#containerTab');
                containerTab.style.display = 'block';
                postblackBgc.style.display = 'block';
                closeBtn.style.display = 'block';
        // }else{
        //     alert("請先加入/登入會員");
        // }
    }

    var poemUl = document.querySelector("#poemUl");
    if(poemUl.firstChild == '') {
        var noPoem = document.querySelector('#noPoem');
        noPoem.style.display = "block";
    }

    //頁籤跳窗的叉叉註冊和事件
    var closeBtn =  document.querySelector('#closeButton');
    closeBtn.addEventListener('click',myclose);
    function myclose(){
    //alert('close');
        var containerTab = document.querySelector('#containerTab');
        containerTab.style.display = 'none';
        closeBtn.style.display = 'none';
        postblackBgc.style.display = 'none';
        document.querySelector('#tab0').checked="checked";
    }

    //為頁籤裡的每個圖片建立事件聆聽功能
    var postImg = document.querySelectorAll('.postImg');
    for(var i=0;i<postImg.length;i++){
        postImg[i].addEventListener('click',cloneImgToPost,false);    
    }  
    

    var complete = document.querySelector('#complete');
    //重新製作按鈕註冊
    var resetPost = document.querySelector('#resetPost').addEventListener('click',deleteAll);

    //文字盒

    var textSubmit = document.querySelector('.textSubmit');
    textSubmit.addEventListener('click',cloneText);
    //送出後記得要清空
    
    //完成製作按鈕註冊
    document.querySelector('#complete').addEventListener('click',completePost);
    //完成製作跳窗的叉叉註冊
    var completeClose = document.querySelector('#completeClose').addEventListener('click',comClose);

    //判斷有無詩籤
    if ($('#poemUl>li').length==0) {
        // alert('ss');
        $('#noPoem').css('display','block');
    }else{
        $('#noPoem').css('display','none');
    }

}//doFirst End

    var dragLi;
    function cloneImgToPost(){  //將圖片複製到明信片上
    //用Dom的方法新增node

        var postcardUl = document.querySelector('#postcardUl');
        dragLi = this.cloneNode(true); //如果是false，只會複製li和其class
        postcardUl.appendChild(dragLi);
        dragLi.removeAttribute("class");
        dragLi.style = '';
        var dragImg = dragLi.firstChild;
        dragImg.setAttribute('class','dragImg');

   
        dragLi.setAttribute('class','cloneImgDrag draggable dragging targetObj');
        //dragImg.addEventListener
        $('.draggable').draggable({
            containment: '#postcard'
        });
        dragLi.addEventListener('click',setCurrentImg,false);

        //按了圖之後，頁籤關閉
        containerTab.style.display = "none";
        postblackBgc.style.display = 'none';
        var closeBtn =  document.querySelector('#closeButton');
        closeBtn.style.display = 'none';
        document.querySelector('#tab0').checked="checked";
        giveId();
    }
    
    //重新製作事件
    function deleteAll(){
        var postcardUl = document.querySelector('#postcardUl');
        while(postcardUl.hasChildNodes()) //當postcardUl還有子節點時，就會再次進入迴圈 
        {  
            postcardUl.removeChild(postcardUl.firstChild);  
        } 
    }

    var textLi;
    function cloneText(){
        var textArea = document.querySelector('.textArea');
       if ($.trim(textArea.value)=='') {
            alert("請輸入內容");
        }else{
            var textWish = $('.textArea').val();
            var postcardUl = document.querySelector('#postcardUl');
            textLi = document.createElement('li');
            textLi.innerText = textWish;
            postcardUl.appendChild(textLi);
            textLi.setAttribute('class','cloneTextDrag draggable dragging targetObj');
            $('.draggable').draggable({
                containment: '#postcard'
            });
            $('.textArea').val('');
            textLi.addEventListener('click',setCurrentText,false);
            containerTab.style.display = "none";
            postblackBgc.style.display = 'none';
            document.querySelector('#tab0').checked="checked";
            giveId();
        }
       
    }

    function setCurrentImg(e){ //改變選擇的圖片
        dragLi = e.currentTarget;
 
        var Li = document.querySelectorAll('.dragging');
        for(var p=0;p<Li.length;p++){
            Li[p].addEventListener('click',tool(this));    
        }  
    }
    function setCurrentText(e){
        textLi = e.currentTarget;
        var Li = document.querySelectorAll('.dragging');
        for(var p=0;p<Li.length;p++){
            Li[p].addEventListener('click',tool(this));    
        }  
    }
    //給予每個明信片上的li IＤ
    function giveId(){
        var postcardUl =  document.querySelector('#postcardUl');
        let count = parseInt($('#postcardUl').attr('data-count'));
        $('#postcardUl').attr('data-count',count+1);
        //`post` +  $('#postcardUl li').length;
        let postId =  'item' + count;
        $('#postcardUl li:last-child').attr('id',postId);
    };


    function tool(q){//工具列看能不能用class去抓是哪一類的圖然後出現編輯區
        //q.style.outline = "5px #f00 solid"; //需要寫一個外框給選到的對象
        var postTarget = q.id;
        $('.toolGroupPC #zoomInPC').attr('data-target',postTarget);
        $('.toolGroupPC #zoomOutPC').attr('data-target',postTarget);
        $('.toolGroupPC #turnRightPC').attr('data-target',postTarget);
        $('.toolGroupPC #turnLeftPC').attr('data-target',postTarget);
        //$('.toolGroupPC #clonePC').attr('data-target',postTarget);
        $('.toolGroupPC #deletePC').attr('data-target',postTarget);
        document.querySelector('#zoomInPC').addEventListener('click',zoomIn);
        document.querySelector('#zoomOutPC').addEventListener('click',zoomOut);
        document.querySelector('#turnRightPC').addEventListener('click',turnR);
        document.querySelector('#turnLeftPC').addEventListener('click',turnL);
        //document.querySelector('#clonePC').addEventListener('click',cloneO);
        document.querySelector('#deletePC').addEventListener('click',deleteO);
        //q.style.outline = "";
    };


    //工具列開始-------------------------------------------------
    function zoomIn(){
        var target = '#' + this.getAttribute('data-target');
        var zoomI = document.querySelector(target);
        // zoomI.style.transformOrigin = "50% 50%";
        var Zstyle = window.getComputedStyle(zoomI, null);
        var tr = Zstyle.getPropertyValue("-webkit-transform") ||
            Zstyle.getPropertyValue("-moz-transform") ||
            Zstyle.getPropertyValue("-ms-transform") ||
            Zstyle.getPropertyValue("-o-transform") ||
            Zstyle.getPropertyValue("transform");

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];
        // zoomI.setAttribute('transform-origin','0%,0%');
        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        var newScale = scale*1.1;
        $(zoomI).css('transform','rotate('+angle+'deg)' + 'scale('+newScale+')');
    }
    function zoomOut(){
        var target = '#' + this.getAttribute('data-target');
        let zoomO = document.querySelector(target);
         // zoomO.style.transformOrigin = "50% 50%";
        var Zstyle = window.getComputedStyle(zoomO, null);
        var tr = Zstyle.getPropertyValue("-webkit-transform") ||
            Zstyle.getPropertyValue("-moz-transform") ||
            Zstyle.getPropertyValue("-ms-transform") ||
            Zstyle.getPropertyValue("-o-transform") ||
            Zstyle.getPropertyValue("transform");

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        var newScale = scale/1.1;
       $(zoomO).css('transform','rotate('+angle+'deg)' + 'scale('+newScale+')');
       zoomO.setAttrbute('transform-origin','(0,0)');
       

    }
    function turnR(){
        var target = '#' + this.getAttribute('data-target');
        var turnR = document.querySelector(target);
        turnR.style.transformOrigin = "50% 50%";
        var Zstyle = window.getComputedStyle(turnR, null);
        var tr = Zstyle.getPropertyValue("-webkit-transform") ||
            Zstyle.getPropertyValue("-moz-transform") ||
            Zstyle.getPropertyValue("-ms-transform") ||
            Zstyle.getPropertyValue("-o-transform") ||
            Zstyle.getPropertyValue("transform");

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        var newAngle = angle + 30;
        $(turnR).css('transform','rotate('+newAngle+'deg)' + 'scale('+scale+')');
    }

    function turnL(){
        var target = '#' + this.getAttribute('data-target');
        //target.style.transform = "o"
        var turnL = document.querySelector(target);
         turnL.style.transformOrigin = "50% 50%";
        var Zstyle = window.getComputedStyle(turnL, null);
        var tr = Zstyle.getPropertyValue("-webkit-transform") ||
            Zstyle.getPropertyValue("-moz-transform") ||
            Zstyle.getPropertyValue("-ms-transform") ||
            Zstyle.getPropertyValue("-o-transform") ||
            Zstyle.getPropertyValue("transform");

        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        var sin = b / scale;

        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        var newAngle = angle - 30;
       $(turnL).css('transform','rotate('+newAngle+'deg)' + 'scale('+scale+')');
    }
    function deleteO(){
        var target = '#' + this.getAttribute('data-target');
        let deleteO = document.querySelector(target);
        postcardUl.removeChild(deleteO);
    }
    //工具列結束-------------------------------------------------


    function completePost(){
        if (!sessionStorage['memNo']) {
            var completeLtb = document.querySelector('.completeLtb');
            var completeClose = document.querySelector('#completeClose');
            var postblackBgc = document.querySelector('#postblackBgc');
            completeLtb.style.display = 'block';
            postblackBgc.style.display = 'block';
            completeClose.style.display = 'block';

            var canvasIn = document.querySelector('#canvasIn');
            var postcard = document.querySelector('#postcard');
            html2canvas(postcard, {allowTaint : false}
        ).then(function(canvas) {
            canvasIn.appendChild(canvas);

            var $div = $("#canvasIn div");
            $div.empty();
            $("<img />", { src: canvas.toDataURL("image/png") }).appendTo($div);
            }); 
        }else{
            //  alert("請先加入/登入會員");
        }
    }
    //canvas的resize
    window.onresize = function(){
        var canvasIn = document.querySelector('#canvasIn');
        var postcard = document.querySelector('#postcard');
        // $('#canvasIn').has('img').delete('img');
        html2canvas(postcard, {allowTaint : false}
        ).then(function(canvas) {
            // var $deleteAll = $("#canvasIn canvas");
            while(canvasIn.hasChildNodes('canvas')) //當postcardUl還有子節點時，就會再次進入迴圈 
                {  
                    canvasIn.removeChild(canvasIn.lastChild);
                } 
            strCanvas = '<div id="canvasImgD"></div>';
            strCanvas += '<form method="post" accept-charset="utf-8" name="form1" id="form1">';
            strCanvas += '<input name="hidden_data" id="hidden_data" type="hidden"/>';               
            strCanvas += '</form>';            
            $('#canvasIn').append(strCanvas);
            // $deleteAll.empty();
            canvasIn.appendChild(canvas);
            var $div = $("#canvasIn div");
            $div.empty();
            $("<img />", { src: canvas.toDataURL("image/png") }).appendTo($div);
        }); 
    }

    function downloadImage() {
        //如果有會員會直接存進Sql去  
        
        var browser={
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否為移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
        }
        //判断是否移动端
        if(browser.versions.mobile||browser.versions.android||browser.versions.ios ==true){ 
            //alert("移動端");
            var u = navigator.userAgent;
            if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true) {
                alert('不支援ios手機');
            }
         }
       
        var src = $("#canvasImgD > img").attr('src');
        //alert(src);
        var a = $("<a></a>").attr("href", src).attr("download", "postcard.png").appendTo("body");
        if (storage['memNo']) {
            saveImageToServer();
        }
        a[0].click();
        a.remove(); 
    }

    function saveImageToServer(src) {
        var src = $("#canvasImgD > img").attr('src');
        //alert(src);
        document.getElementById('hidden_data').value = src;
        var form = document.getElementById("form1");
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest(); 
        xhr.open('POST', 'savePostImg.php', true);
        xhr.send(formData);
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
               if( xhr.status == 200 ){
                alert('明信片已幫您存入會員專區！');  
               }
            }
        }; 
    }

    function gobacktopost(){//按返回
        var postblackBgc = document.querySelector('#postblackBgc');
        var completeLtb = document.querySelector('.completeLtb');
        var completeClose = document.querySelector('#completeClose');
        postblackBgc.style.display = 'none';
        completeClose.style.display = 'none';
        completeLtb.style.display = 'none';
        var canvasIn = document.querySelector('#canvasIn');
        canvasIn.removeChild(canvasIn.lastChild);  
    }

    function comClose(){
        var postblackBgc = document.querySelector('#postblackBgc');
        var completeLtb = document.querySelector('.completeLtb');
        var completeClose = document.querySelector('#completeClose');
        postblackBgc.style.display = 'none';
        completeClose.style.display = 'none';
        completeLtb.style.display = 'none';
        var canvasIn = document.querySelector('#canvasIn');
        canvasIn.removeChild(canvasIn.lastChild);  
    }



    //share in fb
    document.getElementById('shareBtn').onclick = function() {
       
        let metaTitle = document.createElement('meta');
        metaTitle.setAttribute("property","og:title");
        metaTitle.setAttribute("content","黃昏的甘蔗");

        let metaUrl = document.createElement('meta');
        metaUrl.setAttribute("property","og:url");
        metaUrl.setAttribute("content","http://blog.xuite.net/tolarku/blog");

        var src = $("#canvasImgD > img").attr('src');
        let metaImage = document.createElement('meta');
        metaImage.setAttribute("property","og:image");
        metaImage.setAttribute("content",src);
        //alert(metaImage);html

        $("head").append(metaTitle);
        $("head").append(metaUrl);
        $("head").append(metaImage);
        window.open("https:www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F140.115.236.72/demo-projects/CD101/CD101G2/postcard.html","resizable=false,top=120,left=200,width=500,height=420,scrollbars=yes");
        // metaTitle.
    }






window.addEventListener('load',doFirst);
