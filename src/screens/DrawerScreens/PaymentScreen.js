import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { connect } from "react-redux";
import * as actions from "../../actions";
import stripe from 'tipsi-stripe';
stripe.setOptions({
  publishableKey:
    'pk_test_51HTrdNKvlLDAjAUzb0c9zHwvq0wAcXOTWThrIscZMRVTc9xcfmqcFm4nLUjij9ZUcwgaewsQuNpBWak2KDQo1p4A00mFA5hRXA',
});
import axios from 'axios';

import Header from '../../components/Header';
import GlobalStyles from '../../components/GlobalStyles';
import Button from '../../stripe/components/Button';
//

class CardFormScreen extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
  };

  handleCardPayPress = async () => {
    try {
      this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });

      this.setState({loading: false, token});
    } catch (error) {
      this.setState({loading: false});
    }
  };
  makePayment = async () => {
    this.setState({loading: true});
    axios({
      method: 'POST',
      url:
        'https://us-central1-laundr-c9c10.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: 100,
        currency: 'usd',
        token: this.state.token,
      },
    }).then((response) => {
      console.log(response);
      this.setState({loading: false});
    });
  };

  render() {
    const {loading, token} = this.state;

    return (
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <Header openDrawer={this.props.navigation.openDrawer} name="Account" />

        <View style={styles.container}>
          <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
          <Button
            text="Enter you card and pay"
            loading={loading}
            onPress={this.handleCardPayPress}
            // {...testID('cardFormButton')}
          />
          <View
            style={styles.token}
            // {...testID('cardFormToken')}
          >
            {token && (
              <>
                <Text style={styles.instruction}>Token: {token.tokenId}</Text>
                <Button
                  text="Make Payment"
                  loading={loading}
                  onPress={this.makePayment}
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});



function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(CardFormScreen);





// import React from "react";
// import { SafeAreaView } from "react-native";
// import AddSubscriptionView from "../../components/AddSubscriptionView";
// import Header from "../../components/Header";
// import GlobalStyles from "../../components/GlobalStyles";

// const STRIPE_ERROR = "Payment service error. Try again later.";
// const SERVER_ERROR = "Server error. Try again later.";
// const STRIPE_PUBLISHABLE_KEY = "pk_test_51HTrdNKvlLDAjAUzb0c9zHwvq0wAcXOTWThrIscZMRVTc9xcfmqcFm4nLUjij9ZUcwgaewsQuNpBWak2KDQo1p4A00mFA5hRXA";
// /**
//  * The method sends HTTP requests to the Stripe API.
//  * It's necessary to manually send the payment data
//  * to Stripe because using Stripe Elements in React
//  * Native apps isn't possible.
//  *
//  * article used to implement strip:  https://medium.com/@lyzhovnik/using-stripe-payment-service-with-react-native-and-fetch-4177c8d992cb
//  *
//  * @param creditCardData the credit card data
//  * @return Promise with the Stripe data
//  */
// const getCreditCardToken = (creditCardData) => {
//   const card = {
//     "card[number]": creditCardData.values.number.replace(/ /g, ""),
//     "card[exp_month]": creditCardData.values.expiry.split("/")[0],
//     "card[exp_year]": creditCardData.values.expiry.split("/")[1],
//     "card[cvc]": creditCardData.values.cvc,
//   };
//   return fetch("https://api.stripe.com/v1/tokens", {
//     headers: {
//       // Use the correct MIME type for your server
//       Accept: "application/json",
//       // Use the correct Content Type to send data to Stripe
//       "Content-Type": "application/x-www-form-urlencoded",
//       // Use the Stripe publishable key as Bearer
//       Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
//     },
//     // Use a proper HTTP method
//     method: "post",
//     // Format the credit card data to a string of key-value pairs
//     // divided by &
//     body: Object.keys(card)
//       .map((key) => key + "=" + card[key])
//       .join("&"),
//   }).then((response) => response.json());
// };
// /**
//  * The method imitates a request to our server.
//  *
//  * @param creditCardToken
//  * @return {Promise<Response>}
//  */
// const subscribeUser = (creditCardToken) => {
//   return new Promise((resolve) => {
//     console.log("Credit card token\n", creditCardToken);
//     setTimeout(() => {
//       resolve({ status: true });
//     }, 1000);
//   });
// };
// /**
//  * The main class that submits the credit card data and
//  * handles the response from Stripe.
//  */
// export default class AddSubscription extends React.Component {
//   static navigationOptions = {
//     title: "Subscription page",
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       submitted: false,
//       error: null,
//     };
//   }
//   // Handles submitting the payment request
//   onSubmit = async (creditCardInput) => {
//     const { navigation } = this.props;
//     // Disable the Submit button after the request is sent
//     this.setState({ submitted: true });
//     let creditCardToken;
//     try {
//       // Create a credit card token
//       creditCardToken = await getCreditCardToken(creditCardInput);
//       if (creditCardToken.error) {
//         // Reset the state if Stripe responds with an error
//         // Set submitted to false to let the user subscribe again
//         this.setState({ submitted: false, error: STRIPE_ERROR });
//         return;
//       }
//     } catch (e) {
//       // Reset the state if the request was sent with an error
//       // Set submitted to false to let the user subscribe again
//       this.setState({ submitted: false, error: STRIPE_ERROR });
//       return;
//     }
//     // Send a request to your server with the received credit card token
//     const { error } = await subscribeUser(creditCardToken);
//     // Handle any errors from your server
//     if (error) {
//       this.setState({ submitted: false, error: SERVER_ERROR });
//     } else {
//       this.setState({ submitted: false, error: null });
//       navigation.navigate("Home");
//     }
//   };

//   // render the subscription view component and pass the props to it
//   render() {
//     const { submitted, error } = this.state;
//     return (
//       <SafeAreaView style={GlobalStyles.droidSafeArea}>
//         <Header openDrawer={this.props.navigation.openDrawer} name="Payment" />

//         <AddSubscriptionView
//           error={error}
//           submitted={submitted}
//           onSubmit={this.onSubmit}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { connect } from "react-redux";
// import * as actions from "../../actions";

// import Header from "../../components/Header";
// import MenuModal from "../../components/MenuModal";
// import GlobalStyles from "../../components/GlobalStyles";
// import {
//   FIELD_NAME_TEXT,
//   FIELD_VALUE_TEXT,
//   FIELD_VALUE_CONTAINER,
// } from "../../components/Items/";
// import { CARDS, MONTHS, YEARS } from "../../components/Data/";
// import Container from "../../components/Container";

// const PaymentScreen = (props) => {
//   const [cardHName, setCardHName] = useState("");
//   const [cardNum, setCardNum] = useState("");
//   const [cardType, setCardType] = useState("Visa");
//   const [ccvNum, setccvNum] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");

//   // modal variables
//   const [cardModalView, setCardModalView] = useState(false);
//   const [monthModalView, setMonthModalView] = useState(false);
//   const [yearModalView, setYearModalView] = useState(false);

//   useEffect(() => {
//     console.log("AccountScreen loaded");
//   }, []);

//   //  MODAL VARIABLES
//   // card type modal
//   const setCardHelper = (item) => {
//     setCardType(item);
//     showModalCard();
//   };
//   const showModalCard = () => {
//     console.log("showModalCard()");
//     setCardModalView(!cardModalView);
//   };
//   const modalCardButtonHelper = () => {
//     showModalCard();
//   };
//   //
//   // month modal
//   const setMonthHelper = (item) => {
//     setMonth(item);
//     showModalMonth();
//   };
//   const showModalMonth = () => {
//     console.log("showModalMonth()");
//     setMonthModalView(!monthModalView);
//   };
//   const modalMonthButtonHelper = () => {
//     showModalMonth();
//   };
//   //
//   // year modal
//   const setYearHelper = (item) => {
//     setYear(item);
//     showModalYear();
//   };
//   const showModalYear = () => {
//     console.log("showModalYear()");
//     setYearModalView(!yearModalView);
//   };
//   const modalYearButtonHelper = () => {
//     showModalYear();
//   };
//   //
//   return (
//     <SafeAreaView style={GlobalStyles.droidSafeArea}>
//       <Header openDrawer={props.navigation.openDrawer} name="Payment" />
//       <KeyboardAwareScrollView
//         resetScrollToCoords={{ x: 0, y: 0 }}
//         contentContainerStyle={styles.container}
//       >
//         <ScrollView>
//           <Container>
//             {/*  */}
//             {/*  */}
//             <View style={styles.container_Title_Input}>
//               <Text style={FIELD_NAME_TEXT}>Card Holder Name</Text>
//               <View style={FIELD_VALUE_CONTAINER}>
//                 <TextInput
//                   value={cardHName}
//                   onChangeText={(txt) => setCardHName(txt)}
//                   placeholder="Card Holder Name"
//                   style={FIELD_VALUE_TEXT}
//                 />
//               </View>
//             </View>
//             {/*  */}
//             {/*  */}
//             <View style={styles.container_Title_Input}>
//               <Text style={FIELD_NAME_TEXT}>Card Number</Text>
//               <View style={FIELD_VALUE_CONTAINER}>
//                 <TextInput
//                   value={cardHName}
//                   onChangeText={(txt) => setCardNum(txt)}
//                   placeholder="Card Number"
//                   style={FIELD_VALUE_TEXT}
//                 />
//               </View>
//             </View>
//             <View>
//               {/*  */}
//               {/*  */}
//               <View style={styles.container_Title_Input}>
//                 <TouchableOpacity onPress={modalCardButtonHelper}>
//                   <Text style={FIELD_NAME_TEXT}>Card Type</Text>

//                   <View style={FIELD_VALUE_CONTAINER}>
//                     <Text style={FIELD_VALUE_TEXT}>{cardType}</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <MenuModal
//                   setCardTypeHelper={setCardHelper}
//                   showModal={showModalCard}
//                   modalView={cardModalView}
//                   data={CARDS}
//                 />
//               </View>
//               {/*  */}
//               {/*  */}
//               <View style={styles.container_Title_Input}>
//                 <Text style={FIELD_NAME_TEXT}>CCV</Text>
//                 <View style={FIELD_VALUE_CONTAINER}>
//                   <TextInput
//                     value={ccvNum}
//                     onChangeText={(txt) => setccvNum(txt)}
//                     placeholder="CCV"
//                     style={FIELD_VALUE_TEXT}
//                   />
//                 </View>
//               </View>
//               {/*  */}
//               {/*  */}
//               <View style={styles.container_Title_Input}>
//                 <TouchableOpacity onPress={modalMonthButtonHelper}>
//                   <Text style={FIELD_NAME_TEXT}>Month</Text>
//                   <View style={FIELD_VALUE_CONTAINER}>
//                     <Text style={FIELD_VALUE_TEXT}>{month}</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <MenuModal
//                   setCardTypeHelper={setMonthHelper}
//                   showModal={showModalMonth}
//                   modalView={monthModalView}
//                   data={MONTHS}
//                 />
//               </View>
//               {/*  */}
//               {/*  */}
//               <View style={styles.container_Title_Input}>
//                 <TouchableOpacity onPress={modalYearButtonHelper}>
//                   <Text style={FIELD_NAME_TEXT}>Year</Text>
//                   <View style={FIELD_VALUE_CONTAINER}>
//                     <Text style={FIELD_VALUE_TEXT}>{year}</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <MenuModal
//                   setCardTypeHelper={setYearHelper}
//                   showModal={showModalYear}
//                   modalView={yearModalView}
//                   data={YEARS}
//                 />
//               </View>
//               {/*  */}
//               {/*  */}
//             </View>
//           </Container>
//         </ScrollView>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   container_Title_Input: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
// });

// function mapStateToProps({ auth }) {
//   return { token: auth.token };
// }

// export default connect(mapStateToProps, actions)(PaymentScreen);
