import React, {useState, useRef} from 'react'
import ExpandMore from './ExpandMore'
import Button from '@material-ui/core/Button'

export default function Accordion(props) {
  const [setActive, setActiveState] = useState('')
  const [setHeight, setHeightState] = useState('0px')

  const content = useRef(null)

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '')
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    )
  }
  return (
    <div className="accordion_section">
      <Button
        className={`accordion${setActive}`}
        onClick={toggleAccordion}
        variant="contained"
        color="white"
        size="small"
      >
        <p className="accordion_title">{props.title}</p>
        <ExpandMore width={12} fill="#666" />
      </Button>
      <div
        ref={content}
        style={{maxHeight: `${setHeight}`}}
        className="accordion_content"
      >
        <div
          className="accordion_text"
          dangerouslySetInnerHTML={{__html: props.content}}
        />
      </div>
    </div>
  )
}
