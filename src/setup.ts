import {
  CredentialIssuerLD,
  LdDefaultContexts,
  VeramoEd25519Signature2018,
} from "@veramo/credential-ld";

export function setupCredentialLd() {
  const suites = [new VeramoEd25519Signature2018()];
  const contextMaps = [LdDefaultContexts];

  const plugin = new CredentialIssuerLD({ suites, contextMaps });
  console.log(plugin);
}
