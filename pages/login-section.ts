/**
 * login-section.ts: In this module we maintain all the elements(locators) and functions associated to the 
 * SignIn popup section which appears after user clicks on Anmelden in MyAccount menu
 */

import { click, fillAndEnter, waitForLoadState, waitForNetworkIdleState, waitForPageLoadState } from "../utils/actionUtils";
import { expectElementToBeDisabled, expectElementToBeEnabled, expectElementToBeHidden, expectElementToBeVisible, expectElementToHaveCSS, expectElementToHaveText } from "../utils/assert-utils";
import { getLocator, getLocatorByRole, getLocatorByTestId } from "../utils/locator-utils";
import CustomLogger, { logger } from "../framework-setup/logger";



//const testdata = require('../test-data/data.json'); 


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
    await expectElementToBeVisible(this.signInWidget(),{timeout:10000, message: 'SignIn Widget should be displayed'});
}

async verifySignInButtonDisabled():Promise<void>{
    await expectElementToBeDisabled(this.SignInButton(),{message:'SignIn Button should be enabled'});
}

async enterCredentials(username: string, password: string) : Promise<void>{
    await fillAndEnter(this.emailTextBox(),username);
    await fillAndEnter(this.passwordTextBox(),password);
}

async verifySignInButtonEnabled():Promise<boolean>{
    await expectElementToBeEnabled(this.SignInButton(),{message:'SignIn Button should be enabled'});
    return this.SignInButton().isEnabled();
}

async clickSignInButton() : Promise<void>{
    await click(this.SignInButton());
    logger.info('SignIn Button is clicked');
}

/* this function is written to verify the alert text that appears in the Login widget
    when user enters incorrect username and password */

async verifyErrorAlert() : Promise<void>{
    //await waitForNetworkIdleState();
    //logger.info('application in network idle state');
    //await waitForLoadState();

    /* wait until the loader (which appears after clicking Anmelden button) disappears */
    await expectElementToBeHidden(this.reactSpinner());
    
    logger.info('error alert text visibility: '+await this.errorAlertText().isVisible({timeout:10000}));
    await expectElementToBeVisible(this.errorAlertText(),{message: 'ErrorAlert text should be visible'});
    await expectElementToHaveText(this.errorAlertText(),'Falsche E-Mail-Adresse oder Passwort. Bitte versuche es erneut.',{ignoreCase:false, useInnerText:true});
}

/* this function is written to verify whether the Username and Password textbox is highlighted in redColor
    when user enters incorrect username and password */

async verify_RedBorder_HighLight_AndErroText_Email_Password() : Promise<void>{
    await expectElementToHaveCSS(this.emailFieldParent(),'border','1px solid rgb(255, 0, 10)',{message:'The email Field should be highlighted with Red border'});
    await expectElementToHaveCSS(this.passwordFieldParent(),'border','1px solid rgb(255, 0, 10)',{message:'The password Field should be highlighted with Red border'});
    await expectElementToHaveText(this.incorrectEmailErrorMessage(),'Bitte überprüfe deine E-Mail.',{ignoreCase:false, message: 'Valiation of email error text'});
    await expectElementToHaveText(this.incorrectPasswordErrorMessage(),'Bitte überprüfe dein Passwort.',{ignoreCase:false,  message: 'Validation of password error text'});

}
    
}


