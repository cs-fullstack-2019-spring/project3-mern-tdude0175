import React , {Component} from "react"

export default class SearchPage extends Component
{
    constructor(props) {
        super(props);
        this.state={
            searchResults:"search Results"
        }
    }

    render() {
        return (
            <div>
                <h1>Search Page</h1>
                <form>
                    <p>
                        <label>Search:</label>
                        <input type="text"/>
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