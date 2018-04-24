;window.onload=function () {
    function $(idName) {
        return document.getElementById(idName);
    }

    function getStyle(ele, attr) {
        var res = null;
        if (ele.currentStyle) {
            res = ele.currentStyle[attr];
        } else {
            res = window.getComputedStyle(ele, null);
        }
        return parseFloat(res);
    }

    var game = $('game')
        , gameStart = $('gameStart');


    var smallPlaneArray=[]
        ,bulletArray=[];

    var gameH=getStyle(game,'height');



    function creatStartButton(imgSrc, x, y) {
        this.imgNode = document.createElement('img');
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.init = function () {
            this.imgNode.src = this.imgSrc;
            this.imgNode.style.position = 'absolute';
            this.imgNode.style.left = this.x + 'px';
            this.imgNode.style.top = this.y + 'px';
            this.imgNode.style.width = '189px';
            this.imgNode.style.height = '62px';
            this.imgNode.id='startButton';
            gameStart.appendChild(this.imgNode);
        }
        this.init();
    }

    var stbutton = new creatStartButton('img/start/startButton.png', 40, 550);


    function crestRulesButton(imgSrc, x, y) {
        this.imgNode = document.createElement('img');
        this.imgSrc = imgSrc;
        this.x = x;
        this.y = y;
        this.init = function () {
            this.imgNode.src = this.imgSrc;
            this.imgNode.style.position = 'absolute';
            this.imgNode.style.right = this.x + 'px';
            this.imgNode.style.top = this.y + 'px';
            this.imgNode.style.width = '189px';
            this.imgNode.style.height = '62px';
            this.imgNode.id='rulesLook';
            gameStart.appendChild(this.imgNode);
        }
        this.init();
    }

    var rubutton = new crestRulesButton('img/start/rules.png', 40, 550);




    rulesLook.onclick=function () {
        game.removeChild(gameStart);
        function creatRulesLookbg(){
            this.divNode=document.createElement('div');
            this.init=function () {
                this.divNode.style.backgroundImage='url(img/rules/introducer.jpg)';
                this.divNode.style.position='relative';
                this.divNode.style.width='480px';
                this.divNode.style.height='800px';
                this.divNode.style.display='block';
                this.divNode.id='rules';
                game.appendChild(this.divNode);
            }
            this.init();
        }
        var ruBackground = new creatRulesLookbg();

        function creatRulesBackButton(imgSrc, x, y){
            this.imgNode = document.createElement('img');
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.init = function () {
                this.imgNode.src = this.imgSrc;
                this.imgNode.style.position = 'absolute';
                this.imgNode.style.left = this.x + 'px';
                this.imgNode.style.top = this.y + 'px';
                this.imgNode.style.width = '189px';
                this.imgNode.style.height = '62px';
                this.imgNode.id='rulesBack';
                rules.appendChild(this.imgNode);
            }
            this.init();
        }
        var ruBack = new creatRulesBackButton('img/rules/IReturn.png', 145.5, 650);

        rulesBack.onclick=function () {
            game.removeChild(rules);
            game.appendChild(gameStart);
        }
    }

    startButton.onclick=function () {
        var bulletW=28
            ,bulletH=54;



        game.removeChild(gameStart);
        function creatStartEnterbg(){
            this.divNode=document.createElement('div');
            this.init=function () {
                this.divNode.style.backgroundImage='url(img/play/img_bg_level_1.jpg)';
                this.divNode.style.position='relative';
                this.divNode.style.backgroundPositionY='0px';
                this.divNode.style.width='100%';
                this.divNode.style.height='100%';
                this.divNode.id='startBg';
                game.appendChild(this.divNode);
            }
            this.init();
        }
        var stBackground = new creatStartEnterbg();

        var backgroundPY=0;

        function bgMove() {
                if (backgroundPY>=gameH) {
                    backgroundPY=0;
                }else {
                    backgroundPY=backgroundPY+0.5;
                }
                startBg.style.backgroundPositionY=backgroundPY+'px';
        }
        var setBgMove=setInterval(bgMove,10);



        function smallPlanePhoto(imgSrc,x,y,speed) {
            this.imgNode=document.createElement('img');
            this.imgSrc=imgSrc;
            this.isDead=false;
            this.exTime=60;
            this.x=x;
            this.y=y;
            this.speed=speed;
            this.init=function () {
                this.imgNode.src=this.imgSrc;
                this.imgNode.style.position='absolute';
                this.imgNode.style.left=this.x+'px';
                this.imgNode.style.top=this.y+'px';
                this.imgNode.className='smallPlane';
                this.imgNode.style.width='76px';
                this.imgNode.style.height='55px';
                startBg.appendChild(this.imgNode);
            }
            this.init();
            this.move=function () {
                this.imgNode.style.top=parseInt(this.imgNode.style.top)+this.speed+'px';
            }
        }

        function creatSmallPlane() {
            var smallPlane=new smallPlanePhoto('img/play/emeny.png',parseInt(Math.random()*404),-parseInt(Math.random()*100+60),parseInt(Math.random()*3+1));
            smallPlaneArray.push(smallPlane);
        }
        var setCreatSP=setInterval(creatSmallPlane,1000);


        function smallPlaneMove() {
            for (var i=0;i<smallPlaneArray.length;i++) {
                if (smallPlaneArray[i].isDead==false) {
                    smallPlaneArray[i].move();
                    if (parseInt(smallPlaneArray[i].imgNode.style.top)>=800) {
                        startBg.removeChild(smallPlaneArray[i].imgNode);
                        smallPlaneArray.splice(i,1)
                    }
                }else {
                    smallPlaneArray[i].exTime--;
                    if (smallPlaneArray[i].exTime==30){
                        smallPlaneArray[i].imgNode.src='img/play/boom2.png';
                    }
                    if (smallPlaneArray[i].exTime==0){
                        startBg.removeChild(smallPlaneArray[i].imgNode);
                        smallPlaneArray.splice(i,1);
                    }
                }
            }
        }
        var setMoveSP=setInterval(smallPlaneMove,10);


        function creatPlayerPhoto(imgSrc,x,y) {
            this.imgNode = document.createElement('img');
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.init = function () {
                this.imgNode.src = this.imgSrc;
                this.imgNode.style.position = 'absolute';
                this.imgNode.style.left = this.x + 'px';
                this.imgNode.style.top = this.y + 'px';
                this.imgNode.style.width = '153px';
                this.imgNode.style.height = '101px';
                this.imgNode.id='player';
                startBg.appendChild(this.imgNode);
            }
            this.init();
        }
        var creatPl=new creatPlayerPhoto('img/play/player.png',163.5,699);


        var startW=document.getElementById('startBg').offsetWidth
            ,startH=document.getElementById('startBg').offsetHeight
            ,playerW=document.getElementById('player').offsetWidth
            ,playerH=document.getElementById('player').offsetHeight


        document.onmousedown=function () {
            this.onmousemove=myPlaneMove;
        }
        function myPlaneMove(e) {
            var startBgLeft=startBg.offsetLeft;
            var lastPlayerLeft=e.clientX-startBgLeft-playerW/2;
            var lastPlayerTop=e.clientY-playerH/2;


            if (lastPlayerLeft<=0){
                lastPlayerLeft=0;
            } else if (lastPlayerLeft>=startW-playerW) {
                lastPlayerLeft=startW-playerW;
            }
            if (lastPlayerTop<=0){
                lastPlayerTop=0;
            } else if (lastPlayerTop>=startH-playerH){
                lastPlayerTop=startH-playerH;
            }

            player.style.left=lastPlayerLeft+'px';
            player.style.top=lastPlayerTop+'px';
        }


        function creatBulletsPhoto(imgSrc,x,y,speed) {
            this.imgNode=document.createElement('img');
            this.imgSrc=imgSrc;
            this.x=x;
            this.y=y;
            this.speed=speed;
            this.init=function () {
                this.imgNode.src=this.imgSrc;
                this.imgNode.style.position='absolute';
                this.imgNode.style.left=this.x+'px';
                this.imgNode.style.top=this.y+'px';
                this.imgNode.style.width='28px';
                this.imgNode.style.height='54px';
                this.imgNode.className='bullet';
                startBg.appendChild(this.imgNode);
            }
            this.init();
            this.move= function () {
                this.imgNode.style.top=parseInt(this.imgNode.style.top)-this.speed+'px';
            }
        }

        function creatBullets() {
            var playerL=document.getElementById('player').offsetLeft
                ,playerT=document.getElementById('player').offsetTop
                ,bulletL=playerL+playerW/2-bulletW/2
                ,bulletT=playerT-bulletH;

            var creatBlP=new creatBulletsPhoto('img/play/bullet.png',bulletL,bulletT,10);
            bulletArray.push(creatBlP);
        }
        var setCreatBullets=setInterval(creatBullets,300);


        function bulletMove() {
            for (var j=0;j<bulletArray.length;j++){
                bulletArray[j].move();
                if (parseInt(bulletArray[j].imgNode.style.top)<=-101) {
                    startBg.removeChild(bulletArray[j].imgNode);
                    bulletArray.splice(j,1);
                }
            }
        }
        var setBulletMove=setInterval(bulletMove,30);



        function creatStopButton(imgSrc,x,y) {
            this.imgNode=document.createElement('img');
            this.imgSrc=imgSrc;
            this.x=x;
            this.y=y;
            this.init=function () {
                this.imgNode.src=this.imgSrc;
                this.imgNode.style.position='absolute';
                this.imgNode.style.right=this.x+'px';
                this.imgNode.style.top=this.y+'px';
                this.imgNode.style.width='50px';
                this.imgNode.style.height='51px';
                this.imgNode.id='stopButton';
                startBg.appendChild(this.imgNode);
            }
            this.init();
        }
        var stopB=new creatStopButton('img/play/pause.png',0,0);

        function creatplayerIntegral() {
            this.divNode=document.createElement('div');
            this.init=function () {
                this.divNode.style.marginLeft='10px';
                this.divNode.style.fontSize='25px';
                this.divNode.style.color='#FFFFFF';
                this.divNode.innerText='得分:';
                this.divNode.id='playerIntegral';
                startBg.appendChild(this.divNode);
            }
            this.init();
        }
        var playerPI=new creatplayerIntegral();

        function creatIntegralText() {
            this.span=document.createElement('span');
            this.init=function () {
                this.span.style.fontSize='25px';
                this.span.style.color='#FFFFFF';
                this.span.innerText='0';
                this.span.id='integralText';
                playerIntegral.appendChild(this.span);
            }
            this.init();
        }
        var creatIT=new creatIntegralText();


        function creatPlayerBlood() {
            this.divNode=document.createElement('div');
            this.init=function () {
                this.divNode.style.marginLeft='10px';
                this.divNode.style.fontSize='25px';
                this.divNode.style.color='#FFFFFF';
                this.divNode.innerText='玩家血量:';
                this.divNode.id='playerBlood';
                startBg.appendChild(this.divNode);
            }
            this.init();
        }
        var playerB=new creatPlayerBlood();


        function creatBlood(x,y) {
            this.span=document.createElement('span');
            this.x=x;
            this.y=y;
            this.init=function () {
                this.span.style.left=this.x+'px';
                this.span.style.top=this.y+'px';
                this.span.style.fontSize='25px';
                this.span.style.color='#FFFFFF';
                this.span.innerText='1';
                this.span.id='blood';
                playerBlood.appendChild(this.span);
            }
            this.init();
        }
        var creatB=new creatBlood(0,0);


        function crashCreck() {
            for (var j=0;j<bulletArray.length;j++){
                for (var i=0;i<smallPlaneArray.length;i++){
                    var spLeft=parseInt(smallPlaneArray[i].imgNode.style.left)
                        ,spTop=parseInt(smallPlaneArray[i].imgNode.style.top)
                        ,playerL=document.getElementById('player').offsetLeft
                        ,playerT=document.getElementById('player').offsetTop
                        ,spW=parseInt(smallPlaneArray[i].imgNode.style.width)
                        ,spH=parseInt(smallPlaneArray[i].imgNode.style.height)
                        ,btL=parseInt(bulletArray[j].imgNode.style.left)
                        ,btT=parseInt(bulletArray[j].imgNode.style.top);

                    
                    if (smallPlaneArray[i].isDead==false){
                        if (spTop+spH>=playerT&&spTop<=playerT+playerH){
                            if (spLeft+spW>=playerL&&spLeft<=playerL+playerW) {
                                smallPlaneArray[i].imgNode.src = 'img/play/boom.png';
                                smallPlaneArray[i].isDead = true;
                                blood.innerText=parseInt(blood.innerText)-1;
                            }
                        }
                        if (spTop+spH>=btT) {
                            if (spLeft+spW>=btL&&spLeft<=btL+bulletW) {
                                smallPlaneArray[i].imgNode.src = 'img/play/boom.png';
                                smallPlaneArray[i].isDead = true;
                                startBg.removeChild(bulletArray[j].imgNode);
                                bulletArray.splice(j, 1);

                                integralText.innerText=parseInt(integralText.innerText)+99;
                            }
                        }
                    }
                }
            }
        }

        var setCrashCheck=setInterval(crashCreck,1);


        stopButton.onclick=function () {
            game.removeChild(startBg);
            clearInterval(setMoveSP);
            clearInterval(setCreatSP);
            clearInterval(setCreatBullets);
            clearInterval(setBulletMove);
            clearInterval(setBgMove);
            clearInterval(setCrashCheck);
            bulletArray.splice(0,bulletArray.length);
            smallPlaneArray.splice(0,smallPlaneArray.length);
            game.appendChild(gameStart);
        }

        function gameOver() {
            var bloodNum=parseInt(blood.innerText);
            if (bloodNum<=0){

                clearInterval(setCreatSP);
                clearInterval(setCreatBullets);

                clearInterval(setBgMove);
                clearInterval(setCrashCheck);

                if (bulletArray.length==0&&smallPlaneArray.length==0) {
                    startBg.style.display='none';
                    clearInterval(setBulletMove);
                    clearInterval(setMoveSP);
                    bulletArray.splice(0, bulletArray.length);
                    smallPlaneArray.splice(0, smallPlaneArray.length);
                }
            }
        }
        var serGameOver=setInterval(gameOver,10);

        function creatIntegrationFace() {
            this.divNode=document.createElement('div');
            this.init=function () {
                this.divNode.style.backgroundImage='url(img/over/over.jpg)';
                this.divNode.style.position='relative';
                this.divNode.style.width='100%';
                this.divNode.style.height='100%';
                this.divNode.id='overFace';
                game.appendChild(this.divNode);
            }
            this.init();
        }
        var over=new creatIntegrationFace();


        var num=document.getElementById('integralText').innerText;
        snum = num.toString(),str = '';

        for(var i = 0; i < snum.length; i++){
            switch(+snum.charAt(i)){
                case 0:
                    str += '<img src="img/over/imgFont0.png">';
                    break;
                case 1:
                    str += '<img src="img/over/imgFont1.png">';
                    break;
                case 2:
                    str += '<img src="img/over/imgFont2.png">';
                    break;
                case 3:
                    str += '<img src="img/over/imgFont3.png">';
                    break;
                case 4:
                    str += '<img src="img/over/imgFont4.png">';
                    break;
                case 5:
                    str += '<img src="img/over/imgFont5.png">';
                    break;
                case 6:
                    str += '<img src="img/over/imgFont6.png">';
                    break;
                case 7:
                    str += '<img src="img/over/imgFont7.png">';
                    break;
                case 8:
                    str += '<img src="img/over/imgFont8.png">';
                    break;
                case 9:
                    str += '<img src="img/over/imgFont9.png">';
                    break;
            }
        }
        document.getElementById('overFace').innerHTML = str;


    }
}