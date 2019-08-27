import React, {useState} from 'react';

function DataTable() {

    const [user, setUser] = useState({
        pushups:                0,
        pullups:                0,
        bicepCurl:              0,
        benchPress:             0,
        squats:                 0,
        deadlift:               0,
        oneHundredMeterDash:  100,
        oneMileRun:           100,
    });

    const columns = [
        {
            title: 'Tier',
            dataIndex: 'tier',
            key: 'tier',
            fixed: "left",
            biggerIsBetter: false,
        },
        {
            title: 'Pushup',
            dataIndex: 'pushups',
            key: 'pushups',
            unit: '',
            biggerIsBetter: true,
        },
        {
            title: 'Pullup',
            dataIndex: 'pullups',
            key: 'pullups',
            unit: '',
            biggerIsBetter: true,
        },
        {
            title: 'Bicep Curl',
            dataIndex: 'bicepCurl',
            key: 'bicepCurl',
            unit: 'lb',
            biggerIsBetter: true,
        },
        {
            title: 'Bench',
            dataIndex: 'benchPress',
            key: 'benchPress',
            unit: 'lb',
            biggerIsBetter: true,
        },
        {
            title: 'Squat',
            dataIndex: 'squats',
            key: 'squats',
            unit: 'lb',
            biggerIsBetter: true,
        },
        {
            title: 'Deadlift',
            dataIndex: 'deadlift',
            key: 'deadlift',
            unit: 'lb',
            biggerIsBetter: true,
        },
        {
            title: '100M Dash',
            dataIndex: 'oneHundredMeterDash',
            key: 'oneHundredMeterDash',
            unit: 's',
            biggerIsBetter: false,
        },
        {
            title: '1 Mile Run',
            dataIndex: 'oneMileRun',
            key: 'oneMileRun',
            unit: 'min',
            biggerIsBetter: false,
        },
    ];

    const headerRow = columns.map(column => {
        const className = column.key === 'tier' ? '' : 'has-text-right';
        return <th key={column.key} className={className}>{column.title}</th>
    });

    const data = [
        {
            tier: 'You',
        },
        {
            tier: 'Plankton',
            pushups: 0,
            pullups: 0,
            bicepCurl: 2,
            benchPress: 5,
            squats: 5,
            deadlift: 5,
            oneHundredMeterDash: 50,
            oneMileRun: 30,
        },
        {
            tier: 'Tadpole',
            pushups: 0,
            pullups: 0,
            bicepCurl: 5,
            benchPress: 10,
            squats: 10,
            deadlift: 10,
            oneHundredMeterDash: 45,
            oneMileRun: 20,
        },
        {
            tier: 'Krill',
            pushups: 1,
            pullups: 0,
            bicepCurl: 6,
            benchPress: 12,
            squats: 12,
            deadlift: 12,
            oneHundredMeterDash: 40,
            oneMileRun: 18,
        },
        {
            tier: 'Anchovy',
            pushups: 1,
            pullups: 1,
            bicepCurl: 8,
            benchPress: 16,
            squats: 16,
            deadlift: 16,
            oneHundredMeterDash: 35,
            oneMileRun: 16,
        },
        {
            tier: 'Goldfish',
            pushups: 3,
            pullups: 1,
            bicepCurl: 16,
            benchPress: 25,
            squats: 25,
            deadlift: 25,
            oneHundredMeterDash: 30,
            oneMileRun: 14,
        },
        {
            tier: 'Jellyfish',
            pushups: 10,
            pullups: 2,
            bicepCurl: 20,
            benchPress: 40,
            squats: 40,
            deadlift: 40,
            oneHundredMeterDash: 25,
            oneMileRun: 12,
        },
        {
            tier: 'Minnow',
            pushups: 12,
            pullups: 3,
            bicepCurl: 25,
            benchPress: 60,
            squats: 60,
            deadlift: 60,
            oneHundredMeterDash: 20,
            oneMileRun: 10,
        },
        {
            tier: 'Lobster',
            pushups: 20,
            pullups: 7,
            bicepCurl: 30,
            benchPress: 80,
            squats: 80,
            deadlift: 80,
            oneHundredMeterDash: 18,
            oneMileRun: 8,
        },
        {
            tier: 'Manta Ray',
            pushups: 25,
            pullups: 10,
            bicepCurl: 40,
            benchPress: 90,
            squats: 90,
            deadlift: 90,
            oneHundredMeterDash: 15,
            oneMileRun: 7,
        },
        {
            tier: 'Dolphin',
            pushups: 30,
            pullups: 15,
            bicepCurl: 50,
            benchPress: 110,
            squats: 110,
            deadlift: 110,
            oneHundredMeterDash: 12,
            oneMileRun: 6,
        },
        {
            tier: 'Swordfish',
            pushups: 40,
            pullups: 20,
            bicepCurl: 60,
            benchPress: 130,
            squats: 130,
            deadlift: 130,
            oneHundredMeterDash: 11,
            oneMileRun: 5.5,
        },
        {
            tier: 'Shark',
            pushups: 50,
            pullups: 25,
            bicepCurl: 130,
            benchPress: 250,
            squats: 250,
            deadlift: 250,
            oneHundredMeterDash: 10,
            oneMileRun: 4.5,
        },

    ];

    const dataRows = data.reverse().map(dataRow => {
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
                        <input className={'has-text-right'} inputMode={'number'} size={5} id={column.key} value={value}
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
        <div style={{overflow: 'scroll'
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
