$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    $('.input_sub').on('click', function () {
        var txt = $('#input_txt').val().trim()
        if (txt.length <= 0) {
            return $('#input_txt').val('')
        }
        $('.talk_list').append(`
        <li class="right_word">
          <img src="img/person02.png" /> <span>${txt}</span>
        </li>
        `)
        $('#input_txt').val('')
        resetui()
        getMessage(txt)
    })
    function getMessage(text) {//获取服务器的文字信息
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success(res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('.talk_list').append(`
                    <li class="left_word">
                        <img src="img/person01.png" /> <span>${msg}</span >
                    </li >
                        `)
                    resetui()
                    getVoice(msg)
                }
            }
        })
    }
    function getVoice(txt) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: txt
            },
            success(res) {
                console.log(res);
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            },
            error() {
                console.log(arguments);
            }
        })
    }
    $('#input_txt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('.input_sub').click()
        }
    })
})