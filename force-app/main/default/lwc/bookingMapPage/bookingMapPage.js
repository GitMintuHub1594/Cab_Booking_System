import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import travelFrom from '@salesforce/schema/Cab_Reservation__c.Travel_From__c';
import travelTo from '@salesforce/schema/Cab_Reservation__c.Travel_To__c';

const FIELDS = [travelFrom, travelTo];

export default class BookingMapPageMapPage extends NavigationMixin(LightningElement) {

    @api recordId;
    @track ConfirmPickUp = false;
    @track ConfirmDrop = false;
    @track showModal=false;

    PickUpStreet;
    PickUpCity;
    PickUpLandmark;
    DropStreet;
    DropCity;
    DropLandmark;

// Need to understand below
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    cabReservation({ error, data }) {
        if (data) {
            this.PickUpCity = getFieldValue(data, travelFrom);
            this.DropCity = getFieldValue(data, travelTo);
        }
        else if (error) {
            console.error('Error fetching record:', error);
            this.PickUpCity = ''; 
            this.DropCity = '';
        }
    }

    @wire(CurrentPageReference)
    pageRef;

    connectedCallback() {
        if (this.pageRef && this.pageRef.state && this.pageRef.state.c__recordId) {
            this.recordId = this.pageRef.state.c__recordId;
        }
    }
// Need to understand above

    handlePickUpStreet(event){
        this.PickUpStreet = event.target.value;
    }
    handlePickUpCity(event){
        this.PickUpCity = event.target.value;
    }
    handlePickUpLandmark(event){
        this.PickUpLandmark = event.target.value;
    }
    handleDropStreet(event){
        this.DropStreet = event.target.value;
    }
    handleDropCity(event){
        this.DropCity = event.target.value;
    }
    handleDropLandmark(event){
        this.DropLandmark = event.target.value;
    }

    handleConfirmPickUp(){
        this.ConfirmPickUp = true;
    }
    handleConfirmDrop(){
        this.ConfirmDrop = true;
    }

    get isShowMap() {
        return this.ConfirmDrop && this.ConfirmPickUp;
    }

    get mapMarkers() {
        return [
            {
                location: {
                    Street: this.PickUpStreet,
                    City: this.PickUpLandmark,
                    State: this.PickUpCity,
                },
                title: 'Pick Up Location',
                type: 'circle'
            
            },
            {
                location: {
                    Street: this.DropStreet,
                    City: this.DropLandmark,
                    State: this.DropCity,
                },
                title: 'Drop Location',
            }
        ];
    }

    get center() {
        return {
            latitude: '28.7041', 
            longitude: '77.1025'
        };
    }

    closeModal(){
        this.showModal = false;
            //Navigation to the Login Page
            let cmpDef = {componentDef:"c:bookingConfirmationPage"};
            let encodeDef = btoa(JSON.stringify(cmpDef));
    
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                url:"/one/one.app#"+ encodeDef
                },
            });        
    }

    handleConfirmBooking(){
        this.showModal=true;

        //Show information toast message
        const msg = new ShowToastEvent({
            title: 'Booking Confirm',
            message: 'Your Booking is Confirm.',
            variant:'success',
        });
        this.dispatchEvent(msg);
    }
}