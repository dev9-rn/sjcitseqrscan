import React, { Component } from 'react';
import { StatusBar, BackHandler, Dimensions, Platform, StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Card, CardItem, Text, Title, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Loader from '../../Utilities/Loader';
import { Col, Grid } from 'react-native-easy-grid';

export default class InstituteCertificateViewScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			serialNo: '',
			certificateURI: '',
			loading: false,
			loaderText: 'Please wait downloading file......',
		};
	}
	componentWillMount() { this._getAsyncData(); }
	componentDidMount() { BackHandler.addEventListener('hardwareBackPress', this.handleBackPress); }
	componentWillUnmount() { BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress); }
	handleBackPress = () => { this.props.navigation.navigate('InstituteMainScreen'); return true; }
	closeActivityIndicator() {
		setTimeout(() => {
			this.setState({ loading: false });
		});
	}
	async _getAsyncData() {
		await AsyncStorage.multiGet(['USERDATA', 'CERTIFICATESCANNEDDATA'], (err, result) => {		// USERDATA is set on InstituteLogin screen
			var lData = JSON.parse(result[1][1]);
			console.log(lData.data);
			var lProps = this.props;
			if (lData) {
				if (lData.data.scan_result == '1') {
					this.setState({ serialNo: lData.data.serialNo, certificateURI: lData.data.fileUrl, certificateStatus: 'Active' });
				} else if (lData.data.scan_result == '0') {
					this.setState({ serialNo: lData.data.serialNo, certificateURI: lData.data.fileUrl, certificateStatus: 'Inactive' });
				}
			}
		});
	}
	getLocalPath(url) {
		const filename = url.split('/').pop();
		return `${RNFS.DocumentDirectoryPath}/${filename}`;
	}
	downloadFile() {
		this.setState({ loading: true });
		const url = this.state.certificateURI;
		const localFile = this.getLocalPath(url);

		const options = {
			fromUrl: url,
			toFile: localFile
		};
		RNFS.downloadFile(options).promise
			.then(async () => {
				this.setState({ loading: false });
				setTimeout(() => { FileViewer.open(localFile) }, 500);
			})
			.catch(error => {
				setTimeout(() => {
					this.setState({ loading: false });
				}, 2000);
				console.warn("Error in downloading file" + error);
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
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Scanned details</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('InstituteScanScreen')}>
								<Title style={{ color: '#FFFFFF', fontSize: 16 }}>SCAN NEW</Title>
							</TouchableOpacity>
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
							<Title style={{ color: '#FFFFFF', fontSize: 16 }}>Scanned details</Title>
						</Col>
						<Col style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('InstituteScanScreen')}>
								<Title style={{ color: '#FFFFFF', fontSize: 16 }}>SCAN NEW</Title>
							</TouchableOpacity>
						</Col>
					</Grid>
				</Header>
			)
		}
	}

	render() {
		const source = { uri: encodeURI(this.state.certificateURI), cache: true };
		// https://demo.seqrdoc.com/demo/backend/pdf_file/Test0016.pdf
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#D34A44" barStyle="light-content" />
				{this._showHeader()}
				<Loader loading={this.state.loading} text={this.state.loaderText} />
				<View style={styles.certificateViewContainer}>
					<Card style={styles.cardContainer}>
						<ScrollView keyboardShouldPersistTaps={'handled'}>
							<CardItem header style={styles.cardHeader}>
								<Text style={styles.textStatus}> Status: {this.state.certificateStatus}</Text>
								<Text style={styles.textSrNo}>Sr.no : {this.state.serialNo}</Text>
							</CardItem>
							<View style={{ paddingTop: 10, height: Dimensions.get('window').height * 0.7 }}>
								<View style={{ flex: 0.1, flexDirection: 'row' }}>
									<Text style={{ fontSize: 22, flex: 0.9 }}>Certificate</Text>
									{/* <TouchableOpacity style={{ flex: 0.1 }} onPress={() => { this.downloadFile() }}>
										<Image
											style={{ width: 30, height: 30 }}
											source={require('../../images/forward_arrow.png')}
										/>
									</TouchableOpacity> */}
								</View>
								<Pdf
									source={source}
									onLoadComplete={(numberOfPages, filePath) => {
										console.log(`number of pages: ${numberOfPages}`);
									}}
									onPageChanged={(page, numberOfPages) => {
										console.log(`current page: ${page}`);
									}}
									onError={(error) => {
										console.log("errorrrrr",error);
									}}
									style={styles.pdf} />
							</View>
						</ScrollView>
					</Card>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	certificateViewContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		paddingTop: Dimensions.get('window').height * 0.01
	},
	cardContainer: {
		flex: 1,
		padding: 15,
		paddingTop: 0,
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15
	},
	cardHeader: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	textStatus: {
		marginLeft: -16,
		color: '#212121',
		fontWeight: 'normal',
		fontSize: 16
	},
	textSrNo: {
		marginLeft: -12,
		color: '#212121',
		fontWeight: 'normal',
		fontSize: 16
	},
	pdf: {
		flex: 1,
	}
});