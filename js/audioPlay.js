// 音频播放
$(() => {
    // 监听音乐图标的点击
    let musicIcon = $('.music-icon')[0]
    $('.music-icon').on('click', () => {
        // 获取当前音乐是否处于暂停播放的状态
        let paused = $('audio')[0].paused
        if (paused) {
            // 播放音乐
            $('audio')[0].play()
            musicIcon.src = './img/musicon.gif'
        } else {
            // 暂停播放
            $('audio')[0].pause()
            musicIcon.src = './img/musicoff.gif'
        }
    })

})


// 开机动画
$(() => {
    $('.start .line').css('width', '100vw')
    // 监听线的过渡动画结束事件
    $('.start .line').on('transitionend', function () {
        $(this).css('display', 'none')
        $('.start .up').css('top', '-50vh')
        $('.start .down').css('top', '50vh')
    })
    // 监听上下两个部分的过渡动画结束事件
    $('.start .up, .start .down').on('transitionend', function () {
        $('.start .up').css('display', 'none')
        $('.start .down').css('display', 'none')
        $('.start').css('display', 'none')
    })
})