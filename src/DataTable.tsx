import React, {useState} from 'react';
import data from './data.json';

// @ts-ignore
function DataTable(props) {

    const [user, setUser] = useState(data.initialUserState);
    const columns = data.columns;
    const tableData = data.tableData;

    const headerRow = columns.map(column => {
        const className = column.key === 'tier' ? '' : 'has-text-right';
        return <th key={column.key} className={className}>{column.title}</th>
    });

    const inputClasses = props.theme === 'dark' ? 'has-text-light has-background-dark' : '';

    const dataRows = tableData.reverse().map(dataRow => {
        const dataRowEl = columns.map(column => {

            if (dataRow.tier === 'You')
            {
                if (column.key === 'tier')
                {
                    return <th key={dataRow.tier + ' ' + column.key}>{dataRow.tier}</th>;
                }
                else
                {
                    // @ts-ignore
                    const value = user[column.key];
                    return <td className={'has-text-right'} key={dataRow.tier + ' ' + column.key}>
                        <input className={'input has-text-right ' + inputClasses} inputMode={'number'} size={5} id={column.key} value={value}
                               name={column.title}
                               onChange={e => {
                                   const val = e.target.value ? e.target.value : 0;
                                   setUser(prevState => {
                                       return {...prevState, [column.key] : val}
                                   });
                               }}
                        />
                    </td>;
                }
            }
            else
            {
                // @ts-ignore
                const value = dataRow[column.key];

                if (column.key === 'tier')
                {
                    return <th key={dataRow.tier + ' ' + column.key}>{value}</th>;
                }
                else
                {
                    // @ts-ignore
                    const levelUnlocked = column.biggerIsBetter ? (user[column.key] >= value) : user[column.key] <= value;
                    const progressClass = levelUnlocked ? 'is-success' : '';
                    const className = `has-text-right ${progressClass}`;
                    return <td key={dataRow.tier + ' ' + column.key} className={className}>{value + ' ' + column.unit}</td>;
                }
            }
        });

        return <tr key={dataRow.tier}>{dataRowEl}</tr>;
    });

    return (
        <div style={{overflow: 'auto'
            // , height: '300px'
        }}>
            <table className="table is-narrow" style={{width: '100%'}}>
                <thead>
                    <tr>
                        {headerRow}
                    </tr>
                </thead>
                <tbody>
                    {dataRows}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
