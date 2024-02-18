export const environment = {
	production: true,
	bnb: {
		api: 'http://test.bnb.com.bo/ClientAuthentication.API/api/v1/', // to do: update this url according to your contract
		accountId: 'your-account-id',
		authorizationId: 'your-authorization-id'
	},
	cybersource: {
		url: 'https://testsecureacceptance.cybersource.com/pay',
		profileId: 'your-profile-id',
		accessKey: 'your-access-key',
		secretKey: 'your-secret-key'
	},
	khipu: {
		url: 'https://khipu.com/api/2.0/payments',
		secret: 'your-secret-key',
		notifyUrl: 'your-notify-url',
		returnUrl: 'your-return-url',
		cancelUrl: 'your-cancel-url',
		apiVersion: '1.3',
		receiverId: 0, // your-receiver-id
	},
	libelula: {
		url: 'https://api.todotix.com/rest/deuda/registrar',
		appKey: 'your-app-key',
		callbackUrl: 'your-callback-url',
		returnUrl: 'your-return-url',
	}
};
