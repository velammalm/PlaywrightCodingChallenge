import { click, clickByJS, doubleClick, hover, scrollLocatorIntoView, wait, waitForPageLoadState } from "../utils/actionUtils";
import { getLocator, getLocatorByTestId, getLocatorByText } from "../utils/locator-utils";
import CustomLogger, { logger } from "../framework-setup/logger";


export default class SharedHeader{

    readonly myAccountMenu = () => getLocatorByTestId('shared-header-headercontrol-login');
    readonly anmeldenLink = () => getLocator('div[data-testid="shared-header-headercontrol-burgermenu"] a:nth-of-type(1)');

    async  clickAnmeldenFromMyAccount(): Promise<void>{
      
        await scrollLocatorIntoView(this.myAccountMenu());
        logger.info('Scrolled to My account menu ');
        await this.myAccountMenu().isVisible();
        await click(this.myAccountMenu());
        logger.info('myAccount menu clicked');
        logger.info('anmelden link visibiliy: '+await this.anmeldenLink().isVisible({timeout:7000}));
        await hover(this.anmeldenLink(),{timeout:10000});
        await click(this.anmeldenLink());
        logger.info('Anmelden link clicked');
       
        
       
    }   
}