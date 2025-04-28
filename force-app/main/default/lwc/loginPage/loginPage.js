import { LightningElement } from 'lwc';
import validateLoginDetails from '@salesforce/apex/LoginDetailController.validateLoginDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class LoginPage extends NavigationMixin(LightningElement) {
    username;
    password;

    handleOnChangeUserName(event) {
        this.username = event.target.value;
    }

    handleOnChangePassword(event) {
        this.password = event.target.value;
    }

    handleLoginClick() {
        // 1. Call Apex controller to verify credentials
        // 2. Show Toast Event
        // 3. Navigation to next Component
        validateLoginDetails({ username: this.username, password: this.password })
            .then(result => {
                let cmpDef = {componentDef:"c:testingCabBookingPage"};
                let encodeDef = btoa(JSON.stringify(cmpDef));
                if (result) {
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                        url:"/one/one.app#"+ encodeDef
                        },
                    });
                    this.showToast('Success', 'Login Successful. Navigating...', 'success');
                } 
                else {
                    this.showToast('Error', 'Invalid Username or Password.', 'error');
                }
            })
            .catch(error => {
                this.showToast('Error', 'An error occurred during login.', 'error');
        });
    }

    showToast(title, message, variant) {
        const msg = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(msg);
    }

    handleRegistration(){
        let cmpDef = {componentDef:"c:registrationPage"};
        let encodeDef = btoa(JSON.stringify(cmpDef));

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
            url:"/one/one.app#"+ encodeDef
            },
        });
    }
}


