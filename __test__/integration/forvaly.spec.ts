import Forvaly from '../../src'

const form = {
  name: 'Erick',
  age: 18
}

describe('Forvaly', () => {
  const v = new Forvaly(form)

  it('Valid types', () => {
    expect(v.field('age').string('sdgsdg'))
  })
})
