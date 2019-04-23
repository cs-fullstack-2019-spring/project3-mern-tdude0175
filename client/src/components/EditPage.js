import React, {Component} from "react"

export default class EditPage extends Component
{
    constructor(props) {
        super(props);
        this.state={
            responseMessage:"",
            bleat:'',
            message:'',
            private:false,
            picture:'',
        }
    }

    componentDidMount() {
        this.findBleat();
    }

    findBleat=()=>
    {
        fetch("bleats/locateBleatToEdit",
        {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify({

                bleatId:this.props.bleatId,
            })
        })
            .then(data=> data.json())
            .then(response => this.setState({message:response.message,private:response.private,picture:response.picture}))
    };

    EditBleat=(e)=>
    {
        e.preventDefault();
        console.log("Edit da bleat");
        fetch("/bleats/editBleat",{
            method:"PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify(
                {
                    _id:this.props.bleatId,
                    message:e.target.message.value,
                    private:e.target.private.checked,
                    picture:e.target.picture.value,
                })
        })
            .then(data => data.text())
            .then(response => this.setState({responseMessage:response}))
    };

    render() {
        // console.log(this.props.username);
        // console.log(this.props.bleatId);
        console.log(this.state.private);
        console.log(this.state.message);
        console.log(this.state.picture);
        return (
            <div>
                <h1>Edit Form</h1>
                <form onSubmit={this.EditBleat}>
                    <p>
                        <label htmlFor={"message"}>Bleat:</label>
                        <input id={"message"} defaultValue={this.state.message} name={"message"} type="text"/>
                    </p>
                    <p>
                        <label htmlFor={"private"}>Private:</label>
                        <input id={"private"} name={"private"} defaultChecked={this.state.private} type="checkbox"/>
                    </p>
                    <p>
                        <label htmlFor={"picture"}>Image:</label>
                        <input id={"picture"} name={"picture"} defaultValue={this.state.picture} type="text"/>
                    </p>
                    <button>Submit</button>
                </form>
                {this.state.responseMessage}
            </div>
        );
    }
}