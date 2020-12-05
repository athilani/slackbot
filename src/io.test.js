const { getRepoUrl} = require('./io.js')
const { fetchGitHubData} = require('./github.js')

jest.mock('./github')

describe('Input output', ()=> {
    const jsonContent = [{
        "name": "Office 365",
        "definition": "",
        "isInternal": false,
        "categories": "General",
        "description": "https://git.abc.com.au/SlackBot-Development/Sample-System-1"
    },
        {
            "name": "Active Directory",
            "definition": "",
            "isInternal": false,
            "categories": "General",
            "description": "https://git.abc.com.au/SlackBot-Development/Sample-System-2"
        }];
    fetchGitHubData.mockReturnValue(jsonContent);
    it('Should return correct repo name', async () => {
        const expectedUrl = 'https://git.abc.com.au/SlackBot-Development/Sample-System-1';
        const actual = await getRepoUrl('Office 365');
        expect(actual).toEqual(expectedUrl);
    });
})
