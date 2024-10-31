import { click, clickAndNavigate, clickAndWaitForURL, gotoURL, waitForLoadState, waitForNetworkIdleState, waitForPageLoadState } from "../utils/actionUtils";
import { expectElementNotToHaveText, expectElementToBeVisible, expectElementToContainAttribute, expectPageToHaveTitle } from "../utils/assert-utils"
import CustomLogger, { logger } from "../framework-setup/logger";
import { getLocator, getLocatorByRole, getLocatorByTestId } from "../utils/locator-utils";


export default class HomePage{

 readonly acceptCookiesButton = () => getLocator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
 readonly destinationField = () => getLocatorByTestId('destination-field');
 readonly departureAirport = () => getLocatorByTestId('airports-field');
 readonly travelDate = () => getLocatorByTestId('travel-period-field');
 readonly allDestinationOptions = () => getLocator('div[data-testid^="shared-searchForm-destinationLayer-topDestination"]');
 readonly travelPeriodDisplayField = () => getLocatorByTestId('shared-searchForm-travel-period');
 //readonly submitSearchButton = () =>getLocatorByRole('button',{name: 'Angebote suchen'});
 readonly submitSearchButton = () => getLocatorByTestId('submit');
 


 async  navigateToHomePage(base_url:String): Promise<void> {
    await gotoURL(`${base_url}`);
    await expectPageToHaveTitle(/Urlaub mit bis zu 60% Rabatt sichern ▷ ab in den urlaub!/);
    logger.info('Navigated to the website '+base_url+ 'successfully');
 
}

 async  acceptCookies(): Promise<void>{
  await this.acceptCookiesButton().waitFor({ state: 'visible', timeout: 6000 });
  let visible=await this.acceptCookiesButton().isVisible();
  logger.info('the element is '+visible);
  if(visible){
    await click(this.acceptCookiesButton());
    logger.info('Cookies accepted');   
  }

}

 async  interactWithElements(){
  await click(this.destinationField());
  logger.info('destination field clicked');
  await click(this.departureAirport());
  logger.info('departure Airport field clicked');
  await click(this.travelDate());
  logger.info('dateField clicked')

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

  await click(desiredStartDateButton);
  await click(desiredEndDateButton);
  await click(this.travelDate());
}

async clickOfferSearchButton() : Promise<void>{
 await click(this.submitSearchButton());
 await this.submitSearchButton().isHidden();
  
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