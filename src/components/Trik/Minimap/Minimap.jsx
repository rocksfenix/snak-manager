import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// styles
import './Minimap.scss'
// util
import formatTime from '../util/formatTime'

class Minimap extends Component {
  constructor(props) {
    super(props)

    const METHODS = [
      'updateMinimap',
      'mapWork'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

    this.PROGRESS_TIME
    this.DATA = []
    this.RENDER_MINIMAP = null

  }

  updateMinimap(){
    const mapElement = ReactDOM.findDOMNode(this.refs.map)

    if(this.PROGRESS_TIME<3) {
      this.POSX =  this.props.state.trik.posX
    }
    else {
      this.POSX =  this.props.state.trik.posX - (mapElement.clientWidth / 2)
    }

    mapElement.style.left =  `${this.POSX}px`

  }

  componentWillReceiveProps(nextProps) {
    this.mapWork()
    if(nextProps.state.trik.posX !== this.POSX) {
      this.DATA = this.props.state.runList
      this.updateMinimap()
    }
  }



  renderMinimap(item) {
    switch (item.type) {
    case 'instructions':
      let TEXT
      if(item.instructions.text) {

        if(item.instructions.text.length === 0) {
          TEXT = '[ Empty text ]'
        }
        else if(item.instructions.text.length > 80) {
          TEXT = item.instructions.text.substring(0, 80) + ' ...'
        }
        else {
          TEXT = item.instructions.text
        }
      }
      else{
        TEXT = '[ Empty text ]'
      }
      this.RENDER_MINIMAP = < div className = "Minimap__instructions" >{ TEXT }< /div>
      break

    case 'image':
      this.RENDER_MINIMAP = <div className = "Minimap__image"
        style = {
          {
            width: '100%',
            height: '100%',
            background: `url(${item.image.source})`,
            backgroundSize: 'cover'
          }
        } ></div>

      break

    case 'code':
      this.RENDER_MINIMAP = < div className = "Minimap__code" > < /div>
      break

    default:
      this.RENDER_MINIMAP = <div></div>
    }
  }

  mapWork(){

    for(let i = 0; i < this.DATA.length; i++) {
      // Renderice the region
      if(this.PROGRESS_TIME >= this.DATA[i].from && this.PROGRESS_TIME <= this.DATA[i].to) {
        // Render Minimap
        this.renderMinimap(this.DATA[i])
        i = this.DATA.length
      }
      else {
        // Render Minimap Empty
        this.renderMinimap({})
      }

    }
  }

  render() {
    this.PROGRESS_TIME = Math.round((this.props.state.trik.duration * ( (this.props.state.trik.posX * 100) / window.innerWidth)) / 100)
    const TIME = formatTime(this.PROGRESS_TIME)
    const DISPLAY = this.props.state.trik.showMinimap ? 'block' : 'none'


    return(
      <div ref="map" className="Minimap" style={{ display : DISPLAY, left : `${this.POSX}px`}}>
            {
              this.RENDER_MINIMAP
            }
          <span className="Minimap__timer"> { TIME } </span>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { Minimap }
export default connect(mapStateToProps)(Minimap)
