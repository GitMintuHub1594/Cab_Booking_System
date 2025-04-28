public with sharing class LoginDetailController {
    @AuraEnabled(cacheable = true)
    public static Boolean validateLoginDetails(String username, String password) {
        Boolean result = false; // Initialize result to a default value

        if (String.isBlank(username) || String.isBlank(password)) { // Use String.isBlank for null and empty checks
            result = false;
        } else {
            List<Cab_Customer__c> Customers_Login_Credential_List = [SELECT Id, Username__c, Password__c FROM Cab_Customer__c WHERE Username__c =: username LIMIT 1];

            if (Customers_Login_Credential_List.isEmpty()) { // Use .isEmpty() for better readability than .size() == 0
                result = false;
            } else {
                Cab_Customer__c customer = Customers_Login_Credential_List[0];
                if (customer.Password__c == password) {
                    result = true;
                }
                // No need for an explicit 'else { result = false; }' here because 'result' is already false by default
            }
        }
        return result;
    }
}
/*
public with sharing class LoginDetailController {
    @AuraEnabled
    public static Boolean validateLoginDetails(String username, String password) {
        Boolean result = false;

        if (String.isBlank(username) || String.isBlank(password)) {
            return false;
        }

        List<Cab_Customer__c> Customers_Login_Credential_List = [
            SELECT Id, Username__c, Password__c 
            FROM Cab_Customer__c 
            WHERE Username__c = :username 
            LIMIT 1
        ];

        if (!Customers_Login_Credential_List.isEmpty()) {
            Cab_Customer__c customer = Customers_Login_Credential_List[0];
            if (customer.Password__c == password) {
                result = true;
            }
        }

        return result;
    }
}
    */
