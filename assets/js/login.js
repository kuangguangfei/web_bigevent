$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录账号的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layUI中获取form对象
    var form = layui.form
    //通过form.verify()自定义校验规则
    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位不能有空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框的值
            //还需要拿到密码框的值
            //然后判断是否一致，如果不一致就return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })//使用自定义规则时如果有多个自定义规则就需要用|分开


    //监听注册表单的提交事件

    $('#form_reg').on('submit', function (e) {
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        e.preventDefault()
        $.post('http://127.0.0.1:8088/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
        })
    })


    //监听登录表单的登录事件

    $('#form_login').on('submit', function (e) {
        var data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val(),
        }
        e.preventDefault()
        $.post('http://127.0.0.1:8088/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)

            }
            //将token保留到本地
            localStorage.setItem('token',res.token)
            
            layer.msg(res.message)//登录成功

            
            // 跳转页面
            function jumurl() {
                window.location.href = './index.html';
            }
            setTimeout(jumurl, 1000);


        })
    })


})


