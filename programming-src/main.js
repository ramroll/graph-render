import jsx from 'jsx-doc'
import './main.styl'
import Render from './lib/render'
import qs from 'qs'


const codeInput = <div class='ipt-wrapper'>
  <textarea id='ipt' />
</div>

const resultViewer = <div class='result-view' id='result-viewer'>
</div>

const html = <div class='app'>
  {codeInput}
  {resultViewer}
</div>


$('body').append(html)

const editor = CodeMirror.fromTextArea($("#ipt")[0], {
  lineNumbers: true,
  theme: 'dracula',
  fontSize: 16
})

editor.setSize('100%', '100%')


async function run() {
  const query = qs.parse(location.search.substr(1))
  const resp = await fetch('/assets/code/' + query.file + '.js')
  const src = await resp.text()
  const orders = (query.order || '').split(',').filter(x => x !== '').map(x => parseInt(x)).map(x => x - 1)

  const render = new Render(src, {
    orders,
    tickHandler: (lines, line, at) => {
      const code = lines.map(x => x.content).join('\n')
      editor.setValue(code)
      editor.setCursor(line, at + 1)
    },
    finishHandler: () => {

      const log = console.log
      const results = []
      console.log = function (...args) {
        results.push([...args])
        log(...args)
      }
      const src = render.lines.join('\n')
      eval(src)

      const textNodes = results.map((args) => {

        const prts = []
        for (let arg of args) {
          if (typeof arg === 'object') {
            prts.push(JSON.stringify(arg))
          }
          else {
            if(typeof arg === 'string') {
              arg = arg.replace(/ /g, '&nbsp;')
            }
            prts.push(arg)
          }
        }

        return prts.join(' ')

      }).map(text => {
        return <p dangerouslySetInnerHTML={{__html : text}}></p>
      })

      $('#result-viewer').empty().append(<div>{textNodes}</div>)
      console.log = log



    }
  })


  $(document).keyup((e) => {
    if (e.keyCode === 39) {
      render.resume()
    }
    if (e.keyCode === 37) {
      render.back()
    }
  })

  render.play()


}

run()


