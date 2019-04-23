import React , {Component} from "react"

export default class SearchPage extends Component
{
    constructor(props) {
        super(props);
        this.state={
            searchResults:"search Results"
        }
    }

    searchBleats =(e)=>
    {
        e.preventDefault();
        console.log("searching will take time");
        console.log(e.target.search.value);
        fetch("bleats/searchBleats",
        {
            method:"POST",
            headers:
                {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
        });
    };

    render() {
        return (
            <div>
                <h1>Search Page</h1>
                <form onSubmit={this.searchBleats}>
                    <p>
                        <label>Search:</label>
                        <input name={"search"} type="text"/>
                    </p>
                    <button>Submit</button>
                </form>
                <p>
                {this.state.searchResults}
                </p>
            </div>
        );
    }
}