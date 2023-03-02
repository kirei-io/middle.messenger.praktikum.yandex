
type Nullable<T> = T | null;

const text: Nullable<HTMLDivElement> = document.getElementById(
  "text"
) as HTMLDivElement;
const input: Nullable<HTMLInputElement> = document.getElementById(
  "input"
) as HTMLInputElement;

if (!text || !input) {
  throw new Error("нет полей");
}

const data = {
  title: "",
};

Object.defineProperty(data, "title", {
  set: (value: string) => {
    text.textContent = value;
  },
});

input.addEventListener("keyup", (event) => {
  data.title = event.target.value;
});

export default Nullable;


const props = {
  name: 'Abby',
  chat: 'the last of us. Part II',
  getChat() {
    this._privateMethod();
  },
  _privateMethod() {
    console.log(this._privateProp);
  },
  __privateMethodToo() {},
  _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
  get(target, prop) {
    if(prop.indexOf('_') === 0) {
      throw new Error('Нет прав')
    }
    return typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop];
  },
  set(target, prop, val) {
    if(prop.indexOf('_') === 0){
      throw new Error('Нет прав');
    }
    target[prop] = val
    return true
  },
  deleteProperty(target, prop) {]
    if(prop.indexOf('_') === 0){
      throw new Error('Нет прав')
    }
    delete target[prop]
    return true
  },
});

proxyProps.getChat();
delete proxyProps.chat;

proxyProps.newProp = 2;
console.log(proxyProps.newProp);

try {
	proxyProps._newPrivateProp = 'Super game';
} catch (error) {
	console.log(error);
}

try {
	delete proxyProps._privateProp;
} catch (error) {
	console.log(error); // Error: Нет прав
}

/*
	* Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/


class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element = null;
  _meta = null;

/** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    props = new Proxy(props, {
      set(target, prop, value) {
        const oldValue = target[prop];
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, value)
        return true
      },
      deleteProperty(target, props) {
        throw new Error('Нет доступа')
      }
    })
    return props;
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    console.log('init');
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  _componentDidMount() {
    console.log('did mount')
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps, newProps) {
    console.log('did update')
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

// Может переопределять пользователь, необязательно трогать
componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    console.log('render')
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

// Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }



  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}

class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
		if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

	emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    
    this.listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}


const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
// Можно делать трансформацию GET-параметров в отдельной функции
  const params = []
  for (const key in data) { 
    if (Object.hasOwnProperty.call(data, key)) {
      const value = data[key];
      params.push(`${key}=${value}`)
    }
  }
  console.log(params.join('&'));
  return '?'+params
}
queryStringify({a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]})

class HTTPTransport {
  get = (url, options = {}) => {
      url = url+queryStringify(options.data)
      return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  put = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }
  post = (url, options = {}) => {
    return this.request(url, {... options, method: METHODS.POST}, options.timeout)
  }
  delete = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout)
  }

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj
  request = (url, options = {method: METHODS.GET}, timeout = 5000) => {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
  
      xhr.onload = () => {
        resolve(xhr);
        console.log(xhr)
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}


function fetchWithRetry(url, options) {
  const { retries } = options;
  let retriesCount = 0
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(':(');
      }
      return res
    })
    .catch(err => {
      if (++retriesCount < retries) {
        return fetchWithRetry(url)
      }
    })
}



class EventBus {
  private listeners: Record<string, Function[]>
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
}

  this.listeners[event].forEach(listener => {
    listener(...args);
});
  }
}

const eventBus = new EventBus();

const handlerEvent1 = (arg1, arg2) => {
  console.log('first', arg1, arg2);
};

const handlerEvent2 = (arg1, arg2) => {
  console.log('second', arg1, arg2);
};

try {
	eventBus.emit('common:event-1', 42, 10);
} catch (error) {
	console.log(error); // Error: Нет события: common:event-1
}

eventBus.on('common:event-1', handlerEvent1);
eventBus.on('common:event-1', handlerEvent2);

eventBus.emit('common:event-1', 42, 10);
eventBus.off('common:event-1', handlerEvent2);

eventBus.emit('common:event-1', 84, 20);

/*
	* Вывод в консоли должен быть следующий:
Error: Нет события: common:event-1
first 42 10
second 42 10
first 84 20
*/