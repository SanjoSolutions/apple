function createDOM(htmlText) {
  return new DOMParser().parseFromString(htmlText, 'text/html')
}

function createTemplate(templateText) {
  const dom = createDOM(templateText)
  const template = dom.querySelector('template')
  return template
}

const template = createTemplate(`
  <template>
    <style>
      :host {
        display: block;
      }
      
      .worm-hole {
        background-color: hsl(0deg 30% 23%);
        border-radius: 50%;
        width: 24px;
        height: 24px;
      }
    </style>
  
    <div class="worm-hole"></div>
  </template>
`)

export class WormHole extends HTMLElement {
  static get observedAttributes() {
    return [
      'color'
    ]
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({mode: 'closed'})
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color') {
      const $apple = this._shadowRoot.querySelector('.worm-hole')
      $apple.style.backgroundColor = newValue
    }
  }
}
