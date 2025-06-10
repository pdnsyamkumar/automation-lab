import { TopNavigationPage } from "@pages/top-navigation.page";

export const topNavbarMatchers = {
    async toHaveNavOption(
        topNavigationPage: TopNavigationPage,
        expectedOption: string
    ){
        const assertionName = `toHaveNavOption`;
        let pass = false;
        let actual = false;

        try {
            const navOption = await topNavigationPage.getNavOptionByLabel(expectedOption).innerText();
            actual = navOption.trim().includes(expectedOption.trim());
            pass = actual;
        } catch (error) {
            console.error('Error in toHaveNavOption:', error);
            pass = false;
        }

        const message = () =>
            `Expected: Navigation option "${expectedOption}" to be present\n` +
            `Received: Navigation option "${expectedOption}" is ${
                actual ? 'present' : 'not present'
            }`;

        return {
            message,
            pass,
            name: assertionName,
            expected: true,
            actual,
        };
    },

    async toHaveAllNavOptions(
        topNavigationPage: TopNavigationPage,
        expectedOptions: string[]
    ) {
        const assertionName = `toHaveAllNavOptions`;
        let pass = true;
        const missingOptions: string[] = [];

        try {
            const actualOptions = await topNavigationPage.getAllNavOptionsInnerText();
            
            for (const expectedOption of expectedOptions) {
                const trimmedExpected = expectedOption.trim();
                const isPresent = actualOptions.some(actual => 
                    actual.includes(trimmedExpected)
                );
                
                if (!isPresent) {
                    missingOptions.push(expectedOption);
                    pass = false;
                }
            }
        } catch (error) {
            console.error('Error in toHaveAllNavOptions:', error);
            pass = false;
            missingOptions.push(...expectedOptions);
        }

        const message = () => {
            if (missingOptions.length === 0) {
                return `Expected: All navigation options to be present\n` +
                       `Received: All options are present`;
            }
            return `Expected: All navigation options: "${expectedOptions.join(', ')}" to be present\n` +
                   `Received: The following options are missing: "${missingOptions.join(', ')}"`;
        };

        return {
            message,
            pass,
            name: assertionName,
            expected: true,
            actual: pass,
        };
    }
}