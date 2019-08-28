import React, {useState} from 'react';
import './App.css';
import DataTable from "./DataTable";
import 'bulma/css/bulma.css'

function App() {
    const [theme, setTheme] = useState('light');

    const darkThemeUrl = 'https://unpkg.com/bulma-dark@0.0.2/dist/css/cyborg.css';
    const themeLink = theme === 'dark' ? <link rel="stylesheet" type="text/css" href={darkThemeUrl} /> : null;

    const themeStyling = theme === 'dark' ? '                thead th, tbody th {\n' +
        '                background: #363636;\n' +
        '            }' : '';

    return (
        <div className="App">
            {themeLink}

            <style>
                {themeStyling}
            </style>

            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Logical Fitness
                        </h1>
                        <h2 className="subtitle">
                            A Guide to Balanced Fitness
                        </h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <DataTable theme={theme}/>
                </div>
            </section>

            <footer className={'footer'}>
                <div className="content has-text-centered">
                    <p>
                        <strong>Logical Fitness</strong> by <a href="https://ehicks.net">Eric Hicks</a>
                        <br />
                        <button className="button" id="lightBulb" onClick={() => {
                            setTheme(prevState => {
                                return prevState === 'dark' ? 'light' : 'dark'
                            });
                        }}
                        >
                            &#x1F4A1;
                        </button>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
