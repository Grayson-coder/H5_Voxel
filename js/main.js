// 头部箭头的动画效果
$('header .wrap .arrow').css({
    transition: '1s left'
})

// 该index用于同步每一屏（导航菜单、对应的内容区）
let index = 0

// 每一屏的出入场动画
let animationList = [
    // 第一屏
    {
        // 由于用到的是插件，因此要注意DOM的获取时机
        out() {
            $(() => {
                $('.carousel').css({
                    transform: 'translateY(-200px)',
                    opacity: 0
                })
                $('.ipresenter-items').css({
                    transform: 'translateY(400px)',
                    opacity: 0
                })
            })
        },
        in() {
            $(() => {
                $('.carousel').css({
                    transform: 'translateY(0px)',
                    opacity: 1
                })
                $('.ipresenter-items').css({
                    transform: 'translateY(0px)',
                    opacity: .6
                })
            })
        }
    },
    // 第二屏
    {
        out() {
            $('.course .plane1').css({
                transform: `translate(-200px, -200px)`
            })
            $('.course .plane2').css({
                transform: `translate(-200px, -200px)`
            })
            $('.course .plane3').css({
                transform: `translate(200px, -200px)`
            })
        },
        in() {
            $('.course .plane1').css('transform', `translate(0)`)
            $('.course .plane2').css('transform', `translate(0)`)
            $('.course .plane3').css('transform', `translate(0)`)
        }
    },
    // 第三屏
    {
        out() {
            $('.works .pencil1').css('transform', 'translateY(-100px)')
            $('.works .pencil2').css('transform', 'translateY(100px)')
            $('.works .pencil3').css('transform', 'translateY(100px)')
        },
        in() {
            $('.works .pencil1').css('transform', 'translateY(-0px)')
            $('.works .pencil2').css('transform', 'translateY(0px)')
            $('.works .pencil3').css('transform', 'translateY(0px)')
        }
    },
    // 第四屏
    {
        out() {
            $('.about .item1').css('transform', 'rotate(60deg)')
            $('.about .item2').css('transform', 'rotate(-60deg)')

        },
        in() {
            $('.about .item1').css('transform', 'rotate(0deg)')
            $('.about .item2').css('transform', 'rotate(-0deg)')
        }
    },
    // 第五屏
    {
        out() {
            $('.team .title').css('transform', 'translateX(-100px)')
            $('.team .desc').css('transform', 'translateX(100px)')
        },
        in() {
            $('.team .title').css('transform', 'translateX(-0px)')
            $('.team .desc').css('transform', 'translateX(0px)')
        }
    }
]


// 初始化菜单对应的内容区域
moveContent(index)
// 初始化激活菜单
updateStatus(index)
// 初始化箭头位置
updateArrowPosition()
// 更新右侧的小圆点
upDateDot(index)

// -----------------  出入场动画 -----------------------
// 先执行每一个出场动画
animationList.forEach((v) => v.out())
// 更新当前导航菜单对应的内容区的入场动画
animationList[index].in()


// 更新箭头的位置
function updateArrowPosition() {
    let $activeMenu = $('.nav > .active')
    let $arrow = $('header .wrap .arrow')
    // 设置箭头的偏移量
    let y = $activeMenu.offset().left + $activeMenu.width() / 2 - $arrow.width() / 2

    $('header .wrap .arrow').offset({
        left: y,
        top: $('header .wrap .arrow').offset().top
    })
    // console.log($arrow.offset().left);
}

// 监听导航菜单的点击
$('.nav li').on('click', function () {
    index = $(this).index()
    // 更新菜单栏的激活状态
    updateStatus(index)
    // 更新箭头位置
    updateArrowPosition()
    // 更新对应的内容
    moveContent(index)
    // 更新右侧的小圆点
    upDateDot(index)
    // 先执行每一个出场动画
    animationList.forEach((v) => v.out())
    // 更新当前导航菜单对应的内容区的入场动画
    animationList[index].in()

})

// 根据当前菜单栏的索引值，同步菜单栏的激活状态
function updateStatus(index) {
    // 设置当前活跃状态下的li类名
    $('.nav li').removeClass('active')
    $('.nav li').eq(index).addClass('active')
    // 设置被覆盖内容的宽度（要注意权重问题）
    $('.nav li').find('.active').css('width', '')
    $('.nav li').eq(index).find('.active').css('width', '100%')
}

// 根据当前菜单栏的索引值，同步内容区域
function moveContent(index) {
    // 获取内容容器
    let $container = $('.content .container')
    // 计算容器往上移动的偏移量 （相对于原本位置）
    let slideTop = $('.content').height() * -index
    $container.stop().animate({
        top: slideTop
    }, 1000)
}


// 监听页面尺寸的变化
window.addEventListener('resize', () => {
    index = $('header .wrap .nav li.active').index()
    moveContent(index)
})

let timerID
// 监听鼠标滚轮滚动事件
document.addEventListener('wheel', function (e) {
    // 实现防抖函数
    clearTimeout(timerID)
    timerID = setTimeout(() => {
        roll(e)
    }, 200);
})


// 鼠标滚动的处理函数
function roll(e) {
    // 获取当前处于活跃状态的菜单栏的索引
    index = $('header .wrap .nav li.active').index()
    // 判断鼠标滚轮的方向
    if (e.deltaY > 0) {
        index++
        index === 5 ? index = 0 : index = index
    } else {
        index--
        index === -1 ? index = 4 : index = index
    }
    // 更新菜单栏的激活状态
    updateStatus(index)
    // 更新对应的内容区域
    moveContent(index)
    // 更新箭头位置
    updateArrowPosition()
    // 更新右侧的小圆点
    upDateDot(index)
    // 先执行每一个出场动画
    animationList.forEach((v) => v.out())
    // 更新入场动画
    animationList[index].in()
}

// 更新右侧的小圆点
function upDateDot(index) {
    // 获取当前处于活跃的菜单的索引
    $('aside .dot li').removeClass('active')
    $('aside .dot li').eq(index).addClass('active')
}

// 监听小圆点的点击
$('aside .dot li').on('click', function () {
    // 获取当前点击的小圆点的索引值
    index = $(this).index()
    // 更新菜单栏的激活状态
    updateStatus(index)
    // 更新对应的内容区域
    moveContent(index)
    // 更新箭头位置
    updateArrowPosition()
    // 更新右侧的小圆点
    upDateDot(index)
    // 先执行每一个出场动画
    animationList.forEach((v) => v.out())
    // 更新入场动画
    animationList[index].in()
})



