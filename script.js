// Initial state count
const initialState = {
    count: 0
};

// Action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Action creators
const increment = () => {
    console.log('Action: INCREMENT');
    return { type: INCREMENT };
};

const decrement = () => {
    console.log('Action: DECREMENT');
    return { type: DECREMENT };
};

const reset = () => {
    console.log('Action: RESET');
    return { type: RESET };
};

// State counterReducer
const counterReducer = (state = initialState, action) => {
    console.log('Reducer received action:', action);
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
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}
