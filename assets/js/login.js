$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取相应对象
    var form = layui.form
    var layer = layui.layer;


    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫 pwd 的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到确认密码框中的内容
            // 再获取密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            // 判断两个密码是否相等
            if (pwd !== value) {
                // 不同则返回一个提示消息
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) { // 注意是否获取到ID元素(检查 form 表单是否有此 id)
        // 1.阻止默认的提交行为
        // e.prventDefault() 注意单词拼写
        e.preventDefault()
        // var data = {
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        // }
        // 使用 jQuery 快速获取表单数据
        var data = $(this).serialize()
        // console.log(data);
        // 2.发起 Ajax 的 POST 请求
        $.post('/api/reguser', data, function (res) {
            if (res.status === 0) {
                // if (res.status !== 0) {
                // return console.log(res.message);
                // return layer.msg(res.message);

                // 模拟人的点击行为
                $('#link_login').click()

            }
            // console.log('注册成功,请登录！')
            layer.msg(res.message);
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorge 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})