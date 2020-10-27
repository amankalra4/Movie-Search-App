import React, { Component } from 'react';

class ErrorComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return <p id = 'errorTitle'>Error has been spotted here!</p>
        }
        return this.props.children;
    }
}

export default ErrorComp;
