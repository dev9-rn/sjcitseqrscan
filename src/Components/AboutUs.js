import React, { Component } from 'react';
import { BackHandler, Platform, View, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { Header, Left, Body, Right, Card, CardItem, Text, Title, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Col, Grid } from "react-native-easy-grid";

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setNavigationScreen: '',
            backgroundColorHeader: ''
        };
    }
    // componentWillMount() {
    //     if (this.props.user_type === 1) {
    //         this.setState({ setNavigationScreen: 'VerifierMainScreen', backgroundColorHeader: '#0000FF' });
    //     } else {
    //         this.setState({ setNavigationScreen: 'InstituteMainScreen', backgroundColorHeader: '#94302C' });
    //     }
    // }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if (this.props.user_type === 1) {
            this.setState({ setNavigationScreen: 'VerifierMainScreen', backgroundColorHeader: '#0000FF' });
        } else {
            this.setState({ setNavigationScreen: 'InstituteMainScreen', backgroundColorHeader: '#94302C' });
        }

    }
    componentWillUnmount() { BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); }
    handleBackPress = () => { this.props.navigation.goBack(null); return true; }
    _sendMail() { Linking.openURL('mailto:software@scube.net.in?subject=Enquiry regarding SeQR scan.'); }
    _openURL() { Linking.openURL('http://scube.net.in'); }
    _showHeader() {
        if (Platform.OS == 'ios') {
            return (
                <Header style={{ backgroundColor: this.state.backgroundColorHeader }}>
                    <Grid>
                        <Col size={1} style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <Icon type="FontAwesome" name="long-arrow-left" style={{ fontSize: 25, color: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </Col>
                        <Col size={10} style={{ justifyContent: 'center' }}>
                            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold' }}>About us</Text>
                        </Col>
                        <Col size={1}>
                        </Col>
                    </Grid>
                </Header>
            )
        } else {
            return (
                <Header style={{ backgroundColor: this.state.backgroundColorHeader }}>
                    <Grid>
                        <Col size={1} style={{ justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                                <Icon type="FontAwesome" name="long-arrow-left" style={{ fontSize: 25, color: '#FFFFFF' }} />
                            </TouchableOpacity>
                        </Col>
                        <Col size={10} style={{ justifyContent: 'center' }}>
                            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold' }}>About us</Text>
                        </Col>
                        <Col size={1}>
                        </Col>
                    </Grid>
                </Header>
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._showHeader()}
                <StatusBar backgroundColor={this.props.user_type === 2 ? '#94302C' : "#0000FF"} />
                <Card style={{ marginLeft: 10, marginRight: 10 }}>
                    <CardItem>
                        <Body>
                            <Text>
                                Scube offers a variety of ERP solutions for businesses including banks, e-libraries, document management systems, visa on arrival and land taxation systems etc.
		                	</Text>
                            <Text>Feel free to contact us to get a qoute.</Text>
                            <TouchableOpacity onPress={() => this._sendMail()}>
                                <Text style={{ paddingTop: 20, color: 'blue' }}>software@scube.net.in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._openURL()}>
                                <Text style={{ paddingTop: 20, color: 'blue' }}>http://scube.net.in</Text>
                            </TouchableOpacity>
                        </Body>
                    </CardItem>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    if (state.VerifierReducer.LoginData) {
        return {
            user_type: 1
        }
    } else {
        return {
            user_type: 2
        }
    }
}
export default connect(mapStateToProps, null)(AboutUs)