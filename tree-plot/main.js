const canvas = document.querySelector('canvas') 
const ctx = canvas.getContext('2d')

const screenWidth = document.documentElement.clientWidth
const screenHeight = document.documentElement.clientHeight

canvas.width = screenWidth * 2
canvas.height = screenHeight * 2

function color(level) {
  const x = level * 10
  return '#'+x.toString('16') + x.toString('16') + x.toString('16')
}

function tree_plot(p, a, w, h, L) {
  if(L > 10) {return}
  const [x, y] = p 

  // 绘制一个枝干
  ctx.translate(x, y)
  ctx.rotate(a * Math.PI / 180)
  ctx.moveTo(- w/2, 0)
  ctx.lineTo(-w*0.65 / 2, - h)
  ctx.lineTo(w * 0.65/ 2, - h)
  ctx.lineTo( w / 2, 0)
  ctx.strokeStyle = color(L)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fill()

  const nextX = x + h * Math.sin(a * Math.PI / 180) 
  const nextY = y - h * Math.cos(a * Math.PI / 180) 
  tree_plot([nextX, nextY], a + 15, w * 0.65, h * 0.9, L + 1)
  tree_plot([nextX, nextY], a - 15, w * 0.65, h * 0.9, L + 1)
}



// 利用generator实现一步一步显示
// function * tree_plot_gen(p, a, w, h, L) {
//   if(L > 6) {return}
//   const [x, y] = p 



//   const nextX = x + h * Math.sin(a * Math.PI / 180) 
//   const nextY = y - h * Math.cos(a * Math.PI / 180) 
//   yield * tree_plot_gen([nextX, nextY], a - 15, w * 0.65, h * 0.9, L + 1)
//   // 绘制一个枝干
//   ctx.translate(x, y)
//   ctx.rotate(a * Math.PI / 180)
//   ctx.moveTo(- w / 2, 0)
//   ctx.lineTo(-w * 0.65 / 2, - h)
//   ctx.lineTo(w * 0.65 / 2, - h)
//   ctx.lineTo(w / 2, 0)
//   ctx.strokeStyle = color(L)
//   ctx.setTransform(1, 0, 0, 1, 0, 0)
//   ctx.fill()
//   yield true
//   yield * tree_plot_gen([nextX, nextY], a + 15, w * 0.65, h * 0.9, L + 1)


// }


tree_plot([screenWidth, 2*screenHeight - 200], 0, 30, 150, 0)
// const it = tree_plot_gen([screenWidth, 2*screenHeight - 200], 0, 30, 150, 0)


// 按键一步一步显示
// document.addEventListener('keyup', (e) => {
//   if(e.keyCode === 39) {
//     it.next()
//   }
// })