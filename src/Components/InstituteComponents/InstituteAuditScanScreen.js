import React, { Component } from 'react';
import { Vibration, Alert, BackHandler, Platform, StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { Header, Title, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Loader from '../../Utilities/Loader';
import * as utilities from '../../Utilities/utilities';
import { Col, Grid } from 'react-native-easy-grid';
import { URLFORINSTITUTE, APIKEY } from '../../../App';

export default class InstituteAuditScanScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			showCamera: true,
			loaderText: 'Scanning...',
			urlForInstitute: '',
			accesstoken:''
		};
	}
	componentWillMount() { this._getAsyncData(); }
	componentDidMount() {
		this.didFocusSubscription = this.props.navigation.addListener(
			'didFocus',
			payload => {
				this.setState({ showCamera: true });
			}
		);
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
		this.didFocusSubscription.remove();
	}
	handleBackPress = () => {
		this.props.navigation.navigate('InstituteMainScreen');
		return true;
	}
	closeActivityIndicator() {
		setTimeout(() => {
			this.setState({ loading: false });
		});
	}
	async _getAsyncData() {
		await AsyncStorage.getItem('InstituteData', (err, result) => {
			var lData = JSON.parse(result);
			if (lData) {
				this.setState({ userName: lData.data.institute_username, userId: lData.data.id ,accesstoken : lData.accesstoken});
			}
		});
		AsyncStorage.getItem('InstituteURL', (err, result) => {
			this.setState({ urlForInstitute: result })
		});
	}
	onBarCodeRead = (e) => {
		this.setState({ showCamera: false });
		Vibration.vibrate();
		this._callForAPI(e);
	}
	onSuccess(e) {
		this.setState({ showCamera: false });
		this._callForAPI(e);
	}
	async _callForAPI(e) {
		const formData = new FormData();
		let lUserName = this.state.userName;
		let lUserId = this.state.userId;
		formData.append('key', e.data);
		formData.append('device_type', Platform.OS);
		formData.append('scanned_by', lUserName);
		formData.append('user_id', this.state.userId);
		var lUrl = URLFORINSTITUTE + 'scan-audit-trail'
		fetch(lUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart\/form-data',
				'apikey': APIKEY,
				'accesstoken': this.state.accesstoken
			},
			body: formData,
		}).then(res => res.json())
			.then(lResponseData => {
				this.closeActivityIndicator();
				console.log(lResponseData);
				if (!lResponseData) {
					utilities.showToastMsg('Something went wrong. Please try again later');
				} else if (lResponseData.status == '200') {
					if (lResponseData.data.scan_result == '1') {
					try {
						AsyncStorage.setItem('CERTIFICATESCANNEDDATA', JSON.stringify(lResponseData));
						this.props.navigation.navigate('InstituteAuditViewScreen');
					} catch (error) {
						console.warn(error);
					}
				} else if (lResponseData.data.scan_result == '0') {
					try {
						AsyncStorage.setItem('CERTIFICATESCANNEDDATA', JSON.stringify(lResponseData));
						this.props.navigation.navigate('InstituteAuditViewScreen');
					} catch (error) {
						console.warn(error);
					}
					utilities.showToastMsg('QR code part of the system. But certificate is inactive now');
				} else if (lResponseData.data.scan_result == '2') {
					setTimeout(() => {
						Alert.alert(
							'Scanning Error',
							'Please scan proper 1D BarCode',
							[
								{ text: 'OK', onPress: () => { this.setState({ showCamera: true }) }, style: 'destructive' },
							],
							{ cancelable: false }
						)
					}, 500);
				}
			}
				else {
					utilities.showToastMsg('Something went wrong. Please try again later');
				}
			})
			.catch(error => {
				this.closeActivityIndicator();
				console.log(error);
			});
	}
	_showHeader() {
		if (Platform.OS == 'ios') {
			return (
				<Header style={{ backgroundColor: '#D34A44' }}>
					<Grid>
						<Col style={{ justifyContent: 'center' }}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('InstituteMainScreen')}>
								<Icon type="FontAwesome" name="long-arrow-left" style={{ fontSize: 25, color: '#FFFFFF', paddingLeft: 10, paddingRight: 10 }} />
							</TouchableOpacity>
						</Col>
						<Col style={{ justifyContent: 'center' }}>
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Demo SeQR Scan</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
						</Col>
					</Grid>
				</Header>
			)
		} else {
			return (
				<Header style={{ backgroundColor: '#D34A44' }}>
					<Grid>
						<Col style={{ justifyContent: 'center' }}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('InstituteMainScreen')}>
								<Icon type="FontAwesome" name="long-arrow-left" style={{ fontSize: 25, color: '#FFFFFF', paddingLeft: 10, paddingRight: 10 }} />
							</TouchableOpacity>
						</Col>
						<Col style={{ justifyContent: 'center' }}>
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Demo SeQR Scan</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
						</Col>
					</Grid>
				</Header>
			)
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					backgroundColor="#D34A44"
					barStyle="light-content"
				/>
				{this._showHeader()}
				<Loader
					loading={this.state.loading}
					text={this.state.loaderText}
				/>

				{this.state.showCamera ?
					<QRCodeScanner
						onRead={this.onSuccess.bind(this)}
						cameraStyle={{ width: '100%', height: '100%' }}
						showMarker={true}
						markerStyle={{ height: 100, borderColor: '#39FF14' }}
					/>
					:
					<View></View>
				}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
})