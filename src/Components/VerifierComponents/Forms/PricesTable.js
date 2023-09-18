import React, { Component } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import { Text, } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { URL, APIKEY } from '../../../../App';
import Loader from '../../../Utilities/Loader';
import * as utilities from '../../../Utilities/utilities';
import { connect } from 'react-redux';

class PricesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: this.props.accessToken,
            loading: false,
            loaderText: 'Loading...',
            tableHead: this.props.tableHead,
            tableData: this.props.tableData,
            gradeCardAmount: '',
            provisionalDegreeAmount: '',
            originalDegreeAmount: '',
            marksheetAmount: ''
        }
    }
    // componentDidMount = () => {
    //     if (this.props.userType == 0) {
    //         alert(1)
    //         this.getDocumentPrices();
    //     }
    // }
    // getDocumentPrices = () => {
    //     this.setState({ loading: true })
    //     const formData = new FormData();
    //     formData.append('institute', this.props.changedInstituteNameRequestForm);
    //     fetch(`${URL}documentprices.php`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart\/form-data',
    //             'apikey': APIKEY,
    //             accessToken: this.state.accessToken
    //         },
    //         body: formData,
    //     }).then(res => res.json())
    //         .then(response => {
    //             this.setState({ loading: false })
    //             if (response.status == 200) {
    //                 console.log(response.dataPrice);
    //                 this.setState({
    //                     tableData: response.dataPrice, tableHead: response.dataHeading,
    //                     gradeCardAmount: response.dataPrice[0][1].split(' ')[0], provisionalDegreeAmount: response.dataPrice[1][1].split(' ')[0],
    //                     originalDegreeAmount: response.dataPrice[2][1].split(' ')[0], marksheetAmount: response.dataPrice[3][1].split(' ')[0]
    //                 }, () => {
    //                     this.setState(this.state)
    //                     // this.setState({ tableData: response.dataPrice, tableHead: response.dataHeading }, () => alert("wwe"))
    //                     this.props.parentReference(this.state);
    //                 })
    //             }
    //             // else if (response.status == 409) { utilities.showToastMsg(response.message); }
    //             // else if (response.status == 422) { utilities.showToastMsg(response.message); }
    //             // else if (response.status == 400) { utilities.showToastMsg(response.message); }
    //             else if (response.status == 403) {
    //                 utilities.showToastMsg(response.message);
    //                 this.props.navigation.navigate('VerifierLoginScreen')
    //             }
    //             else if (response.status == 405) { utilities.showToastMsg(response.message); }
    //         })
    //         .catch(error => {
    //             this.setState({ loading: false })
    //             console.log(error);
    //         });
    // }
    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} text={this.state.loaderText} />
                {this.props.tableData.length > 0 ?
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={this.props.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={this.props.tableData} textStyle={styles.text} />
                    </Table>
                    : <Text style={{ textAlign: 'center', color: 'red' }}>Please select institute</Text>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center' },
})
const mapStateToProps = (state) => {
    console.log("aaya na bhai");
    return {
        accessToken: state.VerifierReducer.LoginData.accessToken,
        user_id: state.VerifierReducer.LoginData.id,
        changedInstituteNameRequestForm: state.VerifierReducer.changedInstituteNameRequestForm,
        userType: state.VerifierReducer.LoginData.user_type
    }
}
export default connect(mapStateToProps, null)(PricesTable)