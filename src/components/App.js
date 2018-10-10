import React from 'react'

class App extends React.Component{
    
    render() {
        return (
            <div>
                <h1>欢迎来到react的世界</h1>
                <h2>{process.env.NODE_ENV}</h2>
            </div>
        )
    }
}

export default App