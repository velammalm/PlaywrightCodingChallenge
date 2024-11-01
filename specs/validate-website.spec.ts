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

    await homePage.navigateToHomePage(base_URL as String);
    await homePage.acceptCookies();

    await homePage.validateBasicSearchFieldsInHomePage();

    const sharedHeader = new SharedHeader();

    sharedHeader.verifyMyAccountMenuIsDisplayed();
  });

  test("Validation of Login functionality", async () => {
    test.setTimeout(MAX_TIMEOUT);
    const base_URL = test.info().project.use.baseURL;
    const homePage = new HomePage();

    await homePage.navigateToHomePage(base_URL as String);
    await homePage.acceptCookies();

    const sharedHeader = new SharedHeader();
    await sharedHeader.clickAnmeldenFromMyAccount();

    const login = new Login();
    await login.verifySignInWidgetAppears();
    await login.verifySignInButtonDisabled();

    await login.enterCredentials(userName,password);

    if (await login.verifySignInButtonEnabled()) {
      await login.clickSignInButton();
    }

    await login.verifyErrorAlert();

    await login.verify_RedBorder_HighLight_AndErroText_Email_Password();
  });


  test.only("Validation of offers", async () => {
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
    await searchResultPage.validateSearchResultsPage();
    await searchResultPage.clickLoadMoreButton();
    const { hotelName, hotelLocation }=await searchResultPage.selectHotel();

    await switchPage(2);
    const offersPage = new OffersPage();
    await offersPage.validateOfferSelectionPage();
    await offersPage.verifyHotelDisplayDetails(hotelName, hotelLocation);
    const price=await offersPage.selectOffer();
   

    await switchPage(3)
    const bookingPage = new BookingPage();
    await bookingPage.validateBookingPage();
    await bookingPage.validateBookingPrice(price);  
  });

});
  