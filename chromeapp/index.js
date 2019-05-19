
window.onload = function() {
    console.log('test')
    
    let imageIcon = chrome.runtime.getURL("images/cross.svg")
    
    let icon

    document.querySelectorAll('textarea').forEach(function(item) {
        item.parentNode.style = 'position:relative;'
        icon = document.createElement('div')
        icon.setAttribute('id', 'untoxicon')
        item.parentNode.appendChild(icon)
        item.addEventListener('keyup', function(e) {
            if (this.value !== '') {
                this.parentNode.querySelector('#untoxicon').className = 'show'
            } else {
                this.parentNode.querySelector('#untoxicon').className = ''
            }
        })
        if (item.value !== '') {
            item.parentNode.querySelector('#untoxicon').className = 'show'
        }
    })
    
    
    let container = document.createElement('div')


    container.innerHTML = `

    <style>
        #widgettox {
            display:none;
            padding: 48px;
            background: #F7F7F7;
            border: 2px solid #000;
            max-width: 800px;
            width:100%;
            z-index: 10;
            position: fixed;
            top:50%;
            left:50%;
            transform:translate3d(-50%, -50%, 1px)}
            #widgettox.show{
            display:block
            }
            #widget-close {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 0px;
            right: 0px;
            background: #000;
            background-image: url("${imageIcon}");
            background-position: center center;
            background-repeat: no-repeat;
            z-index: 10;
            cursor: pointer; }
            .widget-title {
            font-size: 25px;
            line-height: 28px;
            text-transform: uppercase;
            margin-bottom: 11px; }
            .widget-description {
            font-size: 15px;
            line-height: 28px;
            margin-bottom: 25px; }
            .widget-text {
            padding: 16px 20px;
            background: #fff;
            margin-left: -24px;
            margin-right: -24px;
            margin-bottom: 24px; }
            .widget-controls {
            display: flex;
            flex-wrap: wrap;
            align-items:center;
            justify-content: space-between;
            margin-left: -24px;
            margin-right: -24px; }
            #untoxicon{
            display:none;
            position:absolute;
            right:0px;
            top:0px;
            width: 20px;
            height:20px;
            background:#000;
            cursor:pointer;}
            #untoxicon.show{
            display:block;}
            #widgettox .btn {
            padding: 23px 100px;
            border: 1px solid #000;
            background: #fff;
            font-size: 20px;
            line-height: 1.1;
            position: relative;
            cursor: pointer;
            transition: .3s;
            border-radius:0px; }
            #widgettox .btn:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            z-index: -1;
            background: #000;
            transform: translate(-10px, 10px);
            transition: .3s; }
            #widgettox .btn:hover {
            background: #000;
            color: #fff; }
            #widgettox .btn:hover:after {
                transform: translate(0px, 0px); }
            #widgettox .btn--widget {
            padding: 15px 22px; }
            #widgettox .btn--widget:after {
                transform: translate(-5px, 5px); }
            #widgettox .detect{
                color:red;
            }
        </style>

    <div id="widgettox">
        
        <div id="widget-close"> </div>
        <div class="widget-title">!! Проверка токсичности !!</div>
        
        <div id="widgettox-text" contenteditable="true" class="widget-text"></div>
        <div class="widget-controls">
        <div class="btn btn--widget" id="js-check-tox">Перепроверить</div>
        <div id="js-toxic-level"></div>
        <div class="btn btn--widget" id="js-tox-send">Отправить</div>
        </div>
    </div>
    `
    document.querySelector('body').appendChild(container)


    document.querySelector('#widget-close').addEventListener('click', function() {
        document.querySelector('#widgettox').className = ''
    })

    let area 
    document.querySelector('body').addEventListener('click', function(e) {
        if (e.target.getAttribute('id') == 'untoxicon') {    
            document.querySelector('#widgettox').className = 'show'
            let item = e.currentTarget.parentNode.querySelector('textarea')
            area = item  
            let text = item.value
            let fd = new FormData()
            fd.append('text', text)
            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://ct35142.tmweb.ru/basic/web/site/check/', false);
    
            xhr.send(fd)
    
            if (xhr.status != 200) {
                console.log('error')
            } else {
                let res = JSON.parse(xhr.responseText)
                res.wordToxicity.map((item, i) => {
                    var expr = new RegExp(item.word, 'gi');
                    text = text.replace(expr, '<b class="detect">' + item.word + '</b>')            
                })

                let level = (res.commToxicity / res.wordToxicity.length).toFixed()
                document.querySelector('#js-toxic-level').innerHTML = level

                document.querySelector('#widgettox-text').innerHTML = text
            }
        }

        if (e.target.getAttribute('id') == 'js-check-tox') {
            let text = document.querySelector('#widgettox-text').textContent
            let fd = new FormData()
            fd.append('text', text)
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://ct35142.tmweb.ru/basic/web/site/check/', false);
    
            xhr.send(fd)
    
            if (xhr.status != 200) {
                console.log('error')
            } else {
                let res = JSON.parse(xhr.responseText)
                res.wordToxicity.map((item, i) => {
                    var expr = new RegExp(item.word, 'gi');
                    text = text.replace(expr, '<b class="detect">' + item.word + '</b>')            
                })
                
                let level = (res.commToxicity / res.wordToxicity.length).toFixed()
                document.querySelector('#js-toxic-level').innerHTML = level
                document.querySelector('#widgettox-text').innerHTML = text

                console.log('___ loaded ___')
            }
        }

        if (e.target.getAttribute('id') == 'js-tox-send') {
            area.value = this.querySelector('#widgettox-text ').textContent
            document.querySelector('#widgettox').className = ''
        }
        /*$.ajax({
            url: 'http://192.168.1.41:4000/test',
            data: {text: item.value},
            succes: (res)=>{
                let text = item.value
                res.wordToxicity.map((item, i) => {
                    var expr = new RegExp(item.word, 'gi');
                    text = text.replace(expr, '<b class="detect">' + item.word + '</b>')            
                })
                document.querySelector('#widgettox-text').innerHTML = text
            }
        })*/
    })
}