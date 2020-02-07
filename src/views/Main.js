/* eslint-disable no-restricted-globals */
import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "shards-react";
import firebase, {fire} from '../Firebase';

class Main extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({islogIn: false, string: ''})
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.islogIn) {
            return {
                string: <div className="error">
                        <div className="error__content">
                            <h2>Hello World!</h2>
                            <h3>넥스탑 문제풀이 사이트 입니다</h3>
                            <p>문제 열람 관련해선 담당 선생님께 문의 바랍니다</p>
                        </div>
                    </div>
            }
        } else if (!prevState.islogIn) {
            return {string: null}
        }
    }
    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (!user) {
                    alert('비정상적인 접근입니다!')
                    this
                        .props
                        .history
                        .push('/')
                } else {
                    this.setState({islogIn: true})
                }
            });
    }
    render() {
        return (
            <Container fluid>
                {this.state.string}
            </Container>
        );
    }
}

export default Main;