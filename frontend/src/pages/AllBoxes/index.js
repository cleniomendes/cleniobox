import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import api from '../../services/api';
import {MdFolder} from 'react-icons/md';

export default class AllBoxes extends Component {
    state = { boxes: [] }

    async componentDidMount() {                
        const response = await api.get(`/boxes`);         
        console.log(response.data);
        this.setState({boxes: response.data});
    }
  
    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt=""/>
                    <h1>Lista todos os boxes</h1>
                </header>                
                <ul>
                    {this.state.boxes && this.state.boxes.map(box => (
                     <li key={box._id}>
                        <a className="fileInfo">
                            <MdFolder size={24} color="#A5Cfff" />
                            <strong>{box.title}</strong>
                        </a>                        
                    </li>
                    )) }                
                </ul>
            </div>
        );
    }
}
