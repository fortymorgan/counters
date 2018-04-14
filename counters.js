function addCounter(id) {
    const counter = document.createElement('div');
    counter.id = `counter-${id}`;

    counter.innerHTML = `<span id="value-${id}"></span>
    <button id="dec-${id}">-</button>
    <button id="inc-${id}">+</button>
    <button id="del-${id}">x</button>
    <input type="checkbox" id="checkbox-${id}">
    <label for="checkbox-${id}">Auto increment</label>
    <input type="range" id="range-${id}" min="1" max="10" value="1">
    <label for="range-${id}" id="label-${id}"></label>`
    
    document.body.appendChild(counter);

    const delButton = getElement('del');
    const decButton = getElement('dec');
    const incButton = getElement('inc');
    const valueDisplay = getElement('value');
    const autoIncrementToggle = getElement('checkbox');
    const frequencySelection = getElement('range');
    const frequencyDisplay = getElement('label');
    
    delButton.addEventListener('click', () => counter.remove());
    
    const state = {
        value: 0,
        intervalId: null,
        frequency: 1,
    }
    
    const incWithRender = withRender(() => state.value += 1)
    const decWithRender = withRender(() => state.value -= 1)
    
    decButton.addEventListener('click', decWithRender)    
    incButton.addEventListener('click', incWithRender)
    
    autoIncrementToggle.addEventListener('change', () => {
        if (autoIncrementToggle.checked) {
            startInterval();
        } else {
            stopInterval();
        }
    })
    
    frequencySelection.addEventListener('input', () => {
        state.frequency = frequencySelection.value;
        render();
        if (state.intervalId !== null) {
            stopInterval();
            startInterval();
        }
    })
    
    function render() {
        valueDisplay.innerText = state.value;
        frequencyDisplay.innerText = state.frequency;
    }
        
    function withRender(action) {
        return function() {
            action();
            render();
        }
    }
    
    function startInterval() {
        state.intervalId = setInterval(incWithRender, 1000 / state.frequency);
    }
    
    function stopInterval() {
        clearInterval(state.intervalId);
        state.intervalId = null;
    }

    function getElement(prefix) {
        return document.getElementById(`${prefix}-${id}`);
    }
    
    render();
}

let nextCounterId = 0;

document.getElementById("add-counter").addEventListener('click', () => addCounter(nextCounterId++));