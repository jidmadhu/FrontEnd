import React, {Component} from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {drawresults: [], loading: true};
    }

    componentDidMount() {
        this.populateOpenDrawsData();
    }

    static renderLottoDataTable(drawresults) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>Draw Number</th>
                    <th>Product</th>
                    <th>Display Name</th>
                    <th>Draw Date</th>
                    <th>JackPot Amount</th>
                    <th>Logo</th>
                </tr>
                </thead>
                <tbody>
                {drawresults.Draws.map(results =>
                    <tr key={results}>
                        <td>{results.DrawNumber}</td>
                        <td>{results.ProductId}</td>
                        <td>{results.DrawDisplayName}</td>
                        <td>{results.DrawDate}</td>
                        <td>{results.Div1Amount}</td>
                        <td><img src={results.DrawLogoUrl} alt={results.DrawType}/></td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderLottoDataTable(this.state.drawresults);

        return (
            <div>
                <h1 id="tabelLabel">Open Draws</h1>
                <p>Showing the Lotto Open Draws.</p>
                {contents}
            </div>
        );
    }

    async populateOpenDrawsData() {
        const response = await fetch('lotto/opendraws');
        const data = await response.json();
        this.setState({drawresults: JSON.parse(data), loading: false});
    }
}
