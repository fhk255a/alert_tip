
/*
--------------------------------2018-03-29----FHK----------------------------------


    用法：
        1. 引入Jquery
        2. 引入配置的css
        3. 引入该JS

    直接在需要的地方  new Alert( {arguments} );
    里面可以传入一个对象{} 也可以不传

    对象可以传入的值

    arguments{
        type:'sting'     提示效果  值[ 'success' | 'error' | 'warn' ]
        text:'string'    内容,
        button:'string'  按钮的值
        title:'string'   内容标题
        background:'string'   背景颜色值[ 'rgba()' | '#ffa' | 'red' ]
        buttons:[arr]       按钮组<数组有多少个 按钮就对应多少个 最多4个> ['btn1','btn2','btn3'],
        input:{}         input对象 {type:'text',value:'搜索','background':'red'}
        move:num         动画效果        0|1|2|3
    }
    example
    $('button').click(function () {
        new Alert( {
            type:success
            text:'这是一段小句子'
            button:'点赞'
            title:'精选句子'
            background:'#fff'
            buttons:['喜欢','不喜欢','转发'],
            input:{}
            color:'#fff',
            move:0
        } );
    });


    ------------------------------------------------------------------------------------
*/
function Alert(json) {
    this.json = json || {};
    this.move = this.json.move || 0;
    this.text = this.json.text || 'Please input you text';
    this.button = this.json.button||'OK';
    this.backrgound = this.json.background || '#fff';
    this.initElements();
    this.initEvents();

};
Alert.prototype={
    initElements:function () {
        this.$mask = $('<div />');
        this.$mask.addClass('bodyMask-Div');
        this.$alertDiv = $('<div />').addClass('alertDiv').css({'background':this.backrgound,'animation':'alertDiv-Move'+this.move+' 0.5s'});
        this.typeofStyle();
        this.$alertBody = $('<div />').addClass('alertBody');
        this.isInput();
        this.isTitle();
        this.isText();
        this.$alertDiv.append(this.$alertBody);
        this.$mask.append(this.$alertDiv);
        this.isButtons();
        $('body').append(this.$mask);
    },
    isInput:function () {
        if(this.json.input != undefined)
        {
            this.json.type=this.json.input.type || 'text';
            this.json.value=this.json.input.value || '这是默认的value';
            this.json.color=this.json.input.color || 'darkred';
            if(this.json.input == {})
            {
                this.valueLen=(this.json.value.length>30)?30:this.json.value.length;
                if(this.json.value.length > 30){
                    this.newValue='';
                    for(var i = 0;i<this.valueLen;i++)
                    {
                        this.newValue += this.json.value[i];
                    }
                    this.json.value = this.newValue;
                }
            }
            else{
                switch (this.json.input.type)
                {
                    case 'text':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'email':
                    {
                        this.$input=$('<input type='+this.json.type+' placeholder='+this.json.value+' maxlength="40">').addClass('input-Text');
                        break;
                    }
                    case 'button':
                    case 'submit':
                    case 'reset':
                    {
                        this.$input=$('<input type='+this.json.type+' value='+this.json.value+'>').addClass('input-Btn').css('background',this.json.color);
                        break;
                    }
                    default:
                    {
                        this.json.type='text';
                        this.json.value='暂不支持其他【Input】组件';
                        this.$input=$('<input type='+this.json.type+' placeholder='+this.json.value+'>').addClass('input-Text');
                        break;
                    }
                }
                this.$inputDiv = $('<div />').addClass('body-InputDiv');
                this.$inputDiv.append(this.$input);
                this.$alertBody.append(this.$inputDiv);
            }
        }

    },
    removeMask:function (persen) {
        persen.remove();
    },
    isButtons:function () {
        this.$btnDiv = $('<div />').addClass('foot-btnDiv');
        this.$foot = $('<div />');
        this.$foot.addClass('footDiv').append(this.$btnDiv);
        if(this.json.buttons != undefined)
        {
            this.len = (this.json.buttons.length>4)?4:this.json.buttons.length;
            for(var i = 0;i<this.len;i++)
            {
                this.$btn = $('<button />').addClass('foot-botton').text(this.json.buttons[i]);
                this.$btnDiv.append(this.$btn);
            }
        }
        else{
            this.$btn = $('<button />').addClass('foot-botton').text(this.button);
            this.$btnDiv.append(this.$btn);
        }
        this.$alertDiv.append(this.$foot);
    },
    initEvents:function () {
        var _this = this;
        $(window).resize(function () {
            _this.$mask.css({
                'height':$(window).height()
            });
        });
        this.$btnDiv.find('button').on('click',function () {
            _this.removeMask(_this.$mask);
        });
    },
    isTitle:function () {
        if (this.json.title != undefined) {
            this.$alertTitle = $('<div />').addClass('alertTitle').text(this.json.title);
            this.$alertBody.append(this.$alertTitle);
        }
    },
    isText:function () {
         this.$alertText = $('<div />').addClass('alertText').text(this.text);
         this.$alertBody.append(this.$alertText);
    },
    typeofStyle:function () {
        if(this.json.type != undefined)
        {
            switch (this.json.type)
            {
                case 'error':
                {
                    this.type = 'error';
                    break;
                }
                case 'success':
                {
                    this.type = 'success';
                    break;
                }
                case 'warn':
                {
                    this.type = 'warn';
                    break;
                }
                default:
                {
                    this.type = 'success';
                    break;
                }
            }
            this.$diviconSpan1 = $('<span />').addClass(this.type+' '+this.type+'-Span1');
            this.$diviconSpan2 = $('<span />').addClass(this.type+' '+this.type+'-Span2');
            this.$diviconMask = $('<div />').addClass(this.type+'-mask').append(this.$diviconSpan1).append(this.$diviconSpan2);
            this.$divicon = $('<div />').addClass('alertIcon '+this.type+'-icon').append(this.$diviconMask);
            this.$alertDiv.append(this.$divicon);
        }
    }
};