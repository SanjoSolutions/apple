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
      
      .apple {
        background-color: #da0000;
        border-radius: 50%;
        width: 200px;
        height: 200px;
      }
    </style>
  
    <div class="apple">
      <slot />
    </div>
  </template>
`)

export class Apple extends HTMLElement {
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
      const $apple = this._shadowRoot.querySelector('.apple')
      $apple.style.backgroundColor = newValue
    }
  }
}
