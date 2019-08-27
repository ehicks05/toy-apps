import React from 'react';
import './App.css';
import DataTable from "./DataTable";
import 'bulma/css/bulma.css'

const App: React.FC = () => {
  return (
    <div className="App">
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
                <DataTable />
            </div>
        </section>

        <footer className={'footer'}>
            <div className="content has-text-centered">
                <p>
                    <strong>Logical Fitness</strong> by <a href="https://ehicks.net">Eric Hicks</a>
                </p>
            </div>
        </footer>
    </div>
  );
};

export default App;
