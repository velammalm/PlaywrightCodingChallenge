import { test } from '../framework-setup/page-setup';
import HomePage from '../pages/home-page'
import Login from '../pages/login-section';
import SearchResults from '../pages/searchResults-page';
import SharedHeader from '../pages/shared-header';
import { waitForNetworkIdleState } from '../utils/actionUtils';
import { switchPage } from '../utils/pageUtils';
import OffersPage from '../pages/offerSelection-page';
import BookingPage from '../pages/booking-page';
import { MAX_TIMEOUT, TEST_TIMEOUT } from '../utils/timeout-constants';
import * as allure from "allure-js-commons";


const testdata = require('../test-data/data.json'); 

const destination = testdata.destination;
const travelDate = testdata.travelDate;
const userName = testdata.username;
const password = testdata.password;

test.describe("Validate the website ab in den Urlaub", () => {
  
  test("Validation of Homepage", async () => {
    const base_URL = test.info().project.use.baseURL;
    const homePage = new HomePage();

    await homePage.navigateToHomePage(base_URL as String); /* Launching the website */
    await homePage.acceptCookies(); /* Accepting the cookies */

    /* Validate whether the basic search fields such Destination selction box, travelPeriod date picker, No.of travellers, destination fields */
    await homePage.validateBasicSearchFieldsInHomePage();

    const sharedHeader = new SharedHeader();

    /* Validate whether shared header with MyAccount menu is displayed  */
    sharedHeader.verifyMyAccountMenuIsDisplayed();
  });

  test("Validation of Login functionality", async () => {
    test.setTimeout(MAX_TIMEOUT);
    const base_URL = test.info().project.use.baseURL;
    const homePage = new HomePage();

    await homePage.navigateToHomePage(base_URL as String); /* Launching the website */
    await homePage.acceptCookies(); /* Accepting the cookies */

    const sharedHeader = new SharedHeader();
    await sharedHeader.clickAnmeldenFromMyAccount(); /* Click Anmelden from My Account Menu in the shared header */

    const login = new Login();

    /* Verify whether the Sign In Widget appears */
    await login.verifySignInWidgetAppears();

    /* Verify that the SignIn Button is disabled initially when user doesn't input both username and password */
    await login.verifySignInButtonDisabled();

    /*enter the credentials which is taken from the data.json under 'test-data' folder*/
    await login.enterCredentials(userName,password);

    /*Verify SignIn button is enabled when user clicks on the SignIn Button*/
    if (await login.verifySignInButtonEnabled()) {
      await login.clickSignInButton();
    }

    /*Verify the error alert text is displayed when the user enters incorrect username and password*/
    await login.verifyErrorAlert();

    /*Verify whether the Email and Password text box border is highlighter in red colour and error texts are displayed under the email &
    password textbox*/
    await login.verify_RedBorder_HighLight_AndErroText_Email_Password();
  });


  test("Validation of offers", async () => {
    /* Setting test timeout to 3 minutes */
    test.setTimeout(TEST_TIMEOUT);

    /* Retrieving the baseURL value from playwright.config.ts file */
    const base_URL = test.info().project.use.baseURL;

    const homePage = new HomePage();
    await homePage.navigateToHomePage(base_URL as String);  /* Launching the website */
    await homePage.acceptCookies(); /* Accepting the cookies */
    
    await homePage.selectDestination(destination); /* Selects the destination (user destination data is retrieved from data.json) */
    await homePage.selectTravelPeriod(travelDate); // Selects the travel date in the homepage (user destination data is retrieved from data.json) 
    await homePage.clickOfferSearchButton(); //click on submit button in the homepage
    
    const searchResultPage = new SearchResults();
    await searchResultPage.validateSearchResultsPage(); //Validate whether the navigation to SearchRersultsPage is successful
    await searchResultPage.clickLoadMoreButton(); //In the Search Result page scroll to bottom of the page and click on Load More button
    const { hotelName, hotelLocation }=await searchResultPage.selectHotel(); //Select the hotel from the newly loaded results and retrieve the hotel name and location details

    await switchPage(2);
    const offersPage = new OffersPage();
    await offersPage.validateOfferSelectionPage(); //Validate whether the navigation to Offer Selection Page is successful

    /*Verify the hotel Name and location details is exactly the same as displayed in previous search result page*/
    await offersPage.verifyHotelDisplayDetails(hotelName, hotelLocation);

    /*Click on the offer and retrieve the price details*/
    const price=await offersPage.selectOffer();
   

    await switchPage(3)
    const bookingPage = new BookingPage();
    await bookingPage.validateBookingPage(); //Validate whether the navigation to Booking Page is successful

    /*Verify whether the hotel price is exactly the same as displayed in previous offer selection page*/
    await bookingPage.validateBookingPrice(price);  
  });

});
  