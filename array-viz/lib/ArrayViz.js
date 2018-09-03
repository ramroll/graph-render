import React, {Component} from 'react'
import './viz.styl'


async function wait(ms) {
  return new Promise( (resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export default class ArrayViz extends Component {

  constructor(){
    super()

    this.state = {
      data : [1,2,3,4,5,6],
      swaping : null,
      changeAt : null,
      animating : false
    }

    this.swap = this.swap.bind(this)
  }


  componentDidMount(){

    let i = 0
    setInterval( () => {
      const rnd1 = Math.floor( Math.random() * 6 )
      const rnd2 = Math.floor( Math.random() * 6 )
      if(rnd1 !== rnd2)
      this.swap(rnd1, rnd2)
    }, 2000)
  }

  async setStateASync(state) {

    return new Promise( (resolve) => {
      this.setState({
        ...state
      }, () => {
        resolve()
      })

    })

  }

  async swap(i, j){


    await this.setStateASync({
      swaping : {
        idx : [i, j],
        s : 0
      }
    })



    await this.setStateASync({
      swaping : {
        idx : [i, j],
        s : 1
      }
    })

    await wait(1000)

    const data = this.state.data
    const t = data[i]
    data[i] = data[j]
    data[j] = t

    await this.setStateASync({
      data : [...data]
    })

    this.setState({
      swaping : null
    })
  }

  changeAt(i, v) {
    this.setState(prevState => {
      const data =prevState.data.slice()
      data[i] = v
      return {
        data
      }
    })

  }

  getStyle(i, j){

    if(!this.state.swaping) {
      return {}
    }
    const {idx, s} = this.state.swaping

    const [x, y] = idx
    const time = '1s'
    if(s === 0) {
      return {

        left : 0,
        transition : `transform ${time} ease`
      }
    }
    if(s === 1) {

      if(j === x) {
        return {
          transform : `translate(${(y-x) * 70}px, 0)`,
          transition: `transform ${time} ease-in`,
        }
      }
      if(j === y) {
        return {
          transform : `translate(${(x-y) * 70}px, 0)`,
          transition: `transform ${time} ease-out`,
        }
      }
    }

    return {}
  }

  render(){
    const A = this.state.data
    const {swaping} = this.state
    const idx = swaping ? swaping.idx : []
    const [x,y] = idx
    return <div className='array-block'>
      <div className='row'>
        {A.map( (i, j) => <Cell
          swaping={x === j || y === j}
          style={this.getStyle(i, j)} i={i} j={j} />)}
      </div>
    </div>

  }

}


class Cell extends React.Component{

  constructor(props){
    super()

    this.state = {
      i : props.i,
      changing : false
    }
  }

  componentWillReceiveProps(nextProps){

    if(this.props.i !== nextProps.i) {
      if(nextProps.swaping) {
        this.setState({
          changing: false,
          i: nextProps.i
        })
      } else {

        this.setState({ changing: true }, () => {
          setTimeout(() => {
            this.setState({
              changing: false,
              i: nextProps.i
            })

          }, 300)
        })
      }
    }

  }

  cellStyle = (i, j) => {
    const {changing} = this.state
    const {swaping} = this.props
    return {
      zIndex : swaping ? 1 : 0,
      color : changing ? 'red' : 'black'
    }
  }

  render() {
    const { j, style } = this.props
    const { i } = this.state

    return <div className='cell' key={j}
      style={{...this.cellStyle(i, j), ...style}}
    >{i}</div>
  }
}