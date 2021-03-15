# LeaveApplication

This Repository contains both frontend and backend service for Leave Request Application.
Users can visualize their earlier Request, create Leave Request, update their Leave Request and delete existing request. 

## Frontend  - uses SAPUI5 technology

## Backend  - uses Java and Odata service.

## Database - MySQL on local system, Hana Cloud DB on SAP Cloud Platform

To run on local platform or cloud platform, we have to change 2 files
1. pom.xml - (Activation of Required profile)
2. application.properties - Database configurations

# Required Software
1. JDK, JRE
2. MySQL Database/ Hana DB configured on cloud platform
3. Maven
4. Windows/Ubuntu OS
5. Tomcat Server 8.0 or above
6. POSTMAN for testing the Odata service

To run the Application locally, run the following command in your command prompt -
mvn spring-boot:run -P jar

