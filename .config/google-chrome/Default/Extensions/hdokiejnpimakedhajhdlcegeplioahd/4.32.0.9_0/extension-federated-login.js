var FederatedLogin=function(){var e;return new function(){var f=this,p={},d=!1;FederatedLoginService.call(f),f._ajax=function(e){"undefined"!=typeof base_url&&0!==e.url.indexOf("http")&&(e.url=base_url+e.url),LPServer.ajax(e)},f.login=function(o){o=fix_username(o),f.getPassword(o,function(e,r,t,n){setFragmentId(t,n),LP_do_login(o,e,void 0,void 0,void 0,void 0,void 0,void 0,void 0,r)},lpshowError)};var g=function(e,r){if(e.keypair){var t,n=(new DOMParser).parseFromString(atob(r),"application/xml"),o=n.querySelector('Attribute[Name="LastPassKeyPart"]').childNodes[0].textContent,a=n.querySelector('Attribute[Name="LastPassKeyPartSignature"]').childNodes[0].textContent,i=f._decryptK1WithPrivateKey(atob(o),e.keypair.privateKey);e.valid=!!i&&s(i,a),e.submitted=!0,e.valid||f._handleError(e.error,new Error(gs("K1 not valid!")))}},t=function(e){var r=forge.md.sha256.create();return r.update(e),btoa(r.digest().bytes())},s=function(e,r){return t(e)===r},n=function(e){var t={},r;return e.split("&").forEach(function(e){var r=e.split("=");2===r.length&&(t[r[0]]=decodeURIComponent(r[1]))}),t},m=function(e){try{if(e&&e.formData&&e.formData.SAMLResponse&&1===e.formData.SAMLResponse.length)return e.formData.SAMLResponse[0];if(e&&e.raw){var r=e.raw.reduce(function(e,r){return e+String.fromCharCode.apply(null,new Uint8Array(r.bytes))},"");if(0<r.length){var t=n(r);if(t.SAMLResponse)return t.SAMLResponse}}}catch(e){console.log(e)}return null};f.getPasswordSaml=function(d,u,c){d=fix_username(d),LPPlatform.getCurrentTabDetails(function(l){f._initiate(d,function(a,i){var s={valid:!1,idp:a,keypair:i,submitted:!1,error:c};LPPlatform.openTab({extension:!0,url:a.IdentityProviderURL+"/auth/saml2/"+a.IdentityProviderGUID,loadHandler:function(o){s.cleanup=LPPlatform.onBeforeNavigate(function(e,r){var t=/\/auth\/saml2\/success\/(.*)$/.exec(e);if(t&&2===t.length)return s.valid||!i?f._getAuthInfo(d,t[1],function(r){f._assemblePassword(d,i,r,function(e){u(e,r.authSessionId)},c)},c):f._handleError(c,new Error(gs("K1 not valid!"))),s.submitted=!0,LPPlatform.closeTab(o.tabDetails),LPPlatform.activateTab(l),!1;if(i&&!s.valid&&0===e.indexOf(a.IdentityProviderURL)){var n=m(r);if(n)return g(s,n),s.valid}},o.tabDetails),p[o.tabDetails.tabID]=s},closeHandler:function(){s.submitted||f._handleError(c,new Error(gs("Federated login tab closed!")))}})})})},f.getPassword=function(i,s,l){i=fix_username(i),LPPlatform.getCurrentTabDetails(function(e){f._initiate(i,function(e,r){var a={valid:!1,idp:e,keypair:r,submitted:!1,error:l};if(a.idp.type<=2)f.getPasswordSaml(i,s,l);else{3!=a.idp.type&&l(),Oidc.Log.logger=console,Oidc.Log.level=Oidc.Log.INFO;var t={authority:a.idp.OpenIDConnectAuthority,client_id:a.idp.OpenIDConnectClientId,redirect_uri:"https://accounts.lastpass.com/federated/oidcredirect.html",response_type:"id_token token",scope:"openid email profile",signingKeys:a.idp.OpenIDConnectKeys},n=new Oidc.OidcClient(t);n.createSigninRequest().then(function(e){d?d=!1:(d=!0,LPPlatform.openTab({extension:!0,url:e.url,closeHandler:function(){d=!1,a.submitted||f._handleError(l,new Error(gs("Federated login tab closed!")))},loadHandler:function(){},onBeforeRequestCallback:function(e,r,o){function t(e){return[gs("Azure AD reported a problem during login."),gs("Contact your Azure AD administrator for assistance."),gs("Here’s the message from Azure AD:"),e].join("<br/><br/>")}/https:\/\/accounts\.lastpass\.com\/federated\/oidcredirect\.html.*/.test(e)&&n.processSigninResponse(e).then(function(e){if(a.submitted=!0,LPPlatform.closeTab({tabID:o}),d=!1,e.error)return console.log(e.error),f._handleError(l,new Error(getErrorMessage(e.error))),!1;if(!e.profile)return f._handleError(l,new Error(gs("No profile information."))),!1;var r=e.profile.mail?e.profile.mail.toLowerCase():void 0,t=e.profile.preferred_username?e.profile.preferred_username.toLowerCase():void 0;if(r==i.toLowerCase()||t==i.toLowerCase())return f._assemblePasswordForOIDC(e.id_token,e.access_token,a.idp.CompanyId,alp_url,s,l),!0;var n=[gs("Use the same account to log in to both Azure AD and LastPass."),"<br/><br/>",gs("Current Azure AD account:")+" "+(r||t||gs("unknown")),"<br/>",gs("Attempted LastPass account:")+" "+i].join("");return f._handleError(l,new Error(n)),!1}).catch(function(e){console.log(e);var r=decodeURIComponent(e.error_description.replace(/\+/g,"%20"));f._handleError(l,new Error(t(r)))})}}))})}})})},f.validateK1Encryption=function(e,r,t){var n=!0,o=p[t.tabID];o&&o.keypair&&(g(o,e),n=o.valid),r&&r(n)},LPPlatform.onTabClosed(function(e){p[e]&&(p[e].cleanup(),delete p[e])})}}();
//# sourceMappingURL=sourcemaps/extension-federated-login.js.map