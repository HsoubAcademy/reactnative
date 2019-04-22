import React from 'react';
import { Location } from 'expo';
import { ScrollView, KeyboardAvoidingView, CheckBox, View, Text, Platform } from 'react-native';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      speialization: '',
      phone: '',
      address: '',
      workingHours: '',
      userType: false,
      location: null,
      isLoading: false,
      alert: {
        messages: null,
        type: '',
      }
    }
  }

  componentWillMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      this.setState({location});
    }
    catch (e) {
      this.setState({location: null});
    }
  }



  componentDidUpdate() {
    if (this.state.alert.messages) {
      setTimeout(() => {
        this.setState({ alert: { messages: null } });
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout();
  }

  changeNameHandler = value => {
    this.setState({ name: value });
  };

  changeEmailHandler = value => {
    this.setState({ email: value });
  };

  changePasswordHandler = value => {
    this.setState({ password: value });
  };

  changePhoneHandler = value => {
    this.setState({ phone: value });
  };

  changeUserTypeHandler = () => {
    this.setState({ userType: !this.state.userType });
  };

  changeSpeializationHandler = value => {
    this.setState({ speialization: value });
  };

  changeAddressHandler = value => {
    this.setState({ address: value });
  };

  changeWorkingHoursHandler = value => {
    this.setState({ workingHours: value });
  };

  validate() {
    const { name, email, password, userType, speialization, address, phone, workingHours } = this.state;
    let validationErrors = [];
    let passed = true;
    if (!name) {
      validationErrors.push("الرجاء إدخال اسم المستخدم");
      passed = false;
    }

    if (!email) {
      validationErrors.push("الرجاء إدخال البريد الإلكتروني");
      passed = false;
    }

    if (!password) {
      validationErrors.push("الرجاء إدخال كلمة المرور");
      passed = false;
    }

    if (userType) {
      if (!speialization) {
        validationErrors.push("الرجاء إدخال التخصص ");
        passed = false;
      }

      if (!address) {
        validationErrors.push("الرجاء إدخال العنوان");
        passed = false;
      }

      if (!workingHours) {
        validationErrors.push("الرجاء إدخال ساعات العمل");
        passed = false;
      }

      if (!phone) {
        validationErrors.push("الرجاء إدخال رقم الهاتف");
        passed = false;
      }

    }

    if (validationErrors.length > 0) {
      this.setState({ alert: { messages: validationErrors, type: "danger" } });
    }
    return passed;
  }


  _signUp = async () => {
    if (!this.validate()) return;
    this.setState({ isLoading: true });
    const { name, email, password, speialization, address, phone, workingHours, userType, location } = this.state;
    const body = {
      name,
      email,
      password,
      userType: userType ? "doctor" : "normal",
      speialization,
      address,
      phone,
      workingHours,
      location: {
        latitude: location ? location.coords.latitude : null,
        longitude: location ? location.coords.longitude : null
      }
    };

    try {
      const response = await axios.post(SIGNUP_URL, body);
      this.setState({
        name: '',
        email: '',
        password: '',
        speialization: '',
        address: '',
        phone: '',
        workingHours: '',
        location: null,
        userType: false,
        isLoading: false,
      });
     
      this.props.navigation.navigate('SignIn', {
        alert: {messages: 'تم تسجيل حسابك بنجاح', type: 'success'}
      })

    } catch (e) {
      this.setState({
        alert: { messages: e.response.data.message, type: "danger" },
        isLoading: false
      });

    }
  }


  render() {
    const { name, email, password, speialization, address, phone, workingHours, userType, isLoading, alert } = this.state;
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
        <Loader title="جاري إنشاء حساب جديد" loading={isLoading} />
        <Alert messages={alert.messages} type={alert.type} />
        <View style={styles.container}>
          <ScreenTitle title="إنشاء حساب جديد" icon="md-person-add" />
          <KeyboardAvoidingView behavior="padding" enabled>
            <Input
              onChangeText={this.changeNameHandler}
              value={name}
              placeholder="الاسم"
            />
            <Input
              onChangeText={this.changeEmailHandler}
              value={email}
              placeholder="البريد الإلكتروني"
            />
            <Input
              onChangeText={this.changePasswordHandler}
              value={password}
              secureTextEntry
              placeholder="كلمة المرور"
            />

            <View
              style={styles.checkBoxContainer}
            >
              <CheckBox
                style={styles.checkbox}
                value={userType}
                onChange={this.changeUserTypeHandler}
              />
              <Text style={styles.checkboxLabel}>طبيب</Text>
            </View>
            {userType && (
              <React.Fragment>
                <Input
                  onChangeText={this.changeSpeializationHandler}
                  value={speialization}
                  placeholder="التخصص"
                />
                <Input
                  onChangeText={this.changeWorkingHoursHandler}
                  value={workingHours}
                  placeholder="ساعات العمل"
                />
                <Input
                  onChangeText={this.changeAddressHandler}
                  value={address}
                  placeholder="العنوان"
                />
                <Input
                  onChangeText={this.changePhoneHandler}
                  value={phone}
                  placeholder="الهاتف"
                />
              </React.Fragment>
            )}


            <Button text="إنشاء" onPress={this._signUp} />

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

export default SignUpScreen;