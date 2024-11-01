/**
 * shared-header.ts: In this module we maintain all the elements(locators) and functions associated to the
 * shared header that is displayed across different pages
 */

import { click, clickByJS, doubleClick, hover, scrollLocatorIntoView, wait, waitForPageLoadState } from "../utils/actionUtils";
import { getLocator, getLocatorByTestId, getLocatorByText } from "../utils/locator-utils";
import CustomLogger, { logger } from "../framework-setup/logger";
import { expectElementToBeVisible } from "../utils/assert-utils";


export default class SharedHeader{

    readonly myAccountMenu = () => getLocatorByTestId('shared-header-headercontrol-login');
    readonly anmeldenLink = () => getLocator('div[data-testid="shared-header-headercontrol-burgermenu"] a:nth-of-type(1)');

    async verifyMyAccountMenuIsDisplayed(): Promise<void>{
        //await scrollLocatorIntoView(this.myAccountMenu());
        await expectElementToBeVisible(this.myAccountMenu(),{message: 'My Account menu should be displayed in the Shared Header'});
    }

    async  clickAnmeldenFromMyAccount(): Promise<void>{
      
        await this.verifyMyAccountMenuIsDisplayed();
        await click(this.myAccountMenu());
        logger.info('myAccount menu clicked');
        logger.info('anmelden link visibiliy: '+await this.anmeldenLink().isVisible({timeout:7000}));
        await hover(this.anmeldenLink(),{timeout:10000});
        await click(this.anmeldenLink());
        logger.info('Anmelden link clicked');
       
        
       
    }   
}