import React, {Component} from "react"

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: "search Results"
        }
    }

    searchBleats = (e) => {
        e.preventDefault();
        console.log("searching will take time");
        console.log(e.target.search.value);
        fetch("bleats/searchBleats",
            {
                method: "POST",
                headers:
                    {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        query: e.target.search.value,
                    })
            })
            .then(data=> data.json())
            .then(response=> this.setState({searchResults:response}))
    };

    render() {
        if(this.state.searchResults !== "search Results") {
            var mapData = this.state.searchResults.map((Item) => {
                return (
                    <div key={Item.bleat._id}>
                        <h3>{Item.username}</h3>
                        {Item.bleat.message}
                    </div>
                )
            });
        }else
            {
                var mapData = ""
            }
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
                    {mapData}
            </div>
        );
    }
}