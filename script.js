// Initial state count
const initialState = {
    count: 0
};

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });

// State counterReducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 };
        case DECREMENT:
            return { ...state, count: state.count - 1 };
        case RESET:
            return { ...state, count: 0 };
        default:
            return state;
    }
};

// Store class
class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.state = this.reducer(undefined, {});
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state));
        
        // Log action and new state
        console.log(`Action dispatched: ${action.type}`);
        console.log('New state:', this.state);
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

// Create a store instance
const store = new Store(counterReducer);

// Subscribe to log state updates
store.subscribe((state) => {
    // This listener can be used to log or perform other actions
    console.log('Current state:', state);
});

// Button event listeners
document.getElementById('increment').addEventListener('click', () => {
    store.dispatch(increment());
});

document.getElementById('decrement').addEventListener('click', () => {
    store.dispatch(decrement());
});

document.getElementById('reset').addEventListener('click', () => {
    store.dispatch(reset());
});
