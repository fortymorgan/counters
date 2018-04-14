function addCounter(id) {
    const div = document.createElement('div');
    div.id = `counter-${id}`;

    div.innerHTML = `<span id="value-${id}"></span>
    <button id="dec-${id}">-</button>
    <button id="inc-${id}">+</button>
    <button id="del-${id}">x</button>
    <input type="checkbox" id="checkbox-${id}">
    <label for="checkbox-${id}">Auto increment</label>
    <input type="range" id="range-${id}" min="1" max="10" value="1">
    <label for="range-${id}" id="label-${id}"></label>`
    
    document.body.appendChild(div);

    const delButton = document.getElementById(`del-${id}`);
    const decButton = document.getElementById(`dec-${id}`);
    const incButton = document.getElementById(`inc-${id}`);
    const valueField = document.getElementById(`value-${id}`);
    const checkAutoInc = document.getElementById(`checkbox-${id}`);
    const autoIncFreqRange = document.getElementById(`range-${id}`);
    const incFreqValue = document.getElementById(`label-${id}`)
    
    delButton.addEventListener('click', () => div.remove());
    
    const state = {
        value: 0,
        intervalID: null,
        autoIncFreq: 1,
    }
    
    const incWithRender = withRender(() => state.value += 1)
    const decWithRender = withRender(() => state.value -= 1)
    
    decButton.addEventListener('click', decWithRender)    
    incButton.addEventListener('click', incWithRender)
    
    checkAutoInc.addEventListener('change', () => {
        if (checkAutoInc.checked) {
            startInterval();
        } else {
            stopInterval();
        }
    })
    
    autoIncFreqRange.addEventListener('input', () => {
        state.autoIncFreq = autoIncFreqRange.value;
        render();
        if (state.intervalID !== null) {
            stopInterval();
            startInterval();
        }
    })
    
    function render() {
        valueField.innerText = state.value;
        incFreqValue.innerText = state.autoIncFreq;
    }
        
    function withRender(action) {
        return function() {
            action();
            render();
        }
    }
    
    function startInterval() {
        state.intervalID = setInterval(incWithRender, 1000 / state.autoIncFreq);
    }
    
    function stopInterval() {
        clearInterval(state.intervalID);
        state.intervalID = null;
    }
    
    render();
}

let iForId = 0;

document.getElementById("add-counter").addEventListener('click', () => addCounter(iForId++));