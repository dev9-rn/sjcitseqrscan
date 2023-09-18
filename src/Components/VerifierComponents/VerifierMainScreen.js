import React, { Component } from 'react';
import { Alert, StatusBar, Animated, BackHandler, Platform, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Card, Text, Title } from 'native-base';
import Loader from '../../Utilities/Loader';
import * as utilities from '../../Utilities/utilities';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { connect } from 'react-redux';
import { URL, APIKEY } from '../../../App';
import { bindActionCreators } from 'redux';
import { clearTheStoreOnLogout } from '../../Redux/Actions/VerifierActions';
import { Col, Grid, Row } from 'react-native-easy-grid';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class VerifierMainScreen extends Component {
	constructor(props) {
		super(props);
		this.springValue = new Animated.Value(0.3)
		this.state = {
			userName: '',
			borderBottomColorPassword: '#757575',
			borderBottomColorUserName: '#757575',
			loading: false,
			loaderText: 'Please wait...',
		};
	}
	animate() {
		this.springValue.setValue(0.3)
		Animated.spring(
			this.springValue,
			{
				toValue: 1,
				friction: 1
			}
		).start(() => this.animate())
	}
	componentDidMount() { BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); SplashScreen.hide(), this.animate() }
	componentWillUnmount() { BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); }
	handleBackPress = () => {
		Alert.alert(
			'LOGOUT',
			'Are you sure you want to logout.',
			[
				{ text: 'NO' },
				{ text: 'YES', onPress: () => this._callForLogoutAPI() },
			],
			{ cancelable: false }
		);
		return true;
	}
	_callForLogoutAPI = () => {
		const formData = new FormData();
		formData.append('type', 'logout');
		formData.append('institute', this.props.changedInstituteName);
		formData.append('user_id', this.props.user_id);
		formData.append('user_type', this.props.userType);
		console.log(formData);
		fetch(`${URL}login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart\/form-data',
				'Accept': 'application/json',
				'apikey': APIKEY,
				'accesstoken': this.props.accessToken ? this.props.accessToken : ''
			},
			body: formData,
		}).then(res => res.json())
			.then(response => {
				this.setState({ loading: false })
				console.log(response);
				if (response.status == 200) {
					this.props.clearStore('clearData')
					AsyncStorage.clear();
					this.props.navigation.navigate('HomeScreen');
					utilities.showToastMsg(response.message);

				} else if (response.status == 409) { utilities.showToastMsg(response.message); }
				else if (response.status == 422) { utilities.showToastMsg(response.message); }
				else if (response.status == 400) { utilities.showToastMsg(response.message); }
				else if (response.status == 403) { utilities.showToastMsg(response.message); this.props.navigation.navigate('VerifierLoginScreen') }
				else if (response.status == 405) { utilities.showToastMsg(response.message); }
				else if (response.status == 500) { utilities.showToastMsg(response.message); }
			})
			.catch(error => {
				this.setState({ loading: false })
				console.log(error);
			});
	}
	_aboutUs() { this.props.navigation.navigate('AboutUs'); }
	_showHeader() {
		if (Platform.OS == 'ios') {
			return (
				<Header style={{ backgroundColor: '#0000FF' }}>
					<Grid>
						<Col>
						</Col>
						<Col style={{ justifyContent: 'center' }}>
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Demo SeQR Scan</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 3 }}>
							<Menu>
								<MenuTrigger>
									<Image
										style={{ width: 20, height: 20, paddingRight: 15 }}
										source={require('../../images/three_dots.png')}
									/>
								</MenuTrigger>
								<MenuOptions>
									<MenuOption onSelect={() => this._aboutUs()} style={{ padding: 15 }}>
										<Text style={{ color: 'black' }}>About us</Text>
									</MenuOption>
									<MenuOption onSelect={() => this._callForLogoutAPI()} style={{ padding: 15 }} >
										<Text style={{ color: 'black' }}>Logout</Text>
									</MenuOption>
								</MenuOptions>
							</Menu>
						</Col>
					</Grid>
				</Header>
			)
		} else {
			return (
				<Header style={{ backgroundColor: '#0000FF' }}>
					<Grid>
						<Col>
						</Col>
						<Col style={{ justifyContent: 'center' }}>
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Demo SeQR Scan</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 3 }}>
							<Menu>
								<MenuTrigger>
									<Image
										style={{ width: 20, height: 20, paddingRight: 15 }}
										source={require('../../images/three_dots.png')}
									/>
								</MenuTrigger>
								<MenuOptions>
									<MenuOption onSelect={() => this._aboutUs()} style={{ padding: 15 }}>
										<Text style={{ color: 'black' }}>About us</Text>
									</MenuOption>
									<MenuOption onSelect={() => this._callForLogoutAPI()} style={{ padding: 15 }} >
										<Text style={{ color: 'black' }}>Logout</Text>
									</MenuOption>
								</MenuOptions>
							</Menu>
						</Col>
					</Grid>
				</Header>
			)
		}
	}
	render() {
		const textSize = this.springValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [10, 15, 18]
		})
		return (
			<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'handled'}>
				{this._showHeader()}
				<StatusBar backgroundColor="#0000FF" />
				<Loader loading={this.state.loading} text={this.state.loaderText} />
				<View>
					<Grid style={{ marginTop: 10 }}>
						<Col style={{ justifyContent: 'center' }} >
							<Text style={{ textAlign: 'right', }}>WELCOME : </Text>
						</Col>
						<Col style={{ justifyContent: 'center' }}>
							<Text style={{ textAlign: 'left', fontWeight: 'bold', }}>{this.props.fullname.toUpperCase()}</Text>
						</Col>
					</Grid>
					{/* <Animated.Text
						style={{
							fontSize: textSize,
							marginTop: 1,
							textAlign: 'center', fontWeight: 'bold',
						}} >
						{this.props.full_name.toUpperCase()}
					</Animated.Text> */}
					{/* <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.props.full_name.toUpperCase()}</Text> */}
				</View>
				<Grid style={{ margin: 15 }}>
					<Row>
						<Col style={{ marginRight: 10 }}>
							<Card style={{ height: 220 }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('VerifierScanScreen')}>
									<View style={{ marginTop: 10, alignItems: 'center', }}>
										<Image
											style={{ width: 150, height: 150 }}
											source={require('../../images/mob_barcode_blue_1.png')}
										/>
										<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold' }}>SCAN AND VIEW CERTIFICATE</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</Col>
						<Col>
							<Card style={{ height: 220 }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('RequestVerification')}>
									<View style={{ marginTop: 10, alignItems: 'center', }}>
										<Image
											style={{ width: 150, height: 150 }}
											source={require('../../images/form_orange.png')}
										/>
										<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold' }}>REQUEST VERIFICATION</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</Col>
					</Row>
					<Row style={{ marginTop: 20 }}>
						<Col style={{ marginRight: 10 }}>
							<Card style={{ height: 220 }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('VerifierScanHistory')}>
									<View style={{ marginTop: 10, alignItems: 'center' }}>
										<Image
											style={{ width: 150, height: 150 }}
											source={require('../../images/mob_barcode_history.png')}
										/>
										<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold' }}>VIEW HISTORY</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</Col>
						<Col>
							<Card style={{ height: 220 }}>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('VerifierStatusScreen')}>
									<View style={{ marginTop: 10, alignItems: 'center' }}>
										<Image
											style={{ width: 150, height: 155 }}
											source={require('../../images/hour_glass.png')}
										/>
										<Text style={{ padding: 10, textAlign: 'center', fontWeight: 'bold' }}>Verification Status</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</Col>
					</Row>
					<Col>
						<Card style={{ width: 235, marginTop: 20, alignSelf: 'center' }}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('VerifierProfileScreen')}>
								<View style={{ marginTop: 10, alignItems: 'center' }}>
									<Image
										style={{ width: 130, height: 130 }}
										source={require('../../images/accountimage.png')}
									/>
									<Text style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: 1 }}>MY ACCOUNT</Text>
								</View>
							</TouchableOpacity>
						</Card>
						<Text></Text>
					</Col>
				</Grid>
			</ScrollView>
		)
	}
};
const mapStateToProps = (state) => {
	return {
		fullname: state.VerifierReducer.LoginData ? state.VerifierReducer.LoginData.fullname : "",
		user_id: state.VerifierReducer.LoginData ? state.VerifierReducer.LoginData.id : "",
		accessToken: state.VerifierReducer.LoginData ? state.VerifierReducer.LoginData.access_token : "",
		changedInstituteName: state.VerifierReducer.LoginData ? state.VerifierReducer.changedInstituteName : "",
		userType: state.VerifierReducer.LoginData ? state.VerifierReducer.LoginData.user_type : ""
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ clearStore: clearTheStoreOnLogout }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifierMainScreen)