import { click, clickByJS, gotoURL, wait, } from "../utils/actionUtils";
import {  expectElementToBeEnabled, expectElementToBeVisible, expectPageToHaveTitle } from "../utils/assert-utils"
import  { logger } from "../framework-setup/logger";
import { getLocator, getLocatorByRole, getLocatorByTestId } from "../utils/locator-utils";
import { MAX_TIMEOUT } from "../utils/timeout-constants";


export default class HomePage{

 readonly acceptCookiesButton = () => getLocator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
 readonly destinationField = () => getLocatorByTestId('destination-field');
 readonly departureAirport = () => getLocatorByTestId('airports-field');
 readonly travelDate = () => getLocatorByTestId('travel-period-field');
 readonly allDestinationOptions = () => getLocator('div[data-testid^="shared-searchForm-destinationLayer-topDestination"]');
 readonly travelPeriodDisplayField = () => getLocatorByTestId('shared-searchForm-travel-period');
 readonly numberOfTravellers = () => getLocatorByTestId('travellers-field-multiroom');
 //readonly submitSearchButton = () =>getLocatorByRole('button',{name: 'Angebote suchen'});
 readonly submitSearchButton = () => getLocatorByTestId('submit');
 readonly leftSideDateNavigationIcon = () => getLocatorByTestId('IconChevronLeft').locator('..');
 readonly rightSideDateNavigationIcon = () => getLocatorByTestId('IconChevronRight');
 readonly currentDisplayedDate = () => getLocator('div[data-testid-range="beginning"]').first();
 

 async  navigateToHomePage(base_url:String): Promise<void> {
    await gotoURL(`${base_url}`);
    await expectPageToHaveTitle(/Urlaub mit bis zu 60% Rabatt sichern ▷ ab in den urlaub!/);
    logger.info('Navigated to the website '+base_url+ 'successfully'); 
}

 async  acceptCookies(): Promise<void>{
  await this.acceptCookiesButton().waitFor({ state: 'visible', timeout: MAX_TIMEOUT });
  let visible=await this.acceptCookiesButton().isVisible();
  logger.info('the element is '+visible);
  if(visible){
    await click(this.acceptCookiesButton());
    logger.info('Cookies accepted');   
  }

}

 async  validateBasicSearchFieldsInHomePage(){

  await expectElementToBeVisible(this.destinationField(),{message: 'Destination Field should be present'});

  await expectElementToBeVisible(this.departureAirport(),{message: 'Departure Airport Field should be present'});

  await expectElementToBeVisible(this.travelDate(),{message: 'Travel Period Field should be present'});

  await expectElementToBeVisible(this.numberOfTravellers(),{message: 'No of Travellers selection Field should be present'});

  await expectElementToBeEnabled(this.submitSearchButton(),{message: 'Angebote Suchen button must be enabled'});

}

async selectDestination(destination: string): Promise<void>{
  await click(this.destinationField());
  const desiredDestination = this.allDestinationOptions().filter({ hasText: destination }).first();
  await desiredDestination.waitFor({ state: 'visible' });
  await click(desiredDestination);
}

async selectTravelPeriod(travelDate: string): Promise<void>{
  const startDate = this.formatDate(travelDate.split(' - ')[0]);
  logger.info('start date: '+startDate);

  const endDate = this.formatDate(travelDate.split(' - ')[1]);
  logger.info('end date: '+endDate);

  await click(this.travelDate());

  const desiredStartDateButton = await getLocator(`button[data-date="${startDate}"]`);
  const desiredEndDateButton = await getLocator(`button[data-date="${endDate}"]`);

  /* This while loop is written to navigate the date picker to current month */
  while(await this.leftSideDateNavigationIcon().isEnabled()){
    await click(this.leftSideDateNavigationIcon())
   // await wait(1000);
    //const button = await this.leftSideDateNavigationIcon().locator('..');
    if(await this.leftSideDateNavigationIcon().isDisabled())
      break;
  }
  
  /*clicking the user's desired start date and end date */
  await click(desiredStartDateButton);
  await click(desiredEndDateButton);
  await click(this.travelDate());
}

async clickOfferSearchButton() : Promise<void>{
 await click(this.submitSearchButton());
}

 formatDate(dateString: string) : string{

    // Split the start date into day, month, and year
  const [day, month, year] = dateString.split('.').map(Number);

    // Create a Date object (months are 0-indexed in JavaScript)
  const date = new Date(Date.UTC(year, month - 1, day));

    // Format the date to yyyy-mm-dd ---> ISOString(YYYY-MM-DDTHH:mm:ss.sssZ)
  const formattedDate = date.toISOString().split('T')[0];
    
  return formattedDate;  

}


}