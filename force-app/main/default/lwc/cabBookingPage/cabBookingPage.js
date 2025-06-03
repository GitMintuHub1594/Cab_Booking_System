import { LightningElement, track} from 'lwc';
import CustomerName from '@salesforce/schema/Cab_Reservation__c.Customer_Name__c';
import TravelTo from '@salesforce/schema/Cab_Reservation__c.Travel_To__c';
import TravelFrom from '@salesforce/schema/Cab_Reservation__c.Travel_From__c';
import TravelDateTime from '@salesforce/schema/Cab_Reservation__c.Travel_Date_Time__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CabBookingPagee extends NavigationMixin(LightningElement) {
    @track recordId;
    showDetailPage=false;
    get currentRecordId(){
        return this.recordId;
    };

    fields=[CustomerName, TravelFrom, TravelTo, TravelDateTime];

    handleSuccess(event){
        this.recordId = event.detail.id;
        this.showDetailPage = true;
        //Show information toast message
        const msg = new ShowToastEvent({
            title: 'Location',
            message: 'Enter Exact Locations',
            variant:'info',
        });
        this.dispatchEvent(msg);

// Need to understand below
    let cmpDef = {
            componentDef: "c:bookingMapPage",
            attributes: {
                recordId: this.recordId
            }
    };
    let encodedDef = btoa(JSON.stringify(cmpDef));

    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: `/one/one.app#${encodedDef}&c__recordId=${this.recordId}`
        }
    });   
// Need to understand above    

    }
}