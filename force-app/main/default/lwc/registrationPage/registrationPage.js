import { LightningElement} from 'lwc';
import CustomerName from '@salesforce/schema/Cab_Customer__c.Name';
import CustomerEmail from '@salesforce/schema/Cab_Customer__c.Customer_Email__c';
import CustomerPassword from '@salesforce/schema/Cab_Customer__c.Password__c';
import CustomerUsername from '@salesforce/schema/Cab_Customer__c.Username__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class RegistrationPage extends NavigationMixin(LightningElement) {
recordId="";
fields=[CustomerName, CustomerEmail, CustomerUsername, CustomerPassword];

    handleSuccess(){
    //Show success toast message
        const msg = new ShowToastEvent({
        title: 'Success',
        message: 'Your registration is successful.',
        variant: 'success',
    });
    this.dispatchEvent(msg);

    //Navigation to the Login Page
        let cmpDef = {componentDef:"c:loginPage"};
        let encodeDef = btoa(JSON.stringify(cmpDef));

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
            url:"/one/one.app#"+ encodeDef
            },
        });            
    }
}

