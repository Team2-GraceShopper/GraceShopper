import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Checkout} from './checkout'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Checkout', () => {
  let checkout
  beforeEach(() => {
    checkout = shallow(<Checkout />)
  })

  it('checks out', () => {
    expect()
  })
})
