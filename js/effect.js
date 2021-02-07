// -------- 轮播图、炸裂效果、气泡效果 --------------

// 调用轮播图API
$('#ipresenter').iPresenter({
    timerPadding: -1,
    controlNav: true,
    controlNavThumbs: true,
    controlNavNextPrev: false
});

// 图片加载是异步，需要等页面加载完成后获取 -- 炸裂效果
$(() => {
    // 获取原始的图片宽高
    let w = $('.fission-list img').width()
    let h = $('.fission-list img').height()
    // 获取原始的图片路径
    let src1 = $('.fission-list img').eq(0).prop('src')
    let src2 = $('.fission-list img').eq(1).prop('src')
    // 遍历生成4个img标签，用于实现炸裂效果
    $('.fission-list').html('')
    for (let i = 0; i < 4; i++) {
        let imgList = $(`<div><img></img></div>`);
        $('.fission-list').append(imgList)
    }
    // 分别获取第一张图片和第二张图片下的4个小图片
    let firstImg = $('.fission-list').eq(0).find('img')
    let twoImg = $('.fission-list').eq(1).find('img')
    // 设置创建后的小图片宽高
    $('.fission-list > div').width(w / 2)
    $('.fission-list > div').height(h / 2)
    // 分别设置小图片的src属性
    firstImg.prop('src', src1)
    twoImg.prop('src', src2)
    firstImg.eq(1).css({
        left: -(w / 2),
    })
    firstImg.eq(2).css({
        top: -(h / 2),
    })
    firstImg.eq(3).css({
        left: -(w / 2),
        top: -(h / 2),
    })
    twoImg.eq(1).css({
        left: -(w / 2),
    })
    twoImg.eq(2).css({
        top: -(h / 2),
    })
    twoImg.eq(3).css({
        left: -(w / 2),
        top: -(h / 2),
    })
})

// 监听鼠标经过分裂层的事件
$('.about .list .item').hover(function () {
    // 获取当前触发的分裂层
    let $fisstion = $(this).children('.fission-list')
    // 获取原始的图片宽高
    let w = $('.fission-list img').width()
    let h = $('.fission-list img').height()
    // 获取分裂层下的4张小图片
    let imgList = $fisstion.find('img')
    imgList.eq(0).css({ transform: `translateY(${h / 2}px)` })
    imgList.eq(1).css({ transform: `translateX(${-(w / 2)}px)` })
    imgList.eq(2).css({ transform: `translateX(${w / 2}px)` })
    imgList.eq(3).css({ transform: `translateY(${-(h / 2)}px)` })


}, function () {
    // 获取当前触发的分裂层下的4张小图片
    let imgList = $(this).children('.fission-list').find('img')
    imgList.eq(0).css({ transform: `translateY(0px)` })
    imgList.eq(1).css({ transform: `translateX(0px)` })
    imgList.eq(2).css({ transform: `translateX(0px)` })
    imgList.eq(3).css({ transform: `translateY(0px)` })
})

// 监听团队列表的鼠标移入移出事件
let allCircleInfo = []
let drawID
let getID

$('.team .list .item').hover(function () {
    // 修改透明度
    $('.team .list .item').css('opacity', '0.2')
    $(this).css('opacity', 1)
    // 获取当前索引值
    let teamIndex = $(this).index()
    // 根据索引获取画布
    let canvas = $('.team .list .item #team-canvas')[teamIndex]
    // 获取画笔
    let ctx = canvas.getContext('2d')

    // 气泡效果
    bubble(ctx, canvas)

}, function () {
    // 获取当前索引值
    let teamIndex = $(this).index()
    // 修改透明度
    $('.team .list .item').css('opacity', 1)
    // 根据索引获取画布
    let canvas = $('.team .list .item #team-canvas')[teamIndex]
    // 获取画笔
    let ctx = canvas.getContext('2d')
    clearInterval(drawID)
    clearInterval(getID)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    allCircleInfo = []
})


// canvas上的气泡效果
function bubble(ctx, canvas) {
    // 在画布上绘制随机圆
    drawID = setInterval(() => {
        drawCircle(ctx, canvas)
    }, 1000 / 60);

    // 生成随机圆的信息
    getID = setInterval(() => {
        getCircleInfo(canvas)
    }, 50);
}


// 生成随机圆的信息
function getCircleInfo(canvas) {
    let circleInfo = {
        x: Math.random() * canvas.width,
        y: canvas.height - 10,
        r: 5,
        red: Math.round(Math.random() * 255),
        green: Math.round(Math.random() * 255),
        blue: Math.round(Math.random() * 255),
        alp: 1,
        deg: 0,  // 曲线角度
        startX: Math.random() * canvas.width, // x坐标
        startY: canvas.height - 10, // y坐标
        step: Math.random() * 20 + 10,  // 曲线的运动形式
    }
    // 将随机圆信息存放到数组中
    allCircleInfo.push({
        ...circleInfo
    })
}


// 在画布上绘制随机圆
function drawCircle(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 随机圆动画
    allCircleInfo.forEach((value, index) => {
        value.deg += 10
        value.x = value.startX + Math.sin(value.deg * Math.PI / 180) * value.step * 2;
        value.y = value.startY - (value.deg * Math.PI / 180 * value.step);
        value.y <= 0 ? allCircleInfo.splice(index, 1) : ''
    })

    // 遍历圆进行绘制
    allCircleInfo.forEach((value, index) => {
        ctx.save()
        ctx.fillStyle = `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alp})`
        ctx.beginPath()
        ctx.arc(value.x, value.y, value.r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.restore()
    })
}