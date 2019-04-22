import React from "react";
import { ScrollView, KeyboardAvoidingView, AsyncStorage } from "react-native";
import axios from "../config/axios";
import { SIGNIN_URL } from "../config/urls";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import ScreenTitle from "../components/ScreenTitle";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import styles from "./styles/authStyles";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            alert: {
              messages: null,
              type: ""
            }
          };
    }
 
    componentDidMount() {
        const alert = this.props.navigation.getParam('alert');
        if (alert) {
            this.setState({alert});
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

      changeEmailHandler = value => {
        this.setState({ email: value });
      };
    
      changePasswordHandler = value => {
        this.setState({ password: value });
      };

      validate() {
        const { email, password} = this.state;
        let validationErrors = [];
        let passed = true;
      
        if (!email) {
          validationErrors.push("الرجاء إدخال البريد الإلكتروني");
          passed = false;
        }
    
        if (!password) {
          validationErrors.push("الرجاء إدخال كلمة المرور");
          passed = false;
        }
    
      
    
        if (validationErrors.length > 0) {
          this.setState({ alert: { messages: validationErrors, type: "danger" } });
        }
        return passed;
      }


      _signIn = async () => {
        if (!this.validate()) return;

        this.setState({ isLoading: true });
     
        const body = {
          email: this.state.email,
          password: this.state.password
        };
     
        try {
          const response = await axios.post(SIGNIN_URL, body);
          this.setState({ email: "", password: "", isLoading: false });
          AsyncStorage.setItem("accessToken", response.data.accessToken);
          this.props.navigation.navigate('Doctors');
        } catch (e) {
          this.setState({
            alert: { messages: e.response.data.message, type: "danger" },
            isLoading: false
          });
        }
     
      };


      render () {
          const { email, password, isLoading, alert } = this.state;
          return (
            <Container>
              <Alert messages={alert.messages} type={alert.type} />
              <Loader title="تسجيل الدخول" loading={isLoading} />
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
              >
                <ScreenTitle title="تسجيل الدخول" icon="md-log-in" />
                <KeyboardAvoidingView behavior="padding" enabled>
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
                </KeyboardAvoidingView>
       
                <Button
                  text="دخول"
                  onPress={this._signIn}
                />
              </ScrollView>
            </Container>
          );
       
      }
    
}

export default SignIn;