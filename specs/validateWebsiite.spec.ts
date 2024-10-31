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

const testdata = require('../test-data/data.json'); 

const destination = testdata.destination;
const travelDate = testdata.travelDate;

test.describe("Validate the website", () => {
  test.skip("Test the basic functionalities in the website", async () => {
    const base_URL = test.info().project.use.baseURL;
    const homePage = new HomePage();
    await homePage.navigateToHomePage(base_URL as String);
    await homePage.acceptCookies();
    //await homePage.interactWithElements();
    await homePage.selectDestination(destination);
    await homePage.selectTravelPeriod(travelDate);

    const sharedHeader = new SharedHeader();
    await sharedHeader.clickAnmeldenFromMyAccount();

    const login = new Login();
    await login.verifySignInWidgetAppears();
    await login.verifySignInButtonDisabled
    await login.enterCredentials();
    if(await login.verifySignInButtonEnabled()){
      await login.clickSignInButton();
    }
    await login.verifyErrorAlert();
    await login.verify_RedBorder_HighLight_AndErroText_Email_Password();

    
  });
  test("Validation of offers", async () => {
    test.setTimeout(TEST_TIMEOUT);
    const base_URL = test.info().project.use.baseURL;
    const homePage = new HomePage();
    await homePage.navigateToHomePage(base_URL as String);
    await homePage.acceptCookies();
    
    await homePage.selectDestination(destination);
    await homePage.selectTravelPeriod(travelDate);
    await homePage.clickOfferSearchButton();
    
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
  