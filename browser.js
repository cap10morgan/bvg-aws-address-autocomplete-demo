import {
  LocationClient,
  SearchPlaceIndexForSuggestionsCommand,
} from "@aws-sdk/client-location";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const REGION = "us-east-1";
const IDENTITY_POOL_ID = "us-east-1:3081c288-0f9c-411e-adef-903a7747c84e";

const locationClient = new LocationClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

const getAddressAutocompleteSuggestions = async (text, bias) => {
  const params = {
    IndexName: "bvg-addr-autocomplete-demo",
    FilterCountries: ["USA"],
    Text: text,
    Language: "en",
  };
  if (bias && bias.length === 2) {
    params.BiasPosition = bias;
  }
  const command = new SearchPlaceIndexForSuggestionsCommand(params);
  var results = [];
  try {
    const resp = await locationClient.send(command);
    // console.log("Response:");
    // console.dir(resp);
    results = resp["Results"].map((place) => place["Text"]);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
  return results;
};

window.getAddressAutocompleteSuggestions = getAddressAutocompleteSuggestions;
