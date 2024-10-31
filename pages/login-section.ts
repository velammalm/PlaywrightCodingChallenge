import { click, fillAndEnter, waitForLoadState, waitForNetworkIdleState, waitForPageLoadState } from "../utils/actionUtils";
import { expectElementToBeDisabled, expectElementToBeEnabled, expectElementToBeHidden, expectElementToBeVisible, expectElementToHaveCSS, expectElementToHaveText } from "../utils/assert-utils";
import { getLocator, getLocatorByRole, getLocatorByTestId } from "../utils/locator-utils";
import CustomLogger, { logger } from "../framework-setup/logger";



const testdata = require('../test-data/data.json'); 


export default class Login{


readonly signInWidget = () => getLocatorByTestId('shared-authentication-signIn-widget');
readonly emailTextBox = () => getLocatorByTestId('shared-authentication-signinWidget-emailAddress-textfield');
readonly passwordTextBox = () => getLocatorByTestId('shared-authentication-signinWidget-currentPassword-textfield');
readonly SignInButton = () => getLocatorByTestId('shared-authentication-signinWidget-submit-button');
readonly reactSpinner = () => getLocator('span[style*="react-spinners-PulseLoader"]').nth(0);
readonly errorAlertText = () => getLocatorByTestId('shared-authentication-signinWidget-unverified-error-alert');
readonly emailFieldParent = () => this.emailTextBox().locator('..');
readonly passwordFieldParent = () => this.passwordTextBox().locator('..');
readonly incorrectEmailErrorMessage = () => this.emailFieldParent().locator('..').locator('span[data-testid="message"]');
readonly incorrectPasswordErrorMessage= () => this.passwordFieldParent().locator('..').locator('span[data-testid="message"]');


async verifySignInWidgetAppears() : Promise<void>{
    expectElementToBeVisible(this.signInWidget(),{timeout:10000, message: 'SignIn Widget is not displayed'});
}

async verifySignInButtonDisabled():Promise<void>{
    await expectElementToBeDisabled(this.passwordTextBox(),{message:'Unexepcted behavior: SignIn Button is enabled'});
}

async enterCredentials() : Promise<void>{
    await fillAndEnter(this.emailTextBox(),testdata.username);
    await fillAndEnter(this.passwordTextBox(),testdata.password);
}

async verifySignInButtonEnabled():Promise<boolean>{
    await expectElementToBeEnabled(this.passwordTextBox(),{message:'Unexpected behavior: SignIn Button is disabled'});
    return this.passwordTextBox().isEnabled();
}

async clickSignInButton() : Promise<void>{
    await click(this.SignInButton());
    logger.info('SignIn Button is clicked');
}

async verifyErrorAlert() : Promise<void>{
    //await waitForNetworkIdleState();
    //logger.info('application in network idle state');
    //await waitForLoadState();
    await expectElementToBeHidden(this.reactSpinner());
    logger.info('error alert text visibility: '+await this.errorAlertText().isVisible({timeout:10000}));
    expectElementToBeVisible(this.errorAlertText(),{message: 'ErrorAlert text is missing'});
    expectElementToHaveText(this.errorAlertText(),'Falsche E-Mail-Adresse oder Passwort. Bitte versuche es erneut.',{ignoreCase:false, useInnerText:true});
}

async verify_RedBorder_HighLight_AndErroText_Email_Password() : Promise<void>{
    expectElementToHaveCSS(this.emailFieldParent(),'border','1px solid rgb(255, 0, 10)',{message:'The email Field is not highlighted with Red border'});
    expectElementToHaveCSS(this.passwordFieldParent(),'border','1px solid rgb(255, 0, 10)',{message:'The password Field is not highlighted with Red border'});
    expectElementToHaveText(this.incorrectEmailErrorMessage(),'Bitte überprüfe deine E-Mail.',{ignoreCase:false, message: 'The email error text is incorrect'});
    expectElementToHaveText(this.incorrectPasswordErrorMessage(),'Bitte überprüfe dein Passwort.',{ignoreCase:false,  message: 'The email error text is incorrect'});

}
    
}


