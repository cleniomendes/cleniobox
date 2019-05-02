import React, { Component } from 'react';
import './styles.css';
import logo from '../../assets/logo.png';
import {MdInsertDriveFile} from 'react-icons/md';
import api from '../../services/api';
import {distanceInWords} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';



export default class Box extends Component {
    state = { box: {} }
    async componentDidMount() {
        this.subscribeToNewFile();
        
        const boxId = this.props.match.params.id;
        const response = await api.get(`boxes/${boxId}`);         

        this.setState({box: response.data});
    }

    subscribeToNewFile = () => {
        const io = socket('https://cleniobox-backend.herokuapp.com');
        const boxId = this.props.match.params.id;

        io.emit('connectRoom', boxId);
        io.on('file', data => {
            this.setState({
                box: { ... this.state.box, files: [data, ...this.state.box.files]}
            });
        });
    }

    handleUpload = files => {
        const boxId = this.props.match.params.id;
        files.forEach(file => {
            const data = new FormData();
            data.append('file', file);

            api.post(`boxes/${boxId}/files`, data);
        });
    }
  
    render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt=""/>
                <h1>{this.state.box.title}</h1>
            </header>
            
            <Dropzone onDropAccepted={this.handleUpload}>
                {({getRootProps, getInputProps}) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()} />

                        <p>Arraste arquivos ou clique aqui!</p>
                    </div>                    
                )}
            </Dropzone>
            
            <ul>
                {this.state.box.files && this.state.box.files.map(file => (
                 <li key={file._id}>
                    <a className="fileInfo" href={file.url} target="_blank">
                        <MdInsertDriveFile size={24} color="#A5Cfff" />
                        <strong>{file.title}</strong>
                    </a>
                    <span>há {distanceInWords(file.createdAt, new Date(), {
                        locale: pt
                    })}</span> 
                </li>
                )) }                
            </ul>
        </div>
    );
  }
}
